export interface ContentCard {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  route: string;
  category?: string;
}

export interface ProgrammeCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  route: string;
}

export interface EService {
  id: string;
  name: string;
  icon: string;
  route: string;
  requiresAuth: boolean;
}

export interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  route: string;
  publishedDate: Date;
  category: string;
}
