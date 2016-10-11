import React from 'react';

export default class NavBar extends React.Component {
  render () {
    return (
      <div id="header">
        <img id="logo" src="../images/whiteLogo.png" />
        <nav>
          <a href="#" id="hamburger"><img src="../images/hamburger.png" /></a>
          <div id="inner-nav">
            <a href="#">Locations</a>
            <a href="#">SongLists</a>
            <a href="#">Discover</a>
            <a href="#">How to Use</a>
            <a href="#"> Sign In / Register</a>
          </div>
        </nav>
      </div>
    );
  }
}

