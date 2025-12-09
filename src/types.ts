export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string; // URL pointing to an external image
  category: string;
  createdAt: number;
  published: boolean;
  author: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface EpanouisStep {
  letter: string;
  title: string;
  description: string;
}

export interface User {
  uid: string;
  email: string | null;
}

export type DiagnosticStep = 'intro' | 'situation' | 'challenges' | 'goals' | 'contact' | 'submitting' | 'success';

export interface DiagnosticFormData {
  revenue: string;
  challenge: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
}