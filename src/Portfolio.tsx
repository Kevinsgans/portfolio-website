import { ArrowUpRight } from '@phosphor-icons/react';
import { ContactForm } from '@/components/ContactForm';
import { PortfolioLink } from '@/components/PortfolioLink';
import { ProjectFiles } from '@/components/ProjectFiles';
import { SiteHeader } from '@/components/SiteHeader';
import type { ColorMode, PortfolioContent } from '@/types';

interface PortfolioProps {
  content: PortfolioContent;
  mode: ColorMode;
  onToggleColorMode: () => void;
  onProjectNavigate: (projectId: string) => void;
}

function Portfolio({
  content,
  mode,
  onToggleColorMode,
  onProjectNavigate,
}: PortfolioProps) {
  const { profile, projectFolders, projects } = content;

  return (
    <div className="min-h-[100dvh] bg-[var(--page)] text-[var(--text)]">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader
        mode={mode}
        onToggleColorMode={onToggleColorMode}
        profile={profile}
      />

      <main id="main-content">
        <section className="hero-section" id="top">
          <div className="site-container hero-layout">
            {profile.photo && (
              <div className="hero-photo-wrap">
                <img
                  alt={profile.photo.alt}
                  className="hero-photo"
                  fetchPriority="high"
                  src={profile.photo.src}
                />
              </div>
            )}

            <div className="hero-copy">
              <h1 className="hero-name">Hi, I’m {profile.name}.</h1>
              <p className="mt-5 text-lg font-medium text-[var(--accent)]">
                {profile.role}
              </p>
              <p className="mt-4 text-pretty text-lg leading-8 text-[var(--text)] sm:text-xl">
                {profile.introduction}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a className="button button-primary" href="#work">
                  View work
                  <ArrowUpRight aria-hidden="true" size={17} weight="bold" />
                </a>
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
              </div>

              {profile.socialLinks.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                  {profile.socialLinks.map((link) => (
                    <PortfolioLink
                      className="quiet-link focus-ring"
                      key={link.label}
                      link={link}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section-block scroll-mt-24" id="work">
          <div className="site-container">
            <div className="section-heading">
              <h2>Project files</h2>
              <p>
                Four selected projects, filed separately. Open a folder to
                browse the work inside.
              </p>
            </div>

            <ProjectFiles
              folders={projectFolders}
              onProjectNavigate={onProjectNavigate}
              projects={projects}
            />
          </div>
        </section>

        <section className="section-block scroll-mt-24" id="contact">
          <div className="site-container">
            <ContactForm email={profile.email} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-muted)]">
            {profile.name}. Engineering portfolio.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {profile.socialLinks.map((link) => (
              <PortfolioLink
                className="quiet-link focus-ring"
                key={`footer-${link.label}`}
                link={link}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
