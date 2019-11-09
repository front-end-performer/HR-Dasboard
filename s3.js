const aws = require('aws-sdk');
const fs = require('fs');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = function (req, res, next) {
    if (!req.file) {
        res.sendStatus(500);
        return;
    }
    const { filename, mimetype, size, path } = req.file; // 1 uidSafe, 2 content type(img/png), 3 amount of bites in a file, 4 full path to the file
    s3.putObject({
        Bucket: 'spicedling',
        ACL: 'public-read',
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    }).promise().then(() => {
        // it worked!!! file in a bucket
        // console.log("promise, result", result);
        next();
    }).catch(
        err => {
            // uh oh
            console.log("promise error", err.message);
            res.sendStatus(500);
        }
    );
};