import React from 'react';
import * as util from "../util/my-utils";
import SearchSubs from "./search-subs";
import SearchPosts from "./search-posts";

class SearchContainer extends React.Component<any, any> {
    constructor(props: { postId: any }) {
        super(props);
        this.state = {
            searchType: util.getSearchType()
        };
    }
    render() {
        return (
            <div className={'component smooth'}>
                <div>
                    <button className={'af-button'} onClick={()=>this.setSearchType('subs')}>Search subreddits (topics)</button>
                    <button className={'af-button'} onClick={()=>this.setSearchType('posts')}>Search for posts</button>
                </div>
                { this.state.searchType === 'subs' ? <SearchSubs /> : '' }
                { this.state.searchType === 'posts' ? <SearchPosts /> : '' }
                { this.state.searchType === 'comments' ? <SearchSubs /> : '' }
            </div>
        );
    }
    componentDidMount() {
        // if url says go
        if ( window.location.href.indexOf('?go') > -1 ) {
            // fetch data for this post
            this.getPostData();
        }
        console.log('getting search type: ' + util.getSearchType());
    }
    setSearchType(str: string): void {
        this.setState({ searchType: str });
        util.setSearchType(str);
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

export default SearchContainer;
