"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const https = require("https");
const redditPost_1 = require("./redditPost");
class Scraper {
    constructor() {
        var _a;
        this.subredditBase = 'https://www.reddit.com/<subreddit>.json?limit=100';
        this.subreddits = ['dankmemes', 'wholesomememes'];
        this.randomSubreddit = (_a = this.subredditBase) === null || _a === void 0 ? void 0 : _a.replace('<subreddit>', this.subreddits[Math.floor(Math.random() * this.subreddits.length)]);
        this.data = '';
    }
    get(subredditUrl) {
        return new Promise((resolve, reject) => {
            https.get(subredditUrl, (res) => {
                let rawData = '';
                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(rawData).data.children);
                });
                res.on('error', (e) => {
                    reject('Invalid Subreddit!');
                });
            });
        });
    }
    getAll(subreddit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (subreddit) {
                this.subredditUrl = this.subredditBase.replace('<subreddit>', subreddit);
            }
            else {
                this.subredditUrl = this.randomSubreddit;
            }
            return Promise.resolve(this.get(this.subredditUrl));
        });
    }
    getFirst(subreddit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.subredditUrl = subreddit !== null && subreddit !== void 0 ? subreddit : this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
            const data = yield this.getAll(this.subredditUrl);
            return new Promise((resolve, reject) => {
                try {
                    resolve(redditPost_1.RedditPost.createPost(data[1].data));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    getRandom(subreddit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.subredditUrl = subreddit !== null && subreddit !== void 0 ? subreddit : this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
            const data = yield this.getAll(this.subredditUrl);
            return new Promise((resolve, reject) => {
                try {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    resolve(redditPost_1.RedditPost.createPost(data[randomIndex].data));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
    getLast(subreddit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.subredditUrl = subreddit !== null && subreddit !== void 0 ? subreddit : this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
            const data = yield this.getAll(this.subredditUrl);
            return new Promise((resolve, reject) => {
                try {
                    if (data === null || undefined) {
                        console.error('Invalid Subreddit.');
                        return;
                    }
                    ;
                    const maxIndex = data.length - 1;
                    resolve(redditPost_1.RedditPost.createPost(data[maxIndex].data));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
exports.Scraper = Scraper;
