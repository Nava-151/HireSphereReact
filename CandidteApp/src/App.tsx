import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import AppLayout from './AppLayout'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppLayout />

        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
