/** utility functions **/

import React from "react";

/** Subreddit and comment search options. Presently not used but useful for reference. **/
export interface SubredditSearchOptions {
    subreddit: string;
    after?: number;
    before?: number;
    sort?: string;
    sort_type?: string;
    limit?: number;
}
export interface CommentSearchOptions {
    subreddit: string;
    parent_post?: string;
    parent_comment?: string;
    after?: any;
    before?: number;
    reply_delay?: string;
    utc_hour_of_week?: number;
    utc_hour_of_day?: number;
    size?: number;
    filter?: string;
    sortField?: string;
    sortDirection?: string;
    length?: string;
    user_removed?: string;
    mod_removed?: string;
    nest_level?: number;
    keyword?: string;
    author?: string;
    score?: string;
    gilded?: string;
}
/** TwelveStore API (Stocks/Finance) known types **/
export interface TwelveHistoricalData {
    id: number;
    meta_currency: string;
    meta_exchange: string;
    meta_exchange_timezone: string;
    meta_interval: string;
    meta_symbol: string;
    meta_type: string;
    status: string;
    values: TwelveHistoricalSnippet[]
}
export interface TwelveHistoricalSnippet {
    close: string;
    datetime: string;
    high: string;
    low: string;
    open: string;
    volume: string;
}
export interface TwelveDbHistoricalRequest {
    currency: string;
    exchange: string;
    exchange_timezone: string;
    interval: string;
    symbol: string;
    type: string;
    status: string;
    date_start: string;
    date_end: string;
}
export interface TwelveDbHistoricalValues {
    request_id: number;
    ticker: string;
    close: string;
    datetime: string;
    high: string;
    low: string;
    open: string;
    volume: string;
}

/** RedditFullPost (reference): contains all known attributes for a reddit post. **/
export interface RedditFullPost {
    kind: string;
    data: {
        approved_at_utc: any;
        subreddit: string;
        selftext: string;
        author_fullname: string;
        saved: boolean;
        mod_reason_title: any;
        gilded: number;
        clicked: boolean;
        title: string;
        link_flair_richtext: [{
            e: string;
            t: string;
        }];
        subreddit_name_prefixed: string;
        hidden: boolean;
        pwls: number;
        link_flair_css_class: string;
        downs: number;
        thumbnail_height: any;
        top_awarded_type: any;
        hide_score: boolean;
        name: string;
        quarantine: boolean;
        link_flair_text_color: string;
        upvote_ratio: any;
        author_flair_background_color: string;
        subreddit_type: string;
        ups: number;
        total_awards_received: number;
        media_embed: {},
        thumbnail_width: any;
        author_flair_template_id: any;
        is_original_content: boolean;
        user_reports: any[];
        secure_media: any;
        is_reddit_media_domain: boolean;
        is_meta: boolean;
        category: any;
        secure_media_embed: {},
        link_flair_text: string;
        can_mod_post: boolean;
        score: number;
        approved_by: any;
        author_premium: boolean;
        thumbnail: string;
        edited: boolean;
        author_flair_css_class: string;
        author_flair_richtext: [{
            e: string;
            t: string;
        }],
        gildings: {
            gid_1: number;
        },
        content_categories: any;
        is_self: boolean;
        mod_note: any;
        created: number;
        link_flair_type: string;
        wls: number;
        removed_by_category: any;
        banned_by: any;
        author_flair_type: string;
        domain: string;
        allow_live_comments: boolean;
        selftext_html: string;
        likes: any;
        suggested_sort: string;
        banned_at_utc: any;
        view_count: any;
        archived: boolean;
        no_follow: boolean;
        is_crosspostable: boolean;
        pinned: boolean;
        over_18: boolean;
        all_awardings: [{
            giver_coin_reward: any;
            subreddit_id: any;
            is_new: boolean;
            days_of_drip_extension: number;
            coin_price: number;
            id: string;
            penny_donate: any;
            award_sub_type: string;
            coin_reward: number;
            icon_url: string;
            days_of_premium: number;
            tiers_by_required_awardings: any;
            resized_icons: [
                {
                    url: string;
                    width: number;
                    height: number;
                }
            ],
            icon_width: number;
            static_icon_width: number;
            start_date: any;
            is_enabled: boolean;
            awardings_required_to_grant_benefits: any;
            description: string;
            end_date: any;
            subreddit_coin_reward: number;
            count: number;
            static_icon_height: number;
            name: string;
            resized_static_icons: [
                {
                    url: string;
                    width: number;
                    height: number;
                }
            ],
            icon_format: any;
            icon_height: number;
            penny_price: any;
            award_type: string;
            static_icon_url: string;
        }],
        awarders: any[];
        media_only: boolean;
        link_flair_template_id: string;
        can_gild: boolean;
        spoiler: boolean;
        locked: boolean;
        author_flair_text: string;
        treatment_tags: any[];
        visited: boolean;
        removed_by: any;
        num_reports: any;
        distinguished: string;
        subreddit_id: string;
        mod_reason_by: any;
        removal_reason: any;
        link_flair_background_color: string;
        id: string;
        is_robot_indexable: boolean;
        report_reasons: any;
        author: string;
        discussion_type: any;
        num_comments: number;
        send_replies: boolean;
        whitelist_status: string;
        contest_mode: boolean;
        mod_reports: any[];
        author_patreon_flair: boolean;
        author_flair_text_color: string;
        permalink: string;
        parent_whitelist_status: string;
        stickied: boolean;
        url: string;
        subreddit_subscribers: number;
        created_utc: number;
        num_crossposts: number;
        media: any;
        is_video: boolean;
    }
}

