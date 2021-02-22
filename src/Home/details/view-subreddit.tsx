import React from 'react';
import * as util from "../util/my-utils";
import LoadingIndicator from "../util/loading-indicator";
import './view-submission.css';
import SubCard from "../cards/sub-card";
import PostCard from "../cards/post-card";

// TODO: make a button to like a comment. Show top liked on home page
class ViewSubreddit extends React.Component<any, any> {
    constructor(props: { subreddit: any }) {
        super(props);
        this.state = {
            loadingProgress: null,
            loadingStatus: 'fetching subreddit',
            activeSub: util.getActiveSub(),
            activeSubData: [],
            posts: []
        };
    }
    render() {
        return (
            <div className={'view-post component smooth'}>
                <SubCard subreddit={this.state.activeSub} isDetails={true} />
                {this.state.loadingProgress && this.state.loadingProgress !== 100 ?
                    <LoadingIndicator progress={this.state.loadingProgress}
                                      status={this.state.loadingStatus} />
                    : '' }
                <div className={'postList'}>
                    { this.state.posts ? this.state.posts.map((item: any) => (
                            <PostCard postData={item} key={util.randomKey()} />
                        )) : 'loading ...'
                    }
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getSubredditData({ subreddit: this.state.activeSub });
        this.getPosts();
    }
    getSubredditData(options: any): void {
        util.rawGetSubs(options)
            .then((data) => {
                // validate the data type
                if ( data.kind === 'Listing' ) {
                    // save after & before so the list can load next/prev posts
                    util.setPostlistData({
                        lastLoadTime: util.utcNow(),
                        lastPostList: data.data.children,
                        after: data.data.after,
                        before: data.data.before
                    });
                    // put the data in the state
                    this.setState({ activeSubData: data.data.children[0] });
                }
            });
    }
    setLoadingProgress(amount: number, status?: any): void {
        // update post load progress
        // if (amount === null || 100) { console.log('done loading'); }
        this.setState({ loadingProgress: amount, loadingStatus: status });
    }
    getPosts(): void {
        this.setLoadingProgress(1, 'preparing to load');
        if ( this.state.inputPostId && this.state.inputPostId.length > 0 ) {
            this.setLoadingProgress(5, 'fetching user-specified post...');
        } else {
            this.setLoadingProgress(10, 'preparing');
        }
        this.setLoadingProgress(15, 'fetching data');
        util.rawGetPosts({ subreddit: this.state.activeSub })
            .then((data) => {
                this.setLoadingProgress(20, 'getting posts...');
                this.setState({ posts: data.data.children });
                this.setLoadingProgress(80, 'got posts');
                this.setLoadingProgress(100);
            });
    }
}

export default ViewSubreddit;
