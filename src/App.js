import React, { Component } from 'react';
import CurrentCurrency from './components/CurrentCurrency';
import Header from './components/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

//required for material-ui
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header title='Exchange Rate Converter'/>
          <CurrentCurrency />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
