import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './routes/login';

class App extends Component {

    render() {
        return (
            <Switch >
              <Route path="/" exact component={Login} />
            </Switch >
        );
    }
}

export default App;
