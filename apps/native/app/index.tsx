import { Text, View } from "react-native";
import { sum } from "@monorepo-todo/utils";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

export default function Index() {
  const [array, setArray] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { expoConfig } = Constants;
        const api = expoConfig?.hostUri?.split(":")[0];
        const res = await fetch(`http://${api}:3100`);
        if (!res.ok) {
          setError("エラー");
          return;
        }
        const data = (await res.json()) as number[];
        setArray(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>array: {array.join(",")}</Text>
      <Text>sum: {sum(array)}</Text>
    </View>
  );
}
