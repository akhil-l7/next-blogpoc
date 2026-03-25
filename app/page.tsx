import { LinkWithBenefits } from "@/components/linkWithBenefits";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { ReadTime } from "@/components/ui/readTime";
import client from "@/lib/prismic";
import { BLOG } from "@/lib/constants";
import { TopBar } from "@/components/topBar";

export default async function Home() {
  const data = await client.getAllByType('blog');
  if (data.length === 0) {
    return (
      <div className="container flex items-center justify-center p-8">
        <h1>
          No blog posts yet...
        </h1>
      </div>
    )
  }
  return (
    <>
      <TopBar />
      <div id="__posts" className="grid md:grid-cols-2 gap-8 my-4 lg:my-8">
        {
          data?.map(({ data, id, tags }) => {
            let tag = BLOG.PLACEHOLDER_BADGE as string;
            if (tags.length !== 0) {
              tag = tags[0];
            }
            return (
              <Item key={id} variant={"outline"} data-tag={tag}>
                <ItemContent className="self-baseline">
                  <ItemTitle>
                    <div className="flex flex-col">
                      <div className="flex gap-2 mb-1 lg:mb-2 text-xxs sm:text-xs md:text-sm items-center">
                        <Badge className="text-xxs capitalize text-white dark:text-black">{tag}</Badge>
                        <p className="text-muted-foreground whitespace-nowrap">{data.published_date || BLOG.PLACEHOLDER_DATE}</p>
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black dark:bg-white" />
                        <ReadTime content={data.content} />
                      </div>
                      <h2 className="capitalize line-clamp-1 leading-normal text-balance text-4xl font-semibold tracking-tight first:mt-0">
                        <LinkWithBenefits href={`/${id}`}>{data?.title || 'Title'}</LinkWithBenefits>
                      </h2>
                    </div>
                  </ItemTitle>
                  <ItemDescription>
                    {data.excerpt || 'excerpt'}
                  </ItemDescription>
                </ItemContent>
              </Item>
            );
          })
        }
      </div>
    </>
  );
}


