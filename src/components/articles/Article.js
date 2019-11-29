import React from 'react';
import './Article.css';
import { Redirect } from 'react-router-dom';

class Article extends React.Component{
	state={
		articles:[]
	}
	componentDidMount(){
		fetch('http://localhost:7000/articles',{
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
					articles: res.data
			}))
		.catch(
			(res)=>this.setState({
				articles:'ERROR'
			})
			)
	}
	getToken=()=>{
		return localStorage.getItem('token');
	}
	getUserId = () =>{
		return localStorage.getItem('id');
	}
	handleSubmit=()=>{
		const title = this.articleTitle.value;
		const article = this.article.value;
		const employeeId = this.getUserId();
		fetch('http://localhost:7000/articles',{
			method:'POST',
			headers: new Headers({
				'Authorization':`Bearer ${this.getToken()}`,
				'Content-Type': 'application/json'
			}),
			body:JSON.stringify({
				employeeId,
				title,
				article,
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
	isAuthenticated=()=>{
        const token = localStorage.getItem('token');
        return token && token.length > 20;
    };
    render(){
    	if (!this.isAuthenticated()) {
    		return <Redirect to='/'/>
    	}
    	if (this.state.articles === undefined) {
    		return 'Unauthorized to view this page';
    	}
    	const data=this.state.articles.map((res)=>{
    		return(
    			<div key={res.articleId} className='Article'>
    			<div className='TitleAndDate'><strong>Title</strong><span>{res.title}</span> 
    			<strong>Created On</strong><span>{res.created_on}</span> </div>
				<div className='Body'><span>{res.article}</span> </div>
    			</div>
    			);
    	})
        return(
            <div>
            <p>
            	<input type='text' placeholder='Article Title' ref={articleTitle=>this.articleTitle=articleTitle}/><br/>
            	<textarea placeholder='Article' ref={article=>this.article=article}>
            	</textarea><br/>
            	<input type='submit' value='New article' onClick={this.handleSubmit}/></p>
                {data}
            </div>
        );
    }
}
export default Article;