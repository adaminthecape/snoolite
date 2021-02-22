import React from 'react';
import '../cards/comment-card.css';
import * as util from "../util/my-utils";
import Markdown from 'markdown-to-jsx';
import ReactPlayer from 'react-player';

class PostDetails extends React.Component<any, any> {
    constructor(props: { postData: any }) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                { this.props.postData
                && this.props.postData.data
                && this.props.postData.data.children ?
                    this.props.postData.data.children.map((pCom: any) => (
                        <div className={'af-comment main-post'} key={util.randomKey()}>
                            <div className={'author-row'}>
                                <div className={'points'}>{pCom.data.score}</div>
                                <div className={'author'}>{pCom.data.author}</div>
                            </div>
                            <div className={'title-row'}>
                                <div className={'title'}>{pCom.data.title}</div>
                            </div>
                            <div className={'body-row'}>
                                <div className={'body-text'}>
                                    { pCom.data.selftext ?
                                        <Markdown>{util.fixSpaces(pCom.data.selftext)}</Markdown> : '' }
                                </div>
                            </div>
                            <div className={'opts-row'}>
                                <div className={'time'}>posted {util.dhmSince(pCom.data.created_utc)} ago</div>
                                <div className={'opts hide'}>options</div>
                                <div className={'link'}>
                                    <a href={'https://www.reddit.com' + pCom.data.permalink}>[view on reddit]</a>
                                </div>
                            </div>
                            <div className={'media-row'}>
                                <div className={'media'}>
                                    <img src={pCom.data.url} alt={''} />
                                    {/* TODO: add video support */}
                                    {
                                        pCom.data.url.indexOf('v.redd') > -1
                                        || pCom.data.url.indexOf('.gifv') > -1
                                        || pCom.data.url.indexOf('.gif') > -1
                                        || pCom.data.url.indexOf('gfycat') > -1 ?
                                            <div className={'videoContainer'}>
                                                {
                                                    pCom.data.media && pCom.data.media.reddit_video ?
                                                        <div className={'playerContainer'}>
                                                            <ReactPlayer playing={true} muted={true} url={pCom.data.media.reddit_video.fallback_url} />
                                                            <a href={pCom.data.media.reddit_video.fallback_url}>(link to video)</a>
                                                        </div>
                                                    : pCom.data.media_embed ?
                                                        <div dangerouslySetInnerHTML={{ __html: pCom.data.media_embed.content }} />
                                                    : pCom.data.url ?
                                                        <div className={'playerContainer'}>
                                                            <ReactPlayer playing={true} muted={true} url={util.gifToVideo(pCom.data.url)} />
                                                            <a href={util.gifToVideo(pCom.data.url)}>(link to gif)</a>
                                                        </div>
                                                    : ''
                                                }
                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>
                        </div>
                    )) : 'no post data!'
                }
            </div>
        );
    }
    componentDidMount(): void {
        // console.log('DATA2:');
        // console.log(this.props.postData.data.children[0].data.media_embed.content);
    }
}

export default PostDetails;
