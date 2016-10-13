import React from 'react';
import { Link } from 'react-router';
import UserForm from './UserForm.jsx';
import UserAuth from './UserAuth.jsx';
import Modal from 'react-modal';

// const propTypes = {
//   openModal: React.PropTypes.func,
// };

export default class NavBar extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
  //   this.refs.subtitle.style.color = '#f00';
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

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
            <Link onClick={this.openModal} to="/login" id="login">Log-In / Register</Link>
          </div>
        </nav>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <button id="close" onClick={this.closeModal}>Close</button>
          <UserForm />
        </Modal>

      </div>
    );
  }
}

// NavBar.propTypes = propTypes;


