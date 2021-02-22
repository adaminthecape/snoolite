import React from 'react';
import * as util from "../util/my-utils";
import SubCard from "../cards/sub-card";

class SubList extends React.Component<any, any> {
    props: { subs?: any, options?: any };
    constructor(props: { subs: any }) {
        super(props);
        this.props = props;
        this.state = {
            subs: props.subs
        };
    }
    render() {
        return (
            <div className={'subList'}>
                { this.state.subs ?
                    this.state.subs.map((item: any) => (
                        <SubCard key={util.randomKey()} subData={item} />
                    )) : 'loading ...'
                }
            </div>
        );
    } // render() closing tag
    componentDidMount(): void {
        if ( !this.props.subs ) {
            this.getAndSetSubs(this.props.options);
        }
    }
    getAndSetSubs(options: any): void {
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
                        this.setState({ subs: data.data.children });
                    }
                });
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
}

export default SubList;
