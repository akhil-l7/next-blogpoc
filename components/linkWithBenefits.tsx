'use client'
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { sleep } from "./util";


interface LinkWithBenefitsProps extends LinkProps {
    children: React.ReactNode;
    href: string;
}

export default function LinkWithBenefits({ children, href, ...props }: LinkWithBenefitsProps) {
    const router = useRouter();

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        const mainTag = document.querySelector('.content_container');
        if (!mainTag) return null;
        mainTag.classList.add('transition-main');
        await sleep(1000);
        router.push(href);
        await sleep(1000);
        mainTag.classList.remove('transition-main');
    }

    return (
        <Link
            onClick={handleClick}
            href={href}
            {...props}
        >
            {children}
        </Link>
    )
}

