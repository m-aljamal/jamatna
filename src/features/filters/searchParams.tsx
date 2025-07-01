import {
  createSearchParamsCache,
  createSerializer,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  category: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  search: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  sort: parseAsString.withOptions({ clearOnDefault: true }).withDefault("date"),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const seialize = createSerializer(searchParams);
