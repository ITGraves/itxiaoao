import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import * as actions from "../actions/login"

class Detail extends Component{
	constructor(props){
		super(props),
		this.helper,
		this.comment
	}

	componentWillMount(){
		let myquery = this.props.location.query.title_id;
		
		this.props.actions.getDetails(myquery);
	}

	backtotop(){
		if(document.body.scrollTop > 0){
			document.body.scrollTop = 0;
		}
	}

	handleInsertComment(){
		if(this.props.LoginTop.type == 'loginIn'){
			var c = this.comment.value;
			if(c.length<=0){
				this.props.actions._alert('您老别啥也不写啊');
				return
			}
			let myquery = this.props.location.query.title_id;
			let data = "cm="+ c + "&userName=" + this.props.LoginTop.data;
			this.props.actions.InsertComment(data, myquery); 
		}else{
			this.props.actions._alert('您老还没登录');
		}
		
	}

	render(){
		let detail = this.props.article_detail.detail;
		let title, content, name, time, like, com;
		let comment_name, comment_content, comment_list;
		if(detail){
			title = detail.title;
			let reg = new RegExp('\n', 'g');
			let c = detail.content.replace(reg, '<br/>');
			content = c;
			name = detail.name;
			time = detail.time.date;
			like = detail.like;
			com = detail.comments;
			if(com){
				comment_list = com.map(function(item, index){
					return (<li key = {index}>
							<a>{item.userName}</a>说：{item.cm}
						</li>)
				})
			}
		}

		return (
			<section>
				<div className="article_title">
					<div className="title"><h1>{title}</h1></div>
					<div className="article_about">
						<img className="author_head_detail" src="images/6.jpg"></img> 
						<div className="article_item author">{name}</div>
						<div className="article_item time">发表时间： {time}</div>
						<div className="article_item like">阅读数： {like}</div>
					</div>
				</div>
				<div className="article_content" dangerouslySetInnerHTML={{__html: content}}></div>
				<div className="comment">
					<p>众位看官们的留言:</p>
					<div>{comment_list?comment_list:<p>暂时还没人发现这篇精彩的文章，为什么不抢个沙发呢</p>}</div>	
				</div>
				<div className="article_comment">
					<form onSubmit={(e)=>{e.preventDefault();}}>
						<div className="form-group">
							<label className="form-control" htmlFor="comment">留言：</label>
							<textarea ref={(el)=>{this.comment=el;}} className="form-control" id="comment" placeholder="您的建议是作者最重视的"></textarea>
							<input type="submit" onClick={()=>{this.handleInsertComment()}} className="form-control btn btn-success"/>
						</div>	
					</form>
				</div>
				<div className="helper" onClick={()=>{this.backtotop()}}><i className="iconfont icon_up">&#xe674;</i></div>
			</section>
		)
	}
}

const mapStateToProps = (state) =>{
	return {article_detail: state.article_detail, LoginTop: state.LoginTop}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Detail);