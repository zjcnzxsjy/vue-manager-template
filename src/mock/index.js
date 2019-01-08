import Mock from 'mockjs';
import loginAPI from './login'

Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername);

export default Mock;