const userMap = {
  admin: {
    code: 0,
    data: {
      user_name: 'admin',
      roles: ['admin']
    }
  }
}

export default {
  loginByUsername: config => {
    const { user_name } = JSON.parse(config.body)
    return userMap[user_name];
  }
}