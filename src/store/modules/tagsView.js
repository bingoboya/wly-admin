const state = {
  visitedViews: [],
  cachedViews: [],
  currentSidebarRouter: 7, // 切换顶部tab-pane页签，修改侧边栏的对应路由模块的显示
  currentActiveName: 7 // 设置顶部页签的当前的选中项
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    console.log('addTagsADD_VISITED_VIEW', state.visitedViews, view)
    state.visitedViews.forEach((item, index) => {
      console.log('item', index, item, item.fullPath === view.fullPath)
      // console.log('item item.fullPath',index, item.fullPath);
      // console.log('item view.fullPath',index, view.fullPath);
    })
    const isHave = state.visitedViews.some(v => v.path === view.path)
    // const isHave = state.visitedViews.some(v => v.fullPath === view.fullPath);
    console.log('addTags-isHave', isHave)
    if (!isHave) {
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    }
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    console.log('UPDATE_-VISITED_VIEW')
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  ADD_CACHED_VIEW: (state, view) => {
    console.log('ADD_CACHED_VIEW', state.cachedViews)
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
      console.log('ADD_CACHED_VIEW-需要缓存的路由:', state.cachedViews)
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    console.log('DEL_VISITED_VIEW')
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    console.log('DEL_CACHED_VIEW')
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    console.log('DEL_OTHERS_VISITED_VIEWS')
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    console.log('DEL_OTHERS_CACHED_VIEWS')
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    console.log('DEL_ALL_VISITED_VIEWS')
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: state => {
    console.log('DEL_ALL_CACHED_VIEWS')
    state.cachedViews = []
  },
  // 切换顶部tab-pane页签，修改侧边栏的对应路由模块的显示
  CHANGE_CURRENTSIDEBAROUTER: (state, view) => {
    state.currentSidebarRouter = view
    // console.log('CHANGE_CURRENTSIDEBAROUTER1', state.currentSidebarRouter, view);
  },
  // 设置顶部页签的当前的选中项
  CHANGE_CURRENTACTIVENAME: (state, view) => {
    state.currentActiveName = view
  }
}

const actions = {
  // 切换顶部tab-pane页签，修改侧边栏的对应路由模块的显示
  changeCurrentSidebarRouter({ commit }, view) {
    // console.log('CHANGE_CURRENTSIDEBAROUTER2', view);
    commit('CHANGE_CURRENTSIDEBAROUTER', view)
  },
  // 设置顶部页签的当前的选中项
  changeCurrentActiveName({ commit }, view) {
    commit('CHANGE_CURRENTACTIVENAME', view)
    commit('CHANGE_CURRENTSIDEBAROUTER', view)
  },
  //
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
