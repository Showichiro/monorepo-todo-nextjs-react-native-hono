import { Text, View } from "react-native";
import { generateArray } from "@monorepo-todo/utils";
export default function Index() {
  const array = generateArray(function* () {
    yield 1;
    yield* [2, 3];
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{array}</Text>
    </View>
  );
}
