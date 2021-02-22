import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, NavLink, Redirect
} from "react-router-dom";
import './css/nav.css';
import * as util from "./Home/util/my-utils";
import HomePage from "./Home/home";
import ViewSubreddit from "./Home/details/view-subreddit";
import ViewSubmission from "./Home/details/view-submission";
import SearchContainer from "./Home/search/search-container";
import Discover from "./Home/discover/discover";
import UserOptions from "./Home/options/user-options";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayMode: util.getDisplayMode(),
            activePost: util.getActivePost()
        };
    }
    render() {
        return (
            <Router>
                <div className={this.state.displayMode === 'light' ? 'fullPage lightMode' : 'fullPage darkMode'}>
                    <nav className="nav-group smoothest">
                        <NavLink className="nav-tab" activeClassName="isActive" to="/home">
                            Home</NavLink>
                        <NavLink className="nav-tab" activeClassName="isActive" to="/discover">
                            Discover</NavLink>
                        <NavLink className="nav-tab" activeClassName="isActive" to="/search">
                            Search</NavLink>
                        <NavLink className="nav-tab" activeClassName="isActive" to="/continue">
                            Continue</NavLink>
                        <NavLink className="nav-tab" activeClassName="isActive" to="/options">
                            Options</NavLink>
                    </nav>
                    <Switch>
                        <Route exact path="/"><Redirect to="/home" /><HomePage /></Route>
                        <Route path="/home"><HomePage /></Route>
                        <Route path="/discover"><Discover /></Route>
                        <Route path="/search"><SearchContainer /></Route>
                        <Route path="/continue"><ViewSubmission /></Route>
                        <Route path="/options"><UserOptions /></Route>
                        <Route path="/view-sub"><ViewSubreddit /></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
