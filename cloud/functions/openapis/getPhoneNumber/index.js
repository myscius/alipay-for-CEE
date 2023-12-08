const crypto = require('crypto');

// O 站控制台上，配置的密钥，当前配置云开发环境变量中，直接从环境变量中获取，测试可以直接写在本地
let key = process.env.key;

exports.main = async (event, context) => {
  
  //前端获取到加密报文
  let crypted = event.crypted;
  //let crypted = "7yoSxiW1hiW0KNv+jXTHO37aqLfZ2i2tus9REam7qxSY801uX0TGz7TzmnlDYu4I73itkYhls+AK8RaM0PxIzaeutAIzY36dWbbj/a/IBUFBznaZae6teZ6wl9E+n5xgO0WtDoSKY6Dpx1GJ0h1n4n226kW/6U9ET6iT1XPsPbssJOA1VlEiNF8uRPhRn23bXasgLevyamrXDRjplpNOPS40FFCDHb6916bejMV0b8LJI1/k0616D4y9YRjqnD/ROcZOgXFlSnzDoLTx0dov1DKa6m+iQpb4txOVsAGcZc70EsIP8qhcCY+IlUnf1n0YZvPyNBM7A/ueddSqG5YH55xxGnTGCFask/FhHqAJyzE=";
  crypted = Buffer.from(crypted, 'base64').toString('binary');
  key = Buffer.from(key, 'base64');
  const iv = Buffer.alloc(16, 0)
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decoded = decipher.update(crypted, 'binary', 'utf8');
      decoded += decipher.final('utf8');
  
  //打印解密结果
  console.log(decoded);

  return decoded;
};