import profilePhoto from '@/assets/profile-photo-professional.png';
import type { PortfolioContent } from '@/types';

export const portfolioContent: PortfolioContent = {
  profile: {
    name: 'Haozhe Li',
    role: 'Electrical & Computer Engineering student',
    introduction:
      'I build embedded systems and full-stack software, from low-level hardware interfaces to production web applications.',
    about:
      'I am a third-year engineering student interested in the full path from hardware constraints to dependable software. My work spans embedded development, systems programming, web applications, and infrastructure.',
    photo: {
      src: profilePhoto,
      alt: 'Haozhe Li in a professional studio portrait',
    },
    email: 'lihaozhe013@gmail.com',
    socialLinks: [
      {
        label: 'GitHub',
        href: 'https://github.com/lihaozhe013',
        kind: 'github',
      },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/lihaozhe013',
        kind: 'external',
      },
      {
        label: 'Website',
        href: 'https://lihaozhe013.github.io/lihaozhe-website/',
        kind: 'external',
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
      id: 'tradeflow-system',
      folderId: 'software',
      title: 'TradeFlow System',
      summary:
        'A full-stack trade management application built for a small business and deployed from design through production.',
      contribution:
        'Designed the application architecture, implemented the product, and owned the production deployment workflow.',
      technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/',
          kind: 'external',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/lihaozhe013/tradeflow-oss',
          kind: 'github',
        },
      ],
    },
    {
      id: 'dinosaur-game',
      folderId: 'embedded',
      title: 'STM32 Dinosaur Game',
      summary:
        'An embedded game for an STM32 microcontroller with custom graphics, input handling, and OLED output.',
      contribution:
        'Implemented the real-time game loop and hardware interfaces across DMA, GPIO, and I2C peripherals.',
      technologies: ['C', 'STM32', 'DMA', 'GPIO', 'I2C'],
      featured: true,
      media: {
        src: 'https://i.ytimg.com/vi/_ZocQdUdjPw/maxresdefault.jpg',
        alt: 'Dinosaur game running on an STM32 OLED display',
      },
      links: [
        {
          label: 'Watch video',
          href: 'https://youtu.be/_ZocQdUdjPw?si=gIY0hTswSoknH1XM',
          kind: 'video',
        },
        {
          label: 'Read report',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/portfolio/ECE342FinalReport.pdf',
          kind: 'document',
        },
      ],
    },
    {
      id: 'gis-route-optimization',
      folderId: 'software',
      title: 'GIS Route Optimization',
      summary:
        'A C++ geographic information system with real-time pathfinding and interactive map visualization.',
      contribution:
        'Built routing and map interactions using Dijkstra, A*, and a greedy courier-routing strategy.',
      technologies: ['C++', 'GTK', 'Dijkstra', 'A*', 'TomTom API'],
      featured: true,
      links: [
        {
          label: 'Project details',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/posts/gis-route-optimization-application/',
          kind: 'external',
        },
        {
          label: 'View presentation',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/portfolio/ECE297-OP2.pdf',
          kind: 'document',
        },
      ],
    },
    {
      id: 'runner-game',
      folderId: 'embedded',
      title: 'RISC-V Runner Game',
      summary:
        'A runner game implemented for a RISC-V processor with custom graphics and input handling.',
      contribution:
        'Integrated C and RISC-V assembly in a constrained embedded environment.',
      technologies: ['C', 'RISC-V Assembly', 'CPULator'],
      featured: false,
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/lihaozhe013/ece243_runner_game',
          kind: 'github',
        },
        {
          label: 'Project details',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/posts/runner-game-ece243-project/',
          kind: 'external',
        },
      ],
    },
    {
      id: 'greedy-mouse-game',
      folderId: 'embedded',
      title: 'FPGA Greedy Mouse Game',
      summary:
        'A hardware game implemented on a DE1-SoC FPGA board with custom graphics and input handling.',
      contribution:
        'Designed and verified the digital system in Verilog using Quartus Prime and ModelSim.',
      technologies: ['Verilog', 'Quartus Prime', 'ModelSim'],
      featured: false,
      links: [
        {
          label: 'View presentation',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/portfolio/ece241-final-presentation.pdf',
          kind: 'document',
        },
      ],
    },
    {
      id: 'tradeflow-infrastructure',
      folderId: 'infrastructure',
      title: 'TradeFlow Infrastructure',
      summary:
        'Production infrastructure for TradeFlow with automated delivery and containerized services.',
      contribution:
        'Implemented CI, deployment, networking, and service orchestration across AWS and Linux hosts.',
      technologies: ['AWS', 'Docker', 'GitHub Actions', 'Nginx', 'Argo CD'],
      featured: false,
      links: [
        {
          label: 'Project details',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/',
          kind: 'external',
        },
      ],
    },
    {
      id: 'streamfile-server',
      folderId: 'software',
      title: 'StreamFile Server',
      summary:
        'A database-free resource server with media playback, uploads, search, and private links.',
      contribution:
        'Built the Node.js service, React interface, media workflows, and containerized deployment.',
      technologies: ['TypeScript', 'Node.js', 'React', 'Express', 'Docker'],
      featured: false,
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/lihaozhe013/streamfile-server-nodejs',
          kind: 'github',
        },
        {
          label: 'View screenshots',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/posts/streamfile-server/',
          kind: 'external',
        },
      ],
    },
    {
      id: 'license-plate-recognition',
      folderId: 'software',
      title: 'License Plate Recognition',
      summary:
        'An Ontario license plate recognition system using detection and sequence-recognition models.',
      contribution:
        'Trained and evaluated a CNN bounding-box model with a CRNN character-recognition pipeline.',
      technologies: ['Python', 'PyTorch', 'CNN', 'CRNN'],
      featured: false,
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/lihaozhe013/APS360-Project-License-Plate-Recognition',
          kind: 'github',
        },
        {
          label: 'Read report',
          href: 'https://lihaozhe013.github.io/lihaozhe-website/portfolio/APS360_Project_Final_Report.pdf',
          kind: 'document',
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
    institution: 'University of Toronto',
    program: 'B.A.Sc. in Computer Engineering',
    dates: 'Third year',
    details: [
      'Algorithms and data structures',
      'Operating systems',
      'Computer organization',
      'Digital systems',
    ],
  },
  metadata: {
    title: 'Haozhe Li | Engineering Portfolio',
    description:
      'Embedded systems and full-stack software projects by electrical and computer engineering student Haozhe Li.',
  },
};
