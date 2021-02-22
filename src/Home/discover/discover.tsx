import React from 'react';
import * as util from "../util/my-utils";
import PostList from "../lists/post-list";
import SubList from "../lists/sub-list";

class Discover extends React.Component<any, any> {
    constructor(props: { postId: any }) {
        super(props);
        this.state = {
            searchType: 'posts',
            showTopPosts: true,
            showTopSubs: false,
        };
    }
    render() {
        return (
            <div className={'component smooth'}>
                <div className={'discoverInterests'}>
                    <button className={'af-button'} onClick={() => this.setState({
                        showTopPosts: !this.state.showTopPosts,
                        showTopSubs: false
                    })}>
                        { this.state.showTopPosts ? 'Hide popular posts' : 'View popular posts' }</button>
                    <button className={'af-button'} onClick={() => this.setState({
                        showTopSubs: !this.state.showTopSubs,
                        showTopPosts: false
                    })}>
                        { this.state.showTopSubs ? 'Hide popular communities' : 'View popular communities' }</button>
                </div>
                { this.state.showTopPosts ?
                    <PostList options={{ subreddit: 'all', sort: 'top', t: 'hour', include_over_18: 'false' }} /> : ''
                }
                { this.state.showTopSubs ?
                    <SubList options={{}} /> : ''
                }
            </div>
        );
    }
    componentDidMount() {
        // if url says go
        if ( window.location.href.indexOf('?go') > -1 ) {
            // fetch data for this post
            this.getPostData();
        }
    }
    setLoadingProgress(amount: number, status?: any): void {
        // update post load progress
        // if (amount === null || 100) { console.log('done loading'); }
        this.setState({ loadingProgress: amount, loadingStatus: status });
    }
    getPostData(): void {
        let id: string;
        this.setLoadingProgress(1, 'preparing to load');
        if ( this.state.inputPostId.length > 0 ) {
            id = this.state.inputPostId;
            this.setLoadingProgress(5, 'fetching user-specified post...');
        } else {
            id = this.state.activePost;
            this.setLoadingProgress(10, 'preparing');
        }
        this.setLoadingProgress(15, 'fetching data');
        util.rawGetComments({ permalink: id })
            .then((data) => {
                this.setLoadingProgress(20, 'got data');
                this.setState({
                    postData: data[0],
                    commentsData: data[1],
                });
                this.setLoadingProgress(30, 'getting post');
                util.setActivePostData(data[0]);
                this.setLoadingProgress(60, 'got post');
                util.setActiveCommentData(data[1]);
                this.setLoadingProgress(80, 'got comments');
                this.setLoadingProgress(100);
            });
    }
}

export default Discover;
