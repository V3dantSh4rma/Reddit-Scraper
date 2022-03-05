import {RedditApi} from "./redditPostManager";

export class RedditPost {

    static createPost(post: any) {

        const object: any = {};

        object.title = post.title;
        object.description = post.selftext;
        object.author = post.author;
        object.subreddit = `https://reddit.com/${post.subreddit_name_prefixed}`;
        object.upvotes = post.ups;
        object.downvotes = post.downs;
        object.thumbnail = post.thumbnail;
        object.nsfw = post.over_18;
        object.image_url = post.url;
        object.postLink = `https://reddit.com${post.permalink}`;
        console.log(object);

    }

}