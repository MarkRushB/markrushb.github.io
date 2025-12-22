
export type ContentType = 'echo' | 'chronicle';

export interface BaseContent {
  id: string;
  type: ContentType;
  date: string;
  tags: string[];
}

export interface Echo extends BaseContent {
  type: 'echo';
  content: string;
}

export interface Chronicle extends BaseContent {
  type: 'chronicle';
  title: string;
  excerpt: string;
  fullContent: string;
}

export type BlogPost = Echo | Chronicle;
