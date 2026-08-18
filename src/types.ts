export type ColorMode = 'light' | 'dark';
export type ProjectTone = 'cobalt' | 'green' | 'purple' | 'red' | 'charcoal';

export type LinkKind =
  'github' | 'linkedin' | 'website' | 'external' | 'video' | 'document';

export interface ExternalLink {
  label: string;
  href: string;
  kind: LinkKind;
  openInNewTab?: boolean;
  transition?: boolean;
}

export interface ProfileImage {
  src: string;
  alt: string;
}

export interface Profile {
  name: string;
  role: string;
  introduction: string;
  about: string;
  photo?: ProfileImage;
  resumeUrl?: string;
  email?: string;
  socialLinks: ExternalLink[];
}

export interface ProjectMedia {
  src: string;
  alt: string;
}

export interface ProjectFolder {
  id: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  folderId: ProjectFolder['id'];
  tone: ProjectTone;
  title: string;
  summary: string;
  contribution: string;
  year?: string;
  challenge?: string;
  outcome?: string;
  technologies: string[];
  links?: ExternalLink[];
  media?: ProjectMedia;
  featured: boolean;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export interface Education {
  institution: string;
  program: string;
  dates?: string;
  details?: string[];
}

export interface SiteMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  socialPreviewImage?: string;
}

export interface PortfolioContent {
  profile: Profile;
  projectFolders: ProjectFolder[];
  projects: Project[];
  skillGroups: SkillGroup[];
  education: Education;
  metadata: SiteMetadata;
}
