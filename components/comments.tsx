"use client";

import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/blog";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

interface CommentsProps {
  slug: string;
}

export function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments?slug=${slug}`);
      const data = await response.json();
      setComments(data || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmitted = () => {
    fetchComments();
  };

  return (
    <Item className="my-1" variant={"outline"}>
      <ItemHeader>
        <ItemMedia>
          <MessageCircle className="h-5 w-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            Comments ({comments.length})
          </ItemTitle>
          <ItemDescription>
            Share your thoughts anonymously
          </ItemDescription>
        </ItemContent>
      </ItemHeader>
      <Separator />

      <div className="space-y-4 w-full my-4" >
        <CommentList comments={comments} isLoading={isLoading} />
      </div>
      <CommentForm slug={slug} onCommentSubmitted={handleCommentSubmitted} />
    </Item>
  );
}

