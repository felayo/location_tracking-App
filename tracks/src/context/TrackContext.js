import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await trackerApi.get("tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};

const createTracks = (dispatch) => async (name, locations) => {
  // make request to the API server
  await trackerApi.post("/tracks", { name, locations });
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTracks },
  []
);
