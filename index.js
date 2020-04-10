const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
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
            message: "What is the title of the project?",
            name: "title"
        },
        {
            type: "input",
            message: "Please provide a description for the project:",
            name: "description"
        },
        {
            type: "checklist",
            message: "Please provide a table of contents:",
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
            type: "input",
            message: "Please provide any licenses you wish to use:",
            name: "license"
        },
        {
            type: "input",
            message: "Please provide any badges you wish to use:",
            name: "badges"
        },
        {
            type: "input",
            message: "Please add any guidelines for how, or if you want others to contribute to this project:",
            name: "contributing"
        },

    ])}

function writeToFile(fileData) {
    fs.writeFile("README_.md", fileData, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("SUCCESS");
    })
}


// fs.writeFile("README_.md", generateREADME())



function generateREADME(answers) {
    return `

# ${answers.repo} by ${answers.username}

# Your Project Title
    ${answers.title}

## Description 
    ${answers.description}

## Table of Contents (Optional)
    ${answers.contents[0]} \n
    ${answers.contents[1]} \n
    ${answers.contents[2]} \n
    ${answers.contents[3]} \n
    ${answers.contents[4]} \n

## Installation
    ${answers.installation}


## Usage 
    ${answers.usage}

## Credits
    ${answers.credits}

## License
    ${answers.license}

## Badges
    ${answers.badges}

## Contributing
    ${answers.contributing}

`}

promptUser()
    .then(function (answers) {
        const txt = generateREADME(answers);

        return writeFileAsync("README_.md", txt);
    })
    .then(function () {
        console.log("Successfully wrote to README_.md");
    })
    .catch(function (err) {
        console.log(err);
    });