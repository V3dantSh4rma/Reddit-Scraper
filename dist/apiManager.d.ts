export declare class Scraper {
    private subredditBase;
    private subreddits;
    private randomSubreddit;
    private data;
    private subredditUrl?;
    private get;
    private getAll;
    getFirst(subreddit?: string): Promise<any>;
    getRandom(subreddit?: string): Promise<any>;
    getLast(subreddit?: string): Promise<any>;
}
