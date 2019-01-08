import {setUserInfo, removeUserInfo} from '@/utils/Authority'
const user = {
    namespaced: true,
    state: {
        roles: ''
    },
    getters: {
        roles(state) {
            return state.roles;
        }
    },
    mutations: {
        SET_ROLE(state, roles) {
            state.roles = roles;
        }
    },
    actions: {
        setUserInfo({commit}, userInfo) {
            commit('SET_ROLE', userInfo.roles);
            setUserInfo(userInfo);
        },
        logout({commit}) {
            commit('SET_ROLE', '');
            removeUserInfo();
        }
    }
}

export default user;