/** RawResponse: not a real object. Reddit .json returns a RawKind[] array. **/
export interface RawResponse {
    // querying reddit with .json returns this object
    // returns an array of RawKinds
}
/** RawKind: reddit's main object type. t1 = comment, t3 = selfpost. **/
export interface RawKind {
    kind: string;
    data: RawListing | RawComment;
    after?: any;
    before?: any;
}
/** RawListingData: contains comments etc for a post. **/
export interface RawListing {
    modhash: string;
    dist: any;
    children: RawKind[];
    after: string | number;
    before: string | number;
}
/** RawCommentData: contained inside a RawKind which contains comments. **/
export interface RawComment {
    children: RawKind[];
    replies: RawKind[];
    user_reports: any;
    saved: boolean;
    id: string;
    banned_at_utc: any;
    mod_reason_title: any;
    gilded: number;
    archived: boolean;
    no_follow: boolean;
    author: string;
    can_mod_post: boolean;
    send_replies: boolean;
    parent_id: string;
    score: number;
    author_fullname: string;
    report_reasons: any;
    approved_by: any;
    all_awardings: any;
    subreddit_id: string;
    body: string;
    edited: boolean;
    downs: number;
    author_flair_css_class: any;
    is_submitter: boolean;
    collapsed: boolean;
    author_flair_richtext: any;
    author_patreon_flair: boolean;
    body_html: string;
    gildings: any;
    collapsed_reason: any;
    associated_award: any;
    stickied: boolean;
    author_premium: boolean;
    subreddit_type: string;
    can_gild: boolean;
    top_awarded_type: any;
    author_flair_text_color: any;
    score_hidden: boolean;
    permalink: string;
    num_reports: any;
    locked: boolean;
    name: string;
    created: number;
    subreddit: string;
    author_flair_text: any;
    treatment_tags: any;
    created_utc: number;
    subreddit_name_prefixed: string;
    controversiality: number;
    depth: number;
    author_flair_background_color: any;
    collapsed_because_crowd_control: any;
    mod_reports: any;
    mod_note: any;
    distinguished: any;
}
/** Data usage stats. **/
export interface DataUsageObject {
    rxTwelveStore: number;
    txTwelveStore: number;
    rxReddit: number;
    txReddit: number;
    rxPush: number;
    txPush: number;
    rxNumTwelveStore: number;
    txNumTwelveStore: number;
    rxNumReddit: number;
    txNumReddit: number;
    rxNumPush: number;
    txNumPush: number;
}

// const STOCKS_API = 'https://localhost/stocks_api/';
// const REDDIT_API = 'http://api.pushshift.io/reddit/';

/** Output a RawKind array as a main post and a list of comments **/
export function rawDisplayAsHtml(kindArray: RawKind[]): any {
    // init vars
    let item;
    // check if array is valid
    if ( rawIsKindArray(kindArray) ) {
        // continue
        console.log('array is valid');

        // check if first item is a post
        item = kindArray[0];
        if ( rawIsValidPost(item) ) {
            console.log('Found a valid post. Parsing...');
            // figure out what kind of post
            // if selfpost, display text
            // if image, display image/gallery
            // if link, display link
        }

        // check if second item has comments
        item = kindArray[1];
        if ( rawIsCommentList(item) ) {
            console.log('Found comments. Getting comments from array...');
            // get comments array
            // item.data.children should be array of RawKind[] with kind === 't1'
            let comments = item.data.children;
            // output html for the array
            let html = '';
            comments.forEach((item: any) => {
                html += (
                    <div className={'af-comment'} key={randomKey()}>
                        <div className={'author-row'}>
                            <div className={'points'}>{item.score}</div>
                            <div className={'author'}>{item.author}</div>
                        </div>
                        <div className={'body-row'}>
                            <div className={'body-text'}>{item.body}</div>
                        </div>
                        <div className={'opts-row'}>
                            <div className={'time'}>{dhmSince(item.created_utc)}</div>
                            <div className={'opts'}>options</div>
                            <div className={'link'}>
                                <a href={'https://www.reddit.com' + item.permalink}>[view on reddit]</a>
                            </div>
                        </div>
                    </div>
                );
            });
            return html;
        }
    } else {
        // fail
        console.log('Could not parse kind array.');
        return `<div>Could not load!</div>`;
    }
}

