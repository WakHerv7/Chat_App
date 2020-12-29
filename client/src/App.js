import React from 'react';      // Necessary for every REACT Component

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import { BrowserRouter as Router, Route } from 'react-router-dom';


// When the user first come to on the page is greeted with the Join Component. He is going to pass his data through the login form
// And we are going to pass these datas through the Chat and then render the chat component
const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} /> 
    </Router>
);

export default App;