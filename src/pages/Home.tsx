export default () => {
	return (
		<>
			<h1>作業記録</h1>
			<hr/>
			<p>2023-08-16 | <span className="badge rounded-pill bg-success">作業中</span> 削除・編集機能の追加</p>
			<p>2023-08-16 | ページデザイン改修</p>
			<p>2023-08-15 | CRUDのAPI登録テスト中・・・</p>
			<br/><br/>

			<h2>TODO</h2>
			<hr/>
			<ul>
				<li>詳細を見るページを追加</li>
				<li>写真やファイルなどもサーバーにアップロードできるように</li>
				<li>日付を選択して登録できるように</li>
				<li>管理者ログインができるように</li>
				<li>記録の登録・編集・削除を管理者ページにてできるように</li>
				<li>Gihub Actionを使ったCI/CD自動化</li>
				<li>SSL認定証インストール</li>
				<li>データベースをMariaDBに変更</li>
			</ul>
			<br/><br/>
		</>
	)
}
