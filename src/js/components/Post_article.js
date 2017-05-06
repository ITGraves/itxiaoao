import React from 'react';
import {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import * as actions from "../actions/login"

class Post_article extends Component{

	constructor(props){
		super(props),
		this.article_title,
		this.article_content
	}

	//上传文章，先检测是否登录
	handPostarticle(){
		if(this.props.LoginTop.type == 'loginIn'){
			if(this.article_title.value.length>10){
				this.props.actions._alert('文章标题不合法');
				return
			}
			if(this.article_content.value.length<2){
				this.props.actions._alert('文章内容不能为空');
				return
			}

			let data = 'title=' + this.article_title.value + '&content=' + this.article_content.value + '&name=' +  this.props.LoginTop.data;
			this.props.actions.PostArticle(data);
		}else{
			this.props.actions._alert('您还未登陆呢');
			this.props.actions.LogReg('logShow');
			return
		}

		
	}

	render(){
		return (
			<div className="post_article box">
				<form onSubmit={(e)=>{e.preventDefault()}}>
					<input type="text" ref={(el)=>{this.article_title=el}} className="post_article_title" name="article_title" placeholder="无标题文章"/>
					<textarea className="post_article_content" ref={(el)=>{this.article_content=el}} name="article_content" ></textarea>
					<span className="post_article_btn"><a onClick={()=>{this.handPostarticle()}}>发布一下</a></span>
				</form>
			</div>
		)
	}

}

const mapStateToProps = (state)=>{
	return {LoginTop: state.LoginTop}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Post_article);
