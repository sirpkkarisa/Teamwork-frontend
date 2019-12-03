import React from 'react';
import './Article.css';
import { Redirect } from 'react-router-dom';
import ArticleItem from './ArticleItem'
import SingleArticle from './SingleArticle';

class Articles extends React.Component{
	state={
		articles:[],
		singleArticle:''
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
            <div>
            {rows}
            <SingleArticle singleArticle={this.state.singleArticle}/>
            </div>
        );
    }
}
export default Articles;