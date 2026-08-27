import { asc } from 'drizzle-orm';
import { cache } from 'react';
import { db } from '@/shared/config';
import { articles, categories, sections } from '../model/schema';
import type { Doc, DocArticle, DocCategory } from '../model/types';

export async function fetchDocs(): Promise<Doc[]> {
  const [sectionRows, categoryRows, articleRows] = await Promise.all([
    db.select().from(sections).orderBy(asc(sections.position)),
    db.select().from(categories).orderBy(asc(categories.position)),
    db.select().from(articles).orderBy(asc(articles.position)),
  ]);

  const articlesByCategory = new Map<number, DocArticle[]>();
  for (const { categoryId, ...article } of articleRows) {
    const list = articlesByCategory.get(categoryId);
    if (list) {
      list.push(article);
    } else {
      articlesByCategory.set(categoryId, [article]);
    }
  }

  const categoriesBySection = new Map<number, DocCategory[]>();
  for (const { sectionId, ...category } of categoryRows) {
    const docCategory: DocCategory = { ...category, articles: articlesByCategory.get(category.id) ?? [] };
    const list = categoriesBySection.get(sectionId);
    if (list) {
      list.push(docCategory);
    } else {
      categoriesBySection.set(sectionId, [docCategory]);
    }
  }

  return sectionRows.map((section) => ({
    ...section,
    categories: categoriesBySection.get(section.id) ?? [],
  }));
}

export const getDocs = cache(fetchDocs);

export const getDoc = cache(async (name: string): Promise<Doc | undefined> => {
  const docs = await getDocs();
  return docs.find((doc) => doc.name === name);
});
