import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login/Login';

export default class MusicKitAuthorizeProvider extends React.Component {
  constructor(props) {
    super(props);
    const music = MusicKit.getInstance();

    this.state = {
      ready: music.isAuthorized,
    };
  }

  async authorize() {
    const music = MusicKit.getInstance();
    await music.authorize();

    this.setState({
      ready: true,
    });
  }

  render() {
    if (!this.state.ready) {
      return <Login onClick={() => this.authorize()} />;
    }

    return this.props.children;
  }
}

MusicKitAuthorizeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};