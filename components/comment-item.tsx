import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import type { Comment } from "@/types/blog";
import DOMPurify from "dompurify";
import { Clock, User } from "lucide-react";
import { formatDate } from "./util";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const sanitizedMessage = DOMPurify.sanitize(comment.message);
  const sanitizedName = DOMPurify.sanitize(comment.name);
  
  return (
    <>
      <Item variant="outline">
        <ItemMedia variant="icon" className="rounded-full">
          <User className="h-4 w-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {sanitizedName || "Anonymous"}
          </ItemTitle>
          <ItemDescription>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(comment.createdAt)}
            </span>
          </ItemDescription>
        </ItemContent>
        <p className="mt-2 text-sm whitespace-pre-wrap basis-full">
          {sanitizedMessage}
        </p>
      </Item>
    </>
  );
}

