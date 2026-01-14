import { config } from "@/app.config";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/prismic";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export default async function Home() {
  const data = await client.getAllByType('blog');
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
              <Card key={id} className="space-y-12">
                <CardHeader>
                  <CardTitle>
                    {data?.title || 'Title'}
                  </CardTitle>
                  <CardDescription>
                    {data.excerpt || 'excerpt'}
                  </CardDescription>
                  <CardAction>
                    <Link href={`/${id}`}>
                      <Button variant={"outline"}>Read More</Button>
                    </Link>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <PrismicRichText field={data.content} />
                </CardContent>
              </Card>
            ))
          }
        </div>
      </section>
    </main>
  );
}
