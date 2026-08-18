import profilePhoto from '@/assets/profile-photo-professional.png';
import type { PortfolioContent } from '@/types';

export const portfolioContent: PortfolioContent = {
  profile: {
    name: 'Kevin Gan',
    role: 'Mathematics & Computer Science student',
    introduction:
      'I build data-intensive and interactive software, from Python analytics pipelines and full-stack applications to real-time motion-capture tools.',
    about:
      'I am a Mathematics and Computer Science student at Emory University with experience across data engineering, geospatial analytics, full-stack development, and motion-capture systems. I enjoy turning complex data and real-time sensor inputs into reliable software, from Python pipelines and interactive maps to Rust diagnostics and React applications.',
    photo: {
      src: profilePhoto,
      alt: 'Kevin Gan in a professional studio portrait',
    },
    email: 'lihaozhe013@gmail.com',
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/Kevinsgans',
        kind: 'github',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/kevinsgans/',
        kind: 'linkedin',
      },
      {
        label: 'Website',
        href: 'https://lihaozhe013.github.io/lihaozhe-website/',
        kind: 'website',
      },
    ],
  },
  projectFolders: [
    {
      id: 'software',
      title: 'Software',
      description: 'Products, algorithms, and applied machine learning.',
    },
    {
      id: 'embedded',
      title: 'Embedded systems',
      description:
        'Low-level software, digital hardware, and physical interfaces.',
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      description: 'Deployment systems and dependable production operations.',
    },
  ],
  projects: [
    {
      id: 'zerolab-motion-capture',
      folderId: 'embedded',
      tone: 'cobalt',
      title: 'ZeroLab Motion Capture',
      summary:
        'A motion-capture and robotics software stack for inspecting live IMU streams and translating body motion into reliable interactive inputs.',
      contribution:
        'Built a standalone Rust diagnostics application and a modular motion-processing pipeline for skeleton state, gesture scores, packet health, calibration, and Godot input.',
      challenge:
        'Keep sensor inspection, capture health, and motion translation observable without blocking the live capture loop.',
      outcome:
        'Created a focused diagnostic surface for real-time capture and a reusable path from sensor data to game-ready controls.',
      technologies: ['Rust', 'eframe/egui', 'IMU', 'Motion capture', 'Godot'],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: '#project/zerolab-motion-capture',
          kind: 'external',
          openInNewTab: false,
          transition: true,
        },
      ],
    },
    {
      id: 'bigquery-release-notes',
      folderId: 'software',
      tone: 'green',
      title: 'BigQuery Release Notes',
      summary:
        'A Flask dashboard that turns the live Google Cloud BigQuery RSS feed into searchable, topic-level release cards.',
      contribution:
        'Built the feed ingestion, five-minute cache, topic splitting, responsive interface, and tweet composer with a live character count.',
      challenge:
        'Keep a live external feed useful during refreshes while making dense release notes easy to scan.',
      outcome:
        'Combined manual refresh, filters, search, and a Twitter intent workflow in one responsive dark dashboard.',
      technologies: [
        'Python',
        'Flask',
        'Requests',
        'Vanilla JavaScript',
        'CSS',
      ],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: '#project/bigquery-release-notes',
          kind: 'external',
          openInNewTab: false,
          transition: true,
        },
        {
          label: 'GitHub',
          href: 'https://github.com/Kevinsgans/event-talk-apps',
          kind: 'github',
        },
      ],
    },
    {
      id: 'atlanta-mobility-access',
      folderId: 'software',
      tone: 'purple',
      title: 'Atlanta Mobility Access Lab',
      summary:
        'A geospatial analysis of MARTA routes, hypothetical stops, and nearby businesses across Atlanta.',
      contribution:
        'Built nearest-stop analyses, accessibility comparisons, and hypothetical-stop scenarios in Python, GeoPandas, and Folium.',
      challenge:
        'Make transit access legible across businesses, mobility groups, and disinvestment groups.',
      outcome:
        'Delivered interactive maps and scenario views for evaluating transit-access opportunities.',
      technologies: ['Python', 'pandas', 'GeoPandas', 'Folium', 'MARTA GTFS'],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: '#project/atlanta-mobility-access',
          kind: 'external',
          openInNewTab: false,
          transition: true,
        },
        {
          label: 'GitHub',
          href: 'https://github.com/kelsxcx/AIDataLabGroup10_2025',
          kind: 'github',
        },
      ],
    },
    {
      id: 'scholarship-application-agent',
      folderId: 'infrastructure',
      tone: 'red',
      title: 'Scholarship Application Agent',
      summary:
        'A local-first scholarship workflow with a FastAPI backend, React setup workspace, SQLite persistence, and document/profile APIs.',
      contribution:
        'Built validated profile and document APIs, versioned local persistence, React workspaces, health checks, and a deterministic test suite.',
      challenge:
        'Keep sensitive profile and document metadata local while making state transitions and file checks explicit.',
      outcome:
        'Created a tested foundation for profile setup and document management, with discovery and automation intentionally outside the current scope.',
      technologies: ['React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'SQLite'],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: '#project/scholarship-application-agent',
          kind: 'external',
          openInNewTab: false,
          transition: true,
        },
        {
          label: 'GitHub',
          href: 'https://github.com/Kevinsgans/SF1',
          kind: 'github',
        },
      ],
    },
    {
      id: 'makemore-language-model',
      folderId: 'software',
      tone: 'charcoal',
      title: 'Makemore Language Model',
      summary:
        'A compact character-level language model that learns to generate name-like text from plain-text datasets.',
      contribution:
        'Explored a single-file training and sampling workflow across bigram, MLP, recurrent, and Transformer-style language models.',
      challenge:
        'Make model experiments small enough to understand, modify, and run locally while preserving useful text generation.',
      outcome:
        'A hackable CPU-friendly workflow for training and sampling language models from simple line-based datasets.',
      technologies: ['Python', 'PyTorch', 'RNN', 'GRU', 'Transformer'],
      featured: false,
      links: [
        {
          label: 'Project details',
          href: '#project/makemore-language-model',
          kind: 'external',
          openInNewTab: false,
          transition: true,
        },
        {
          label: 'GitHub',
          href: 'https://github.com/Kevingan11/makemore',
          kind: 'github',
        },
      ],
    },
  ],
  skillGroups: [
    {
      title: 'Embedded systems',
      description: 'Low-level software and digital hardware.',
      skills: [
        'C',
        'C++',
        'RISC-V Assembly',
        'Verilog',
        'STM32',
        'FPGA',
        'MATLAB',
      ],
    },
    {
      title: 'Software engineering',
      description: 'Product development across the web stack.',
      skills: [
        'TypeScript',
        'Python',
        'React',
        'Node.js',
        'Django',
        'PostgreSQL',
      ],
    },
    {
      title: 'Infrastructure',
      description: 'Tools for dependable delivery and operations.',
      skills: ['Git', 'Linux', 'Docker', 'Nginx', 'GitHub Actions', 'AWS'],
    },
  ],
  education: {
    institution: 'Emory University',
    program: 'B.S. in Mathematics & Computer Science',
    dates: 'Expected Fall 2028',
    details: [
      'AI applications and algorithms',
      'Statistical computing (R, Python, SQL)',
      'Foundations of computer science',
      'Linear algebra',
    ],
  },
  metadata: {
    title: 'Kevin Gan | Engineering Portfolio',
    description:
      'Software, data, and applied computing projects by Emory University Mathematics and Computer Science student Kevin Gan.',
  },
};
