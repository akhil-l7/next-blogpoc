import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/blog";
import { neon } from "@neondatabase/serverless";
import { MessageCircle } from "lucide-react";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

async function getComments(slug: string): Promise<Comment[]> {
  const db_url = process.env.DATABASE_URL;
  if (!db_url) return [];

  try {
    const sql = neon(db_url);
    const comments = await sql`SELECT * FROM public.comments WHERE "slug" = ${slug} ORDER BY "createdAt"`;
    return comments as Comment[];
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
}

interface CommentsProps {
  slug: string;
}

export async function Comments({ slug }: CommentsProps) {
  const comments = await getComments(slug);

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
        <CommentList comments={comments} />
      </div>
      <CommentForm slug={slug} />
    </Item>
  );
}

