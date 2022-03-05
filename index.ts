import {RedditApi, RedditPost} from "./src";

const c: RedditApi = new RedditApi();

const post: RedditApi = c.getRandom().then((post) => {
    console.log(post);
})