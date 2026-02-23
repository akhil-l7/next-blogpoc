'use client'
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { sleep } from "./util";


interface LinkWithBenefitsProps extends LinkProps {
    children: React.ReactNode;
    href: string;
}

export default function LinkWithBenefits({ children, href, ...props }: LinkWithBenefitsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const CONTAINER_CLASS = '.content_container';
    const TRANSITION_CLASS = 'transition-main';
    const HEADER_CLASS = '.main_header';

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        const mainTag = document.querySelector(CONTAINER_CLASS);
        const headerTag = document.querySelector(HEADER_CLASS);
        const toHome = href === '/';

        if (mainTag) mainTag.classList.add(TRANSITION_CLASS);

        if (headerTag) {
            toHome
                ? headerTag.classList.remove(TRANSITION_CLASS)
                : headerTag.classList.add(TRANSITION_CLASS)
        }

        await sleep(500);
        router.push(href);
    }

    useEffect(() => {
        const mainTag = document.querySelector(CONTAINER_CLASS);
        const headTag = document.querySelector(HEADER_CLASS);
        const hasTransition = mainTag?.classList.contains(TRANSITION_CLASS);
        const headerHasTransition = headTag?.classList.contains(TRANSITION_CLASS);

        if (hasTransition) {
            mainTag?.classList.remove(TRANSITION_CLASS);
        }
        if (pathname !== '/') {
            if (headerHasTransition) {
                headTag?.classList.remove(TRANSITION_CLASS);
            } else {
                headTag?.classList.add(TRANSITION_CLASS);
            }
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

