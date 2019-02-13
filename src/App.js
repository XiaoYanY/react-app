import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';

import './server/api';
import Header from './component/header';
import Nav from './component/nav';
import Routes from "./routes";

class App extends Component {
  render() {
      return (
          <div className="App">
              <header>
                  <Header/>
                  <Nav/>
              </header>
              <section className='content'>
                  <div>
                      <Routes/>
                  </div>
              </section>
          </div>
      );
  }
}

export default App;
