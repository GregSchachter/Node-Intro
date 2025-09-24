const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}`);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    const res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.log("Error: Request failed with status code 404");
  }
}

if (process.argv[2].includes("http")) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
