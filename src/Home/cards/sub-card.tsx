import React from 'react';
import './comment-card.css';
import * as util from "../util/my-utils";
import Markdown from "markdown-to-jsx";

class SubCard extends React.Component<any, any> {
    constructor(props: { subData?: any, subreddit?: string, isDetails?: boolean }) {
        super(props);
        this.state = {
            subData: this.props.subData,
        };
    }
    render() {
        return (
            <div>
                { this.state.subData && this.state.subData.data ?
                    <div className={
                        this.props.isDetails ? 'af-card clickable subDetails' : 'af-card clickable'
                    } onClick={()=>this.openSub(this.state.subData.data.display_name)}>
                        <div className={'af-card-header'}>
                            <div className={'af-card-image'}>
                                <img src={this.state.subData.data.community_icon} alt={''} />
                            </div>
                            <div className={'af-card-titles'}>
                                <div className={'af-card-title'}>{this.state.subData.data.display_name}</div>
                                <div className={'af-card-subtitle'}>{this.state.subData.data.title}</div>
                            </div>
                        </div>
                        <div className={'af-card-body'}>
                            <div className={'af-card-text'}>
                                <Markdown>{this.state.subData.data.public_description}</Markdown>
                                <p>created {util.dhmSince(this.state.subData.data.created_utc)} ago<br/>
                                {this.state.subData.data.subscribers} members</p>
                            </div>
                        </div>
                    </div>
                    : '' }
                {/* TODO: onclick open sub detail page */}
                {/* TODO: make a preview here to see latest activity (posts or comments) */}
            </div>
        );
    }
    componentDidMount(): void {
        // console.log('subData: ');
        // console.log(this.props.subData);
        // check if props contain subData or subreddit name
        if ( this.props.subData ) {
            // do nothing
        } else {
            if ( this.props.subreddit ) {
                // get subData
                this.getAndSetSub({ q: this.props.subreddit });
            }
        }
    }
    getAndSetSub(options: any): void {
        // validate
        if ( options ) {
            // continue
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
                        this.setState({ subData: data.data.children[0] });
                    }
                });
        }
    }
    openSub(id: string): void {
        if ( !this.props.isDetails ) {
            if ( id && id.length > 0 ) {
                util.setActiveSub(id);
                this.setState({ activeSub: id });
                window.location.href = '/view-sub?go';
            } else {
                console.log('could not open sub');
            }
        }
    }
}

export default SubCard;
