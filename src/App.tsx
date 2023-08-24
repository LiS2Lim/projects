import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/Common.css'

//Core
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login/Login';

//BookStore
import BookAppSummary from './pages/BookStore/BookAppSummary';
import CreateBook from './pages/BookStore/CreateBook';
import ReadBook from './pages/BookStore/ReadBook';

//Admin
import AdminHome from './pages/Admin/AdminHome';
import Log from './pages/Admin/AdminLog';
import Todo from './pages/Admin/AdminTodo';
import { RecoilRoot } from 'recoil';

function App() {
  return (
	<>
		<BrowserRouter>
			<RecoilRoot>
				<Navbar/>
				<div className='container py-3'>
					<Routes>
						<Route path="/book/summary" element={<BookAppSummary/>}/>
						<Route path="/book/create" element={<CreateBook/>}/>
						<Route path="/book/list" element={<ReadBook/>}/>
						<Route path="/admin" element={<AdminHome/>}/>
						<Route path="/admin/log" element={<Log/>}/>
						<Route path="/admin/todo" element={<Todo/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/" element={<Home/>}/>
					</Routes>
				</div>
			</RecoilRoot>
		</BrowserRouter>
	</>
  )
}

export default App
