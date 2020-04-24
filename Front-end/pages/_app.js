import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import Login from './login';
import Signup from './signup';
import ForgotPassword from './forgotPassword';
import UserProvider from '../contexts/UserProvider.js';
import VerifyFail from './verifyFail.js';
import VerifySuccessful from './verifySuccessful.js';

class MyApp extends App {

  specialLinks = ['/login', '/signup', '/verifySuccessful', '/verifyFail', '/forgotPassword']

  state = {
    path: ""
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const { asPath } = this.props.router;
    if (asPath !== this.state.path)
      this.setState({ path: asPath });
  }

  componentDidUpdate() {
    const { asPath } = this.props.router;
    if (asPath !== this.state.path)
      this.setState({ path: asPath });
  }

  ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }

    return rgb;
  }

  state = {
    prefersDarkMode: false
  }

  theme = {
    palette: {
      primary: {
        main: '#2196f3'
      },

      testing: {
        main: '#03b6fc'
      },

      avatar: {
        main: '#2196f3'
      },

      paper: {
        loginLight: 'rgba(255, 255, 255, 0.7)',
        light: 'rgba(255, 255, 255, 0.6)',
        dark: 'rgba(48, 48, 45, 0.6)'
      },

      loginLayer: {
        main: 'rgba(48, 48, 45, 0.15)'
      },

      menuPaper: {
        light: 'rgba(232, 232, 223, 0.2)',
        dark: 'rgba(48, 48, 45, 0.5)'
      },

      cardMedia: {
        light: 'rgba(255, 255, 255, 1)',
        dark: 'rgba(50, 50, 50, 1)'
      },

      barButton: {
        main: 'linear-gradient(45deg, #2196f3, #03b6fc)',
      },

      type: 'light'
    },
  }

  muiTheme = {}

  toggleTheme = () => {
    const { prefersDarkMode } = this.state;
    this.setState({
      prefersDarkMode: !prefersDarkMode
    })
  }

  createTheme = () => {
    //console.log(this.prefersDarkMode);
    const { prefersDarkMode } = this.state;
    this.theme.palette.type = prefersDarkMode ? 'dark' : 'light';
    this.muiTheme = this.customizeTheme(createMuiTheme(this.theme));
    return this.muiTheme;
  }

  customizeTheme = (theme) => {
    theme.getColor = this.getColor;
    for (let colorKey in theme.palette) {
      const color = theme.palette[colorKey];
      if (color.main) {
        if (!color.light)
          theme.palette[colorKey].light = this.ColorLuminance(color.main, 0.2);
        if (!color.dark)
          theme.palette[colorKey].dark = this.ColorLuminance(color.main, -0.2);
      }
    }
    return theme;
  }

  getColor = (colorChoice) => {
    const { prefersDarkMode } = this.state;
    for (let colorKey in this.muiTheme.palette) {
      if (colorKey === colorChoice) {
        const color = this.muiTheme.palette[colorKey];
        return prefersDarkMode ? color.dark : color.light;
      }
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserProvider>
        <ThemeProvider theme={this.createTheme()}>
          {
            this.state.path === "/login" &&
            <Login />
          }
          {
            this.state.path === "/signup" &&
            <Signup/>
          }
          {
            this.state.path === "/forgotPassword" &&
            <ForgotPassword/>
          }
          {
            this.state.path === "/verifyFail" &&
            <VerifyFail/>
          }
          {
            this.state.path === "/verifySuccessful" &&
            <VerifySuccessful/>
          }
          {
            !this.specialLinks.includes(this.state.path) &&
            <Layout toggleTheme={this.toggleTheme}>
              <Component {...pageProps} />
            </Layout>
          }
        </ThemeProvider>
      </UserProvider>
    );
  }
}

export default withRouter(MyApp);