/** Get a param from an array and parse it as a GET variable (&var=value) **/
export function parseAsUrlParam(arr: any, key: string): string {
    let result = '';
    // check if the array & the key are real
    if ( arr && key && arr[key] ) {
        // parse as a url parameter
        result = '&' + key + '=' + arr[key];
    }
    return result;
}
/** Get posts from url like: https://www.reddit.com/subreddit=sub.json **/
export function rawGetPosts(options: any): Promise<any> {
    let url = 'https://www.reddit.com/r/';
    // validate required options
    if ( options ) {
        // specify subreddit
        if ( options.subreddit ) { url += options.subreddit; }
        else { url += 'all'; }

        // handle sort
        if ( options.sort ) { url += '/' + options.sort + '/'; }

        // tell reddit to give us json
        url += '.json?raw_json=1';

        // add GET params to url
        url += parseAsUrlParam(options, 'sort');
        url += parseAsUrlParam(options, 't');
        url += parseAsUrlParam(options, 'sort_type');
        url += parseAsUrlParam(options, 'after');
        url += parseAsUrlParam(options, 'before');
        url += parseAsUrlParam(options, 'q');
        // get include_over_18
        if ( getAllowNsfw() === 'false' ) {
            url += '&include_over_18=false';
        } else {
            url += '&include_over_18=true';
        }

        console.log('json posts url: ' + url);
        // log data usage for the user
        recordDataUsage('reddit', 'tx', url);
        // get the data
        return fetch(url)
            // parse the data as json
            .then(res => res.json())
            .then((data) => {
                // log data usage for the user
                recordDataUsage('reddit', 'rx', data);
                // console.log(data);
                return data;
            });
    } else {
        // return a fake promise
        return fetch('');
    }
}
export function rawSearchPosts(options: any): Promise<any> {
    let url = 'https://www.reddit.com/search.json?raw_json=1';
    // validate required options
    if ( options ) {
        // handle sort
        if ( options.sort ) { url += '/' + options.sort + '/'; }

        // add GET params to url
        url += parseAsUrlParam(options, 'sort');
        url += parseAsUrlParam(options, 't');
        url += parseAsUrlParam(options, 'sort_type');
        url += parseAsUrlParam(options, 'after');
        url += parseAsUrlParam(options, 'before');
        url += parseAsUrlParam(options, 'q');
        // get include_over_18
        if ( getAllowNsfw() === 'false' ) {
            url += '&include_over_18=false';
        } else {
            url += '&include_over_18=true';
        }

        // console.log('json posts url: ' + url);
        // log data usage for the user
        recordDataUsage('reddit', 'tx', url);
        // get the data
        console.log('url: ' + url);
        return fetch(url)
            // parse the data as json
            .then(res => res.json())
            .then((data) => {
                // log data usage for the user
                recordDataUsage('reddit', 'rx', data);
                return data;
            });
    } else {
        // return a fake promise
        return fetch('');
    }
}
export function rawGetSubs(options: any): Promise<any> {
    let url = 'https://www.reddit.com/subreddits/';
    // validate required options
    if ( options ) {
        if ( options.q ) { url += 'search'; }

        // tell reddit to give us json
        url += '.json?raw_json=1';

        // add GET params to url
        url += parseAsUrlParam(options, 'q');

        // console.log('json subs url: ' + url);
        // log data usage for the user
        recordDataUsage('reddit', 'tx', url);
        // get the data
        return fetch(url)
            // parse the data as json
            .then(res => res.json())
            .then((data) => {
                // log data usage for the user
                recordDataUsage('reddit', 'rx', data);
                // console.log('subs data:');
                // console.log(data);
                return data;
            });
    } else {
        // return a fake promise
        return fetch('');
    }
}
export function rawGetPostsOld(subreddit: string, after?: string, before?: string): Promise<any> {
    let url = 'https://www.reddit.com/subreddits/search.json?q=';
    url = 'https://www.reddit.com/r/';
    url += subreddit;
    url += '.json?raw_json=1';
    if ( after !== undefined ) {
        url += '&after=' + after;
    }
    if ( before !== undefined ) {
        url += '&before=' + before;
    }
    // console.log('json posts url: ' + url);
    recordDataUsage('reddit', 'tx', url);
    return fetch(url)
        .then(res => res.json())
        .then((data) => {
            recordDataUsage('reddit', 'rx', data);
            return data;
        });
}
export function rawSearchSubs(query: string, subreddit?: string, after?: string, before?: string): Promise<any> {
    let url = 'https://www.reddit.com/subreddits/search.json?q=';
    url += subreddit;
    url += '.json?raw_json=1';
    if ( after !== undefined ) {
        url += '&after=' + after;
    }
    if ( before !== undefined ) {
        url += '&before=' + before;
    }
    // console.log('json posts url: ' + url);
    recordDataUsage('reddit', 'tx', url);
    return fetch(url)
        .then(res => res.json())
        .then((data) => {
            recordDataUsage('reddit', 'rx', data);
            // console.log(data);
            return data;
        });
}

/** Get posts from url like: https://www.reddit.com/post_id.json **/
export function rawGetComments(options: any): Promise<any> {
    /** Get all children of a post or comment. **/
    let url = 'https://www.reddit.com/' + options.permalink + '.json?raw_json=1';
    if ( options.sortBy ) { url += '&sort=' + options.sortBy; }
    else if ( getCommentSort().length > 0 ) { url += '&sort=' + getCommentSort(); }
    recordDataUsage('reddit', 'tx', url);
    return fetch(url)
        .then(res => res.json())
        .then((data) => {
            recordDataUsage('reddit', 'rx', data);
            return data;
        });
}
export function rawGetChildren(arr: any) {
    if (arr && arr.data && arr.data.children ) {
        return arr.data.children;
    } else {
        return JSON.parse('[]');
    }
}

/** Check if an object is a known reddit json object. **/
export function rawIsKindArray(obj: any): boolean {
    // check if an object is a RawKind[] array
    if ( obj.length > 0 ) {
        if ( obj[0].kind && obj[0].data ) {
            console.log('Object is a KindArray.');
            return true;
        } else {
            console.log('Object is not a KindArray.');
            return false;
        }
    } else {
        console.log('Object is not a KindArray or is empty.');
        return false;
    }
}
export function rawIsListing(obj: any): boolean {
    // check if an object is a RawListing
    if ( obj.kind && obj.data ) {
        console.log('object is a Listing.');
        return obj.kind === 'Listing';
    } else {
        console.log('object is not a Listing.');
        return false;
    }
}
export function rawIsComment(obj: any): boolean {
    // check if an object is a RawComment
    if ( obj.kind && obj.data ) {
        if ( obj.kind === 't1' ) {
            console.log('Object is a comment.');
            return true;
        } else {
            console.log('Object is not a comment.');
            return false;
        }
    } else {
        return false;
    }
}
export function rawIsSelfpost(obj: any): boolean {
    // check if an object is a Selfpost
    if ( obj.kind && obj.data ) {
        if ( obj.kind === 't3' ) {
            console.log('Object is a Selfpost.');
            return true;
        } else {
            console.log('Object is not a Selfpost.');
            return false;
        }
    } else {
        console.log('Object has no kind or data.');
        return false;
    }
}

