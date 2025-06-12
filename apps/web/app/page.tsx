import { generateArray } from "@monorepo-todo/utils";

export default function Home() {
  const array = generateArray(function* () {
    yield 1;
    yield* [2, 3];
  });
  return <div>{array}</div>;
}
