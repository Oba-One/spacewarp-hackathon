require("dotenv").config();

const glob = require("glob");
const path = require("path");

const lighthouse = require("@lighthouse-web3/sdk");

const apiKey = process.env.LIGHTHOUSE_API_KEY;

const forEachSeries = async (iterable, action) => {
  for (const x of iterable) {
    await action(x);
  }
};

const uploadAsset = async (path) => {
  try {
    // Both file and folder supported by upload function

    const response = await lighthouse.upload(path, apiKey);

    // Display response
    console.log("Upload Success", response);
    console.log(
      "Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash
    );
  } catch (error) {
    console.log("Upload Error", error);
  }
};

const srcPath = path.resolve(__dirname + "/../src/**/*.png");

console.log(apiKey, srcPath, "srcPath");

glob(srcPath, {}, async (err, files) => {
  console.log(files);

  if (err) {
    console.log("Error", err);
    return;
  }

  forEachSeries(files, uploadAsset);
});
