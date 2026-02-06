import { Content } from "@/components/content";
import { Header } from "@/components/header";
import client from "@/lib/prismic";

export async function generateStaticParams() {
  const data = await client.getAllByType('blog');
  const slugs = data.map(({ id }) => ({ slug: id }));
  return slugs;
}

export default async function blog({ params }: { params: Promise<{ slug: string }> }) {
  const data = await params;
  const post = await client.getByID(data?.slug);

  return (
    <div className="flex-1 container mx-auto">
      <div className="flex items-center">
        <div className="bg-background min-h-screen w-full">
          <div className="mx-auto max-w-4xl px-6 py-6">
            {/* https://shadcnexamples.com/blog-detail-page  template */}
            <Header
              category={post.tags[0]}
              dateField={post.data.published_date}
              title={post.data.title}
            />

            <div className="mt-12">
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
