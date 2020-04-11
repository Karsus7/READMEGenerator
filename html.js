function makeHTML(data, gitData){
    badgeString = "";
    for (const badge of data.badges.split(";")){
        let[label, message] = badge.split(",")
        badgeString+=`![${label}badge](https://img.shields.io/static/v1?label=${label}&message=${message.split(" ").join("%20")}&color=success)`;
    }
return `
# ${data.repo} ${badgeString}
# by ${data.username} 
<img src="${gitData.avatar_url}" height="75" width="75"> \n
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

module.exports = {
    make: (data, gitData)=>makeHTML(data, gitData)
}
