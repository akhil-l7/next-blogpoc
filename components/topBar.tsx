import client from "@/lib/prismic";
import { Tags } from "./tags";

export async function TopBar() {
    const tags = await client.getTags();
    const noTags = tags.length === 0;
    return (
        <div>
            {!noTags && <Tags tags={tags} />}
        </div>
    )
}