import { Provider } from 'react-redux'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
import { store } from './store/store'
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
