const fs = require("fs");
const inquirer = require('inquirer');
const util = require("util");
const axios = require("axios");
const readme = require("./html.js")

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
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
                "mpl 2.0",
                "Boost Software License",
                "Unlicense"
            ]
        },
        {
            type: "input",
            message: "Please provide any badges you wish to use (formatting: 'label,message')",
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

    ]

// get question answers
function promptUser(){
    return inquirer
    .prompt(
        questions
    )
}


        async function init () {
    try{
                // "await" prevents early activation
        const data = await promptUser();
        const queryUrl = `https://api.github.com/users/${data.username}`;
        
        //make call to github api
        const gitData = await axios
        .get(queryUrl).then(function (response){
        //return the img
            const{avatar_url} = response.data;
            return {avatar_url};
        })


        const site = readme.make(data, gitData);
        await writeFileAsync("README2.md", site, "utf8");
        console.log("Succsessfully wrote file");
    }
    catch (err){
        return console.log(err);
    }
}


init();
