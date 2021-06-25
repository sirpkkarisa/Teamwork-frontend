import React from 'react';
import { Router,Route,Redirect } from 'react-router-dom';

class SingleArticle extends React.Component{
	
	render(){
		const {article_id, title, created_on, article} = Object.assign({},this.props.singleArticle[0]);	
	return(
		<div key={article_id} className='Article'>
			<div><div className='TitleAndDate'><strong>Title</strong><span>{title}</span> 
			<strong>Created On</strong><span>{created_on}</span> </div>
			<div className='Body'><span>{article}</span> </div></div>
			<p>
				<button onClick={this.props.handleEdit.bind(this, article_id)}>Edit</button><br/>
				<button onClick={this.props.handleDelete.bind(this, article_id)}>Delete</button><br/>
				<button onClick={this.props.handleComment.bind(this, article_id)}>Comment</button>
			</p>
		</div>
		);
	}
}
export default SingleArticle;