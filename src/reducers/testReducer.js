export const sidebarReducers = (state, action) => {
  switch (action.type) {
    case "COLLAPSE_SIDEBAR":
      const sidebar = document.getElementById("sidebar-test-id");

      if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        return;
      }
      sidebar.classList.add("collapsed");
      break;

    default:
      break;
  }
};
