import React from 'react';
import * as util from "../util/my-utils";
import PostCard from "../cards/post-card";

class PostList extends React.Component<any, any> {
    props: { posts?: any, options?: any };
    constructor(props: { posts: any }) {
        super(props);
        this.props = props;
        this.state = {
            posts: props.posts
        };
    }
    render() {
        return (
            <div className={'postList'}>
                { this.state.posts ? this.state.posts.map((item: any) => (
                    <PostCard postData={item} key={util.randomKey()} />
                    )) : 'loading ...'
                }
            </div>
        );
    } // render() closing tag
    componentDidMount(): void {
        if ( !this.props.posts ) {
            // check for a subreddit
            if ( !this.props.options ) {
                // no data found!
            } else {
                if ( this.props.options.subreddit ) {
                    // get data for this subreddit
                    this.getAndSetPosts(this.props.options);
                }
            }
        }
    }
    getAndSetPosts(options: any): void {
        // validate
        if ( options && options.subreddit ) {
            // continue
            util.rawGetPosts(options)
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
                        this.setState({ posts: data.data.children });
                    }
                });
        }
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

export default PostList;
