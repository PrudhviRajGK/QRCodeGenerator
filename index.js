import inquirer from "inquirer";
import qr from "qr-image"; // install using: npm install qr-image
import fs from "fs";       // built-in module

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "URL"
    }
  ])
  .then((answers) => {
    const url = answers.URL;

    // 1. Create QR Code Image
    const qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr-image.png'));

    // 2. Save URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved to URL.txt and QR image has been created as qr-image.png");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong:", error);
    }
  });


