const ImageKit = require('@imagekit/nodejs');
const { model } = require('mongoose');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: "image.jpg"
    })

    return result;
}

module.exports = uploadFile;