import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import s from '../../css/CreateBook.module.css';

export default () => {
	const [ title, setTitle ] = useState<String>("");
	const [ price, setPrice ] = useState<Number>(0);
	const [ content, setContent ] = useState<String>("");
	const [ url, setUrl ] = useState<String>("");
	const [ publishedDate, setPublishedDate ] = useState<String>("");
	const navi = useNavigate();

	const create = (e: React.FormEvent) => {
		e.preventDefault();
		fetch("http://stg.li-lim.net/book/create", {
			method:"POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				price: price,
				content: content,
				url: url,
				publishedDate: publishedDate,
			})
		})
		.then(response => response.json())
		.then(() => navi(`/book/list`))
		.catch(err => console.log("err:"+err));
	}

	return (
		<>
		<h1>本の<span style={{"color":"var(--point-color)"}}>登録</span></h1>
		<hr/>
		<div className='container'>
			<div className='col-md-3'>
				<form className='display-flex'>
					<div className='d-flex flex-column'>
						<div className='row mb-3'>
							<div>タイトル</div>
							<input className={s.input} type="text" onChange={e => setTitle(e.target.value)}/>
						</div>
						<div className='row mb-3'>
							<div>値段</div>
							<input className={s.input} type="number" onChange={e => setPrice(Number(e.target.value))}/>
						</div>
						<div className='row mb-3'>
							<div>発売日</div>
							<input className={s.input} type="date" onChange={e => setPublishedDate(e.target.value)}/>
						</div>
						<div className='row mb-3'>
							<div>参考URL</div>
							<input className={s.input} type="text" onChange={e => setUrl(e.target.value)}/>
						</div>
						<div className='row mb-3'>
							<div>説明</div>
							<input className={s.input} type="text" onChange={e => setContent(e.target.value)}/>
						</div>
						<div className='row mt-3'>
							<input className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" value="保存"/>
						</div>
					</div>
				</form>
			</div>
			<div className='col-6'></div>
		</div>

		<div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">保存</h5>
				<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
			</div>
			<div className="modal-body">
				<p>以下の内容を保存しますか？</p>
				<br/>
				<p className='text-muted fs-6'>タイトル：{title}</p>
				<p className='text-muted fs-6'>値段：{new Intl.NumberFormat().format(Number(price))} 円</p>
				<p className='text-muted fs-6'>発売日：{publishedDate}</p>
				<p className='text-muted fs-6'>参照URL：{url}</p>
				<p className='text-muted fs-6'>説明：{content}</p>
			</div>
			<div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
				<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e: React.FormEvent) => create(e)}>保存する</button>
			</div>
			</div>
		</div>

		</div>
		</>
	)
}