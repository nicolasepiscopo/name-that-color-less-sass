require('./styles/main.scss');

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/App/App');

ReactDOM.render(<App />, document.getElementById('color-names'));
