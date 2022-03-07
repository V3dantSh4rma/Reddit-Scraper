<h1 align="center"> Reddit Scraper </h1>

# About
@vedant/reddit is a nodejs library coded using javascript to make work for coders who are using the raw reddit api to make there lives easier. Thanks to [Ric](https://github.com/ricdotnet/) for helping me fix major part in the code.


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

# Possible errors
- 
# Usages
Typescript:

```typescript
import {Scraper} from "@vedant/reddit";

const manager = new Scraper();

// Using Async/Await
const post = await manager.getFirst('funny'); // Leaving this empty would use the default subreddits as given on 
console.log(post); // Print out the Reddit Post Object.
console.log(post.titl); // Print out the title of the reddit post.


// Using .then()
manager.getRandom().then(post => {
    console.log(post); // Print out the Object.
    console.log(post.title); // Print out the Post Title.
});
```

Javascript:
```javascript
const lib = require("@vedant/reddit")

const manager = new lib.Scraper();

// async/await
const post = await manager.getRandom();
console.log(post);
console.log(post.title);

//  .then()
manager.getLast().then((post) => {
    console.log(post); // Print out the Reddit Post object.
    console.log(post.title); // Print out the post title
})
```