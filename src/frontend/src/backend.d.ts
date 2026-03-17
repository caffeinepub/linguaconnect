import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Comment {
    content: string;
    authorName: string;
    timestamp: Time;
}
export interface Post {
    postType: PostTypeEnum;
    audioDuration?: bigint;
    originalLanguage: string;
    contentText: string;
    authorName: string;
    avatarUrl: string;
    createdTimestamp: Time;
    commentsCount: bigint;
    translationText: string;
    likesCount: bigint;
    postId: string;
}
export enum PostTypeEnum {
    audio = "audio",
    text = "text"
}
export interface backendInterface {
    addComment(postId: string, authorName: string, content: string): Promise<void>;
    addSamplePosts(): Promise<void>;
    createPost(authorName: string, avatarUrl: string, contentText: string, translationText: string, originalLanguage: string, postType: PostTypeEnum, audioDuration: bigint | null): Promise<string>;
    getAllPosts(): Promise<Array<Post>>;
    getComments(postId: string): Promise<Array<Comment>>;
    getPostsByType(postType: PostTypeEnum): Promise<Array<Post>>;
    likePost(postId: string): Promise<void>;
}
