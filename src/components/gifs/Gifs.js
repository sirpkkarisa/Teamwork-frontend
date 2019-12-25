import React from 'react';
import { Redirect } from 'react-router-dom';
import GifItem from './GifItem';
import Rows from './Rows';
import SingleGif from './SingleGif';

class Gifs extends React.Component{
	state={
		Gifs:[],
		singleGif:'',
		eId:''
	}
	gif=React.createRef();
	openFile=()=>{
		const gif = document.querySelector('input[type=file]').files[0];

		this.setState({
			selectedFile:gif
		})
	}
	gifBtn = (e) =>{
		e.preventDefault();
		const imageTitle = this.imageTitle.value;
		const employeeId = this.getUserId();
		// const gif = document.querySelector('input[type=file]');
		// const preview = document.querySelector('img');
		const reader  = new FileReader();
		const formData = new FormData()
  		formData.append('image',this.state.selectedFile,this.state.selectedFile.name)
  		formData.append('imageTitle',imageTitle);
  		formData.append('employeeId',employeeId);

		// reader.onloadend = function () {
		//     preview.src = reader.result;
		//   }

		  // if (gif) {
		  //   reader.readAsDataURL(gif);
		  // }
		 //  const upload=(file)=>{
		 //  	console.log(file)
		 //  }
		 //  const onSelectFile = () => upload(gif.files[0])

			// // Add a listener on your input
			// // It will be triggered when a file will be selected
			// gif.addEventListener('change', onSelectFile, false);

		  fetch('http://localhost:7000/gifs',{
		  	method:'POST',
		  	headers:new Headers({
		  		'Authorization': `Bearer ${this.getToken()}`
		  	}),
		  	body:formData

		  })
		  .then(
		  	(res)=>res.json()
		  	)
		  .then(
		  	(res)=>this.setState()
		  	)
		  .catch(
		  	(error)=>console.log(error)
		  	)
	}

	componentDidMount(){
		fetch(`http://localhost:7000/gifs`,{
			method:'GET',
			headers: new Headers({
				'Authorization':`Bearer ${this.getToken()}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		})
		.then(
			(res)=>res.json()
			)
		.then(
			(res)=>this.setState({
					Gifs: res.data
			}))
		.catch(
			(res)=>this.setState()
			)
	}
	isAuthenticated=()=>{
        const token = localStorage.getItem('token');
        return token && token.length > 20;
    };
	getToken=()=>{
		return localStorage.getItem('token');
	}
	getUserId =()=>{
		return localStorage.getItem('id');
	}
	getOneGif = (gifId) => {
		const form =  document.querySelector('form');
    	form.style.display='none';
		fetch(`http://localhost:7000/gifs/${gifId}/`,{
			method:'GET',
			headers: new Headers({
				'Authorization':`Bearer ${this.getToken()}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		})
		.then(
			(res)=>res.json()
			)
		.then(
			(res) =>this.setState({
				singleGif: res.data
			})
			)
		.catch(
			(res)=>this.setState({
				singleGif:'ERROR'
			})
			)

	}
	handleDelete = (id) => {
		const employeeId = this.getUserId();
		const articleId=this.props.match.params = id;
		fetch(`http://localhost:7000/gifs/${articleId}`,{
			method:'DELETE',
			headers: new Headers({
				'Authorization':`Bearer ${this.getToken()}`,
				'Content-Type': 'application/json'
			}),
			body:JSON.stringify({
				employeeId,
				articleId,
			})
		})
		.then(
			(res) => res.json()
			)
		.then(
			(res) =>{
				this.setState()
			}
		)
		.catch(
			(error) => {
				console.log(error)
			}
			)
	}
	handleCommentForm = (e) => {
		e.preventDefault();
		const comment = this.comment.value;
		const gifId=this.props.match.params = this.state.eId;

		fetch(`http://localhost:7000/gifs/${gifId}/comment`,{
			method:'POST',
			headers: new Headers({
				'Authorization':`Bearer ${this.getToken()}`,
				'Content-Type': 'application/json'
			}),
			body:JSON.stringify({
				comment,
			})
		})
		.then(
			(res) => res.json()
			)
		.then(
			(res) =>{
				this.setState()
			}
		)
		.catch(
			(error) => {
				console.log(error)
			}
			)

	}
	handleComment = (id) => {
		const commentForm = document.getElementsByClassName('Comment');
		const AGif =  document.getElementsByClassName('AGif');
		AGif[0].style.display='none';
		commentForm[0].style.display='inline-block';
		this.setState({eId:id});
	}
	render(){
		if (!this.isAuthenticated()) {
			return <Redirect to='/'/>;
		}
		if (this.state.Gifs === undefined) {
    		return 'Unauthorized to view this page';
    	}
		const gifs=this.state.Gifs.map((data)=>{
			return(
				<GifItem  key={data.gif_id} gifs={data} getOneGif={this.getOneGif}/>
				);
		});
		return(
			<React.Fragment>
			<div>
			<form onSubmit={this.gifBtn} className='AGif'>
			<input type='text' placeholder='GIF Title' ref={imageTitle=>this.imageTitle=imageTitle}/>
			<input type='file' onChange={this.openFile} />
			<input type='submit' value='Add GIF' />
			</form>				{
					this.state.singleGif ?
					 <SingleGif singleGif={this.state.singleGif}
					 handleDelete={this.handleDelete}
					 handleComment={this.handleComment}/>:(
						<Rows gifs={gifs}/>
						)
				}
				<div>
	            <form style={{display:'none'}} onSubmit={this.handleCommentForm} className='Comment'>
		            <p><textarea ref={comment=>this.comment=comment}></textarea></p>
		            <p><input type='submit' value='Comment'/></p>
	            </form>
	            </div>
			</div>
			</React.Fragment>
			);
	}
}
export default Gifs;