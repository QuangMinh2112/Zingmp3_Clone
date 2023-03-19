import constantsType from "../constansts/constantType";
import * as apis from "../../apis";
export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome();
    if (response?.data.err === 0) {
      dispatch({
        type: constantsType.GET_BANNERS,
        homeData: response.data.data.items,
      });
    } else {
      dispatch({
        type: constantsType.GET_BANNERS,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: constantsType.GET_BANNERS,
      homeData: null,
    });
  }
};

export const scrollTopHeader = (flag) => ({
  type: constantsType.SCROLL_TOP,
  flag,
});

export const setCurrentWidth = (width) => ({
  type: constantsType.CURRENT_WIDTH,
  width,
});
