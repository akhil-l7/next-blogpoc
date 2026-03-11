import { Content } from "@/components/content";
import { PostHeader } from "@/components/postHeader";
import { Comments } from "@/components/comments";
import client from "@/lib/prismic";
import { notFound } from "next/navigation";
import { isFilled, NotFoundError } from "@prismicio/client";
import NotFound from "./not-found";
import { config } from "@/app.config";
import { Metadata } from "next";
import { truncate } from "@/lib/utils";
import { BLOG } from "@/lib/constants";

export async function generateStaticParams() {
  const data = await client.getAllByType('blog');
  const slugs = data.map(({ id }) => ({ slug: id }));
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = `https://${config.url}`;

  try {
    const post = await client.getByID(slug);

    const title = isFilled.keyText(post.data.title) ? truncate(post.data.title, BLOG.MAX_TITLE_LENGTH) : config.title;
    const excerpt = isFilled.keyText(post.data.excerpt) ? truncate(post.data.excerpt, BLOG.MAX_EXCERPT_LENGTH) : config.description;
    const publishedDate = isFilled.keyText(post.data.published_date) ? post.data.published_date : undefined;
    const featuredImage = post.data.featured_image;
    const hasFeaturedImage = isFilled.image(featuredImage);

    const ogImages = hasFeaturedImage
      ? [{
        url: featuredImage.url,
        width: featuredImage.dimensions?.width || 1200,
        height: featuredImage.dimensions?.height || 630,
        alt: title,
      }]
      : [];

    return {
      title,
      description: excerpt,
      openGraph: {
        title: title,
        description: excerpt,
        url: `${baseUrl}/${slug}`,
        type: 'article',
        publishedTime: publishedDate,
        tags: post.tags,
        images: ogImages,
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: excerpt,
        images: hasFeaturedImage ? [featuredImage.url!] : [],
      },
    };
  } catch (error) {
    return {
      title: config.title,
      description: config.description,
    };
  }
}

export default async function blog({ params }: { params: Promise<{ slug: string }> }) {
  const data = await params;
  let post;
  try {
    post = await client.getByID(data?.slug)
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      console.error('Unexpected error:', error);
      return <NotFound errorMessage="Unexpected error has occurred." />
    }
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