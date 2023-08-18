import { useEffect, useState } from 'react';

type bookType = {
	id:number,
	title:String,
	price:number,
	url:string,
	content:String,
	publishedDate:Date,
	createdDate:Date
}

export default () => {
	const [ books, setBooks ] = useState<[bookType]>();
	const getList = async () => {
		await fetch("http://stg.li-lim.net/book/list")
		.then((res: Response) => res.json())
		.then((data) => setBooks(data))
	}

	useEffect(() => {
		getList();
	},[])

	return (
		<>
		<h1>登録された<span style={{"color":"var(--point-color)"}}>リスト</span></h1>
		<hr/>
			<div className='d-flex flex-wrap justify-content-start'>
				{ books ? books.map(book => (
					<div key={book.id} className='card m-2' style={{"width":"18rem"}}>
						<div className='card-body'>
							<h5 className='card-tit-mutedle strong'>{book.title}</h5>
							<hr/>
							<p className='card-text'><a href={book.url || "#"} target='_blank'>参照情報</a></p>
							<p className='card-text'>値段: {new Intl.NumberFormat('jp').format(book.price) || 0} 円</p>
							<p className='card-text'>発売日: {book.publishedDate?.toString() || "登録無し"}</p>
							<p className='card-text'>詳細: {book.content || "登録無し"}</p>
						</div>
					</div>
				)): <p>Loading...</p>}
			</div>

		</>
	)
}
