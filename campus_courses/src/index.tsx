import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/router/Router'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<Toaster position='top-center' toastOptions={{ duration: 1000 }} />
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</Provider>
)