/** Check if an object is a *valid* reddit json object. **/
export function rawIsValidComment(obj: any): boolean {
    // check if an object has all required RawComment attributes
    if ( obj.kind && obj.data ) {
        if (
            obj.kind === 't1'
            && obj.data.author !== '[deleted]'
            && obj.data.author.length > 0
            && obj.data.created > 0
        ) {
            console.log('Object is a valid comment.');
            return true;
        } else {
            console.log('Object is not a valid comment.');
            return false;
        }
    } else {
        console.log('Object has no kind or data.');
        return false;
    }
}
export function rawIsValidPost(obj: any): boolean {
    // check if an object has all required post attributes
    if ( obj.kind && obj.data ) {
        if (
            obj.kind
            && obj.kind.length > 0
            && obj.kind !== 't1'
            && obj.data.children[0].data.url
            && obj.data.children[0].data.url.length > 0
        ) {
            console.log('Object is a valid post.');
            return true;
        } else {
            console.log('Object is not a valid post.');
            return false;
        }
    } else {
        console.log('Object has no kind or data.');
        return false;
    }
}

/** Check if an object **/
export function rawHasReplies(obj: any): boolean {
    if ( rawIsComment(obj) || rawIsSelfpost(obj) ) {
        if ( obj.data.replies ) {
            if ( obj.data.replies.length > 0 ) {
                console.log('Object has replies!');
                return true;
            } else {
                console.log('Object has no replies.');
                return false;
            }
        } else {
            console.log('Object.replies is not valid.');
            return false;
        }
    } else {
        console.log('Object is not a comment or selfpost.');
        return false;
    }
}
export function rawIsCommentList(obj: any): boolean {
    if ( obj.data && obj.data.children ) {
        if ( obj.data.children.length > 0 ) {
            if ( obj.data.children[0].kind === 't1' ) {
                console.log('Object is a valid comment list.');
                return true;
            } else {
                console.log('Object is not a comment list.');
                return false;
            }
        } else {
            console.log('Object is not a list.');
            return false;
        }
    } else {
        console.log('Object has no kind or data.');
        return false;
    }
}

export function workflow(): void {
    /**
     * API requests should go as follows.
     *
     * User selects parameters.
     *
     * System gets params & builds json object to pass to api.
      */

    /**
     * Api receives params & prepares to fetch data.
     * System: check that state values are set/writeable.
     * System: check that api is accessible.
     */

    /**
     * Api sends fetch request.
     * System: send request params to data computer.
     */

    /**
     * Api receives data.
     * System: send request body to data computer.
     */

    /**
     * System outputs data to the state.
     * Views reload.
     * System: check that request data matches output data.
     */
}

/** PushShift API: get posts **/
export function psGetPosts(url: string): Promise<any> {
    return fetch(url)
        .then(response => response.json())
        .then((data) => {
            // console.log(data.data);
            return data.data;
        });
}
export function psGetComments(postId: string): any {
    if ( postId ) {
        // get all comments for this postId
        if ( 1 > 2 ) {
            fetch('http://api.pushshift.io/reddit/comment/search/?link_id=' + postId)
                .then(res => res.json())
                .then((commentData) => {
                    // console.log(commentData.data.link_id);
                })
                .catch(console.log);
        }
    }
}

/** Change preview url (like: preview.redd.it) to full size image url **/
export function changeImageUrl(previewUrl: string): string {
    let url: string;
    // replace https://preview.redd.it/ with https://i.redd.it/
    previewUrl = previewUrl.replace('external-preview.redd', 'i.redd');
    previewUrl = previewUrl.replace('preview.redd', 'i.redd');
    // strip parameters from url
    url = previewUrl.slice( 0, previewUrl.indexOf('?') );
    return url;
}

/** Record data sent/received via rest **/
export const DATA_USAGE_STATS = 'dataUsageTotals';
export function getDataUsage(): DataUsageObject {
    let dataUsageStats = localStorage.getItem(DATA_USAGE_STATS);
    if ( dataUsageStats ) {
        return JSON.parse(dataUsageStats);
    } else {
        return JSON.parse('{}');
    }
}
export function recordDataUsage(apiName: string, rxOrTx: string, body: any): void {
    let jsonLength = JSON.stringify(body).length;
    let totalsString = localStorage.getItem(DATA_USAGE_STATS);
    if ( totalsString ) {
        // update total
        let totals = JSON.parse(totalsString);
        // debug: output current totals
        // console.log('totals:');
        // console.log(totals);
        if ( rxOrTx === 'rx' ) {
            if ( apiName === 'push' ) {
                totals.rxPush += jsonLength;
                totals.rxNumPush++;
            }
            if ( apiName === 'reddit' ) {
                totals.rxReddit += jsonLength;
                totals.rxNumReddit++;
            }
            if ( apiName === 'twelve' ) {
                totals.rxTwelveStore += jsonLength;
                totals.rxNumTwelveStore++;
            }
        } else if ( rxOrTx === 'tx' ) {
            if ( apiName === 'push' ) {
                totals.txPush += jsonLength;
                totals.txNumPush++;
            }
            if ( apiName === 'reddit' ) {
                totals.txReddit += jsonLength;
                totals.txNumReddit++;
            }
            if ( apiName === 'twelve' ) {
                totals.txTwelveStore += jsonLength;
                totals.txNumTwelveStore++;
            }
        }
        localStorage.setItem(DATA_USAGE_STATS, JSON.stringify(totals));
    } else {
        console.log('starting data usage records');
        initDataRecords();
    }
}
export function initDataRecords(): void {
    // initialize localstorage item
    if ( localStorage.getItem(DATA_USAGE_STATS) ) {
        // do nothing
    } else {
        let items: DataUsageObject = {
            rxTwelveStore: 0,
            txTwelveStore: 0,
            rxReddit: 0,
            txReddit: 0,
            rxPush: 0,
            txPush: 0,
            rxNumTwelveStore: 0,
            txNumTwelveStore: 0,
            rxNumReddit: 0,
            txNumReddit: 0,
            rxNumPush: 0,
            txNumPush: 0,
        };
        localStorage.setItem(DATA_USAGE_STATS, JSON.stringify(items));
    }
}

