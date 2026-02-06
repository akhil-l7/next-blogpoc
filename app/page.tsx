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
    <div className="grid xl:grid-cols-2 gap-8">
      {
        data?.map(({ data, id }) => (
          <Item key={id} variant={"outline"}>
            <ItemContent>
              <ItemTitle>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <Badge>{badgePlaceholder}</Badge>
                    <p className="text-muted-foreground text-sm">{data.published_date || PlaceholderDate}</p>
                    <ReadTime content={data.content} />
                  </div>
                  <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0">
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


