<h1 align="center"> Reddit Scraper </h1>


# About
**@vedantsharma/reddit** is a nodejs library coded using javascript to make work for coders who are using the raw reddit api to make there lives easier. Thanks to [Ric](https://github.com/ricdotnet/) and [Sam](https://github.com/idevelopThings/) for helping me remove the irrelevant part and fixing bugs.

# Installation
```
npm install @vedantsharma/reddit
```

# Overview
The parameters are optional. So... the default subreddits are "dankmemes" and "wholesomememes".

Below are the Given Methods.
```
getRandom();
getLast();
getFirst();
```

before using all this, you have to set up the instances, which is by doing the given:
```typescript
import {Scraper} from "@vedant/reddit";
const a = new Scraper();
```

# Usages/Examples

- Typescript
```typescript
import {Scraper, RedditPost} from "@vedantsharma/reddit";

const manager: Scraper = new Scraper();

const post: RedditPost = await manager.getFirst('funny'); // Leaving this empty would use the default subreddits as given on 
console.log(post); // Print out the Reddit Post Object.
console.log(post.title); // Print out the title of the reddit post.
```

- Javascript
```javascript
const lib = require("@vedantsharma/reddit");

const manager = new lib.Scraper();
manager.getFirst('funny').then(post => {
    console.log(post);
});
```
