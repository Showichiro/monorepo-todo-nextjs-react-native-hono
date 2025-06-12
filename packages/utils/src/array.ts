/**
 * 渡されたジェネレータ関数を実行して、配列にする。
 */
export const generateArray = <T>(
  generatorFn: () => Generator<T, void>,
): T[] => {
  return Array.from(generatorFn());
};

export const sum = (arr: number[]) =>
  arr.reduce((prev, current) => prev + current, 0);
