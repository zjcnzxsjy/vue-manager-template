import Cookies from 'js-cookie';

export function getUserInfo() {
    let userInfo = {};
    userInfo = {
        user_name: Cookies.get('user_name'),
        roles: Cookies.get('roles')
    }
    return userInfo;
}

export function setUserInfo(userInfo) {
    Cookies.set('user_name', userInfo.user_name);
    Cookies.set('roles', userInfo.roles);
}

export function removeUserInfo() {
    Cookies.remove('user_name');
    Cookies.remove('roles');
}