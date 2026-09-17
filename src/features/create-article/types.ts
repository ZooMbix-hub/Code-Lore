type CreateArticleFieldName = 'section' | 'categoryId' | 'title' | 'slug' | 'content' | 'form';

export type CreateArticleFormState = {
  errors: Partial<Record<CreateArticleFieldName, string>>;
};

export type CreateArticleSectionOption = {
  id: number;
  name: string;
  title: string;
  categories: { id: number; title: string }[];
};
