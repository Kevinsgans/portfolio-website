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
}: PortfolioLinkProps) {
  const isEmail = link.href.startsWith('mailto:');

  return (
    <a
      className={className}
      href={link.href}
      rel={isEmail ? undefined : 'noreferrer'}
      target={isEmail ? undefined : '_blank'}
    >
      <span>{link.label}</span>
      {showIcon && <LinkIcon kind={link.kind} />}
    </a>
  );
}
