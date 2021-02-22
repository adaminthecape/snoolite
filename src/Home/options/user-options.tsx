import React from 'react';
import './user-options.css';
import * as util from "../util/my-utils";

class UserOptions extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayMode: util.getDisplayMode(),
            dataUsageStats: util.getDataUsage(),
            allowNsfw: util.getAllowNsfw()
        };
    }
    render() {
        return (
            <div>
                <section className="myOptions smooth">
                    <h2>Options</h2>
                    <div className="optionContainer">
                        <div className={
                            this.state.displayMode === 'light' ?
                                'optionButton selected'
                                : 'optionButton'
                        } onClick={()=>this.changeDisplayMode('light')}>Light mode</div>
                        <div className={
                            this.state.displayMode === 'dark' ?
                                'optionButton selected'
                                : 'optionButton'
                        } onClick={()=>this.changeDisplayMode('dark')}>Dark mode</div>
                    </div>
                    <div className="optionContainer">
                        <div className={
                            this.state.allowNsfw === 'true' ?
                                'optionButton selected'
                                : 'optionButton'
                        } onClick={()=>this.changeAllowNsfw('true')}>Show 18+ posts</div>
                        <div className={
                            this.state.allowNsfw === 'false' ?
                                'optionButton selected'
                                : 'optionButton'
                        } onClick={()=>this.changeAllowNsfw('false')}>Hide 18+ posts</div>
                    </div>
                    <div className="optionContainer">
                        <div className={'data-usage'}>
                            Data usage:
                            <div className={'stats'}>Reddit:
                                <div># requests received: { this.state.dataUsageStats.rxNumReddit }</div>
                                <div>Bytes received: { this.state.dataUsageStats.rxReddit }</div>
                                <div># requests sent: { this.state.dataUsageStats.txNumReddit }</div>
                                <div>Bytes sent: { this.state.dataUsageStats.txReddit }</div>
                                <div>Total usage: {
                                    Math.round((this.state.dataUsageStats.rxReddit
                                    + this.state.dataUsageStats.txReddit)
                                    / 1024) / 1000
                                } MB</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    changeDisplayMode(mode: string): void {
        util.setDisplayMode(mode);
        this.setState({ displayMode: mode });
        window.location.reload();
    }
    changeAllowNsfw(mode: string): void {
        util.setAllowNsfw(mode);
        this.setState({ allowNsfw: mode });
        window.location.reload();
    }
}

export default UserOptions;

