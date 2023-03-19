import { combineReducers } from "redux";
import appReducer from "./appReducer";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./mucsicReducer";
import { persistReducer } from "redux-persist";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: "music",
  whiteList: [
    "currentSongId",
    "currentSongData",
    "currentAlbumId",
    "recentSongs",
  ],
};
const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
