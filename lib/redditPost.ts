export class RedditPost {

	public title?: string;
	public description?: string;
	public author?: string;
	public subreddit?: string;
	public upvotes?: number;
	public downvotes?: number;
	public thumbnail?: string;
	public nsfw?: boolean;
	public image_url?: string;
	public postLink?: string;

	static createPost(post: any): RedditPost {
		const object = new this();

		object.title       = post.title;
		object.description = post.selftext;
		object.author      = post.author;
		object.subreddit   = `https://reddit.com/${post.subreddit_name_prefixed}`;
		object.upvotes     = post.ups;
		object.downvotes   = post.downs;
		object.thumbnail   = post.thumbnail;
		object.nsfw        = post.over_18;
		object.image_url   = post.url;
		object.postLink    = `https://reddit.com${post.permalink}`;

		return object;
	}

}
