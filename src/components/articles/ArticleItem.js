import React from 'react';

class ArticleItem extends React.Component{
	render(){
		const {article_id, title, created_on, article} = this.props.article;
		return(
			<div key={article_id} className='Article' onClick={this.props.getOneItem.bind(this,article_id)}>
    			<div className='TitleAndDate'><strong>Title</strong><span>{title}</span> 
    			<strong>Created On</strong><span>{created_on}</span> </div>
				<div className='Body'><span>{article}</span> </div>
    			</div>
			)
	}
}
export default ArticleItem;