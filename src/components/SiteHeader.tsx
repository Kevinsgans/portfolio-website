import { useEffect, useMemo, useState } from 'react';
import { List, Moon, Sun, X } from '@phosphor-icons/react';
import type { ColorMode, Profile } from '@/types';

interface SiteHeaderProps {
  profile: Profile;
  mode: ColorMode;
  onToggleColorMode: () => void;
}

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader({
  profile,
  mode,
  onToggleColorMode,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = useMemo(
    () =>
      profile.name
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2),
    [profile.name],
  );

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-container flex h-[4.5rem] items-center justify-between gap-4">
        <a
          className="focus-ring flex shrink-0 items-center gap-3 rounded-[10px]"
          href="#top"
          onClick={closeMenu}
        >
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-[var(--accent-fill)] font-mono text-sm font-semibold text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-semibold text-[var(--text-strong)] sm:inline">
            {profile.name}
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigation.map((item) => (
            <a className="nav-link focus-ring" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          {profile.resumeUrl && (
            <a
              className="button button-secondary"
              href={profile.resumeUrl}
              rel="noreferrer"
              target="_blank"
            >
              Resume
            </a>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label={`Use ${mode === 'dark' ? 'light' : 'dark'} theme`}
            className="icon-button focus-ring"
            onClick={onToggleColorMode}
            type="button"
          >
            {mode === 'dark' ? (
              <Sun aria-hidden="true" size={19} weight="regular" />
            ) : (
              <Moon aria-hidden="true" size={19} weight="regular" />
            )}
          </button>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="icon-button mobile-menu-button focus-ring"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden="true" size={20} weight="bold" />
            ) : (
              <List aria-hidden="true" size={20} weight="bold" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mobile-navigation md:hidden"
          id="mobile-navigation"
        >
          <div className="site-container flex flex-col py-3">
            {navigation.map((item) => (
              <a
                className="focus-ring rounded-[10px] px-3 py-3 text-base font-medium text-[var(--text)]"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            {profile.resumeUrl && (
              <a
                className="focus-ring rounded-[10px] px-3 py-3 text-base font-medium text-[var(--accent)]"
                href={profile.resumeUrl}
                onClick={closeMenu}
                rel="noreferrer"
                target="_blank"
              >
                Resume
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
