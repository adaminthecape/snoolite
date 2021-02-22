import React from 'react';
import PostList from "../lists/post-list";
import * as util from "../util/my-utils";

class SearchPosts extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            rawPosts: util.getPostSearchData(),
            opts: util.getPostSearchOptions(),
            o_subreddit: null,
            o_after: null,
            o_before: null,
            o_reply_delay: null,
            showDiagram: false,
            gettingPosts: false,
            loadingProgress: 20,
            postsLastUpdated: 0
        };
    }
    render() {
        return (
            <div className={''}>
                <h5 className={'hasMargin'}>Search for posts</h5>
                <div className="options smooth">
                    <section>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_subreddit'}>subreddit:</label>
                            <input type="text" onChange={this.handleChange} id="o_subreddit" placeholder="e.g. AskReddit" />
                        </div>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_author'}>author:</label>
                            <input type="text" onChange={this.handleChange} id="o_author" placeholder="e.g. Spez" />
                        </div>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_title'}>title:</label>
                            <input type="text" onChange={this.handleChange} id="o_title" placeholder="e.g. Hello World" />
                        </div>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_site'}>links to site:</label>
                            <input type="text" onChange={this.handleChange} id="o_site" placeholder="e.g. google.com" />
                        </div>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_selftext'}>contains text:</label>
                            <input type="text" onChange={this.handleChange} id="o_selftext" placeholder="e.g. cats" />
                        </div>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_after'}>posted after:</label>
                            <select id="o_after">
                                <option value={''}>any time</option>
                                <option value={'24h'}>24 hours ago</option>
                            </select>
                        </div>
                        <div className={'af-form-field'}>
                            <label htmlFor={'o_before'}>posted before:</label>
                            <select id="o_before">
                                <option value={''}>any time</option>
                                <option value={'24h'}>24 hours ago</option>
                            </select>
                        </div>
                    </section>
                    <section>
                        <button className={'af-button'} onClick={() => this.reloadPosts()}>Search</button>
                        {/* CHECKBOX FOR NSFW (moved to UserOptions)
                        <input type={'checkbox'} id={'o_include_over_18'} />
                        <label htmlFor={'o_include_over_18'}>allow NSFW results</label>
                        */}
                    </section>
                    { this.state.rawPosts && !this.state.gettingPosts ? '' :
                        <h5><br/>&nbsp;&nbsp;&nbsp;&nbsp;please enter a search term ...</h5>
                    }
                    { this.state.gettingPosts ? 'loading ...' : '' }
                    { !this.state.gettingPosts && this.state.rawPosts && this.state.rawPosts.length > 0 ?
                        <PostList posts={this.state.rawPosts} /> : ''
                    }
                </div>
            </div>
        );
    }
    componentDidMount() {
        // let opts: SubredditSearchOptions = { subreddit: 'wallstreetbets' };
        // console.log(util.buildUrlComments(opts));
        // this.getExistingPosts();
    }
    handleChange = (e: any) => {
        switch ( e.target.id ) {
            case 'o_subreddit': this.setState({ o_subreddit: e.target.value }); break;
            case 'o_author': this.setState({ o_author: e.target.value }); break;
            case 'o_title': this.setState({ o_title: e.target.value }); break;
            case 'o_site': this.setState({ o_site: e.target.value }); break;
            case 'o_selftext': this.setState({ o_selftext: e.target.value }); break;
            case 'o_after': this.setState({ o_after: e.target.value }); break;
            case 'o_before': this.setState({ o_before: e.target.value }); break;
            case 'o_include_over_18':
                if (e.target.checked) {
                    this.setState({ o_include_over_18: 'on' });
                } else {
                    this.setState({ o_include_over_18: 'off' });
                }
                break;
        }
    }
    reloadPosts(): void {
        let query = '';
        // for query options, add it to the query string:
        if ( this.state.o_subreddit && this.state.o_subreddit.length > 0 ) { query += '+subreddit:' + this.state.o_subreddit; }
        if ( this.state.o_author && this.state.o_author.length > 0 ) { query += '+author:' + this.state.o_author; }
        if ( this.state.o_title && this.state.o_title.length > 0 ) { query += '+title:' + this.state.o_title; }
        if ( this.state.o_site && this.state.o_site.length > 0 ) { query += '&site:' + this.state.o_site; }
        if ( this.state.o_selftext && this.state.o_selftext.length > 0 ) { query += '+selftext:' + this.state.o_selftext; }
        // build options object
        let options = {
            subreddit: this.state.o_subreddit,
            q: query,
            after: this.state.o_after,
            before: this.state.o_before,
            include_over_18: this.state.o_include_over_18,
        };
        util.rawSearchPosts(options)
            .then((data) => {
                if ( data.kind === 'Listing' ) {
                    // save after & before so the list can load next/prev posts
                    util.setPostlistData({
                        lastLoadTime: util.utcNow(),
                        lastPostList: data.data.children,
                        after: data.data.after,
                        before: data.data.before
                    });
                    // put the data in the state
                    this.setState({ rawPosts: data.data.children });
                    util.setPostSearchData(data.data.children);
                    util.setPostSearchOptions( options );
                }
            });
    }
    getExistingPosts(): void {
        // look for existing posts
        let existing = util.getPostlistData();
        if ( existing ) {
            let lastUpdated = existing.lastLoadTime;
            let posts = existing.lastPostList;
            // set posts in the state
            this.setState({ rawPosts: posts, postsLastUpdated: lastUpdated });
        }
    }
}

export default SearchPosts;
