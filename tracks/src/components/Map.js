import React, { useContext } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";

import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const { state } = useContext(LocationContext);

  if (!state.currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...state.currentLocation.coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Circle
          center={state.currentLocation.coords}
          radius={150}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />

        <Polyline coordinates={state.locations.map(loc => loc.coords)} />
      </MapView>
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
