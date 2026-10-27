import emoryAiDataLabPoster from '@/assets/emory-ai-data-lab-poster.jpg';
import profilePhoto from '@/assets/profile-photo-professional.jpg';
import mocapImage from '@/assets/Mocap.png';
import robotVideo from '@/assets/zerolab-robot.mp4';
import zerolabLogo from '@/assets/zerolab-logo.png';
import kemaiLogo from '@/assets/kemai-logo.png';
import investAtlantaLogo from '@/assets/invest-atlanta-logo.webp';
import type { PortfolioContent } from '@/types';

export const portfolioContent: PortfolioContent = {
  profile: {
    name: 'Kevin Gan',
    role: 'Mathematics & Computer Science student',
    introduction:
      'I build data-intensive and interactive software, from Python analytics pipelines and full-stack applications to real-time motion-capture tools.',
    about:
      'I study Mathematics and Computer Science at Emory, but most of my work lives between disciplines. I like taking a messy source—live IMU packets, transit data, or a changing feed—and building the path that makes it understandable, dependable, and useful.',
    photo: {
      src: profilePhoto,
      alt: 'Kevin Gan in a professional studio portrait',
    },
    email: 'Kevin.gan@emory.edu',
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
    ],
  },
  experience: [
    {
      organization: 'Zerolab Technology',
      logo: { src: zerolabLogo, alt: 'Zerolab Technology logo' },
      role: 'Software Engineering Intern',
      dates: 'Jul. 2026 – Aug. 2026',
    },
    {
      organization: 'Kemai Technology',
      logo: { src: kemaiLogo, alt: 'Kemai Technology logo' },
      role: 'Data Engineering Intern',
      dates: 'May 2026 – Jul. 2026',
    },
    {
      organization: 'Invest Atlanta',
      logo: { src: investAtlantaLogo, alt: 'Invest Atlanta logo' },
      role: 'Data Analyst',
      dates: 'Sep. 2025 – Dec. 2025',
    },
  ],
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
      id: 'emory-ai-data-lab',
      folderId: 'software',
      tone: 'purple',
      title: 'Emory AI Data Lab',
      summary:
        'An Emory AI Data Lab research project examining how MARTA access and connectivity influence visitor distribution and economic participation across Atlanta.',
      contribution:
        'Analyzed MARTA, business, mobility-score, and geospatial data; mapped accessibility gaps; and modeled hypothetical bus routes in Python.',
      challenge:
        'Identify where transit improvements could connect major visitor destinations with historically underserved business districts.',
      outcome:
        'Presented proposed bus routes and spatial findings showing where improved connectivity could broaden access to visitor-driven economic activity.',
      technologies: [
        'Python',
        'pandas',
        'GeoPandas',
        'Folium',
        'OSMnx',
        'MARTA GTFS',
      ],
      featured: true,
      media: {
        src: emoryAiDataLabPoster,
        alt: 'Kevin Gan standing beside the Emory AI Data Lab research poster',
      },
      links: [
        {
          label: 'Project details',
          href: '#project/emory-ai-data-lab',
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
      id: 'zerolab-motion-capture',
      folderId: 'embedded',
      tone: 'cobalt',
      title: 'Rust Motion Capture',
      summary:
        'Rust tools for inspecting live IMU streams, diagnosing capture problems, and translating body motion into game controls.',
      contribution:
        'Built a standalone Rust diagnostics application and a modular motion-processing pipeline for skeleton state, gesture scores, packet health, calibration, and Godot input.',
      challenge:
        'Keep sensor inspection, capture health, and motion translation observable without blocking the live capture loop.',
      outcome:
        'Delivered a Rust diagnostics application for inspecting capture health and a motion-processing pipeline for Godot input.',
      technologies: ['Rust', 'eframe/egui', 'IMU', 'Motion capture', 'Godot'],
      featured: true,
      media: {
        src: mocapImage,
        alt: 'Motion-capture viewer showing a tracked skeleton',
      },
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
      id: 'zerolab-robotics',
      folderId: 'software',
      tone: 'green',
      title: 'ZeroLab Robotics',
      media: {
        kind: 'video',
        src: robotVideo,
        alt: 'ZeroLab Robotics robot demonstration',
      },
      summary: 'The public website for ZeroLab Robotics.',
      contribution: 'Built the ZeroLab Robotics website.',
      technologies: [],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: '#project/zerolab-robotics',
          kind: 'external',
          openInNewTab: false,
          transition: true,
        },
        {
          label: 'Visit website',
          href: 'https://www.zero-lab.tech/',
          kind: 'website',
          openInNewTab: true,
        },
      ],
    },
    {
      id: 'notetaker',
      folderId: 'embedded',
      tone: 'cobalt',
      title: 'NoteTaker',
      summary:
        'An embedded computer-vision note scanner that turns paper notes into corrected scans with searchable storage.',
      contribution:
        'Built a Python/OpenCV pipeline for automatic page detection, perspective correction, and quality checks; implemented Raspberry Pi camera and Hailo inference adapters.',
      challenge:
        'Keep capture and inference isolated while recovering from crashes and checking scan quality.',
      outcome:
        'Implemented crash recovery and isolated capture/inference workers, validated with 32 automated tests, and developed benchmarks for capture accuracy, processing latency, and metadata retrieval quality.',
      technologies: ['Python', 'OpenCV', 'Raspberry Pi', 'Hailo'],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: '#project/notetaker',
          kind: 'external',
          openInNewTab: false,
          transition: true,
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
