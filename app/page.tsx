import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/prismic";
import Link from "next/link";
import { config } from "@/app.config"

export default async function Home() {
  const data = await client.getAllByType('blog');
  return (
    <main className="max-w-7xl px-2 mx-auto">
      <header className="my-10">
        <h1 className="scroll-m-20 text-center text-4xl tracking-tight text-balance">{config?.title || 'blog'}</h1>
      </header>
      <Separator className="mb-6" />
      <section className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            data?.map(({ data, id }) => (
              <Card key={id}>
                <Link href={`/${id}`}>
                  <CardHeader>
                    <CardTitle>
                      {data?.title}
                    </CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))
          }
        </div>
      </section>
    </main>
  );
}
