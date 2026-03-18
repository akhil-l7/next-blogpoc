'use client'
import { useEffect, useState } from 'react';
import { Button } from './button';
import { ArrowUpIcon } from 'lucide-react';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof document === 'undefined') return;

        const domElement = document.documentElement;

        if (domElement.scrollHeight < domElement.clientHeight) return;

        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY || window.pageYOffset;
                const scrollHeight = domElement.scrollHeight - domElement.clientHeight;
                setIsVisible(scrollTop / scrollHeight > 0.5);
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Button
            size="icon"
            className="fixed bottom-4 right-0 translate-x-full data-[isVisible=true]:translate-x-0 bg-foreground rounded-l-full"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            data-isvisible={isVisible}
        >
            <ArrowUpIcon className='stroke-accent' />
        </Button>
    );
};
