import React from 'react';
import {
    BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import '../style.scss';
import Nav from './navbar';
import Posts from './posts';
import Post from './post';
import NewPost from './new-post';
import Fallback from './fallback';
import SignIn from './signin';
import SignUp from './signup';
import PrivateRoute from './private-route';


const App = (props) => {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <PrivateRoute path="/posts/new" component={NewPost} />
                    <Route path="/posts/:postID" component={Post} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route component={Fallback} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
