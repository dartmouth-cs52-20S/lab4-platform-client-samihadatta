import React from 'react';
import {
    BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import '../style.scss';
import Nav from './navbar';
import Posts from './posts';
import Post from './post';
import NewPost from './new-post';

const App = (props) => {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route path="/posts/new" component={NewPost} />
                    <Route path="/posts/:postID" component={Post} />
                    <Route render={() => (<div>post not found </div>)} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
