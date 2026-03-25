import { ColorSchemaToggle } from "@/components/ui/colorSchemaToggle";
import { KeyTextField } from "@prismicio/client";
import { LinkWithBenefits } from "./linkWithBenefits";

interface HeaderProps {
    title?: KeyTextField;
}

export const Header = ({ title = 'blog' }: HeaderProps) => {

    return (
        <header className="main_header py-2 md:py-8 flex justify-between items-center px-2 lg:px-0 lg:justify-center lg:flex-col lg:gap-2 lg:pb-4 border-b">
            <h1 className="text-center text-4xl tracking-tight text-balance"><LinkWithBenefits href="/">{title}</LinkWithBenefits></h1>
            <span className="flex justify-center"><ColorSchemaToggle /></span>
        </header>
    );
};