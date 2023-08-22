import { FormEvent, useEffect, useState } from "react";

export type todoType = {
	id:number,
	content:string,
	checked:boolean,
	createdDate:Date,
	finishedDate:Date
}

export default () => {
	const baseUrl = `${import.meta.env.VITE_API_URL}/admin/todo`;
	const [ content, setContent ] = useState<string>("");
	const [ todos, setTodos ] = useState<[todoType]>();

	const getTodos = async () => {
		await fetch(`${baseUrl}s`)
		.then(response => response.json())
		.then(data => setTodos(data))
	}
	const postTodo = (e:FormEvent) => {
		e.preventDefault();
		if (content === "") { alert("内容をご記入ください"); return; }
		fetch(`${baseUrl}`, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				"content": content
			})
		})
		.then(response => {
			if(response.ok) {
				getTodos();
				setContent("");
			}
			else alert("登録失敗");
		})
	}
	const deleteTodo = (id:number) => {
		fetch(`${baseUrl}?id=${id}`, {
			method:"DELETE"
		}).then(response => {
			if(response.ok) {
				getTodos();
			}
			else alert("削除失敗");
		})
	}
	const updateTodo = (id:number) => {
		fetch(`${baseUrl}?id=${id}`, {
			method:"PUT"
		}).then(response => {
			if(response.status !== 200) alert("変更失敗");
			getTodos();
		})
	}

	useEffect(() => {
		getTodos()
	},[])

	return (
		<>
			<h1><span style={{"color":"var(--point-color)"}}>TODO</span>登録</h1>
			<hr/>
			<form onSubmit={ e => postTodo(e) } className="input-group mb-3" style={{"maxWidth":"650px"}}>
				<input type="text" className="form-control" onChange={v => setContent(v.target.value)} value={content}/>
				<input type="submit" className="btn btn-outline-secondary" value="登録"/>
			</form>
			<hr/>
			<ul>
				{ todos ? 
					todos.map(todo => (
						<div key={todo.id} className="my-2">
							<li>
								<span className={`${todo.checked ? "checkedTodo" : ""} clickable`} onClick={() => updateTodo(todo.id)}> {todo.content}  </span>
								{todo.checked ? <i className="bi bi-trash3-fill clickable ms-1" onClick={() => {deleteTodo(todo.id);}}></i> : ""}
							</li>
						</div>
					))
				:
				<p>loading...</p>
				}
			</ul>
		</>
	)
}
