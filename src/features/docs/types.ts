import type { ArticleRow, CategoryRow, SectionRow } from '@/db/schema';

export type DocArticle = Omit<ArticleRow, 'categoryId'>;

export type DocCategory = Omit<CategoryRow, 'sectionId'> & {
  articles: DocArticle[];
};

export type Doc = SectionRow & {
  categories: DocCategory[];
};
