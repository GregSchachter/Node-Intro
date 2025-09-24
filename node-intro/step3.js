const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path, bool, dest) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}`);
    } else if (!bool) {
      console.log(data);
    } else {
      try {
        fs.writeFile(dest, path, () => {
          console.log(`${dest} contains the content of ${path}`);
        });
      } catch (err) {
        console.log(err);
        console.log("Error trying to write file");
      }
    }
  });
}

async function webCat(url, bool, dest) {
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log("Error: Request failed with status code 404");
    return;
  }
  if (!bool) {
    console.log(res.data);
  } else {
    fs.writeFile(dest, res.data, () => {
      console.log(`${dest} conatins contents of ${url}`);
    });
  }
}

let write;
let destination;
let idx;

if (process.argv[2].includes("--out")) {
  write = true;
  destination = process.argv[3];
  idx = 4;
} else {
  write = false;
  destination = null;
  idx = 2;
}

if (process.argv[idx].includes("http")) {
  webCat(process.argv[idx], write, destination);
} else {
  cat(process.argv[idx], write, destination);
}
