"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditPost = void 0;
class RedditPost {
    static createPost(post) {
        const object = {};
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
        return object;
    }
}
exports.RedditPost = RedditPost;
