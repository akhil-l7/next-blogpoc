import { Content } from "@/components/content";
import { PostHeader } from "@/components/postHeader";
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
    <div className="flex-1 container mx-auto">
      <div className="flex items-center">
        <div className="bg-background min-h-screen w-full">
          <div className="mx-auto max-w-4xl p-1 md:p-1 lg:px-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
