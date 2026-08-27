import type { ArticleRow, CategoryRow, SectionRow } from './schema';

/** Статья без служебного categoryId — наружу отдаём готовое дерево */
export type DocArticle = Omit<ArticleRow, 'categoryId'>;

export type DocCategory = Omit<CategoryRow, 'sectionId'> & {
  articles: DocArticle[];
};

/** Секция документации с вложенными категориями и статьями */
export type Doc = SectionRow & {
  categories: DocCategory[];
};
