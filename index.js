const express = require("express");
const fetch = require("node-fetch");

const app = express();

inputList = process.argv.slice(2);

fetch(`http://history.muffinlabs.com/date/${inputList[1]}/${inputList[0]}`)
  .then((response) => response.json())
  .then((data) => createOutput(data["data"]));

var output = "";
function createOutput(data) {
  for (var category of ["Events", "Births", "Deaths"]) {
    var categoryText = "";
    for (var record of data[category]) {
      var recordText = `${record["year"]} : ${record["text"]} <br>`;
      categoryText = categoryText + recordText;
    }
    output = output + `<h1>${category}</h1>` + categoryText + "<br><br>";
  }
}

app.use("/", function (req, res) {
  res.send(output);
});

app.listen(3002);
