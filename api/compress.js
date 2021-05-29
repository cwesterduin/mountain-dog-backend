const sharp = require('sharp');
const { uploadToS3 } = require('./aws_s3')

const compress = (file, quality) => {
  sharp(file)
    .resize(1650)
    .webp({ quality: quality })
    .toBuffer({ resolveWithObject: true })
    .then((data) => {
      if (data.info.size < 40000) {
        uploadToS3(data.data, "a" + String(Math.random()).replace(".",""))
      }
      else {
          console.log(data.info.size)
          let newquality = quality - 20
          compress(data.data, newquality)
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = compress