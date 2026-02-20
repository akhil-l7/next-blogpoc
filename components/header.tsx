import { KeyTextField } from "@prismicio/client";
import ColorSchemaToggle from "./ui/colorSchemaToggle";

interface HeaderProps {
    title?: KeyTextField;
}

export const Header = ({ title = 'blog' }: HeaderProps) => {

    return (
        <header className="my-2 md:my-8 flex justify-between px-2 lg:px-0 lg:justify-center lg:flex-col lg:gap-2 lg:mb-4">
            <h1 className="scroll-m-20 text-center text-4xl tracking-tight text-balance">{title}</h1>
            <span className="flex justify-center"><ColorSchemaToggle /></span>
        </header>
    );
};