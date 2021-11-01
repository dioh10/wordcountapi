const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log('Server ready...')
);

app.get('/test', (req, res) => {
    res.status(200).send({
        "message": "This is a test",
        "code": "This is a code test"
    });
});

app.post('/text', (req, res) => {
    const text = req.body.text;
    const words = text.split(' ');
    const wordCount = {};
    words.forEach(word => {
        word = checkPunctuation(word);
        if (word in wordCount) {
            wordCount[word]++;
        } else {
            wordCount[word] = 1;
        }
    });
    res.status(200).send({
        "messge": "Success",
        "code": "200",
        "data": wordCount
    });
});

function checkPunctuation(word) {
    const punctuation = ['.', ',', '!', '?', ';', ':', '"', "'", '`', '~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\', '<', '>', '/', ' '];
    for (let i = 0; i < punctuation.length; i++) {
        if (word.includes(punctuation[i])) {
            word = word.replace(punctuation[i], '');
        }
    }
    return word;
}