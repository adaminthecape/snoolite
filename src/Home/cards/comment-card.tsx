import React from 'react';
import './comment-card.css';
import Markdown from 'markdown-to-jsx';
import ReactDOM from 'react-dom';
import {addFavUser, dhmSince, fixSpaces, isFavUser, randomKey, rawGetChildren, removeFavUser} from "../util/my-utils";

class CommentCard extends React.Component<any, any> {
    props: { commentData: any, mainId?: any };
    constructor(props: { commentData: any, mainId?: any }) {
        super(props);
        this.props = props;
        this.state = {
            mainCommentId:  null,
        }
        /* todo: add 'favorite' button for users */
        /* todo: mark user as fav, highlight their comments in a thread */
    }
    render() {
        return (
            <div>
                { rawGetChildren(this.props.commentData).map((pCom: any) => {
                    if (
                        pCom.data.body
                        && pCom.data.body.length > 0
                        && pCom.data.created_utc > 0
                    ) {
                        return (
                            <div className={'af-comment smooth'}
                                 key={randomKey()}
                                 id={pCom.data.id}>
                                <div className={'author-row'}>
                                    {/* todo: make expander show [+] or [-] */}
                                    <div className={'expander'} onClick={()=>this.toggleExpansion(pCom.data.id)}>
                                        [-]
                                    </div>
                                    <div className={'points'}>{pCom.data.score}</div>
                                    <div className={'author'}>
                                        <a href={'https://www.reddit.com/user/' + pCom.data.author}>{pCom.data.author}</a>
                                        &nbsp;{pCom.data.is_submitter ? `[S]` : ''}
                                        { isFavUser(pCom.data.author) ? <span className='fav_sticker'>Fav user</span> : '' }
                                    </div>
                                    <div className={'collapsedPreview hide'} id={pCom.data.id + '-text-preview'}>{pCom.data.body.slice(0,80)}...</div>
                                </div>
                                <div className={'body-row'}>
                                    <div className={'body-text'}>
                                        { pCom.data.body ?
                                            <Markdown>{fixSpaces(pCom.data.body)}</Markdown>
                                            : ''
                                        }
                                    </div>
                                </div>
                                <div className={'opts-row'}>
                                    <div className={'time'}>{dhmSince(pCom.data.created_utc)} ago</div>
                                    <div className={'opts'}>
                                        <span>options</span>
                                        { isFavUser(pCom.data.author) ?
                                            <span onClick={()=>removeFavUser(pCom.data.author)}>unfavorite user</span>
                                            :
                                            <span onClick={()=>addFavUser(pCom.data.author)}>favorite user</span>
                                        }
                                    </div>
                                    <div className={'link'}>
                                        <a href={'https://www.reddit.com' + pCom.data.permalink}>[view on reddit]</a>
                                    </div>
                                </div>
                                { pCom.data.replies ?
                                    <CommentCard commentData={pCom.data.replies} mainId={pCom.data.replies.data.children[0].data.id} /> : ''
                                }
                            </div>
                        );
                    } else {
                        return ('');
                    }
                })}
            </div>
        );
    }
    componentDidMount(): void {
        /*
        if ( this.props.commentData.data.children ) {
            this.checkIfMod(
                this.props.commentData.data.children[0].data.author,
                this.props.commentData.data.children[0].data.id
            );
        }
        */
    }
    checkIfMod(author: string, id: string): void {
        if (author === 'AutoModerator') {
            // console.log('FOUND A MODERATOR');
            this.collapse(id);
        }
    }
    expand(id: any): void {
        // collapse the comment
        this.removeClass(id, 'collapsed');
        this.addClass(id + '-text-preview', 'hide');
    }
    collapse(id: any): void {
        // collapse the comment
        this.addClass(id, 'collapsed');
        this.removeClass(id + '-text-preview', 'hide');
    }
    addClass(id: string, classToAdd: string): void {
        let element = document.getElementById(id);
        if ( element !== null ) {
            let node = ReactDOM.findDOMNode(element);
            if ( node ) {
                if ("classList" in node) {
                    node.classList.add(classToAdd);
                }
            }
        }
    }
    hasClass(id: string, classToFind: string): boolean {
        let result = false;
        let element = document.getElementById(id);
        if ( element !== null ) {
            let node = ReactDOM.findDOMNode(element);
            if ( node ) {
                if ("classList" in node) {
                    result = node.classList.contains(classToFind);
                }
            }
        }
        return result;
    }
    removeClass(id: string, classToRemove: string): void {
        let element = document.getElementById(id);
        if ( element !== null ) {
            let node = ReactDOM.findDOMNode(element);
            if ( node ) {
                if ("classList" in node) {
                    node.classList.remove(classToRemove);
                }
            }
        }
    }
    toggleExpansion(id: string): void {
        if ( this.hasClass(id, 'collapsed') ) {
            // expand
            this.expand(id);
        } else {
            // collapse
            this.collapse(id);
        }
    }
}

export default CommentCard;
