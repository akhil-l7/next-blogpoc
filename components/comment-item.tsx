import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { formatDate } from "@/components/util";
import type { Comment } from "@/types/blog";
import { Clock, User } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const name = comment.name;
  const message = comment.message;

  return (
    <>
      <Item variant="outline">
        <ItemMedia variant="icon" className="rounded-full">
          <User className="h-4 w-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {name || "Anonymous"}
          </ItemTitle>
          <ItemDescription>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(comment.createdAt)}
            </span>
          </ItemDescription>
        </ItemContent>
        <p className="mt-2 text-sm whitespace-pre-wrap basis-full">
          {message}
        </p>
      </Item>
    </>
  );
}

