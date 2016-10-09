import React from 'react';

const propTypes = {
  handleSubmit: React.PropTypes.func,
  buttonText: React.PropTypes.string,
};

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  }
  render() {
    return (
      <div id="login-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="email..."
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.pasword}
            placeholder="password..."
            onChange={this.handleInputChange}
          />
          <input type="submit" onClick={this.handleSubmit} value={this.props.buttonText} />
        </form>
      </div>
    );
  }
}

UserForm.propTypes = propTypes;








