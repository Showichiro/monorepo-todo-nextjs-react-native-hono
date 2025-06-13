import { err, ok, type Result } from "./result";

export const request = async <T, E = unknown>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<Result<T, E>> => {
  try {
    const res = await fetch(input, init);
    if (res.ok) {
      const json = (await res.json()) as T;
      return ok(json);
    }
    const json = (await res.json()) as E;
    return err(json);
  } catch (error: unknown) {
    return err(error as E);
  }
};
