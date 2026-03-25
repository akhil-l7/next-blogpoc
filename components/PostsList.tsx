'use client'
import PostCard from '@/components/ui/PostCard';
import { BLOG } from '@/lib/constants';
import { AllDocumentTypes } from '@/prismicio-types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface PostsListProps {
  data: AllDocumentTypes[];
}

export default function PostsList({ data }: PostsListProps) {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const filteredData = useMemo(() => {
    if (!tag || tag === 'All') return data;
    return data.filter(post => {
      if (tag === BLOG.PLACEHOLDER_BADGE) return post.tags.length === 0; // Show posts without tags when placeholder badge is selected
      return post.tags?.includes(tag);
    });
  }, [data, tag]);

  if (filteredData.length === 0) {
    return (
      <div className="container flex items-center justify-center p-8">
        <p>No posts match with selected tag.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 my-4 lg:my-8">
      {filteredData.map(({ data: postData, id, tags }) => <PostCard key={id} post={{ data: postData, id, tags }} />)}
    </div>
  );
}