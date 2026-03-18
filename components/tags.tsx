'use client'
import { STORAGE_KEYS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { getSelectedTagFromLocalStorage, setSelectedTagToLocalStorage } from "./util";

export function Tags({ tags }: { tags: string[] }) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    function handleClick(tag: string) {
        if (selectedTag === tag) return;
        setSelectedTag(tag);
        hideAllButPostsWith(tag);
    }

    function hideAllButPostsWith(tag: string, reset = false) {
        setSelectedTagToLocalStorage(tag);
        setSelectedTag(tag);

        if (typeof document === 'undefined') return;

        const postsContainer = document.querySelector('#__posts');
        if (!postsContainer) return

        const posts = postsContainer.querySelectorAll('div[data-tag]');
        if (!posts) return

        posts.forEach(element => {
            const post_tag = element.getAttribute('data-tag');
            if (reset) {
                element.classList.remove("hidden");
                localStorage.removeItem(STORAGE_KEYS.TAG_KEY);
                return;
            }
            element.classList.toggle("hidden", post_tag !== tag);
        });
    }

    useEffect(() => {
        const tagFromLocalStorage = getSelectedTagFromLocalStorage();
        if (tagFromLocalStorage === null) return;
        hideAllButPostsWith(tagFromLocalStorage);
    }, []);

    function handleClear(): void {
        localStorage.removeItem(STORAGE_KEYS.TAG_KEY);
        setSelectedTag(null);
        hideAllButPostsWith('', true);
    }

    return (
        <>
            <div className={`flex justify-end md:justify-center items-center gap-2 py-4 overflow-x-auto scrollbar-custom capitalize select-none`}>
                {tags.map((tag, index) => {

                    return <Badge onClick={__ => handleClick(tag)} key={`tag__${index}`} title={`apply ${tag} tag filter`} className={`cursor-pointer ${selectedTag === tag ? "bg-green-500" : ""}`}>{tag}</Badge>
                })}
                {selectedTag && <Badge className="bg-red-600 text-white cursor-pointer" onClick={handleClear} title={`clear tag filter`}>Clear</Badge>}
            </div>
            <Separator />
        </>
    )
}