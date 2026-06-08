const dictionaries = {
  "id-id": () => import("./dictionaries/id-id.json").then((module) => module.default),
  "en-us": () => import("./dictionaries/en-us.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
