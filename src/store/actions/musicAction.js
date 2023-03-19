import constantsType from "../constansts/constantType";
import * as apis from "../../apis";

export const setCurrentSongId = (id) => ({
  type: constantsType.SET_CURRENT_SONG_ID,
  id,
});

export const play = (flag) => ({
  type: constantsType.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: constantsType.SET_ALBUMS,
  flag,
});
export const setPlaylist = (songs) => ({
  type: constantsType.PLAY_LIST,
  songs,
});
export const loading = (flag) => ({
  type: constantsType.LOADING,
  flag,
});
export const setCurSongData = (data) => ({
  type: constantsType.SET_CUR_SONG_DATA,
  data,
});
export const setCurAlbumId = (id) => ({
  type: constantsType.SET_CUR_ALBUM_ID,
  id,
});
export const setRecentSong = (data) => ({
  type: constantsType.SET_RECENT_SONG,
  data,
});
export const search = (keyword) => async (dispatch) => {
  try {
    const res = await apis.apiSearchSong(keyword);
    if (res.data.err === 0) {
      dispatch({
        type: constantsType.SEARCH,
        data: res.data.data,
        keyword,
      });
    } else {
      dispatch({
        type: constantsType.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: constantsType.SEARCH,
      data: null,
    });
  }
};
export const getSearchSongs = (singerId) => async (dispatch) => {
  try {
    const res = await apis.apiGetListArtistSong(singerId);
    if (res.data.err === 0) {
      dispatch({
        type: constantsType.PLAY_LIST,
        songs: res.data.data.items,
      });
    } else {
      dispatch({
        type: constantsType.PLAY_LIST,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: constantsType.PLAY_LIST,
      data: null,
    });
  }
};
