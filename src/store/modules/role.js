import { asyncRoutes, constantRoutes } from "@/router";

/**
 * Check if it matches the current user right by meta.role
 * @param {String} role
 * @param route
 */
function canAccess(role, route) {
  if (route.meta) {
    let hasRole = true;
    if (route.meta.role) {
      // If it has meta.role, accessible = hasRole
      hasRole = false;
      if (route.meta.role.include(role)) {
        hasRole = true;
      }
    }

    return hasRole;
  }

  // If no meta.role inputted - the route should be accessible
  return true;
}

/**
 * Find all routes of this role
 * @param routes asyncRoutes
 * @param role
 */
function filterAsyncRoutes(routes, role) {
  const response = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (canAccess(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role);
      }
      response.push(tmp);
    }
  });

  return response;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  SET_CLEAR_DATA: (state) => {
    state.routes = [];
    state.addRoutes = [];
  },
};

const actions = {
  generateRoutes({ commit }, role) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, role);

      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
  clearData({ commit }) {
    commit("SET_CLEAR_DATA");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
