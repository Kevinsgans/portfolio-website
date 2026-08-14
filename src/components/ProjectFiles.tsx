import { useEffect, useMemo, useRef, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { PortfolioLink } from '@/components/PortfolioLink';
import type { Project, ProjectFolder } from '@/types';

interface ProjectFilesProps {
  folders: ProjectFolder[];
  projects: Project[];
}

const VISIBLE_PROJECT_COUNT = 5;

function getProjectFileName(project: Project): string {
  return `${project.id}.project`;
}

export function ProjectFiles({ folders, projects }: ProjectFilesProps) {
  const visibleProjects = useMemo(
    () => projects.slice(0, VISIBLE_PROJECT_COUNT),
    [projects],
  );
  const folderNames = useMemo(
    () => new Map(folders.map((folder) => [folder.id, folder.title])),
    [folders],
  );
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [closingProjectId, setClosingProjectId] = useState<string | null>(null);
  const [failedMedia, setFailedMedia] = useState<Set<string>>(() => new Set());
  const pageTurnTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (pageTurnTimer.current !== null) {
        window.clearTimeout(pageTurnTimer.current);
      }
    },
    [],
  );

  const openProject = (projectId: string) => {
    if (projectId === pendingProjectId || closingProjectId !== null) return;

    if (pageTurnTimer.current !== null) {
      window.clearTimeout(pageTurnTimer.current);
    }

    if (projectId === activeProjectId) {
      setClosingProjectId(projectId);
      pageTurnTimer.current = window.setTimeout(() => {
        setActiveProjectId(null);
        setClosingProjectId(null);
        pageTurnTimer.current = null;
      }, 360);
      return;
    }

    if (activeProjectId === null) {
      setActiveProjectId(projectId);
      return;
    }

    setClosingProjectId(activeProjectId);
    setPendingProjectId(projectId);
    pageTurnTimer.current = window.setTimeout(() => {
      setActiveProjectId(projectId);
      setPendingProjectId(null);
      setClosingProjectId(null);
      pageTurnTimer.current = null;
    }, 360);
  };

  if (visibleProjects.length === 0) {
    return (
      <div className="empty-state mt-12">
        <h3>No project files yet</h3>
        <p>Add a project to populate this section.</p>
      </div>
    );
  }

  return (
    <div className="project-files-stage mt-14">
      <div className="archive-toolbar" aria-hidden="true">
        <span>PROJECT ARCHIVE</span>
        <span>SELECTED WORK</span>
      </div>

      <div className="project-files">
        {visibleProjects.map((project, projectIndex) => {
          const isOpen = project.id === activeProjectId;
          const isTurningOut = project.id === closingProjectId;
          const media = failedMedia.has(project.id) ? undefined : project.media;
          const panelId = `project-folder-panel-${project.id}`;
          const headingId = `project-folder-heading-${project.id}`;
          const folderName = folderNames.get(project.folderId) ?? 'Project';

          return (
            <section
              className={`project-folder${isOpen ? ' is-open' : ''}${isTurningOut ? ' is-turning-out' : ''}`}
              data-folder-position={projectIndex + 1}
              key={project.id}
            >
              <div className="project-folder-cover">
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen && !isTurningOut}
                  aria-label={`${isOpen ? 'Close' : 'Open'} ${project.title} folder`}
                  className="project-folder-tab"
                  onClick={() => openProject(project.id)}
                  type="button"
                >
                  <span>{project.title}</span>
                </button>

                <h3 className="project-folder-heading" id={headingId}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen && !isTurningOut}
                    aria-label={`${isOpen ? 'Close' : 'Open'} ${project.title} folder`}
                    className="project-folder-toggle"
                    onClick={() => openProject(project.id)}
                    type="button"
                  >
                    <span className="project-folder-meta">
                      {folderName}
                      <CaretDown aria-hidden="true" size={16} weight="bold" />
                    </span>
                  </button>
                </h3>

                <div
                  aria-hidden={!isOpen || isTurningOut}
                  aria-labelledby={headingId}
                  className="project-folder-collapse"
                  id={panelId}
                  inert={!isOpen || isTurningOut}
                  role="region"
                >
                  <div className="project-folder-collapse-inner">
                    <article
                      className="project-file-panel"
                      key={`${project.id}-${isOpen ? 'open' : 'closed'}`}
                    >
                      <div className="project-file-copy">
                        <p className="project-file-path">
                          ~/work/{project.folderId}/
                          {getProjectFileName(project)}
                        </p>
                        <h4>{project.title}</h4>
                        <p className="project-file-summary">
                          {project.summary}
                        </p>

                        <dl className="project-file-notes">
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
                          className="tag-list mt-7"
                        >
                          {project.technologies.map((technology) => (
                            <li className="tag" key={technology}>
                              {technology}
                            </li>
                          ))}
                        </ul>

                        {project.links && project.links.length > 0 && (
                          <div className="project-file-links">
                            {project.links.map((link) => (
                              <PortfolioLink
                                className="archive-link focus-ring"
                                key={`${project.id}-${link.label}`}
                                link={link}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="project-file-visual" aria-hidden="true">
                        {media ? (
                          <img
                            alt=""
                            loading="lazy"
                            onError={() =>
                              setFailedMedia((current) => {
                                const next = new Set(current);
                                next.add(project.id);
                                return next;
                              })
                            }
                            src={media.src}
                          />
                        ) : (
                          <div className="project-file-placeholder">
                            <span>
                              {project.folderId.slice(0, 3).toUpperCase()}
                            </span>
                            <strong>{project.title}</strong>
                            <small>{getProjectFileName(project)}</small>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <p className="archive-hint">Hover to lift. Click to open.</p>
    </div>
  );
}
