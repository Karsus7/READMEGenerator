function makeHTML(data, gitData){
    badgeS = "";
    for (const badge of data.badges.split(";")){
        let[label, message] = badge.split(",")
        badgeS+=`![${label}badge](https://img.shields.io/static/v1?label=${label}&message=${message.split(" ").join("%20")}&color=success)`;
    }
    //markdown code in js files requires "`" before and after. See activity 09-NodeJS activity 24
    //note that this markdown code uses jquery.
return `
# ${data.repo} ${badgeS}
# by ${data.username} 
<img src="${gitData.avatar_url}" height="50" width="50"> \n
## Description
${data.description} \n
## Table of Contents
${data.contents[0]} \n
${data.contents[1]} \n
${data.contents[2]} \n
${data.contents[3]} \n
${data.contents[4]} \n
${data.contents[5]} \n
${data.contents[6]} \n
## Installation
${data.installation}
## Usage
${data.usage}
## License
${data.license}
## Contributors
${data.contributing}
## Tests
${data.tests}
## Questions

${data.questions}
`;
}

//module.exports allowss the entire makeHTML function to convert it's code into a README.md file.
module.exports = {
    make: (data, gitData)=>makeHTML(data, gitData)
}
