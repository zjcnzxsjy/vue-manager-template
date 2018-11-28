import {routers} from '@/router';

function hasPermission(router, roles) {
    if (!router.hidden) {
        if (router.meta && router.meta.roles) {
            return roles.some(role => {
                router.meta.roles.indexOf(role) >= 0
            })
        } else {
            return true
        }
    }
    return false;
    
}

function filterRouters(routers, roles) {
    const accessedRouters = routers.filter(router => {
        if(hasPermission(router, roles)) {
            if (router.children && router.children.length) {
                router.children = filterRouters(router.children, roles)
            }
            return true
        }
        return false;
    })
    return accessedRouters;
}

const permission = {
    state: {
        accessedRouters: []
    },
    mutations: {
        SET_ACCESSED_ROUTERS(state, routers) {
            state.accessedRouters = routers;
        }
    },
    actions: {
        GenerateAccessedRoutes({commit}, roles) {
            return new Promise(resolve => {
                let accessedRouters = [];
                accessedRouters = filterRouters(routers, roles);
                commit('SET_ACCESSED_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission;