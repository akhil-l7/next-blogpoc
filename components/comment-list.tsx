import React from "react";
import { ItemGroup } from "@/components/ui/item";
import { CommentItem } from "./comment-item";
import type { Comment } from "@/types/blog";

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
}

export function CommentList({ comments, isLoading }: CommentListProps) {
  if (isLoading) {
    return (
      <p
        className="text-muted-foreground text-center py-4"
        aria-live="polite"
        aria-busy
      >
        Loading comments...
      </p>
    );
  }

  if (comments.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-4">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <ItemGroup className="gap-2">
      {comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentItem comment={comment} />
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}

