import client from "@/lib/prismic";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export async function generateStaticParams() {
  const data = await client.getAllByType('blog');
  const slugs = data.map(({ id }) => ({ slug: id }));
  return slugs;
}

export default async function blog({ params }: { params: Promise<{ slug: string }> }) {
  const data = await params;
  const post = await client.getByID(data?.slug);
  return (
    <div className="flex-1 container mx-auto mt-8">
      <div className="flex items-center">
        <Link href={`/`} className="mr-4">
          <ChevronLeftIcon />
        </Link>
        <Suspense fallback="loading...">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            {post?.data?.title || 'Title'}
          </h1>
        </Suspense>
      </div>
    </div>
  );
}
