import { asText, isFilled, RichTextField } from "@prismicio/client";
import { getReadTime } from "../util";
import { Clock } from "lucide-react";

export default function ReadTime({ content }: { content: RichTextField }) {
    const hasValue = isFilled.richText(content);
    if (!hasValue) {
        return null;
    }
    const contentAsText = asText(content);
    const readTime = getReadTime(contentAsText);

    return (
        <div className="flex text-muted-foreground">
            <Clock size={16} className="mt-0.5 mr-0.5" />
            <p className="text-muted-foreground text-sm">&lt;{readTime} Min Read</p>
        </div>
    )
}