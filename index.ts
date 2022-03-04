import { RedditApi } from "./src";

const c = new RedditApi();

c.getFirst('copypasta').then((c: void) => {
    console.log(c);
});