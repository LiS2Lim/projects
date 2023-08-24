import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { loginState } from '../State';

export default () => {
	const [ isLogin, setIsLogin ] = useRecoilState(loginState)
	const logout = () => {
		sessionStorage.removeItem("token");
		setIsLogin(false);
		alert("ログアウトしました");
	}

	useEffect(()=>{
		setIsLogin(sessionStorage.getItem("token") != null ? true : false);
	},[ isLogin ])

	return (
		<div className="navbar navbar-expand-lg navbar-light bg-light">
			<div className='container-fluid'>
				<Link className='navbar-brand' to="/"><i className="bi bi-wechat">Lim's Projects</i></Link>
				<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="bookstore" role="button" data-bs-toggle="dropdown">BookStore</a>
						<ul className="dropdown-menu">
							<li className='nav-item'><Link className="nav-link" to="/book/summary">プロジェクト概要</Link></li>
							<li><hr className="dropdown-divider"/></li>
							<li className='nav-item'><Link className="nav-link" to="/book/create">登録</Link></li>
							<li className='nav-item'><Link className="nav-link" to="/book/list">リスト</Link></li>
						</ul>
					</li>
					{/* <li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="controller" role="button" data-bs-toggle="dropdown">管理</a>
						<ul className="dropdown-menu">
							<li className='nav-item'><Link className="nav-link" to="/admin/log">作業記録</Link></li>
							<li className='nav-item'><Link className="nav-link" to="/admin/todo">TODO</Link></li>
						</ul>
					</li> */}
				</ul>
				<form>
					{!isLogin ? 
						<Link className='btn btn-outline-success' to="/login">Login</Link>:
						<button className='btn btn-outline-success' onClick={ logout }>Logout</button>
					}
				</form>
			</div>
		</div>
	)
}