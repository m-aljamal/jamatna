import {
  createSearchParamsCache,
  createSerializer,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  category: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const seialize = createSerializer(searchParams);
