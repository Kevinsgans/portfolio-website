import { ArrowLeft } from '@phosphor-icons/react';
import type { Project } from '@/types';

interface ProjectDestinationProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDestination({
  project,
  onBack,
}: ProjectDestinationProps) {
  return (
    <main className="project-destination" data-project-tone={project.tone}>
      <div className="project-destination-content">
        <p className="project-destination-kicker">Project details</p>
        <h1 className="project-destination-title">{project.title}</h1>
        <p className="project-destination-copy">{project.summary}</p>

        <dl className="project-destination-notes">
          <div>
            <dt>Contribution</dt>
            <dd>{project.contribution}</dd>
          </div>
          {project.challenge && (
            <div>
              <dt>Challenge</dt>
              <dd>{project.challenge}</dd>
            </div>
          )}
          {project.outcome && (
            <div>
              <dt>Outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          )}
        </dl>

        <ul
          aria-label={`${project.title} technologies`}
          className="project-destination-tags"
        >
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="project-destination-actions">
          <button
            className="project-destination-back"
            onClick={onBack}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} weight="bold" />
            Back to project files
          </button>
          {project.links
            ?.filter((link) => !link.href.startsWith('#project/'))
            .map((link) => (
              <a
                className="project-destination-link"
                href={link.href}
                key={`${project.id}-${link.label}`}
                rel={link.openInNewTab === false ? undefined : 'noreferrer'}
                target={link.openInNewTab === false ? undefined : '_blank'}
              >
                {link.label}
              </a>
            ))}
        </div>
      </div>
    </main>
  );
}
