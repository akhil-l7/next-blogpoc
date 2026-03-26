import { config } from '@/app.config'
import GithubIcon from '@/components/ui/github-icon'

export const Footer = () => {
    return (
        <footer className="mt-auto py-2 md:py-6 flex flex-wrap justify-center items-center gap-4 px-2 lg:px-0 text-xs md:text-sm text-muted-foreground border-t">
            <span>&copy; 2026 BlogPOC.</span>
            <a
                href={config.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title='GitHub'
            >
                <GithubIcon className='fill-black dark:fill-white' />
            </a>
        </footer>
    )
}
