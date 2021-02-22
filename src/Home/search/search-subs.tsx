import React from 'react';
import * as util from "../util/my-utils";
import SubList from "../lists/sub-list";

class SearchSubs extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            o_keyword: '',
            subs: util.getSubSearchData(),
            opts: util.getSubSearchOptions(),
            subsLoading: false
        };
    }
    render() {
        return (
            <div className={'hasMargin'}>
                <h5>Search for a topic</h5>
                <div className="af-form-field smooth">
                    <input type="text" onChange={this.handleChange} id="o_keyword" placeholder="keyword" defaultValue={this.state.opts.q} />
                    <button className={'af-button'} onClick={()=>this.searchSubs()}>Search</button>
                </div>
                { this.state.subs && this.state.subs.length === 0 && !this.state.subsLoading ?
                    <h5>please enter a topic ...</h5>: ''
                }
                { !this.state.subsLoading ?
                    this.state.subs && this.state.subs.length > 0 ?
                        <SubList subs={this.state.subs} /> : ''
                        : 'loading ...'
                }
            </div>
        );
    }
    componentDidMount() {}
    handleChange = (e: any) => {
        switch ( e.target.id ) {
            case 'o_keyword': this.setState({ o_keyword: e.target.value }); break;
        }
    }
    searchSubs(): void {
        this.setState({ subsLoading: true });
        console.log('subs to find: ' + this.state.o_keyword);
        let options = { q: this.state.o_keyword };
        util.rawGetSubs(options)
            .then((data) => {
                if ( data.kind === 'Listing' ) {
                    // save after & before so the list can load next/prev posts
                    util.setPostlistData({
                        lastLoadTime: util.utcNow(),
                        lastPostList: data.data.children,
                        after: data.data.after,
                        before: data.data.before
                    });
                    // put the data in the state
                    this.setState({ subs: data.data.children, subsLoading: false });
                    util.setSubSearchData( data.data.children );
                    util.setSubSearchOptions( options );
                }
            });
    }
}

export default SearchSubs;
