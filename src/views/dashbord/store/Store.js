import {registerStoreModules} from '@/utils/Register';

const requireModules = require.context('./modules', false, /\.js$/);
export const modules = registerStoreModules(requireModules);