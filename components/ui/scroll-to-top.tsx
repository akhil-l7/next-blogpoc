'use client'
import { useEffect, useState } from 'react';
import { Button } from './button';
import { ArrowUpIcon } from 'lucide-react';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const middleElement = document.querySelector('#middle_of_the_doc');
        if (!middleElement) return;

        const observer = new IntersectionObserver((([entry]) => {
            setIsVisible(entry.isIntersecting)
        }), {});

        observer.observe(middleElement);
        return () => observer.disconnect();
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

export const ScrollToTopMarker = () => (
    <span className="invisible absolute top-[50%] h-[50%] right-0" id="middle_of_the_doc"></span>
)
