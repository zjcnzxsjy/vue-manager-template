import defaultSetting from '@/defaultSetting';
const app = {
    state: {
        layout: defaultSetting.layout, // nav menu position: side-menu or top-menu
        menuTheme: defaultSetting.menuTheme    // theme for menu
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