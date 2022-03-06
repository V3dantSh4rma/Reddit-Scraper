import * as https from 'https';
import { RedditPost } from './redditPost';
import * as http from 'http';

export class Scraper {
    private subredditBase: string =
        'https://www.reddit.com/r/<subreddit>.json?limit=100';
    private subreddits: Array<string> = ['dankmemes', 'wholesomememes'];
    private randomSubreddit: string = this.subredditBase?.replace(
        '<subreddit>',
        this.subreddits[Math.floor(Math.random() * this.subreddits.length)]
    );
    private data: any = '';
    private subredditUrl?: string;

    private get(subredditUrl: string) {
        return new Promise((resolve, reject) => {
            https.get(subredditUrl, (res: http.IncomingMessage) => {
                let rawData: any = '';

                res.on('data', (chunk) => {
                    rawData += chunk;
                });

                res.on('end', () => {
                    // this.data = JSON.parse(rawData).data.children;
                    // resolve(JSON.parse(rawData).data.children);
                    resolve(JSON.parse(rawData).data.children);
                });

                res.on('error', (e: Error) => {
                    // console.log(e);
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

        return Promise.resolve(this.get(this.subredditUrl));
    }

    public async getFirst(subreddit?: string): Promise<any> {
        this.subredditUrl = subreddit ?? this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const data: any = await this.getAll(this.subredditUrl);

        return new Promise((resolve, reject) => {

            try{

                setTimeout(() => {
                    resolve(RedditPost.createPost(data[1].data));
                }, 6000);

            } catch(e){
                reject(e);
            }

        });

    }

    public async getRandom(subreddit?: string): Promise<any> {
        this.subredditUrl = subreddit ?? this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const data: any = await this.getAll(this.subredditUrl);

        return new Promise((resolve, reject) => {

            try{

                setTimeout(() => {
                    const randomIndex: number = Math.floor(Math.random()*data.length);
                    resolve(RedditPost.createPost(data[randomIndex].data));
                }, 6000);

            } catch(e){
                reject(e);
            }

        });

    }

    public async getLast(subreddit?: string): Promise<any> {

        this.subredditUrl = subreddit ?? this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const data: any = await this.getAll(this.subredditUrl);

        return new Promise((resolve, reject) => {

            try{

                setTimeout(() => {
                    const maxIndex: number = data.length - 1;
                    resolve(RedditPost.createPost(data[maxIndex].data));
                }, 6000);

            } catch(e){
                reject(e);
            }

        });

    }
}