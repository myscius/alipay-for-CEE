const cloud = require("@alipay/faas-server-sdk");
cloud.init({});

/**
 * 获取用户授权信息
 * @param {string} auth_code - 授权码
 * @returns {Promise<Object>} 返回Promise对象，成功时解析为包含用户授权信息的对象，失败时抛出错误
 */
async function getUserAuth(auth_code) {
  console.log(`auth_code:${auth_code}`);

  /**
   * @type {Object} response - 返回的授权信息对象
   * @property {boolean} success - 授权是否成功的标志
   * @property {Object} alipay_system_oauth_token_response - 用户授权信息
   * @property {string} error_response - 错误信息
   */
  return cloud.openapi.alipaySystemOauthToken.request({
    'grant_type': 'authorization_code',
    'code': auth_code
  }).then(response => {
    return response;
  }).catch(error => {
    console.error(`getUserAuth error: ${error}`);
    throw error;
  });
}

async function getUserInfo(access_token) {
  console.log(`access_token:${access_token}`);

  return cloud.openapi.alipayUserInfoShare.request({
    'auth_token': access_token
  }).then(response => {
    return response;
  }).catch(error => {
    console.error(`getUserInfo error: ${error}`);
    throw error;
  });
}

exports.main = async (event, context) => {
  try {
    const user_auth = await getUserAuth(event.auth_code);
    console.log(`user_auth:${JSON.stringify(user_auth)}`);
    const user_info = await getUserInfo(user_auth.access_token);
    console.log(`user_info:${JSON.stringify(user_info)}`);
    return user_info;
  } catch (error) {
    console.log('error');
    throw error;
  }

};