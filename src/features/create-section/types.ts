type CreateSectionFieldName = 'sectionName' | 'description';

export type CreateSectionFormState = {
  errors?: Partial<Record<CreateSectionFieldName, string>>;
  success?: boolean;
};
