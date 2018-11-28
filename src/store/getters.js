const getters = {
    role: state =>state.User.role,
    accessedRouters: state => state.Permission.accessedRouters,
    visitedViews: state => state.TabsView.visitedViews,
    layout: state => state.App.layout,
    menuTheme: state => state.App.menuTheme
}
export default getters