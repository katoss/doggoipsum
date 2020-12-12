// Code that generates a random lorem ipsum text

// read source text into array
var fs = require('fs');
var doggoarray = fs.readFileSync('texts.txt').toString().split("\n");
doggoarray = doggoarray.map(s => s.trim());

// Create a new object called loremIpsum by invoking the GenerateNewText constructor function
const loremIpsum = new GenerateNewText();

// Constructor function that creates an object with the sentences property
function GenerateNewText() {
    // Add property to the object
    this.sentences = doggoarray;
    this.punctuation = [".", ",", "!", "?", ".", ",", ",", "!!", ".", ","];
}

// Method to the GenerateNewText constructor function that generates a random sentence
GenerateNewText.prototype.getRandomSentence = function() {
    let randomSentence = this.sentences[Math.floor(Math.random() * this.sentences.length)]
    return randomSentence;
}

// Method to the GenerateNewText constructor function that generates a paragraph from random sentences
GenerateNewText.prototype.getParagraph = function() {
    let paragraph = "";
    // Set the minimum number of words
    let minimumCharacterLength = 500;
    let firstSentence = true;
    while (paragraph.length < minimumCharacterLength) {
        sentence = this.getRandomSentence();
        if(firstSentence) {
            // choose a random element from the sentences-array, turn the first letter to upper case and add a random punctuation mark
            paragraph = paragraph.concat(sentence.charAt(0).toUpperCase() + sentence.slice(1) + this.punctuation[Math.floor(Math.random() * this.punctuation.length)]); 
            firstSentence = false;
        } else {
            if (paragraph.slice(-1) == ",") {
                paragraph = paragraph.concat(" " + sentence + this.punctuation[Math.floor(Math.random() * this.punctuation.length)]);
            } else {
                // Turn first letter to upper case if punctuation mark before is not ","
                paragraph = paragraph.concat(" " + sentence.charAt(0).toUpperCase() + sentence.slice(1) + this.punctuation[Math.floor(Math.random() * this.punctuation.length)]);
            }
            
        }
    }
    paragraph = paragraph.slice(0, -1) + ".";
    return paragraph;
}

// Method to the GenerateNewText constructor function that generates multiple paragraphs from paragraphs
GenerateNewText.prototype.getAllParagraphs = function(numberOfParagraphs) {
    let allParagraphs = [];
    // Generate the number of paragraphs as specified by the user
    while (allParagraphs.length < numberOfParagraphs) {
        allParagraphs.push(this.getParagraph());
    }
    // Convert array into HTML string
    let paragraphHTML = "";
    allParagraphs.forEach(function (paragraph) {
        paragraphHTML += "<p>" + paragraph + "</p>";
    });
    return paragraphHTML;
}

module.exports = loremIpsum;