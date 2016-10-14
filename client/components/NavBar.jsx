import React from 'react';
import { Link } from 'react-router';
import UserAuth from './UserAuth.jsx';
import Modal from 'react-modal';
import SpotifyTest from './SpotifyTest.jsx';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      playlistModalOpen: false,
      // searchModalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    // this.openSearchModal = this.openSearchModal.bind(this);
    // this.closeSearchModal = this.closeSearchModal.bind(this);
    // this.afterOpenSearchModal = this.afterOpenSearchModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleCreateClick () {
    this.props.handleNewMarker();
    this.props.openPlaylistModal();
  }

  // openSearchModal() {
  //   this.setState({ searchModalOpen: true });
  // }

  // afterOpenSearchModal() {
  //   this.refs.subtitle.style.color = '#f00';
  // }

  // closeSearchModal() {
  //   this.setState({ searchModalOpen: false });
  // }
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
            <Link onClick={this.openModal} to="/login" id="login">Log-In / Log-Out</Link>
          </div>
          <button id="playlist-button" onClick={this.handleCreateClick}>Create Playlist!</button>
        </nav>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <UserAuth closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
}

// NavBar.propTypes = propTypes;

 // <Modal
 //            className="searchModal"
 //            isOpen={this.state.searchModalOpen}
 //            onAfterOpen={this.afterOpenSearchModal}
 //            onRequestClose={this.closeSearchModal}
 //          >

 //          </Modal>
