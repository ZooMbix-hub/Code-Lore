const pluralRules = new Intl.PluralRules('ru-RU');

type PluralForms = { one: string; few: string; many: string };

export function pluralize(count: number, forms: PluralForms): string {
  const rule = pluralRules.select(count);
  return rule === 'one' || rule === 'few' ? forms[rule] : forms.many;
}