/** Set display mode (light mode vs dark mode). **/
export function getDisplayMode(): string {
    let mode = localStorage.getItem('displayMode');
    if (mode) {
        return mode;
    } else {
        localStorage.setItem('displayMode', 'dark');
        return 'dark';
    }
}
export function setDisplayMode(mode: string): void {
    localStorage.setItem('displayMode', mode);
    if ( getDisplayMode() === mode ) {
        console.log('displayMode set: ' + mode);
    } else {
        console.log('displayMode not set');
    }
}
/** get current time in seconds. **/
export function utcNow(): number {
    return Math.round(new Date().getTime() / 1000);
}
/** get seconds since a time. **/
export function secondsSince(then: number): number {
    // compute time since a unix timestamp
    let now = 0;
    let result = 0;
    if ( then > 0 ) {
        // if $then is in millis, not seconds:
        if ( then > 2000000000 ) { then = Math.round( then / 1000 ); }
        now = utcNow();
        result = Math.round((now - then));
    }
    return result;
}
/** get days/hours/minutes (dhm) since a time. **/
export function dhmSince(then: number): string {
    // compute days/hours/minutes between now and a given time
    let secs = secondsSince(then);
    let s = '';
    if ( secs < 120 ) { s = secs + ' seconds'; }
    if ( secs >= 120 ) {
        s = Math.round(secs / 60) + ' minutes';
        if ( secs >= 7200 ) {
            s = Math.round(secs / 3600) + ' hours';
        }
        if ( secs > 86400 ) {
            s = Math.round(secs / 86400) + ' days';
        }
        if ( secs > 2592000 ) {
            s = Math.round(secs / 2592000) + ' months';
        }
        if ( secs > 31104000 ) {
            s = Math.round(secs / 31104000) + ' years';
        }
    }
    return s;
}
/** Calculate when user last updated the list (deprecated). **/
export function whenLastUpdated(option?: string): any {
    // how many seconds since user last viewed a post
    let result: any = 'unknown';
    let lastUpdated: number;
    // check if lastPostListUpdated exists
    let lastUpdatedStr = localStorage.getItem('lastPostListUpdated');
    if ( lastUpdatedStr ) {
        lastUpdated = parseInt(lastUpdatedStr);
        if ( option ) {
            if ( option === 'human' ) {
                // make output human readable
                if ( result > 0 ) {
                    result = dhmSince(lastUpdated);
                }
            } else {
                result = secondsSince(lastUpdated);
            }
        } else {
            result = secondsSince(lastUpdated);
        }
    } else {
        result = 'not found';
    }
    return result.toString();
}

/** date formatting functions & left/right pad **/
export function formatDate(time?: number | string): string {
    // return a date like 2020-12-28 (YYYY-MM-DD)
    let s = 'xx';
    if ( time !== undefined ) {
        if( typeof time == 'number' ) {
            s = formatDateCertain(time);
        } else {
            if ( time === 'today' ) {
                s = formatDateCertain(new Date().getTime());
            }
        }
    }
    return s;
}
export function formatDateCertain(time: number): string {
    let date = new Date(time);
    let year = date.getUTCFullYear();
    let month = padLeft(date.getUTCMonth() + 1, '0', 2);
    let day = padLeft(date.getUTCDate(), '0', 2);
    return year + "-" + month + "-" + day;
}
export function padLeft(s: any, pad: string, len: number): string {
    // pad a string
    let r = '';
    s = s.toString();
    if ( s.length < len ) {
        r = pad + '' + s;
        r = padLeft(r, pad, len);
        return r;
    } else {
        return s;
    }
}
export function padRight(s: any, pad: string, len: number): string {
    // pad a string
    let r = '';
    s = s.toString();
    if ( s.length < len ) {
        r = s + '' + pad;
        r = padLeft(r, pad, len);
        return r;
    } else {
        return s;
    }
}

