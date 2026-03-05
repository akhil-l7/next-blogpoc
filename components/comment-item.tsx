import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemSeparator } from "@/components/ui/item";
import { User, Clock } from "lucide-react";
import { formatDate } from "./util";
import type { Comment } from "@/types/blog";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <>
      <Item variant="outline">
        <ItemMedia variant="icon" className="rounded-full">
          <User className="h-4 w-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {comment.name || "Anonymous"}
          </ItemTitle>
          <ItemDescription>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(comment.createdAt)}
            </span>
          </ItemDescription>
        </ItemContent>
        <p className="mt-2 text-sm whitespace-pre-wrap basis-full">
          {comment.message}
        </p>
      </Item>
    </>
  );
}

