import React from 'react';

class SingleArticle extends React.Component{
	render(){
		const {article_id, title, created_on, article} = Object.assign({},this.props.singleArticle[0]);		
// alert(title)
	return(
		<div>
		{title}
		</div>
		);
	}
}
export default SingleArticle;