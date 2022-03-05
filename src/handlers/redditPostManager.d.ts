export declare class RedditApi {
    private subredditBase;
    private subreddits;
    private randomSubreddit;
    private data;
    private subredditUrl?;
    private getAll;
    getFirst(subreddit?: string): Promise<void>;
    getRandom(subreddit?: string): Promise<void>;
    getLast(subreddit?: string): Promise<void>;
}
