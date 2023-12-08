const getQrCode = require('./getQrCode/index');

exports.main = async (event, context) => {
  switch (event.action) {
    case 'getQrCode':
      return await getQrCode.main(event, context);
  }
  return "";
};