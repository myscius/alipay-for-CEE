const fs = require('fs');
const cloud = require('@alipay/faas-server-sdk');
cloud.init({});

exports.main = async (event, context) => {
  const cloudPath = `faas-nodejs-sdk/index.js`;
  const fileContent = fs.createReadStream(__filename);
  const result = await cloud.uploadFile({ cloudPath, fileContent });
  console.log("upload result: ", result);

  const download = await cloud.downloadFile({ fileID: result.fileID });
  console.log("download result: ", download);

  const tempFileResult = await cloud.getTempFileURL([ result.fileID ]);
  console.log("tempFileResult result: ", tempFileResult);

  const deleteFileResult = await cloud.deleteFile([ result.fileID ])
  console.log("delete file result: ", deleteFileResult);
  return result;
};