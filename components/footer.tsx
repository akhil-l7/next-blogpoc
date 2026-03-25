import GithubIcon from './ui/github-icon'
import { config } from '@/app.config'

export const Footer = () => {
    return (
        <footer className="py-2 md:py-6 flex flex-wrap justify-center items-center gap-4 px-2 lg:px-0 text-xs md:text-sm text-muted-foreground border-t">
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
