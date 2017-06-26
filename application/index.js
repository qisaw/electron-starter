import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {actions} from "./actions";
import styles from './app.css';

const App = ({value, increment}) => (
  <div>
    <button onClick={increment}>do something</button>
    {value}
  </div>
);

const mapStateToProps = state => ({
  value: state.counter,
});

const mapDispatchToProps = dispatch => ({
  increment: bindActionCreators(actions.increment, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
