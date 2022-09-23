import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as AuthContext } from "../context/AuthContext";
import { navigate } from "../navigationRef";

export default () => {
  const { createTracks } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset,
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTracks(name, locations);
    reset(); // Immediately after we safe the form , reset the form to empty
    navigate("TrackList"); // after saving the form navigate to TrackList 
  };
  return [saveTrack];
};
