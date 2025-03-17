import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import { router } from './Router'
import { RouterProvider } from 'react-router-dom'

function App() {


  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
