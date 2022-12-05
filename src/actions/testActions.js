export const collapseSidebar = () => async (dispatch) => {
  dispatch({ state: true, type: "COLLAPSE_SIDEBAR" });
};
