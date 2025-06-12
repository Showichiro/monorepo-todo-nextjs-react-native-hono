import { sum } from "@monorepo-todo/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch("http://localhost:3100");
  if (!res.ok) {
    return <div>エラー</div>;
  }
  const array = (await res.json()) as number[];
  return (
    <div>
      <div>array: {array.join(",")}</div>
      <div>sum:{sum(array)}</div>
    </div>
  );
}
