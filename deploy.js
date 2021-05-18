// # #!/usr/bin/env sh

// # # abort on errors
// # set -e

// # # build
// # npm run build

// # # navigate into the build output directory
// # cd dist

// # # if you are deploying to a custom domain
// # # echo 'www.example.com' > CNAME

// # git init
// # git add -A
// # git commit -m 'deploy'

// # # if you are deploying to https://<USERNAME>.github.io
// # # git push -f https://github.com/cvandradg/german-motors.github.io.git master

// # # if you are deploying to https://<USERNAME>.github.io/<REPO>
// # git push -f git@github.com:https://github.com/cvandradg/german-motors-client.git master:gh-pages

// # cd -
/* eslint-disable no-console */
const execa = require("execa");
const fs = require("fs");
(async () => {
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    // eslint-disable-next-line no-console
    console.log("Building started...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();