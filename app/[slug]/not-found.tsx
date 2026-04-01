import { Button } from '@/components/ui/button';
import Link from 'next/link';

type NotFound = {
    errorMessage?: string;
}

export default function NotFound({ errorMessage = "We couldn't find what you're looking for." }: NotFound) {
    return (
        <div className='flex justify-center items-center text-center h-[80vh]'>
            <div className='text-muted-foreground text-xl space-y-4'>
                <h1 className='text-8xl'>oops...</h1>
                <p className='text-lg'>{errorMessage}</p>
                <Link href="/" className='-ml-4'>
                    <Button variant={'outline'} className='rounded-full cursor-pointer'>
                        return home
                    </Button>
                </Link>
            </div>
        </div>
    )
}