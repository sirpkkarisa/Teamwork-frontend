import React from 'react';

class GifItem extends React.Component {
	render() {
		const { gif_id, image_title, created_on, image_url} = this.props.gifs;
		return(
			<div className='Article' onClick={this.props.getOneGif.bind(this, gif_id)}>
    			<div className='TitleAndDate'><strong>Title</strong><span>{image_title}</span> 
    			<strong>Created On</strong><span>{created_on}</span> </div>
				<div className='Body'><img src={image_url}/></div>
			</div>
			);
	}
}
export default GifItem;