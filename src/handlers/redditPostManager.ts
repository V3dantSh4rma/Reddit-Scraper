import https from "https";
import { RedditPost } from "./redditPost";

export class RedditApi {
    private subredditBase: string = "https://www.reddit.com/r/<subreddit>.json?limit=100";
    private subreddits: Array<string> = ["dankmemes", "wholesomememes"];
    private randomSubreddit: string = this.subredditBase?.replace('<subreddit>', this.subreddits[Math.floor(Math.random() * this.subreddits.length)]);
    private data: any = '';


    public async getFirst(subreddit?: string) {
        let subredditURL: string;

        if(subreddit){
            subredditURL = this.subredditBase.replace('<subreddit>', subreddit);
        } else {
            subredditURL = this.randomSubreddit;
        }


        const res = https.get(subredditURL, (res) => {

            let rawData: any = '';

            res.on('data', async (chunk) => {
                rawData += chunk;
            });

            res.on('end', async () => {
                this.data = JSON.parse(rawData);

                const randomIndex = Math.floor(Math.random()*this.data.data.children.length);
                return RedditPost.createPost(this.data.data.children[3].data);
            });

            res.on('error', (e: Error) => {
                console.log(e);
            });

        });

        res.end();
    };
}