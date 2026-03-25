import { TopBar } from "@/components/topBar";
import client from "@/lib/prismic";
import dynamic from 'next/dynamic';

const PostsList = dynamic(() => import('../components/PostsList').then(mod => mod.default), { loading: () => <p>Loading posts...</p> })

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
      <PostsList data={data} />
    </>
  );
}

