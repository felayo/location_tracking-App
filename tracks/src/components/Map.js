import React from "react";
import { StyleSheet, View} from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