/** build a url for PS api. **/
export function buildUrlComments(options: CommentSearchOptions): string {
    let url = 'https://api.pushshift.io/reddit/search/comment/?';
    if (options.subreddit)          { url += 'subreddit=' + options.subreddit; }
    if (options.author)             { url += '&author=' + options.author; }
    if (options.after)              { url += '&after=' + options.after; }
    if (options.before)             { url += '&before=' + options.before; }
    if (options.filter)             { url += '&filter=' + options.filter; }
    if (options.gilded)             { url += '&gilded=' + options.gilded; }
    if (options.keyword)            { url += '&keyword=' + options.keyword; }
    if (options.length)             { url += '&length=' + options.length; }
    if (options.mod_removed)        { url += '&mod_removed=' + options.mod_removed; }
    if (options.nest_level)         { url += '&nest_level=' + options.nest_level; }
    if (options.parent_comment)     { url += '&parent_id=' + options.parent_comment; }
    if (options.parent_post)        { url += '&link_id=' + options.parent_post; }
    if (options.reply_delay)        { url += '&reply_delay=' + options.reply_delay; }
    if (options.score)              { url += '&score=' + options.score; }
    if (options.size)               { url += '&size=' + options.size; }
    if (options.user_removed)       { url += '&user_removed=' + options.user_removed; }
    if (options.utc_hour_of_day)    { url += '&utc_hour_of_day=' + options.utc_hour_of_day; }
    if (options.utc_hour_of_week)   { url += '&utc_hour_of_week=' + options.utc_hour_of_week; }
    if (options.sortDirection && options.sortField) {
        url += 'sort=' + options.sortField + ':' + options.sortDirection;
    }
    // console.log('comments url: ' + url);
    return url;
}
export function buildUrlPosts(options: SubredditSearchOptions): string {
    let url = 'https://api.pushshift.io/reddit/submission/search/?';
    if (options.subreddit)   { url += 'subreddit=' + options.subreddit; }
    if (options.sort)       { url += '&sort=' + options.sort; } else { url += '&sort=desc' }
    if (options.sort_type)  { url += '&sort_type=' + options.sort_type; }
    if (options.after)      { url += '&after=' + options.after; }
    if (options.before)     { url += '&before=' + options.before; }
    if (options.limit)      { url += '&size=' + options.limit; }
    // console.log('posts url: ' + url);
    return url;
}

/** When a user searches for posts/subs, save data for all components **/
export const SEARCH_TYPE = 'searchType';
export function initSearchType(): void {
    let currentPost = localStorage.getItem(SEARCH_TYPE);
    if ( !currentPost ) {
        localStorage.setItem(SEARCH_TYPE, 'subs');
    }
}
export function setSearchType(arr: any): void {
    initSearchType();
    localStorage.setItem(SEARCH_TYPE, JSON.stringify(arr));
}
export function getSearchType(): any {
    let str = localStorage.getItem(SEARCH_TYPE);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initSearchType();
        return 'subs';
    } else if ( str.length > 0 ) {
        return removeQuotes(str);
    } else {
        return 'subs';
    }
}
export const POST_SEARCH_OPTIONS = 'postSearchOptions';
export function initPostSearchOptions(): void {
    let currentPost = localStorage.getItem(POST_SEARCH_OPTIONS);
    if ( !currentPost ) {
        localStorage.setItem(POST_SEARCH_OPTIONS, '');
    }
}
export function setPostSearchOptions(arr: any): void {
    initPostSearchOptions();
    localStorage.setItem(POST_SEARCH_OPTIONS, JSON.stringify(arr));
}
export function getPostSearchOptions(): any {
    let str = localStorage.getItem(POST_SEARCH_OPTIONS);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initPostSearchOptions();
        return '';
    } else if ( str.length > 0 ) {
        return JSON.parse(str);
    } else {
        return JSON.parse('{}');
    }
}
export const POST_SEARCH_DATA = 'postSearchData';
export function initPostSearchData(): void {
    let currentPost = localStorage.getItem(POST_SEARCH_DATA);
    if ( !currentPost ) {
        localStorage.setItem(POST_SEARCH_DATA, '');
    }
}
export function setPostSearchData(arr: any): void {
    initPostSearchData();
    localStorage.setItem(POST_SEARCH_DATA, JSON.stringify(arr));
}
export function getPostSearchData(): any {
    let str = localStorage.getItem(POST_SEARCH_DATA);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initPostSearchData();
        return '';
    } else if ( str.length > 0 ) {
        return JSON.parse(str);
    } else {
        return JSON.parse('{}');
    }
}
export const SUB_SEARCH_OPTIONS = 'subSearchOptions';
export function initSubSearchOptions(): void {
    let currentSub = localStorage.getItem(SUB_SEARCH_OPTIONS);
    if ( !currentSub ) {
        localStorage.setItem(SUB_SEARCH_OPTIONS, '');
    }
}
export function setSubSearchOptions(arr: any): void {
    initSubSearchOptions();
    localStorage.setItem(SUB_SEARCH_OPTIONS, JSON.stringify(arr));
}
export function getSubSearchOptions(): any {
    let str = localStorage.getItem(SUB_SEARCH_OPTIONS);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initSubSearchOptions();
        return '';
    } else if ( str.length > 0 ) {
        return JSON.parse(str);
    } else {
        return JSON.parse('{}');
    }
}
export const SUB_SEARCH_DATA = 'subSearchData';
export function initSubSearchData(): void {
    let currentSub = localStorage.getItem(SUB_SEARCH_DATA);
    if ( !currentSub ) {
        localStorage.setItem(SUB_SEARCH_DATA, '');
    }
}
export function setSubSearchData(arr: any): void {
    initSubSearchData();
    localStorage.setItem(SUB_SEARCH_DATA, JSON.stringify(arr));
}
export function getSubSearchData(): any {
    let str = localStorage.getItem(SUB_SEARCH_DATA);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initSubSearchData();
        return '';
    } else if ( str.length > 0 ) {
        return JSON.parse(str);
    } else {
        return JSON.parse('{}');
    }
}

