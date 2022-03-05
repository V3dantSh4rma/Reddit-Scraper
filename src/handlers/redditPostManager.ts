import * as https from 'https';
import { RedditPost } from './redditPost';
import * as http from 'http';

export class RedditApi {
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

  public async getFirst(subreddit?: string) {
    this.subredditUrl =
      subreddit ??
      this.subreddits[Math.floor(Math.random() * this.subreddits.length)];

    await this.getAll(this.subredditUrl);

    setTimeout(() => {
      return RedditPost.createPost(this.data[1].data);
    }, 6000);
  }

  public async getRandom(subreddit?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.subredditUrl =
          subreddit ??
          this.subreddits[Math.floor(Math.random() * this.subreddits.length)];

        const data: any = await this.getAll(this.subredditUrl);
        const randomIndex: number = Math.floor(
          Math.random() * data.length
        );

        // console.log(data[randomIndex].data);
        resolve(RedditPost.createPost(data[randomIndex].data));
      } catch (e) {
        reject(e);
      }
    });
    //return RedditPost.createPost(this.data[randomIndex].data);;
  }

  public async getLast(subreddit?: string): Promise<void> {
    this.subredditUrl =
      subreddit ??
      this.subreddits[Math.floor(Math.random() * this.subreddits.length)];

    await this.getAll(this.subredditUrl);

    setTimeout(() => {
      const randomIndex: number = Math.floor(Math.random() * this.data.length);
      return RedditPost.createPost(this.data[randomIndex].data);
    }, 6000);
  }
}
