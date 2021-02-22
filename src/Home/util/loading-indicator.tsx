import React from 'react';
import '../../css/loading-indicator.css';
import {fadeInSingle} from "./my-utils";

let indicatorId: string;
class LoadingIndicator extends React.Component<any, any> {
    constructor(props: { progress?: any, status?: any }) {
        super(props);
        this.state = {};
        indicatorId = new Date().getTime().toString();
    }
    render() {
        return (
            <div className={'af-loading-indicator smoothest'} id={indicatorId} style={{ opacity: 0 }}>
                <div className="anim" title="Loading...">
<svg className='rotating' version="1.1" id="loader-1" height='50' width='50' viewBox="0 0 50 50">
    <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" />
</svg>
                </div>
                <div className={'text'}>{ this.props.status ? 'Loading: ' + this.props.status : '' }</div>
            </div>
        );
    }
    componentDidMount() {
        // opacity starts at 0.
        // increase this to show the indicator.
        fadeInSingle(document.getElementById(indicatorId), 100);
    }
    componentWillUnmount(): void {
        // fade out
        // fadeOutSingle(document.getElementById(indicatorId));
    }
}

export default LoadingIndicator;
