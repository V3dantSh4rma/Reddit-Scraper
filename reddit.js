/*const https = require('https');

let data = '';

const generatePost = async () => {
    await https.get("https://www.reddit.com/r/dankmemes.json", function(res){

        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });

        res.on('end', async () => {
            data = (JSON.parse(rawData));
            console.log(data.data.children[1].data.title);
        });
    });
};

generatePost().then();*/

const base = 'https://www.reddit.com/r/<subreddit>.json';
const _subreddits = ["dankmemes", "wholesomememes"];
console.log(base.replace('<subreddit>', _subreddits[Math.floor(Math.random() * _subreddits.length)]));