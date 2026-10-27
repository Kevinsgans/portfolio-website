import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react';
import type { Project } from '@/types';

interface ProjectDestinationProps {
  project: Project;
  onBack: () => void;
  isNavigating: boolean;
}

const categories: Record<Project['folderId'], string> = {
  software: 'Software & data',
  embedded: 'Embedded systems',
  infrastructure: 'Infrastructure',
};

export function ProjectDestination({
  project,
  onBack,
  isNavigating,
}: ProjectDestinationProps) {
  const externalLinks = project.links?.filter(
    (link) => !link.href.startsWith('#project/'),
  );

  return (
    <main className="project-destination" data-project-tone={project.tone}>
      <div className="project-destination-content">
        <nav
          className="project-destination-nav"
          aria-label="Project navigation"
        >
          <button
            className="project-destination-back"
            onClick={onBack}
            disabled={isNavigating}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            Back to project files
          </button>
          <span className="project-destination-owner">
            Kevin Gan / Selected work
          </span>
        </nav>

        <header className="project-destination-header">
          <p className="project-destination-kicker">
            {categories[project.folderId]}
          </p>
          <h1 className="project-destination-title">{project.title}</h1>
          <p className="project-destination-copy">{project.summary}</p>
          {!!externalLinks?.length && (
            <div className="project-destination-actions">
              {externalLinks.map((link) => (
                <a
                  className="project-destination-link"
                  href={link.href}
                  key={link.href}
                  rel={link.openInNewTab === false ? undefined : 'noreferrer'}
                  target={link.openInNewTab === false ? undefined : '_blank'}
                >
                  {link.label === 'GitHub' ? 'View source' : link.label}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              ))}
            </div>
          )}
        </header>

        {project.media && (
          <figure className="project-destination-media">
            <div className="project-destination-media-frame">
              {project.media.kind === 'video' ? (
                <video
                  aria-label={project.media.alt}
                  controls
                  playsInline
                  preload="metadata"
                  src={project.media.src}
                />
              ) : (
                <a
                  href={project.media.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View full-size image: ${project.media.alt}`}
                >
                  <img
                    alt={project.media.alt}
                    decoding="async"
                    src={project.media.src}
                  />
                </a>
              )}
            </div>
            <figcaption>
              <span>{project.media.alt}</span>
              {project.media.kind !== 'video' && (
                <span>Click image to enlarge ↗</span>
              )}
            </figcaption>
          </figure>
        )}

        <div className="project-destination-body">
          <div className="project-destination-notes">
            <section>
              <h2>My contribution</h2>
              <p>{project.contribution}</p>
            </section>
            {project.challenge && (
              <section>
                <h2>The problem</h2>
                <p>{project.challenge}</p>
              </section>
            )}
            {project.outcome && (
              <section>
                <h2>Results</h2>
                <p>{project.outcome}</p>
              </section>
            )}
          </div>
          {project.technologies.length > 0 && (
            <aside
              className="project-destination-stack"
              aria-label="Tools and technologies"
            >
              <h2>Built with</h2>
              <ul className="project-destination-tags">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <footer className="project-destination-footer">
          <button
            className="project-destination-back"
            onClick={onBack}
            disabled={isNavigating}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            Back to project files
          </button>
          <span>Kevin Gan</span>
        </footer>
      </div>
    </main>
  );
}
