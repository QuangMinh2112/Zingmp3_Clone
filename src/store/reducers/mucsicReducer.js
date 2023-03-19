import constantsType from "../constansts/constantType";

const initialState = {
  currentSongId: null,
  currentSongData: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  currentAlbumId: null,
  recentSongs: [],
  searchData: {},
  keyword: "",
};
const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantsType.SET_CURRENT_SONG_ID:
      return {
        ...state,
        currentSongId: action.id || null,
      };

    case constantsType.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case constantsType.SET_ALBUMS:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case constantsType.PLAY_LIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case constantsType.SET_CUR_SONG_DATA:
      return {
        ...state,
        currentSongData: action.data || null,
      };
    case constantsType.SET_CUR_ALBUM_ID:
      return {
        ...state,
        currentAlbumId: action.id || null,
      };
    case constantsType.SET_RECENT_SONG:
      let songs = state.recentSongs;
      if (state.recentSongs.some((item) => item.id === action.data.id)) {
        songs = songs.filter((item) => item.id !== action.data.id);
      }
      if (action.data) {
        if (songs.length > 19) {
          songs = songs.filter(
            (item, index, self) => index !== self.length - 1
          );
        }
        songs = [action.data, ...songs];
      }
      return {
        ...state,
        recentSongs: songs,
      };
    case constantsType.SEARCH:
      return {
        ...state,
        searchData: action.data || null,
        keyword: action.keyword || "",
      };
    default:
      return state;
  }
};

export default musicReducer;
