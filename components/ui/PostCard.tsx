import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from "@/components/ui/item";
import { ReadTime } from "@/components/ui/readTime";
import { BLOG } from "@/lib/constants";
import { BlogDocumentData } from "@/prismicio-types";
import { isFilled } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import Link from "next/link";

interface BlogPost {
    data: BlogDocumentData;
    id: string;
    tags: string[];
}

interface PostCardProps {
    post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
    const { data: postData, id, tags } = post;
    const postTag = tags[0] ?? BLOG.PLACEHOLDER_BADGE;
    const coverImage = postData.featured_image;
    const hasImage = isFilled.image(coverImage);

    return (
        <Item key={id} variant={"outline"} data-tag={postTag} className="relative overflow-hidden group">
            <ItemHeader className="absolute top-0 right-0 bottom-0 -z-1">
                <div className="bg-linear-to-r from-background w-1/2 h-full absolute right-0"></div>
                {hasImage && <PrismicImage field={coverImage} className="ml-auto h-dvw w-dvw max-h-40 max-w-1/2 object-cover" />}
            </ItemHeader>
            <ItemContent className="self-baseline">
                <ItemTitle>
                    <div className="flex flex-col">
                        <div className="flex gap-2 mb-1 lg:mb-2 text-xxs sm:text-xs md:text-sm items-center">
                            <Badge className="text-xxs capitalize text-white dark:text-black">{postTag}</Badge>
                            <p className="text-muted-foreground whitespace-nowrap">{postData.published_date || BLOG.PLACEHOLDER_DATE}</p>
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black dark:bg-white" />
                            <ReadTime content={postData.content} />
                        </div>
                        <h2 className="capitalize line-clamp-1 leading-normal text-balance text-4xl font-semibold tracking-tight first:mt-0">
                            <Link href={`/${id}`}>{postData?.title || 'Title'}</Link>
                        </h2>
                    </div>
                </ItemTitle>
                <ItemDescription>
                    {postData.excerpt || 'excerpt'}
                </ItemDescription>
            </ItemContent>
        </Item>
    );
}

