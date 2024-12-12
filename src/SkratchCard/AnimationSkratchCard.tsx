import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";
import { runOnJS } from "react-native-reanimated";

interface IPath {
  segments: string[];
  color?: string;
}

const AnimationScratchCard = () => {
  const [paths, setPaths] = useState<IPath[]>([]);

  const addPathSegment = (x: number, y: number) => {
    const index = paths.length - 1;
    const newPaths = [...paths];
    if (newPaths?.[index]?.segments) {
      newPaths[index].segments.push(`L ${x} ${y}`);
      setPaths(newPaths);
    }
  };

  const startNewPath = (x: number, y: number) => {
    const newPaths = [...paths];
    newPaths[paths.length] = {
      segments: [`M ${x} ${y}`],
      color: "#06d6a0",
    };
    setPaths(newPaths);
  };

  const pan = Gesture.Pan()
    .onStart((g) => {
      runOnJS(startNewPath)(g.x, g.y); // Call startNewPath using runOnJS
    })
    .onUpdate((g) => {
      runOnJS(addPathSegment)(g.x, g.y); // Call addPathSegment using runOnJS
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          <Canvas style={styles.canvas}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  canvas: {
    flex: 1,
  },
});

export default AnimationScratchCard;
