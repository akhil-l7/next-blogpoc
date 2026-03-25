'use client'
import { Button } from "@/components/ui/button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    console.error(error);
    return (
        <div className='flex justify-center items-center text-center h-[80vh]'>
            <div className='text-muted-foreground text-xl space-y-4'>
                <h1 className='text-8xl'>oops...</h1>
                <p className='text-lg'>An unexpected error occurred while loading this page.</p>
                <Button variant={'outline'} onClick={() => reset()} className='rounded-full cursor-pointer'>
                    Reload
                </Button>
            </div>
        </div>

    )
}

