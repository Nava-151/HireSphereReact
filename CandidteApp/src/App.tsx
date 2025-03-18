import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
function App() {


  return (
    <>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </>
  )
}

export default App
