import defaultSetting from '@/defaultSetting';
const app = {
    namespaced: true,
    state: {
        layout: defaultSetting.layout, // nav menu position: side-menu or top-menu
        menuTheme: defaultSetting.menuTheme    // theme for menu
    },
    getters: {
        // layout: state => state.layout,
        // menuTheme: state => state.menuTheme
        layout(state) {
            return state.layout;
        },
        menuTheme(state) {
            return state.menuTheme;
        }
    },
    mutations: {
        SET_LAYOUT(state, layout) {
            state.layout = layout;
        },
        SET_MENU_THTME(state, menuTheme) {
            state.menuTheme = menuTheme;
        }
    },
    actions: {
        setLayout({commit}, layout) {
            commit('SET_LAYOUT', layout)
        },
        setMenuTheme({commit}, menuTheme) {
            commit('SET_MENU_THTME', menuTheme)
        }
    }
}

export default app;