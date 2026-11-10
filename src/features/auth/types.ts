type LoginFieldName = 'login' | 'password';

export type LoginFormState = {
  errors: Partial<Record<LoginFieldName, string>>;
  values: Partial<Record<LoginFieldName, string>>;
};
