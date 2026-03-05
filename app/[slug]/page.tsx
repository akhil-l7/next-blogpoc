import { Content } from "@/components/content";
import { PostHeader } from "@/components/postHeader";
import { Comments } from "@/components/comments";
import client from "@/lib/prismic";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const data = await client.getAllByType('blog');
  const slugs = data.map(({ id }) => ({ slug: id }));
  return slugs;
}

export default async function blog({ params }: { params: Promise<{ slug: string }> }) {
  const data = await params;
  let post;
  try {
    post = await client.getByID(data?.slug)
  } catch (error) {
    notFound();
  }
  return (
    <div className="container mx-auto bg-background min-h-screen lg:px-6">
      {/* https://shadcnexamples.com/blog-detail-page  template */}
      <PostHeader
        category={post.tags[0]}
        dateField={post.data.published_date}
        title={post.data.title}
      />

      <div className="mt-6">
        <Content
          content={post.data.content}
          coverImage={post.data.featured_image}
        />
      </div>
      <Comments slug={data?.slug || ''} />
    </div>
  );
}
