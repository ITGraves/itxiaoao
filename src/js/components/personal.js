import React, {Component} from 'react';
import * as actions from '../actions/login'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

class Personal extends Component{
	constructor(props){
		super(props);
		this.state={show: 0};
		this.newname;
		this.newmessage;
		this.newpassword;
	}

	componentWillMount(){
		this.props.actions.Search(this.props.LoginTop.data);
	}

	update(num){
		this.setState({show: num}); 
	}

	handlesub_one(){
		if(this.newname.length<=0||this.newname.length>10){
			this.props.actions._alert('名字太短了');
			return
		}
		if(this.newmessage.length>50){
			this.props.actions._alert('说的太多会让人家讨厌的');
			return
		}

		let newmsg = 'name='+this.newname.value+'&msg='+this.newmessage.value;
		this.props.actions.updateinf(this.props.LoginTop.data, newmsg);
		this.setState({show: 0})
	}

	handledelete(t){
		let a = 'title='+t;
		this.props.actions.deleteat(a);
		this.state.show=0;
	}

	render(){
		console.log(this.state.show);
		let show;
		var that = this;
		if(this.props.article_list.content.data){
			let title=this.props.article_list.content.data;
			if(this.state.show==0){
				show = (
					<ul>
						{title.map(function(item, index){
							return (
								<li key={index}>
									{index}、{item.title}
									<button onClick={()=>{that.handledelete(item.title)}} className="btn btn-warning personal_change">删除</button>
								</li>
							)
						})}
					</ul>)
				
			}else if(this.state.show==1){
				show=(
					<div className="update">
						<form onSubmit={(e)=>{e.preventDefault();}}>
							昵称：<input ref={(el)=>{this.newname=el;}} type="text" placeholder="新昵称" />
							个人简介：<input type="text" ref={(el)=>{this.newmessage=el;}} placeholder="个人简介" />
							<button className="btn btn-success" onClick={()=>{this.handlesub_one()}}>提交</button>
						</form>
					</div>
				)
			}else if(this.state.show==2){
				show=(
					<div className="update">
						<form onSubmit={(e)=>{e.preventDefault();}}>
							密码：<input type="password"/>
							<button className="btn btn-success" onClick={()=>{this.handlesub_two()}}>提交</button>
						</form>
					</div>
				)
			}
		}else{
			show=(<div></div>)
		}
		
		return (
			<div className="mybox">
				<div className="personal_one">
					<div className="information">
						<img src="images/6.jpg"></img>
						<p>{this.props.LoginTop.data}</p>
						<h4>boy</h4>
					</div>
					<button className="btn btn-success myconfig" onClick={()=>this.update(0)}>个人信息展示</button>
					<button className="btn btn-primary myconfig" onClick={()=>{this.update(1)}}>修改个人信息</button>
					<button className="btn btn-info myconfig" onClick={()=>{this.update(2)}}>修改密码</button>
				</div>
				<div className="something">
					{show}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {LoginTop: state.LoginTop, article_list:state.article_list}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Personal)