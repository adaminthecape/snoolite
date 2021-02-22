import React from 'react';
import '../../css/loading-bar.css';

class LoadingBar extends React.Component<any, any> {
    constructor(props: { progress?: any, status?: any }) {
        super(props);
        this.state = {};

    }
    render() {
        if ( this.props.progress ) {
            return (
                <div className={'af-loading-bar smooth'}>
                    { this.props.status ? 'Loading: ' + this.props.status : '' }
                    <div className={'filler'} style={{ width: this.props.progress + '%' }}>&nbsp;</div>
                </div>
            );
        } else {
            return (
                <div className={'af-loading-bar smooth'}>
                    <div className={'text'}>Status: Demo</div>
                    <div className={'filler'} style={{ width: '40%' }}>&nbsp;</div>
                </div>
            );
        }
    }
    componentDidMount() {}
}

export default LoadingBar;
