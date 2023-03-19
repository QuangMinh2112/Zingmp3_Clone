import axios from "../axios";

export const apiGetSong = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/song",
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetSongDetails = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/infosong",
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetailPlaylist = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/detailplaylist",
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiSearchSong = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/search",
        method: "get",
        params: { keyword: keyword },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetListArtistSong = (singerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/artistsong",
        method: "get",
        params: {
          id: singerId,
          page: 1,
          count: 50,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetListArtist = (alias) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/artist",
        method: "get",
        params: {
          name: alias,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetChartHome = (alias) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/chartHome",
        method: "get",
        params: {
          name: alias,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const getTop100 = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/top100",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

//newreleasechart
export const getNewMusic = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/newreleasechart",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
