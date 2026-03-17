import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type Comment = {
    authorName : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type Post = {
    postId : Text;
    authorName : Text;
    avatarUrl : Text;
    contentText : Text;
    translationText : Text;
    originalLanguage : Text;
    postType : PostTypeEnum;
    audioDuration : ?Nat;
    likesCount : Nat;
    commentsCount : Nat;
    createdTimestamp : Time.Time;
  };

  type PostTypeEnum = {
    #audio;
    #text;
  };

  let posts = Map.empty<Text, Post>();
  let comments = Map.empty<Text, List.List<Comment>>();
  var postIdCounter = 0;

  func generatePostId() : Text {
    postIdCounter += 1;
    "post_" # postIdCounter.toText();
  };

  public shared ({ caller }) func createPost(
    authorName : Text,
    avatarUrl : Text,
    contentText : Text,
    translationText : Text,
    originalLanguage : Text,
    postType : PostTypeEnum,
    audioDuration : ?Nat,
  ) : async Text {
    let postId = generatePostId();
    let newPost : Post = {
      postId;
      authorName;
      avatarUrl;
      contentText;
      translationText;
      originalLanguage;
      postType;
      audioDuration;
      likesCount = 0;
      commentsCount = 0;
      createdTimestamp = Time.now();
    };
    posts.add(postId, newPost);
    postId;
  };

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.values().toArray();
  };

  public query ({ caller }) func getPostsByType(postType : PostTypeEnum) : async [Post] {
    posts.values().toArray().filter(
      func(post) {
        post.postType == postType;
      }
    );
  };

  public shared ({ caller }) func likePost(postId : Text) : async () {
    switch (posts.get(postId)) {
      case (?post) {
        let updatedPost = { post with likesCount = post.likesCount + 1 };
        posts.add(postId, updatedPost);
      };
      case (null) { Runtime.trap("Post not found") };
    };
  };

  public shared ({ caller }) func addComment(
    postId : Text,
    authorName : Text,
    content : Text,
  ) : async () {
    let comment : Comment = {
      authorName;
      content;
      timestamp = Time.now();
    };

    if (not posts.containsKey(postId)) {
      Runtime.trap("Post not found");
    };

    switch (comments.get(postId)) {
      case (?existingComments) {
        existingComments.add(comment);
        updatePostCommentCount(postId);
      };
      case (null) {
        let newCommentsList = List.empty<Comment>();
        newCommentsList.add(comment);
        comments.add(postId, newCommentsList);
        updatePostCommentCount(postId);
      };
    };
  };

  public query ({ caller }) func getComments(postId : Text) : async [Comment] {
    switch (comments.get(postId)) {
      case (?commentsList) { commentsList.toArray() };
      case (null) { [] };
    };
  };

  func updatePostCommentCount(postId : Text) {
    switch (posts.get(postId)) {
      case (?post) {
        let currentCount = switch (comments.get(postId)) {
          case (?commentsList) { commentsList.size() };
          case (null) { 0 };
        };
        let updatedPost = { post with commentsCount = currentCount };
        posts.add(postId, updatedPost);
      };
      case (null) { Runtime.trap("Post not found") };
    };
  };

  // Seed sample posts (French/English, Japanese/English)
  public shared ({ caller }) func addSamplePosts() : async () {
    ignore await createPost(
      "Marie",
      "https://example.com/marie.jpg",
      "Bonjour tout le monde!",
      "Hello everyone!",
      "French",
      #text,
      null,
    );

    ignore await createPost(
      "Takashi",
      "https://example.com/takashi.jpg",
      "こんにちは、みなさん！",
      "Hello everyone!",
      "Japanese",
      #audio,
      ?30,
    );

    ignore await createPost(
      "Emma",
      "https://example.com/emma.jpg",
      "J'adore apprendre de nouvelles langues.",
      "I love learning new languages.",
      "French",
      #text,
      null,
    );
  };
};
