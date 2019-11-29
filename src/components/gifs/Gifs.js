import React from 'react';
import { Redirect } from 'react-router-dom';
class Gifs extends React.Component{
	state={
		Gifs:[],
		selectedFile:null
	}
	gif=React.createRef();
	openFile=()=>{
		const gif = document.querySelector('input[type=file]').files[0];

		this.setState({
			selectedFile:gif
		})
	}
	gifBtn=()=>{
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
	render(){
		if (!this.isAuthenticated()) {
			return <Redirect to='/'/>;
		}
		if (this.state.Gifs === undefined) {
    		return 'Unauthorized to view this page';
    	}
		const gifs=this.state.Gifs.map((data)=>{
			return(
				<div key={data.gifId} className='Article'>
    			<div className='TitleAndDate'><strong>Title</strong><span>{data.image_title}</span> 
    			<strong>Created On</strong><span>{data.created_on}</span> </div>
				<div className='Body'><img src={data.image_url}/></div>
    			</div>
				);
		});
		return(
			<div>
			<p>
			<input type='text' placeholder='GIF Title' ref={imageTitle=>this.imageTitle=imageTitle}/>
			<input type='file' onChange={this.openFile} />
			<input type='submit' value='Add GIF' onClick={this.gifBtn}/>
			</p>
				{gifs}
			</div>
			);
	}
}
export default Gifs;