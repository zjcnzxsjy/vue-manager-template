const tabsView = {
    namespaced: true,
    state: {
        visitedViews: [],
        cacheViews: []
    },
    getters: {
        //visitedViews: state => state.visitedViews
        visitedViews(state) {
            return state.visitedViews;
        },
        cacheViews(state) {
            return state.cacheViews;
        }
    },
    mutations: {
        ADD_VISITED_VIEWS: (state, view) => {
            if (view) {
                if (state.visitedViews.some(v => v.path === view.path)) return;
                state.visitedViews.push({
                    name: view.name,
                    title: view.meta.title,
                    path: view.path,
                    query: view.query
                });
                if (!view.meta.noCache) {
                    state.cacheViews.push(view.name);
                }
                
            }
        },
        DEL_VISITED_VIEWS: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    state.visitedViews.splice(i, 1);
                    break;
                }
            }
            for (const i of state.cacheViews) {
                if(i === view.name) {
                    const index = state.cacheViews.indexOf(i);
                    state.cacheViews.splice(index, 1)
                }
            }
        },
        DEL_OTHERS_VIEWS: (state, view) => {
            state.visitedViews = state.visitedViews.filter((visitedView, index) => {
                if (visitedView.name === view.name) {
                    return state.visitedViews.slice(index, index + 1);
                }
            })
            state.cacheViews = state.cacheViews.filter((name, index) => {
                if (name === view.name) {
                    return state.cacheViews.slice(index, index + 1);
                }
            })
        },
        DEL_ALL_VIEWS: (state) => {
            state.visitedViews = [];
            state.cacheViews = [];
        }
    },
    actions: {
        addVisitedViews: ({
            commit
        }, view) => {
            commit('ADD_VISITED_VIEWS', view);
        },
        delVisitedViews: ({
            commit,
            state
        }, view) => {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view);
                resolve([...state.visitedViews]);
            })
        },
        delOthersViews: ({
            commit
        }, view) => {
            commit('DEL_OTHERS_VIEWS', view);
        },
        delAllViews: ({
            commit
        }) => {
            commit('DEL_ALL_VIEWS');
        }
    }
}

export default tabsView;