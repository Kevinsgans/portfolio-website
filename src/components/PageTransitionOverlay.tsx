import { useEffect, useState } from 'react';
import type { Project } from '@/types';

interface PageTransitionOverlayProps {
  phase: 'covering' | 'revealing';
  project: Project | null;
  commandOverride?: string;
}

export function PageTransitionOverlay({
  phase,
  project,
  commandOverride,
}: PageTransitionOverlayProps) {
  const command = commandOverride ?? (project ? `cd ${project.id}` : '');
  const [typedCommand, setTypedCommand] = useState('');

  useEffect(() => {
    if (!command) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedCommand(command);
      return;
    }

    setTypedCommand('');
    let characterIndex = 0;
    let typingTimer: number | null = null;

    const typeNextCharacter = () => {
      characterIndex += 1;
      setTypedCommand(command.slice(0, characterIndex));

      if (characterIndex < command.length) {
        typingTimer = window.setTimeout(typeNextCharacter, 20);
      }
    };

    typingTimer = window.setTimeout(typeNextCharacter, 120);

    return () => {
      if (typingTimer !== null) {
        window.clearTimeout(typingTimer);
      }
    };
  }, [command]);

  if (!project) return null;

  const isCommandComplete = typedCommand === command;
  const isReturning = command === 'cd -';

  return (
    <div
      aria-label={
        isReturning ? 'Returning to project files' : `Opening ${project.title}`
      }
      aria-live="polite"
      className={`page-transition-overlay is-${phase}`}
      role="status"
    >
      <div className="page-transition-card">
        <div className="page-transition-window-bar">
          <span className="page-transition-kicker">Project navigation</span>
          <span className="page-transition-window-label">CLI</span>
        </div>
        <div className="page-transition-command-row">
          <span aria-hidden="true" className="page-transition-prompt">
            ~ %
          </span>
          <code className="page-transition-command">{typedCommand}</code>
          <span aria-hidden="true" className="page-transition-cursor" />
        </div>
        <span className="page-transition-status">
          {isCommandComplete
            ? isReturning
              ? 'Returning to project files'
              : `Opening ${project.title}`
            : 'Typing command'}
        </span>
      </div>
    </div>
  );
}
