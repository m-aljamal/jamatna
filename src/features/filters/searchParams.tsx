import {
  createSearchParamsCache,
  createSerializer,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const priceOptions = ["free", "paid", "all"] as const;

export const sortOptions = ["date", "latest", "price"] as const;

export const searchParams = {
  category: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  search: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  sort: parseAsStringLiteral(sortOptions)
    .withOptions({ clearOnDefault: true })
    .withDefault("date"),
  price: parseAsStringLiteral(priceOptions)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault("all"),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const seialize = createSerializer(searchParams);
