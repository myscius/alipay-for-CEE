const getQrCode = require('./getQrCode/index');
const getOpenID = require('./getOpenID/index');

exports.main = async (event, context) => {
  switch (event.action) {
    case 'getQrCode':
      return await getQrCode.main(event, context);
    case 'getOpenID':
      return await getOpenID.main(event, context);
  }
  return "";
};