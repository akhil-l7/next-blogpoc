import { ImageField, isFilled, RichTextField } from "@prismicio/client";
import { PrismicRichText, PrismicImage } from "@prismicio/react";

interface BlogContentProps {
    content: RichTextField;
    coverImage?: ImageField;
}

export const Content = ({ content, coverImage }: BlogContentProps) => {
    const hasImage = isFilled.image(coverImage);
    return (
        <article className="space-y-8">
            {coverImage && (
                <div className="bg-muted aspect-video w-full overflow-hidden rounded-xl">
                    {hasImage
                        ? (<PrismicImage field={coverImage} />)
                        : (<img src={'https://placehold.co/600x400?text=CoverImage'} alt="Cover Image" className="h-full w-full object-cover" />)
                    }

                </div>
            )}

            <div className="prose prose-lg max-w-none text-blog-content mb-6 leading-relaxed">
                <PrismicRichText
                    field={content}
                    components={{
                        heading1: ({ children }) => <h1>{children}</h1>,
                        paragraph: ({ children }) => <p className="my-8">{children}</p>,
                    }}
                />
            </div>
        </article>
    );
};