require("dotenv").config();

const glob = require("glob");

const lighthouse = require("@lighthouse-web3/sdk");

const apiKey = process.env.LIGHTHOUSE_API_KEY;

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

glob(__dirname + "/src/**/*.png", {}, async (err, files) => {
  console.log(files);

  if (err) {
    console.log("Error", err);
    return;
  }

  await Promise.all(files.map((file) => uploadAsset(file)));
});
