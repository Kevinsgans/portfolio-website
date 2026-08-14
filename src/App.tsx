import { useCallback, useEffect, useState } from 'react';
import Portfolio from '@/Portfolio';
import { portfolioContent } from '@/content';
import { PageTransitionOverlay } from '@/components/PageTransitionOverlay';
import { ProjectDestination } from '@/components/ProjectDestination';
import type { ColorMode } from '@/types';

const COLOR_MODE_KEY = 'color-mode';
const PAGE_TRANSITION_COVER_DURATION = 720;
const PAGE_TRANSITION_REVEAL_DURATION = 360;

type PageTransitionPhase = 'idle' | 'covering' | 'revealing';
type PageTransitionTarget = 'project' | 'archive';

function getInitialMode(): ColorMode {
  const storedMode = window.localStorage.getItem(COLOR_MODE_KEY);

  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function updateMeta(name: string, content: string, property = false): void {
  const attribute = property ? 'property' : 'name';
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  );

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.append(meta);
  }

  meta.content = content;
}

function getProjectIdFromHash(): string | null {
  const match = window.location.hash.match(/^#project\/([^/]+)$/);

  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

function App() {
  const [mode, setMode] = useState<ColorMode>(getInitialMode);
  const [destinationProjectId, setDestinationProjectId] = useState<
    string | null
  >(getProjectIdFromHash);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [transitionProjectId, setTransitionProjectId] = useState<string | null>(
    null,
  );
  const [pageTransitionTarget, setPageTransitionTarget] =
    useState<PageTransitionTarget>('project');
  const [pageTransitionPhase, setPageTransitionPhase] =
    useState<PageTransitionPhase>('idle');

  const destinationProject = portfolioContent.projects.find(
    (project) => project.id === destinationProjectId,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.style.colorScheme = mode;
    window.localStorage.setItem(COLOR_MODE_KEY, mode);
    updateMeta('theme-color', mode === 'dark' ? '#0b0e14' : '#f7f8fa');
  }, [mode]);

  useEffect(() => {
    const { metadata } = portfolioContent;
    document.title = metadata.title;
    updateMeta('description', metadata.description);
    updateMeta('og:title', metadata.title, true);
    updateMeta('og:description', metadata.description, true);
    updateMeta('og:type', 'website', true);
    updateMeta('twitter:card', 'summary_large_image');

    if (metadata.canonicalUrl) {
      let canonical = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = metadata.canonicalUrl;
      updateMeta('og:url', metadata.canonicalUrl, true);
    }

    if (metadata.socialPreviewImage) {
      updateMeta('og:image', metadata.socialPreviewImage, true);
    }
  }, []);

  useEffect(() => {
    document.title = destinationProject
      ? `${destinationProject.title} | ${portfolioContent.profile.name}`
      : portfolioContent.metadata.title;
  }, [destinationProject]);

  useEffect(() => {
    const syncDestination = () => {
      setPendingProjectId(null);
      setTransitionProjectId(null);
      setPageTransitionPhase('idle');
      setDestinationProjectId(getProjectIdFromHash());
    };

    window.addEventListener('hashchange', syncDestination);
    window.addEventListener('popstate', syncDestination);

    return () => {
      window.removeEventListener('hashchange', syncDestination);
      window.removeEventListener('popstate', syncDestination);
    };
  }, []);

  const toggleColorMode = useCallback(() => {
    setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
  }, []);

  const handleProjectNavigate = useCallback(
    (projectId: string) => {
      if (pageTransitionPhase !== 'idle') return;

      const project = portfolioContent.projects.find(
        (candidate) => candidate.id === projectId,
      );

      if (!project) return;

      setPendingProjectId(project.id);
      setTransitionProjectId(project.id);
      setPageTransitionTarget('project');
      setPageTransitionPhase('covering');
    },
    [pageTransitionPhase],
  );

  useEffect(() => {
    if (pageTransitionPhase !== 'covering') return;
    if (pageTransitionTarget === 'project' && !pendingProjectId) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const coverTimer = window.setTimeout(
      () => {
        const project = pendingProjectId
          ? portfolioContent.projects.find(
              (candidate) => candidate.id === pendingProjectId,
            )
          : null;

        if (pageTransitionTarget === 'project' && !project) {
          setPendingProjectId(null);
          setTransitionProjectId(null);
          setPageTransitionPhase('idle');
          return;
        }

        if (pageTransitionTarget === 'project' && project) {
          window.history.pushState(
            { projectId: project.id },
            '',
            `${window.location.pathname}${window.location.search}#project/${encodeURIComponent(project.id)}`,
          );
          setDestinationProjectId(project.id);
        } else {
          window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${window.location.search}`,
          );
          setDestinationProjectId(null);
        }

        setPendingProjectId(null);
        setPageTransitionPhase('revealing');
        window.scrollTo(0, 0);
      },
      prefersReducedMotion ? 0 : PAGE_TRANSITION_COVER_DURATION,
    );

    return () => window.clearTimeout(coverTimer);
  }, [pageTransitionPhase, pageTransitionTarget, pendingProjectId]);

  useEffect(() => {
    if (pageTransitionPhase !== 'revealing') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const revealTimer = window.setTimeout(
      () => {
        setPageTransitionPhase('idle');
        setTransitionProjectId(null);
      },
      prefersReducedMotion ? 0 : PAGE_TRANSITION_REVEAL_DURATION,
    );

    return () => window.clearTimeout(revealTimer);
  }, [pageTransitionPhase]);

  const handleBackToArchive = useCallback(() => {
    if (pageTransitionPhase !== 'idle' || !destinationProject) return;

    setTransitionProjectId(destinationProject.id);
    setPageTransitionTarget('archive');
    setPageTransitionPhase('covering');
  }, [destinationProject, pageTransitionPhase]);

  return (
    <>
      {destinationProject ? (
        <ProjectDestination
          onBack={handleBackToArchive}
          project={destinationProject}
        />
      ) : (
        <Portfolio
          content={portfolioContent}
          mode={mode}
          onProjectNavigate={handleProjectNavigate}
          onToggleColorMode={toggleColorMode}
        />
      )}

      {pageTransitionPhase !== 'idle' && (
        <PageTransitionOverlay
          commandOverride={
            pageTransitionTarget === 'archive' ? 'cd -' : undefined
          }
          phase={pageTransitionPhase}
          project={
            portfolioContent.projects.find(
              (project) => project.id === transitionProjectId,
            ) ?? null
          }
        />
      )}
    </>
  );
}

export default App;
