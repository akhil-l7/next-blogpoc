'use client'
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface TagsProps {
    tags: string[]
}

export default function Tags({ tags }: TagsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('tag') ?? 'All';

    const setTag = useCallback((tag: string | null) => {
        if (tag === currentTag || tag === null) return;
        const params = new URLSearchParams(searchParams.toString());
        if (tag === 'All') {
            params.delete('tag');
        } else {
            params.set('tag', tag);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, [router, pathname, searchParams, currentTag])

    return (
        <>
            <div className="flex justify-end md:justify-center items-center gap-2 py-4 overflow-x-auto scrollbar-custom capitalize select-none">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        onClick={() => setTag(tag)}
                        className={`cursor-pointer transition-colors ${currentTag === tag ? "bg-green-500 hover:bg-green-600" : ""}`}
                        title={`show ${tag} posts`}
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
            <Separator />
        </>
    )
}