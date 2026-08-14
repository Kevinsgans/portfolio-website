import { useCallback, useEffect, useState } from 'react';
import Portfolio from '@/Portfolio';
import { portfolioContent } from '@/content';
import type { ColorMode } from '@/types';

const COLOR_MODE_KEY = 'color-mode';

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

function App() {
  const [mode, setMode] = useState<ColorMode>(getInitialMode);

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

  const toggleColorMode = useCallback(() => {
    setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <Portfolio
      content={portfolioContent}
      mode={mode}
      onToggleColorMode={toggleColorMode}
    />
  );
}

export default App;
