import constantsType from "../constansts/constantType";
const initialState = {
  banner: [],
  friday: {},
  newSongEveryDay: {},
  top100: {},
  xone: {},
  newMusic: [],
  isLoading: false,
  newRelease: {},
  weekChart: [],
  chart: {},
  rank: [],
  playlist: [],
  womanMusic: [],
  singers: null,
  scrollTop: false,
  currentWidth: null,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantsType.GET_BANNERS:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        friday:
          action.homeData?.find((item) => item.sectionId === "hAutoTheme1") ||
          null,
        newSongEveryDay:
          action.homeData?.find((item) => item.sectionId === "hAutoTheme2") ||
          null,
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || null,
        xone:
          action.homeData?.find((item) => item.sectionId === "hXone") || null,
        newMusic:
          {
            ...action.homeData?.find((item) => item.sectionId === "hAlbum"),
            title: "Nhạc mới",
          } || null,
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          null,
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || null,
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          null,
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          null,
        playlist:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          null,
        womanMusic:
          action.homeData?.find((item) => item.sectionType === "playlist") ||
          null,

        singers:
          action.homeData?.find(
            (item) => item.sectionType === "artistSpotlight"
          )?.items || null,
      };
    case constantsType.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case constantsType.SCROLL_TOP:
      return {
        ...state,
        scrollTop: action.flag,
      };
    case constantsType.CURRENT_WIDTH:
      return {
        ...state,
        currentWidth: action.width,
      };
    default:
      return state;
  }
};

export default appReducer;
