import { ItemGroup } from "@/components/ui/item";
import type { Comment } from "@/types/blog";
import React from "react";
import { CommentItem } from "./comment-item";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
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

