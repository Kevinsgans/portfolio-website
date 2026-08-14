import { useRef } from 'react';
import {
  ArrowUpRight,
  FileText,
  GithubLogo,
  Play,
} from '@phosphor-icons/react';
import type { ExternalLink } from '@/types';

interface PortfolioLinkProps {
  link: ExternalLink;
  className?: string;
  showIcon?: boolean;
  pageTransitionId?: string;
  onPageTransitionStart?: (projectId: string) => void;
}

function LinkIcon({ kind }: Pick<ExternalLink, 'kind'>) {
  switch (kind) {
    case 'github':
      return <GithubLogo aria-hidden="true" size={17} weight="regular" />;
    case 'video':
      return <Play aria-hidden="true" size={17} weight="fill" />;
    case 'document':
      return <FileText aria-hidden="true" size={17} weight="regular" />;
    default:
      return <ArrowUpRight aria-hidden="true" size={17} weight="bold" />;
  }
}

export function PortfolioLink({
  link,
  className = '',
  showIcon = true,
  pageTransitionId,
  onPageTransitionStart,
}: PortfolioLinkProps) {
  const isEmail = link.href.startsWith('mailto:');
  const opensInNewTab = !isEmail && link.openInNewTab !== false;
  const shouldTransition = !isEmail && link.transition === true;
  const transitionStarted = useRef(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      !shouldTransition ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (transitionStarted.current) return;
    transitionStarted.current = true;

    if (onPageTransitionStart && pageTransitionId) {
      onPageTransitionStart(pageTransitionId);
    } else {
      window.location.assign(link.href);
    }
  };

  return (
    <a
      className={className}
      href={link.href}
      onClick={handleClick}
      rel={opensInNewTab ? 'noreferrer' : undefined}
      target={opensInNewTab ? '_blank' : undefined}
    >
      <span>{link.label}</span>
      {showIcon && <LinkIcon kind={link.kind} />}
    </a>
  );
}
