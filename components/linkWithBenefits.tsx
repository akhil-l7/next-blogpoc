'use client'
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";


interface LinkWithBenefitsProps extends LinkProps {
    children: React.ReactNode;
    href: string;
}

export default function LinkWithBenefits({ children, href, ...props }: LinkWithBenefitsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const CONTAINER_CLASS = '.content_container';
    const TRANSITION_CLASS = 'transition-main';

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        const mainTag = document.querySelector(CONTAINER_CLASS);
        if (!mainTag) return null;
        mainTag.classList.add(TRANSITION_CLASS);
        router.push(href);
    }

    useLayoutEffect(() => {
        const mainTag = document.querySelector(CONTAINER_CLASS);
        const hasTransition = mainTag?.classList.contains(TRANSITION_CLASS)
        if (mainTag && hasTransition) {
            mainTag.classList.remove(TRANSITION_CLASS);
        }
    }, [pathname]);

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

