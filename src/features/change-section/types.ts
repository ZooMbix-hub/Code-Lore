type ChangeSectionFieldName = 'sectionName' | 'description';

export type ChangeSectionFormState = {
  errors?: Partial<Record<ChangeSectionFieldName | 'form', string>>;
};
