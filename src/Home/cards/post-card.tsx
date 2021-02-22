import React from 'react';
import './comment-card.css';
import * as util from "../util/my-utils";

class PostCard extends React.Component<any, any> {
    constructor(props: { postData: any }) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                { this.props.postData && this.props.postData.data.subreddit !== 'RedditSets' ?
                    util.getAllowNsfw() && !this.props.postData.data.over_18 ?
                    <div className={'af-card clickable'} key={util.randomKey()} onClick={()=>{ this.openPost(this.props.postData.data.id) }}>
                        <div className="af-card-body" key={util.randomKey()}>
                            <h5 className="af-card-title" key={this.props.postData.data.title}>{this.props.postData.data.title}</h5>
                            <h6 className="af-card-subtitle text-muted" key={this.props.postData.data.author}>
                                <span className="scorecard" key={this.props.postData.data.score}>
                                    <span className={'thumbsUpIcon'}>&nbsp;</span> {this.props.postData.data.score}
                                    </span>
                                by {this.props.postData.data.author} in {this.props.postData.data.subreddit_name_prefixed}
                            </h6>
                            <span className="af-card-text" key={this.props.postData.data.created_utc}>
                                {util.timeSince(this.props.postData.data.created_utc)}&nbsp;
                                <a href={'https://www.reddit.com' + this.props.postData.data.permalink}>[view on reddit]</a>
                            </span>
                            <span className="af-card-text" key={this.props.postData.data.num_comments}>&nbsp;({this.props.postData.data.num_comments} comments)</span>
                        </div>
                        { this.props.postData.data.preview ?
                            <div className="af-card-image" key={util.randomKey()}>
                                <img src={this.props.postData.data.thumbnail}
                                     className={ this.props.postData.data.over_18 ? 'nsfw' : '' }
                                     alt={''} />
                            </div> : ''
                        }
                    </div>
                    : '' : ''
                }
            </div>
        );
    }
    openPost(id: string): void {
        if ( id && id.length > 0 ) {
            util.setActivePost(id);
            this.setState({ activePost: id });
            window.location.href = '/continue?go';
        } else {
            console.log('could not open post');
        }
    }
}

export default PostCard;
