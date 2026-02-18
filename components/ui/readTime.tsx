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
        <div className="flex text-muted-foreground gap-1 whitespace-nowrap items-center">
            <Clock className="w-3 h-3 md:w-5 md:h-5" />
            <p className="text-muted-foreground text-xxs sm:text-xs md:text-sm">
                &lt;{readTime} Min Read</p>
        </div>
    )
}