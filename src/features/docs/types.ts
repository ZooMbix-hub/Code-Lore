import type { ArticleRow, CategoryRow, SectionRow } from '@/db/schema';

export type DocArticle = Omit<ArticleRow, 'categoryId'>;

export type DocCategory = Omit<CategoryRow, 'sectionId'> & {
  articles: DocArticle[];
};

export type Doc = SectionRow & {
  categories: DocCategory[];
};

export type ArticleView = {
  doc: {
    name: string;
    title: string;
    categories: DocCategory[];
    glyph: string;
  };
  article: DocArticle;
  prev: DocArticle | null;
  next: DocArticle | null;
};
