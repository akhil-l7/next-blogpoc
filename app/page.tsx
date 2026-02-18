import LinkWithBenefits from "@/components/linkWithBenefits";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import ReadTime from "@/components/ui/readTime";
import client from "@/lib/prismic";

export default async function Home() {
  const data = await client.getAllByType('blog');
  const PlaceholderDate = '2026-10-28';
  const badgePlaceholder = 'General'

  return (
    <div className="grid md:grid-cols-2 gap-8 my-4 lg:my-8">
      {
        data?.map(({ data, id, tags }) => (
          <Item key={id} variant={"outline"}>
            <ItemContent className="self-baseline">
              <ItemTitle>
                <div className="flex flex-col">
                  <div className="flex gap-2 mb-1 lg:mb-2 text-xxs sm:text-xs md:text-sm items-center">
                    <Badge className="text-xxs text-white capitalize">{tags?.[0] || badgePlaceholder}</Badge>
                    <p className="text-muted-foreground whitespace-nowrap">{data.published_date || PlaceholderDate}</p>
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black" />
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
        ))
      }
    </div>
  );
}


