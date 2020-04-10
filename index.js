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
            type: "checkbox",
            message: "Please provide a table of contents:",
            choices:["* [Installation](#installation)","* [Usage](#usage)","* [Credits](#credits)","* [License](#license)", "* [Badges](#badges)","* [Contributors](#contributors)"],
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





function generateREADME(answers) {
    // const queryUrl = 'https://api.github.com/users/${answers.username}/'
    // axios.get(queryUrl).then(function(res){

    //     return(res.avatar_url)
    // }

    return `

# ${answers.repo} by ${answers.username}

# ${answers.title} 

## Description 
${answers.description}

## Table of Contents (Optional)
${answers.contents[0]} \n
${answers.contents[1]} \n
${answers.contents[2]} \n
${answers.contents[3]} \n
${answers.contents[4]} \n
${answers.contents[5]} \n

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

// promptUser()
//     .then(function (answers) {
//         const txt = generateREADME(answers);

//         return writeFileAsync("README_.md", txt);
//     })
//     .then(function () {
//         console.log("Successfully wrote to README_.md");
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

    promptUser()
    .then(
        async function (answers) {
        try{
        const { username, repo, title, description, contents, installation, usage, credits, license, badges, contributing } = answers;
        const avatar = await githubData(username);
        return generateREADME(username, repo, title, description, contents, installation, usage, credits, license, badges, contributing, avatar);
    } catch (err) {
        console.log(err);
    }
}
    )
    // .then (function(text) {
    //     writeFileAsync("README_.md", text, "utf8");
    // })
    .catch(function(text) {
        console.log(err);
    }
    );
    function GithubData(username) {
        const avatar_url = await
        const queryUrl = 'https://api.github.com/search/users?q=${username}';

        return axios
        .get(queryUrl)
        .then(function (response){
            const { avatar_url } = response.data.items[0];
            return avatar_url;
    });
}
    // Copyright (c) 2020 Karsus7
    //https://img.shields.io/appveyor/build/Karsus7/Homework1