/** When a user opens a subreddit, save it for all components **/
export const ACTIVE_SUB = 'activeSubreddit';
export function initActiveSub(): void {
    let currentSub = localStorage.getItem(ACTIVE_SUB);
    if ( !currentSub ) {
        localStorage.setItem(ACTIVE_SUB, '');
    }
}
export function setActiveSub(sub_id: string): void {
    initActiveSub();
    localStorage.setItem(ACTIVE_SUB, sub_id);
}
export function getActiveSub(): any {
    let currentSub = localStorage.getItem(ACTIVE_SUB);
    if ( currentSub === null ) { return false; }
    else { return currentSub; }
}

/** When a user opens a post, save it for all components **/
export const ACTIVE_POST = 'activePost';
export function initActivePost(): void {
    let currentPost = localStorage.getItem(ACTIVE_POST);
    if ( !currentPost ) {
        localStorage.setItem(ACTIVE_POST, '');
    }
}
export function setActivePost(post_id: string): void {
    initActivePost();
    localStorage.setItem(ACTIVE_POST, post_id);
}
export function getActivePost(): any {
    let currentPost = localStorage.getItem(ACTIVE_POST);
    if ( currentPost === null ) { return false; }
    else { return currentPost; }
}

export const ACTIVE_POST_DATA = 'activePostData';
export function initActivePostData(): void {
    let currentPost = localStorage.getItem(ACTIVE_POST_DATA);
    if ( !currentPost ) {
        localStorage.setItem(ACTIVE_POST_DATA, '');
    }
}
export function setActivePostData(arr: any): void {
    initActivePostData();
    localStorage.setItem(ACTIVE_POST_DATA, JSON.stringify(arr));
}
export function getActivePostData(): any {
    let str = localStorage.getItem(ACTIVE_POST_DATA);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initActivePostData();
        return '';
    } else if ( str.length > 0 ) {
        return JSON.parse(str);
    } else {
        return JSON.parse('{}');
    }
}

export const ACTIVE_COMMENT_DATA = 'activeCommentData';
export function initActiveCommentData(): void {
    let currentPost = localStorage.getItem(ACTIVE_COMMENT_DATA);
    if ( !currentPost ) {
        localStorage.setItem(ACTIVE_COMMENT_DATA, '[]');
    }
}
export function setActiveCommentData(arr: any): void {
    initActiveCommentData();
    localStorage.setItem(ACTIVE_COMMENT_DATA, JSON.stringify(arr));
}
export function getActiveCommentData(): any {
    let str = localStorage.getItem(ACTIVE_COMMENT_DATA);
    if ( str === null || str === undefined || str === 'undefined' ) {
        initActivePostData();
        return '';
    } else if ( str.length > 0 ) {
        return JSON.parse(str);
    } else {
        return JSON.parse('{}');
    }
}

export const POSTLIST_DATA = 'postListData';
export function initPostlistData(): void {
    let currentPost = localStorage.getItem(POSTLIST_DATA);
    if ( !currentPost ) {
        localStorage.setItem(POSTLIST_DATA,
            JSON.stringify({ lastLoadTime: 0, lastPostList: [], after: '', before: '' }));
    }
}
export function setPostlistData(arr: any): void {
    initPostlistData();
    localStorage.setItem(POSTLIST_DATA, JSON.stringify(arr));
}
export function getPostlistData(): any {
    let str = localStorage.getItem(POSTLIST_DATA);
    if ( str === null ) { return false; }
    else { return JSON.parse(str); }
}

export const ALLOW_NSFW = 'isNsfwAllowed';
export function initAllowNsfw(): void {
    let currentPost = localStorage.getItem(ALLOW_NSFW);
    if ( !currentPost ) {
        localStorage.setItem(ALLOW_NSFW, 'false');
    }
}
export function setAllowNsfw(val: any): void {
    initAllowNsfw();
    localStorage.setItem(ALLOW_NSFW, val);
}
export function getAllowNsfw(): any {
    let str = localStorage.getItem(ALLOW_NSFW);
    if ( str === null || str === 'undefined' || str === undefined )
    { initAllowNsfw(); return 'false'; }
    else { return str; }
}

export const COMMENT_SORT = 'commentsSortBy';
export function initCommentSort(): void {
    let currentPost = localStorage.getItem(COMMENT_SORT);
    if ( !currentPost ) {
        localStorage.setItem(COMMENT_SORT, 'top');
    }
}
export function setCommentSort(val: any): void {
    initCommentSort();
    localStorage.setItem(COMMENT_SORT, val);
}
export function getCommentSort(): any {
    let str = localStorage.getItem(COMMENT_SORT);
    if ( str === null ) { initCommentSort(); return false; }
    else { return str; }
}

export const FAV_USERS = 'myFavoriteUsers';
export function initFavUsers(): void {
    let currentPost = localStorage.getItem(FAV_USERS);
    if ( !currentPost ) {
        localStorage.setItem(FAV_USERS, JSON.stringify([]));
    }
}
export function setFavUsers(arr: any): void {
    initFavUsers();
    localStorage.setItem(FAV_USERS, JSON.stringify(arr));
}
export function getFavUsers(): any {
    let str = localStorage.getItem(FAV_USERS);
    if ( str === null ) { initFavUsers(); return false; }
    else { return JSON.parse(str); }
}
export function addFavUser(name: string): void {
    let users = getFavUsers();
    if ( users ) {
        users.push(name);
        setFavUsers(users);
    }
}
export function removeFavUser(name: string): void {
    let users = getFavUsers();
    if ( users ) {
        let index = users.indexOf(name);
        if (index > -1) {
            users.splice(index, 1);
            setFavUsers(users);
        }
    }
}
export function isFavUser(name: string): boolean {
    let result = false;
    let users = getFavUsers();
    if ( users ) {
        if ( users.includes(name) ) {
            result = true;
        }
    }
    return result;
}

