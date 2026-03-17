import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment, Post } from "../backend";
import { PostTypeEnum } from "../backend";
import { useActor } from "./useActor";

export function useAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostsByType(postType: PostTypeEnum) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", postType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPostsByType(postType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSamplePosts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.addSamplePosts();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useLikePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      if (!actor) return;
      await actor.likePost(postId);
    },
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const prev = queryClient.getQueryData<Post[]>(["posts"]);
      queryClient.setQueryData<Post[]>(
        ["posts"],
        (old) =>
          old?.map((p) =>
            p.postId === postId ? { ...p, likesCount: p.likesCount + 1n } : p,
          ) ?? [],
      );
      return { prev };
    },
    onError: (_err, _postId, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["posts"], ctx.prev);
    },
  });
}

export function useComments(postId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!actor || !postId) return [];
      return actor.getComments(postId);
    },
    enabled: !!actor && !isFetching && !!postId,
  });
}

export function useAddComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      postId,
      authorName,
      content,
    }: { postId: string; authorName: string; content: string }) => {
      if (!actor) return;
      await actor.addComment(postId, authorName, content);
    },
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      authorName: string;
      avatarUrl: string;
      contentText: string;
      translationText: string;
      originalLanguage: string;
      postType: PostTypeEnum;
      audioDuration: bigint | null;
    }) => {
      if (!actor) return "";
      return actor.createPost(
        args.authorName,
        args.avatarUrl,
        args.contentText,
        args.translationText,
        args.originalLanguage,
        args.postType,
        args.audioDuration,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export { PostTypeEnum };
