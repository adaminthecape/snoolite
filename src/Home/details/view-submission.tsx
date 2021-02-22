import React from 'react';
import * as util from "../util/my-utils";
import LoadingIndicator from "../util/loading-indicator";
import './view-submission.css';
import CommentCard from "../cards/comment-card";
import PostDetails from "./post-details";
import {NavLink} from "react-router-dom";

// TODO: make a button to like a comment. Show top liked on home page
class ViewSubmission extends React.Component<any, any> {
    constructor(props: { postId: any }) {
        super(props);
        this.state = {
            postData: util.getActivePostData(),
            commentsData: util.getActiveCommentData(),
            activePost: util.getActivePost(),
            inputPostId: '',
            commentSortBy: util.getCommentSort(),
            commentSortSelections: [
                { val: 'best', txt: 'best' },
                { val: 'top', txt: 'top' },
                { val: 'new', txt: 'new' },
                { val: 'controversial', txt: 'controversial' },
                { val: 'old', txt: 'old' },
                { val: 'qa', txt: 'q&a' },
            ],
            loadingProgress: 0,
            loadingStatus: 'fetching data',
        };
    }
    render() {
        if ( this.state.activePost && this.state.postData && this.state.postData.data ) {
            return (
                <div className={'view-post component smooth'}>
                    {this.state.loadingProgress && this.state.loadingProgress !== 100 ?
                        <LoadingIndicator progress={this.state.loadingProgress}
                                          status={this.state.loadingStatus} />
                        : '' }
                    <div className="options smooth hide">
                        <section>
                            <input type="text" onChange={this.handleChange}
                                   id="inputPostId" placeholder={this.state.activePost} />
                            <button onClick={() => this.getPostData()}>fetch</button>
                        </section>
                    </div>
                    <section>
                        <PostDetails postData={this.state.postData} key={util.randomKey()} />
                    </section>
                    {/** additional info about the post: **/}
                    <section>
                        <div className={'additionalInfo'}>
                            {/* todo: style these divs (view-post.css) */}

                            <div className={'subreddit'}>
                                posted to&nbsp;
                                <span className={'subLink'} onClick={()=>this.openSub(this.state.postData.data.children[0].data.subreddit)}>
                                    {this.state.postData.data.children[0].data.subreddit_name_prefixed}
                                </span>
                                &nbsp;({this.state.postData.data.children[0].data.domain})
                                &nbsp;by {this.state.postData.data.children[0].data.author}
                            </div>
                            { this.state.postData.data.children[0].data.stickied ?
                                <div className={'stickied'}>stickied</div> : '' }
                            { this.state.postData.data.children[0].data.gilded ?
                                <div className={'gilded'}>gilded {this.state.postData.data.children[0].data.gilded} times</div> : '' }
                            { this.state.postData.data.children[0].data.over_18 ?
                                <div className={'nsfw_tag'}>NSFW</div> : '' }
                            { this.state.postData.data.children[0].data.is_self ?
                                <div className={'is_self'}>Selfpost</div> : '' }
                            <div className={'num_comments'}>{this.state.postData.data.children[0].data.num_comments} comments</div>
                            <div className={'upvote_ratio'}>({this.state.postData.data.children[0].data.upvote_ratio * 100}% upvoted)</div>
                            {/* todo: add media support
                            <div>
                                <div className={'is_video'}>is_video</div>
                                <div className={'media'}>media</div>
                                <div className={'media_embed'}>media_embed</div>
                                <div className={'thumbnail'}>thumbnail</div>
                            </div>
                            */}
                        </div>
                    </section>
                    {/** comment sorting options: **/}
                    <section>
                        <div className={'sortOptions'}>
                            {/* todo: implement sort w/o re-fetch */}
                            <span className={'text-muted'}>comments sorted by</span>
                            {this.state.commentSortSelections.map((item: any) => (
                                <span key={util.randomKey()} className={
                                    item.val === util.getCommentSort() ? 'selected' : ''
                                } onClick={()=>this.updateCommentSort(item.val)}>{item.txt}</span>
                            ))}
                            {/* todo: implement expand/collapse all
                            <span className={'miniButton'}>expand all</span>
                            <span className={'miniButton'}>collapse all</span>
                             */}
                        </div>
                        { this.state.commentsData ?
                            <CommentCard commentData={this.state.commentsData} />
                        : '' }
                    </section>
                </div>
            );
        } else {
            util.initAllLsVars();
            return (
                <div className={'component'}>
                    {this.state.loadingProgress && this.state.loadingProgress !== 100 ?
                        <LoadingIndicator progress={this.state.loadingProgress}
                                          status={this.state.loadingStatus} />
                        : '' }
                    <br/>No data found yet. You may <NavLink to={'/home'}>go back to the home page</NavLink>
                    &nbsp;or&nbsp;<a href={'/continue?go'}>reload.</a>
                </div>
            );
        }
    }
    componentDidMount() {
        // if url says go
        if ( window.location.href.indexOf('?go') > -1 ) {
            // fetch data for this post
            console.log('fetching data...');
            this.getPostData();
        } else {
            // get data from util (done in constructor)
        }
    }
    openSub(id: string): void {
        if ( id && id.length > 0 ) {
            util.setActiveSub(id);
            this.setState({ activeSub: id });
            window.location.href = '/view-sub?go';
        } else {
            console.log('could not open sub');
        }
    }
    updateCommentSort(val: string): void {
        // change sort order & reload comments
        util.setCommentSort(val);
        if ( window.location.href.indexOf('?go') > -1 ) {
            window.location.reload();
        } else {
            window.location.href = '/continue?go';
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
    handleChange = (e: any) => {
        switch ( e.target.id ) {
            case 'inputPostId': this.setState({ inputPostId: e.target.value }); break;
        }
    }
}

export default ViewSubmission;
