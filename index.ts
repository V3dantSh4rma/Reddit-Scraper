import {RedditApi, RedditPost} from "./src";

const c: RedditApi = new RedditApi();

c.getRandom().then((post) => {
    console.log(post);
})

// async function init() {
  // const post = await c.getRandom();

  // console.log(post);
// }

// init();