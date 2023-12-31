import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { todoType } from "./Admin/AdminTodo";

export default () => {

	const baseUrl = `${import.meta.env.VITE_API_URL}/admin/todo`;
	const [ todos, setTodos ] = useState<[todoType]>();

	const getTodos = async () => {
		await fetch(`${baseUrl}s`)
		.then(response => response.json())
		.then(data => setTodos(data))
	}

	useEffect(() => {
		getTodos()
	},[])

	return (
		<>
			<h1>作業記録</h1>
			<hr/>
			<p>2023-08-22 | <span className="badge rounded-pill bg-success">作業中</span> JWTを使ったログイン機能の追加</p>
			<p>2023-08-22 | 会員登録機能の実装</p>
			<p>2023-08-21 | ログインページデザイン追加</p>
			<p>2023-08-21 | HTTPS化(SSLインストール)</p>
			<p>2023-08-18 | TODOリストのフロント側実装(with React, TypeScript)</p>
			<p>2023-08-17 | TODOリストのRestAPI作成</p>
			<p>2023-08-16 | 削除・編集機能の追加</p>
			<p>2023-08-16 | ページデザイン改修</p>
			<p>2023-08-15 | CRUDのAPI登録テスト中・・・</p>
			<br/><br/>

			<h2><Link to="/admin/todo">TODO</Link></h2>
			<hr/>
			<ul>
				{ todos ? 
					todos.map(todo => (
						<div key={todo.id} className="my-2">
							<li className={`${todo.checked ? "checkedTodo" : ""}`}> {todo.content}  </li>
						</div>
					))
				:
				<p>loading...</p>
				}
			</ul>
			<br/><br/>
		</>
	)
}
