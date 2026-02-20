import { KeyTextField } from "@prismicio/client";

interface HeaderProps {
    title?: KeyTextField;
}

export const Header = ({ title = 'blog' }: HeaderProps) => {

    return (
        <header className="my-2 md:my-8">
            <h1 className="scroll-m-20 text-center text-4xl tracking-tight text-balance">{title}</h1>
        </header>
    );
};