export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  observations: string;
  relatedRegulations: string;
}