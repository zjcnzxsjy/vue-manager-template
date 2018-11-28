import {setUserInfo, removeUserInfo} from '@/utils/Authority'
const user = {
    state: {
        role: ''
    },
    mutations: {
        SET_ROLE(state, roles) {
            state.roles = roles;
        }
    },
    actions: {
        setUserInfo({commit}, userInfo) {
            console.log(userInfo)
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