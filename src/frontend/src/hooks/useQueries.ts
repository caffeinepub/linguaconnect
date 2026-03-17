import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../backend";
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

export { PostTypeEnum };
