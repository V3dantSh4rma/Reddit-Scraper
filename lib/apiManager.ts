import * as https from 'https';
import { RedditPost } from './redditPost';
import * as http from 'http';

export class Scraper {

    private subredditBase: string     = 'https://www.reddit.com/r/<subreddit>.json?limit=100';
    private subreddits: Array<string> = ['dankmemes', 'wholesomememes'];
    private randomSubreddit: string   = this.subredditBase?.replace('<subreddit>', this.subreddits[Math.floor(Math.random() * this.subreddits.length)]);
    private data: any                 = '';
    private subredditUrl?: string;


	public static usingSubReddits(subs : string[]) : Scraper {
		const inst      = new this();
		inst.subreddits = subs;
		return inst;
	}

    private get(subredditUrl: string) {
        return new Promise((resolve, reject) => {
            https.get(subredditUrl, (res: http.IncomingMessage) => {
                let rawData: any = '';

                res.on('data', (chunk) => {
                    rawData += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(rawData).data.children);
                });

                res.on('error', (e: Error) => {
                    reject(e);
                });
            });
        });
    }

    private async getAll(subreddit?: string) {
        if (subreddit) {
            this.subredditUrl = this.subredditBase.replace('<subreddit>', subreddit);
        } else {
            this.subredditUrl = this.randomSubreddit;
        }

        return this.get(this.subredditUrl);
    }

    public async getFirst(subreddit?: string): Promise<RedditPost> {
        this.subredditUrl = subreddit ?? this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const data: any   = await this.getAll(this.subredditUrl);

        return RedditPost.createPost(data[1].data);
    }

    public async getRandom(subreddit?: string): Promise<RedditPost> {
        this.subredditUrl         = subreddit ?? this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const data: any           = await this.getAll(this.subredditUrl);

	    const randomIndex: number = Math.floor(Math.random()*data.length);
	    return RedditPost.createPost(data[randomIndex].data);
    }

    public async getLast(subreddit?: string): Promise<RedditPost> {
        this.subredditUrl      = subreddit ?? this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const data: any        = await this.getAll(this.subredditUrl);

	    const maxIndex: number = data.length - 1;
	    return RedditPost.createPost(data[maxIndex].data);
    }

}