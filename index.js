//GLobal variables, programs in json package
const fs = require("fs");
const inquirer = require('inquirer');
const util = require("util");
const axios = require("axios");
const readme = require("./html.js")

// See 09-NodeJS activities 33, and  40
const writeFileAsync = util.promisify(fs.writeFile);

// Get question answers as seen in 09-NodeJS activity 40
    function promptUser(){
        return inquirer
        .prompt([
        {
            type: "input",
            message: "Enter your github username:",
            name: "username"
        },
        {
            type: "input",
            message: "What is the name of the repository you wish to use?",
            name: "repo"
        },
        {
            type: "input",
            message: "Please provide a description for the project:",
            name: "description"
        },
        {
            type: "checkbox",
            message: "Please provide a table of contents:",
            choices:["* [Installation](#installation)","* [Usage](#usage)","* [Credits](#credits)","* [License](#license)","* [Contributors](#contributors)",
            "* [Testing](#testing)","* [Questions](#questions)",],
            name: "contents"
        },
        {
            type: "input",
            message: "Please provide a description of how to install your project:",
            name: "installation"
        },
        {
            type: "input",
            message: "Please explain how your project is used:",
            name: "usage"
        },
        {
            type: "input",
            message: "List anyone who assisted you in making this project:",
            name: "credits"
        },
        {
            type:"list",
            message:"Enter information about your licensing: ",
            name: 'license',
            choices:[
                "MIT",
                "Unlicense"
            ]
        },
        {
            type: "input",
            message: "Please provide any badges you wish to use (must be formatted in the following way: 'label,message')",
            name: "badges"
        },
        {
            type: "input",
            message: "Please add any guidelines for how, or if you want others to contribute to this project:",
            name: "contributing"
        },
        {
            type: "input",
            message:"Please explain how this project was tested: ",
            name: "testing"
        },
        {
            type: "input",
            message: "Feel free to type any additional questions: ",
            name: "questions"
        }

    ]);
}

// See activity 09-NodeJS activity 40
        async function init () {
    try{
        // "await" prevents activation before prompts have been answered.
        const data = await promptUser();
        const queryUrl = `https://api.github.com/users/${data.username}`;
        
        //make call to github api. See activity 09-NodeJS activity 33
        const gitData = await axios
        .get(queryUrl).then(function (response){
        //Axios returns the img from profile. See activity 09-NodeJS activity 33
            const{avatar_url} = response.data;
            return {avatar_url};
        })

// Puts answers into README2.md with data pulled from html.js. Specifically from the module.exports line.
        const site = readme.make(data, gitData);
        await writeFileAsync("README2.md", site, "utf8");
        console.log("Succsessfully wrote file");
        //confirm success
    }
    catch (err){
        return console.log(err);
    }
}
//above (err) identifies errors in program. See activity 09-NodeJS activity 33

//Placed at the bottom to initiate async function. See activity 09-NodeJS activity 40
init();
