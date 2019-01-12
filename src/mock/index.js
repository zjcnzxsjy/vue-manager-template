import Mock from 'mockjs';
import loginAPI from './login'
import { usersTable } from './table'

Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/usersTable/, 'get', usersTable);

export default Mock;