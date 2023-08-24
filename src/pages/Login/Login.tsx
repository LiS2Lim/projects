import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { loginState } from '../../State'; 

import s from '../../css/Login.module.css';

export default () => {
	const [ isLogin, setIsLogin ] = useRecoilState(loginState);
	const baseUrl = `${import.meta.env.VITE_API_URL}`; 
	const navi = useNavigate();
	const [ booSignin, setbooSignin ] = useState<boolean>(true);
	const [ username, setUsername ] = useState<String>();
	const [ password, setPassword ] = useState<String>();
	const [ passwordCheck, setPasswordCheck ] = useState<String>();

	const signin = () => {
		setUsername("");
		setPassword("");
		setbooSignin(!booSignin);
	}

	const createUser = async (e:FormEvent) => {
		e.preventDefault();
		if(password !== passwordCheck) { alert("パスワードが一致しません"); return;	}
		await fetch(`${baseUrl}/user`, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				"username": username,
				"password": password
			})
		})
		.then(response => {
			if(response.ok) {
				alert("登録成功");
				signin();
			}
			else {
				alert("Error code: " + response.status);
			}
		})
	}

	const login = async (e:FormEvent) => {
		e.preventDefault();
		await fetch(`${baseUrl}/login`, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				"username": username,
				"password": password
			})
		})
		.then(res => res.json())
		.then(result => {
			if(result.token) {
				sessionStorage.setItem("token",result.token);
				alert("ログインしました");
				setIsLogin(true);
				console.log(isLogin);
				navi("/");
			}
			else {
				alert("Error code: " + result.code)
			}
		})
	}

	return (
		<div className={`${s.body} ${booSignin ? s.bodyActive : ""}`}>
			<button className={`${s.back} btn`} onClick={() => { navi(-1);}}>Back</button>
			<div className={s.container}>

				<div className={s.blueBg}>
					<div className={`${s.box} ${s.signin}`}>
						<h2>アカウントを持っている</h2>
						<button className={`${s.signinBtn}`} onClick={ signin }>ログインへ</button>
					</div>
					<div className={`${s.box} ${s.signup}`}>
						<h2>新規登録したい</h2>
						<button className={`${s.signupBtn}`} onClick={ signin }>新規登録へ</button>
					</div>
				</div>

				<div className={`${s.formBx} ${booSignin ? "" : s.active}`}>
					<div className={`${s.form} ${s.signinForm}`}>
						<form onSubmit={e => login(e)}>
							<h3>ログイン</h3>
							<input type='text' onChange={e => setUsername(e.target.value)} placeholder='アカウント名' />
							<input type='password' onChange={e => setPassword(e.target.value)} placeholder='パスワード' />
							<input type='submit' value="ログイン" />
							<Link className={s.forget} to="/forget">パスワードを忘れた場合</Link>
						</form>
					</div>
					<div className={`${s.form} ${s.signupForm}`}>
						<form onSubmit={e => createUser(e)}>
							<h3>新規登録</h3>
							<input type='text' onChange={e => setUsername(e.target.value)} placeholder='アカウント名' />
							<input type='password' onChange={e => setPassword(e.target.value)} placeholder='パスワード' />
							<input type='password' onChange={e => setPasswordCheck(e.target.value)} placeholder='パスワード確認' />
							<input type='submit' value="登録" />
						</form>
					</div>
				</div>

			</div>
		</div>
	);
};