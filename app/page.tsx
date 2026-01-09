import { config } from "@/app.config";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/prismic";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const data = await client.getAllByType('blog');
  return (
    <main className="container px-2 mx-auto">
      <header className="my-10">
        <h1 className="scroll-m-20 text-center text-4xl tracking-tight text-balance">{config?.title || 'blog'}</h1>
      </header>
      <Separator className="mb-6" />
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {
            data?.map(({ data, id }) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle>
                    {data?.title || 'Title'}
                  </CardTitle>
                  <CardDescription>
                    {data?.description || 'Description'}
                  </CardDescription>
                  <CardAction>
                    <Link href={`/${id}`}>
                      <ChevronRightIcon />
                    </Link>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  {data?.description || 'Content'}
                </CardContent>
              </Card>
            ))
          }
        </div>
      </section>
    </main>
  );
}
