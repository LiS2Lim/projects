import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

//Core
import Navbar from './components/Navbar';
import Home from './pages/Home';

//BookStore
import BookAppSummary from './pages/BookStore/BookAppSummary';
import CreateBook from './pages/BookStore/CreateBook';
import ReadBook from './pages/BookStore/ReadBook';

//Admin
import Log from './pages/Admin/AdminLog';
import Todo from './pages/Admin/AdminTodo';

function App() {
  return (
	<>
		<BrowserRouter>
			<Navbar />
			<div className='container py-3'>
				<Routes>
						<Route path="/book/summary" element={<BookAppSummary/>}/>
						<Route path="/book/create" element={<CreateBook/>}/>
						<Route path="/book/list/" element={<ReadBook/>}/>
						<Route path="/admin/log/" element={<Log/>}/>
						<Route path="/admin/todo/" element={<Todo/>}/>
						<Route path="/" element={<Home/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	</>
  )
}

export default App
