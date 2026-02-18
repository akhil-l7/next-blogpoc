import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { asDate, DateField, KeyTextField } from "@prismicio/client";
import { ArrowLeft } from "lucide-react";
import LinkWithBenefits from "./linkWithBenefits";
import { Separator } from "./ui/separator";

interface BlogHeaderProps {
    category: string;
    title: KeyTextField;
    dateField: DateField;
}

export const Header = ({ category, title, dateField }: BlogHeaderProps) => {
    const publishedDate = asDate(dateField);
    const dateString = publishedDate?.toLocaleDateString(undefined, { dateStyle: 'full' });
    return (
        <header className="space-y-10">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-4 h-6">
                    <LinkWithBenefits href={`/`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="not-sm:hidden">Home</span>
                        </Button>
                    </LinkWithBenefits>
                    <Separator orientation="vertical" />
                    <Badge variant="outline" className="not-sm:hidden">{category || 'Placeholder'}</Badge>
                    <span className="ml-auto">{dateString}</span>
                </div>
                <Separator decorative />
            </div>

            <div>
                <h1 className="text-foreground text-4xl leading-15 font-bold tracking-tight md:text-4xl lg:text-5xl">
                    {title}
                </h1>

                {/* TODO: author */}
                {/* <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        avatar
                        <div>
                            <p className="font-medium">&nbsp;by Admin</p>
                            <p className="text-muted-foreground text-sm">{dateString}</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </header>
    );
};