import { ArrowUpRight, EnvelopeSimple } from '@phosphor-icons/react';
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
  const { profile, projectFolders, projects, skillGroups, education } = content;

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
          <div className="site-container grid items-center gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.65fr)] md:gap-16 lg:gap-24">
            <div className="hero-copy">
              <p className="text-sm font-medium text-[var(--accent)]">
                {profile.role}
              </p>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-[var(--text-strong)] sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-6 max-w-[38rem] text-pretty text-lg leading-8 text-[var(--text)] sm:text-xl">
                {profile.introduction}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
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
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                  {profile.socialLinks.map((link) => (
                    <PortfolioLink
                      className="quiet-link focus-ring"
                      key={link.label}
                      link={link}
                      showIcon={false}
                    />
                  ))}
                </div>
              )}
            </div>

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
          </div>
        </section>

        <section className="section-block scroll-mt-24" id="work">
          <div className="site-container">
            <div className="section-heading">
              <h2>Project files</h2>
              <p>
                Five selected projects, filed separately. Open a folder to
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

        <section className="section-block scroll-mt-24" id="capabilities">
          <div className="site-container">
            <div className="section-heading">
              <h2>Capabilities</h2>
              <p>
                A practical toolkit organized by the kind of engineering work it
                supports.
              </p>
            </div>

            <div className="capabilities-panel mt-12">
              {skillGroups.map((group) => (
                <article className="capability-group" key={group.title}>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--text-strong)]">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {group.description}
                  </p>
                  <ul className="mt-6 space-y-2 font-mono text-sm text-[var(--text)]">
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block scroll-mt-24" id="about">
          <div className="site-container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <div>
              <h2 className="section-title">About</h2>
              <p className="mt-7 max-w-[62ch] text-pretty text-lg leading-8 text-[var(--text)]">
                {profile.about}
              </p>
            </div>

            <article className="education-panel">
              <p className="font-mono text-xs font-medium text-[var(--accent)]">
                Education
              </p>
              <h3 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.035em] text-[var(--text-strong)]">
                {education.program}
              </h3>
              <p className="mt-2 text-[var(--text)]">{education.institution}</p>
              {education.dates && (
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {education.dates}
                </p>
              )}
              {education.details && education.details.length > 0 && (
                <ul className="mt-7 grid gap-2 text-sm text-[var(--text-muted)] sm:grid-cols-2 lg:grid-cols-1">
                  {education.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </article>
          </div>
        </section>

        <section className="section-block scroll-mt-24" id="contact">
          <div className="site-container">
            <div className="contact-panel">
              <div>
                <h2 className="text-balance text-3xl font-semibold tracking-[-0.045em] text-[var(--text-strong)] sm:text-4xl">
                  Build something useful.
                </h2>
                <p className="mt-4 max-w-[40rem] text-pretty leading-7 text-[var(--text)]">
                  Reach out to discuss engineering roles, technical projects, or
                  opportunities to collaborate.
                </p>
              </div>

              {profile.email && (
                <a
                  className="button button-primary shrink-0"
                  href={`mailto:${profile.email}`}
                >
                  <EnvelopeSimple aria-hidden="true" size={18} weight="bold" />
                  Email me
                </a>
              )}
            </div>
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
                showIcon={false}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
