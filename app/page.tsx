import client from "@/lib/prismic";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await client.getAllByType('blog');
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-2">
      <main className="min-h-screen w-full max-w-3xl bg-white dark:bg-black py-4">
        <header className="mb-6">
          <h1 className="text-4xl lg:text-5xl">Blog</h1>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 cursor-crosshair">
          {
            data?.map(({ data, id }) => (
              <article key={id} className="overflow-hidden group relative py-2 pl-1 drop-shadow-2xl h-20 sm:h-32 shadow-[5px_5px_10px_2px_rgba(255,255,255,0.02)] hover:shadow-[10px_10px_10px_2px_rgba(255,255,255,0.05)] transition-shadow border border-r-transparent border-b-transparent border-[#f1f1f120] hover:border-[#f1f1f130] rounded-bl-2xl">
                <a href={`/${id}`}>
                  <header className="flex justify-between items-center px-2">
                    <h2 className="text-2xl lg:text-3xl">{data?.title}</h2>
                  </header>
                </a>
              </article>
            ))
          }
        </section>
      </main>
    </div>
  );
}
