import React from 'react';
import { Router,Route,Redirect } from 'react-router-dom';

class SingleGif extends React.Component{
	
	render(){
		const { gif_id, image_title, created_on, image_url} = Object.assign({},this.props.singleGif[0]);	
	return(
		<div key={gif_id} className='Article'>
			<div><div className='TitleAndDate'><strong>Title</strong><span>{image_title}</span> 
			<strong>Created On</strong><span>{created_on}</span> </div>
			<div className='Body'><span><img src={image_url} /></span> </div></div>
			<p>
				<button onClick={this.props.handleDelete.bind(this, gif_id)}>Delete</button><br/>
				<button onClick={this.props.handleComment.bind(this, gif_id)}>Comment</button>
			</p>
		</div>
		);
	}
}
export default SingleGif;