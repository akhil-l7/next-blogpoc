import client from "@/lib/prismic";
import Tags from "./tags";
import { BLOG } from "@/lib/constants";


export async function TopBar() {
    const tags = await client.getTags();
    const noTags = tags.length === 0;
    if (noTags) return null;

    //add "All" & "PLACEHOLDER_BADGE" to tags 
    const allTags = ["All", BLOG.PLACEHOLDER_BADGE, ...tags];

    return <Tags tags={allTags} />

}