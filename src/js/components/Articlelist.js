import React,{Component} from 'react';
import * as actions from '../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link,IndexLink} from 'react-router';

class Articlelist extends Component{
  constructor(props){
	super(props),
	this.li,
	this.div,
	this.input
  }

  componentWillMount(){

  	this.props.actions.getArticle_list(1);
  }

  go(){
  	let n = this.input.value;
  	if(!isNaN(n)){
  		this.props.actions.getArticle_list(n);
  	}else{
  		this.props.actions._alert('请输入数字');
  	}
  	
  }

  render(){
  	let list = this.props.article_list.content.data;
  	var mylist = [];
  	if(list){
  		mylist = list.map(function(item, index){
  			return (
  				<li key={index}>
  					<img className="author_head" src="images/6.jpg"></img>
  					<div className="article_list_name">{item.name}</div>
  					<div className="article_list_date">{item.time.date}</div>
  					<div className="article_list_title"><Link to={{pathname: '/detail', query: {title_id: item._id}}} target="_blank">{item.title}</Link></div>
  					<div className="article_list_like">阅读量：{item.like}</div>
  				</li>
  			);
  		});
  	}else{
  		
  	}
	return (
		<div className = "article_list">
			<div ref={(el)=>{this.div = el}}>
				<ul>
					{mylist.length>0?mylist:<div className="nothing">这回这没了</div>}
					
				</ul>
			</div>
			<div className = "article_list_span">
				<span><a onClick={()=>{this.props.actions.getArticle_list(1)}}>首页</a></span>
				<input type="text" ref={(el)=>{this.input=el}}/>
				<a className="article_list_span_a" onClick={()=>{this.go()}}>跳转></a>
			</div>
		</div>
	)
  }
}

const mapStateToProps = (state) =>{
	return {article_list: state.article_list}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Articlelist);
