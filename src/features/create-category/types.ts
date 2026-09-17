type CreateCategoryFieldName = 'categoryName' | 'form';

export type CreateCategoryFormState = {
  errors?: Partial<Record<CreateCategoryFieldName, string>>;
  success?: boolean;
};
