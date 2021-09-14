import SyncStorage from 'sync-storage'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Main from './components/Main'
import { __store__ } from './redux/configureStore'

const store = __store__()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }

  async componentDidMount () {
    const data = await SyncStorage.init()
    
  }
}

export default App
