import { config } from "@/app.config";
import LinkWithBenefits from "@/components/linkWithBenefits";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/prismic";
import { Clock } from "lucide-react";

export default async function Home() {
  const data = await client.getAllByType('blog');
  const PlaceholderDate = '2026-10-28';
  const badgePlaceholder = 'General'
  return (
    <main className="container max-w-5xl px-2 mx-auto">
      <header className="my-10">
        <h1 className="scroll-m-20 text-center text-4xl tracking-tight text-balance">{config?.title || 'blog'}</h1>
      </header>
      <Separator className="mb-6" />
      <section>
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
                        <div className="flex text-muted-foreground">
                          <Clock size={16} className="mt-0.5 mr-0.5" />
                          <p className="text-muted-foreground text-sm">&lt;{10} Min Read</p>
                        </div>
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
      </section>
    </main>
  );
}
