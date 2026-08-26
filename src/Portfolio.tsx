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
  const { profile, projectFolders, projects, education } = content;

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

        <section className="section-block scroll-mt-24" id="about">
          <div className="site-container">
            <div className="about-stage">
              <div className="about-grid">
                <div className="about-intro">
                  <p className="about-file-label">
                    <span>04</span>
                    about.txt
                  </p>
                  <h2>From noisy inputs to useful software.</h2>
                  <p className="about-description">{profile.about}</p>
                </div>

                <div className="about-route">
                  <p className="about-route-label">
                    How the work tends to move
                  </p>
                  <ol>
                    <li data-tone="cobalt">
                      <span>01</span>
                      <div>
                        <strong>Observe</strong>
                        <small>
                          Start with real data and real constraints.
                        </small>
                      </div>
                    </li>
                    <li data-tone="green">
                      <span>02</span>
                      <div>
                        <strong>Structure</strong>
                        <small>
                          Make a complex system legible and testable.
                        </small>
                      </div>
                    </li>
                    <li data-tone="red">
                      <span>03</span>
                      <div>
                        <strong>Ship</strong>
                        <small>
                          Turn the model into something people can use.
                        </small>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              <article className="about-education">
                <div className="about-education-mark" aria-hidden="true">
                  <span>CS</span>
                  <span>+</span>
                  <span>MATH</span>
                </div>

                <div className="about-education-copy">
                  <p>Education</p>
                  <h3>{education.program}</h3>
                  <p>{education.institution}</p>
                  {education.dates && <small>{education.dates}</small>}
                </div>

                {education.details && education.details.length > 0 && (
                  <ul className="about-course-list">
                    {education.details.map((detail, index) => (
                      <li key={detail}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </div>
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
