import { request, sum } from "@monorepo-todo/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await request<number[]>("http://localhost:3000");
  if (!res.ok) {
    return <div>エラー</div>;
  }
  const array = res.value;
  return (
    <div>
      <div>array: {array.join(",")}</div>
      <div>sum:{sum(array)}</div>
    </div>
  );
}