/** Initialize all localstorage vars. Runs during continue page. **/
/** Only sets the vars if they are not found. **/
export function initAllLsVars(): void {
    initActivePost();
    initDataRecords();
    initCommentSort();
    initActiveCommentData();
    initActivePostData();
    initFavUsers();
    initPostlistData();
    initActiveSub();
    initAllowNsfw();
    initPostSearchData();
    initPostSearchOptions();
    initSubSearchData();
    initSubSearchOptions();
}

/** Time (in text) since a utc time **/
export function timeSince(utcTime: number): string {
    let now = new Date().getTime() / 1000;
    let txt = '';
    let num = 0;
    let elapsed = Math.round( now - utcTime );
    if ( elapsed < 120 ) {
        txt = ' seconds';
        num = elapsed;
    }
    if ( elapsed > 120 ) {
        txt = ' minutes';
        num = Math.round(elapsed / 60);
    }
    if ( elapsed > 3600 ) {
        txt = ' hours';
        num = Math.round(elapsed / 3600);
    }
    return num.toString() + txt + ' ago';
}
/** Use the system clock to get a random list key **/
export function randomKey(): number {
    return new Date().getTime() + Math.random()*24;
}

/** fix spaces: remove #x200B from comment strings **/
export function fixSpaces(str: string): string {
    // if str contains &#x200B;, replace with newline
    if ( str ) {
        if ( str.includes('&amp;#x200B;') ) {
            str = str.replace('&amp;#x200B;', '\n');
        }
        str = str.replace('&#x200B;', '\n');
        return str;
    } else {
        return '';
    }
}

/** Set a handler (interval). **/
export function setHandler(callback: any, timeOutMillis?: number, thenDo?: any): void {
    if ( !timeOutMillis ) { timeOutMillis = 1000; }
    if ( !thenDo ) {
        setInterval(() => {
            return callback();
        }, timeOutMillis);
    } else {
        setInterval(() => {
            return callback().then(() => thenDo());
        }, timeOutMillis);
    }
}

/** show elements gradually **/
export function fadeIn(elements: any, timeout?: number, maxIterations?: number): void {
    // css: .fadeIn { opacity: 0; }
    // set handler to make each element of class fadeIn visible one by one
    let fadeInCount = 0;
    if ( timeout === undefined || timeout === null ) { timeout = 200; }
    // set a trigger to destroy the handler later:
    let trigger = false;
    // construct the handler:
    const iv = setInterval(() => {
        // check if there is another element to show:
        trigger = (fadeInCount === elements.length);
        if ( !trigger ) {
            // if an element exists, get it from the array:
            const element = elements[fadeInCount];
            fadeInSingle(element);
            // increment count for next handler iteration:
            fadeInCount++;
            // if user provided maxIterations, use that
            // or set default (20):
            if ( maxIterations === undefined || maxIterations === null ) {
                maxIterations = 100;
            }
            if ( fadeInCount > maxIterations ) { clearInterval(iv); }
        } else {
            // destroy the handler:
            clearInterval(iv);
            // reset the count:
            fadeInCount = 0;
        }
    }, timeout);
}
export function fadeInSingle(element: any, durationMillis?: number): void {
    // fade in a single element
    if ( element !== undefined ) {
        if ( !durationMillis ) { durationMillis = 500; }
        let i = 0;
        const iv = setInterval(() => {
            element.style.opacity = i / 100;
            i++;
            if ( i > 99 ) { clearInterval(iv); }
        }, durationMillis / 100);
    } else {
        console.log('element is undefined!');
    }
}
export function fadeOutSingle(element: any, durationMillis?: number): void {
    // fade out a single element
    if ( element !== undefined ) {
        if ( !durationMillis ) { durationMillis = 1000; }
        if ( durationMillis < 1000 ) { durationMillis = 1000; }
        let i = 100;
        const iv = setInterval(() => {
            element.style.opacity = i / 100;
            i--;
            if ( i < 1 ) { clearInterval(iv); }
        }, durationMillis / 100);
    } else {
        console.log('element is undefined!');
    }
}

/** Check if a url contains certain values. **/
export function urlContains(keyword: string): boolean {
    let result = false;
    if ( keyword && keyword.length > 0 ) {
        if ( window.location.href.indexOf(keyword) > -1 ) {
            result = true;
        }
    }
    return result;
}
export function stringContains(haystack: string, needle: string): boolean {
    let result = false;
    if ( haystack && needle ) {
        if ( haystack.length > 0 && needle.length > 0 ) {
            // find the needle
            result = ( haystack.indexOf(needle) > -1 );
        }
    }
    return result;
}
export function urlGet(key: string): any {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
}
/** remove unnecessary quotation marks from a string **/
export function removeQuotes(str: string): string {
    // remove unnecessary quotation marks from a string
    do {
        str = str.replace('"','');
    } while (
        str.indexOf('"') > -1
        );
    return str;
}

/** Convert a imgur gif url to a mp4 url **/
export function gifToVideo(url: string): string {
    // return a modified url example: imgur.com/xxyy.gifv => imgur.com/xxyy.mp4
    let index = 0;
    let result = '';
    if ( url ) {
        index = url.indexOf('.gif');
        if ( index > -1 ) {
            result = url.substring(0, index) + '.mp4';
        }
    }
    return result;
}
