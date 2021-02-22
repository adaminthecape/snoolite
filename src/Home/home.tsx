import React from 'react';
import './home.css';
import * as util from "./util/my-utils";
import PostList from "./lists/post-list";
import SubList from "./lists/sub-list";

class HomePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showTopSubs: false,
            showTopPosts: false,
            showTopComments: false,
            subData: [],
            activePostData: [],
        };
    }
    render() {
        return (
            <div className={'component about-app smoother'}>

                {/* <SubCard subData={ this.state.subData } /> */}

                <div className={'custom'}>
                    <p>Hello and welcome to my reddit client.</p>
                    <p>Reddit is a network of communities based on people's interests. (Visit them <a href={'http://www.reddit.com/'}>here</a>).</p>
                    <p>I created this site partly to learn React, and partly to improve on reddit.com's speed and search functionality.</p>
                    <p>I value your privacy. This website does not store, sell, or analyze your data in any way. This website also does not use cookies.</p>
                </div>

                <div className={'custom clickable'} onClick={() => window.location.href='continue'}>
                    Continue from your last session
                    { this.checkSession() ? '' : ' (no session found)' }
                </div>

                <div className={'discoverContainer custom'}>
                    <div>Discover new topics and communities</div>
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
                        <PostList options={{ subreddit: 'all', sort: 'top', t: 'hour' }} /> : ''
                    }
                    { this.state.showTopSubs ?
                        <SubList options={{}} /> : ''
                    }
                </div>

                <div className={'custom'}>
                    <p>Feel free to contact me if you have any questions or bug reports.</p>
                    <p>My Github profile: <a href={'http://www.github.com/adaminthecape'}>github.com/adaminthecape</a></p>
                    <p>My website: <a href={'https://adam-in-the-cape.web.app/'}>adam-in-the-cape.web.app</a></p>
                </div>

            </div>
        );
    }
    componentDidMount(): void {
        util.rawGetSubs({ q: 'travel' })
            .then((data) => {
                this.setState({ subData: data.data.children });
            });
    }
    checkSession(): boolean {
        // check if user has an active session
        let result = false;
        let data = util.getActivePostData();
        if ( data ) {
            result = (data.kind === 'Listing');
        }
        return result;
    }
}

export default HomePage;
