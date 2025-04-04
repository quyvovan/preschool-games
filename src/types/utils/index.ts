// Doc: https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values
export type TStringWithSuggest<T extends string> = T | Omit<string, T>;
