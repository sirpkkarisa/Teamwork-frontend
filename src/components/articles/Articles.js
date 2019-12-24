import React from 'react';
import './Article.css';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ArticleItem from './ArticleItem'
import SingleArticle from './SingleArticle';
import Rows from './Rows';
import Test from './Test';


class Articles extends React.Component{
	state={
		articles:[],
		singleArticle:'',
		// editTitle:'',
		// editArticle:''
		eId:''
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
    getOneItem=(articleId)=>{
		fetch(`http://localhost:7000/articles/${articleId}/`,{
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
				singleArticle: res.data
			})
			)
		.catch(
			(res)=>this.setState({
				articles:'ERROR'
			})
			)

	}
	handleEditForm = (e) => {
		e.preventDefault();
		const title = this.eTitle.value;
		const article = this.eArticle.value;
		const employeeId = this.getUserId();
		const articleId=this.props.match.params = this.state.eId;
		// console.log(articleId)
		 fetch(`http://localhost:7000/articles/${articleId}`,{
			method:'PATCH',
			headers: new Headers({
				'Authorization':`Bearer ${this.getToken()}`,
				'Content-Type': 'application/json'
			}),
			body:JSON.stringify({
				employeeId,
				title,
				article,
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
	handleEdit = (articleId) => {
		const form =  document.querySelector('form');
		const AnArticle =  document.getElementsByClassName('AnArticle');
		AnArticle[0].style.display='none';
		form.style.display='inline-block'
		this.setState({eId:articleId})
	}
	handleDelete = (id) => {
		console.log('Delete '+id)
	}
	handleComment = (id) => {
		console.log('comment '+id)
	}
    render(){
    	if (!this.isAuthenticated()) {
    		return <Redirect to='/'/>
    	}
    	if (this.state.articles === undefined) {
    		return 'Unauthorized to view this page';
    	}

    	const rows=this.state.articles.map((data)=>{
    		return(
    			<ArticleItem article={data} key={data.article_id} getOneItem={this.getOneItem}/> 
    			)
    	}) 
        return(
            <React.Fragment>
           <div className='AnArticle'>
            {
            this.state.singleArticle ? 
            <SingleArticle 
            singleArticle={this.state.singleArticle} 
            handleComment={this.handleComment} 
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}/>:
            (<Rows rows={rows}/>)
            }
            </div>
            <div>
            <form style={{display:'none'}} onSubmit={this.handleEditForm}>
            <p><input type='text' placeholder='Title' ref={eTitle=>this.eTitle=eTitle}/></p>
            <p><input type='text' placeholder='Article' ref={eArticle=>this.eArticle=eArticle}/></p>
            <p><input type='submit' value='Update'/></p>
            </form>
            </div>
            </React.Fragment>
        );
    }
}
export default Articles;