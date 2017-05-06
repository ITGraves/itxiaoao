import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../actions/login";

class Memorandum extends Component{
	constructor(props){
		super(props);
		this.state={list: []};
		this.input;
		this.li=[];
		this.label=[];
	}

	componentWillMount(){
		this.setState({list: JSON.parse(window.localStorage.todolist).todo});		
	}

	addtodoitem(e){
		if(e.keyCode == 13){
			let s = window.localStorage.todolist;
			let arr = [];
			if(!s){
				let a = JSON.stringify({'todo': arr})
				window.localStorage.setItem('todolist', a);
			}
			let todolist = JSON.parse(s).todo;
			todolist.push(this.input.value);
			let x = JSON.stringify({'todo': todolist});
			window.localStorage.setItem('todolist', x);
			this.setState({list: x});
		}	
	}

	handledelete(index){
		let todo = JSON.parse(window.localStorage.todolist).todo;

		todo.splice(index, 1);
		window.localStorage.setItem("todolist", JSON.stringify({'todo': todo}));
		this.setState({list: todo})
	}

	render(){
		let that = this;
		
		let td = JSON.parse(window.localStorage.todolist).todo;
		
		var list = td.map(function(item, index){
			return (<li key={index}><input type="checkbox" ref={(el)=>{that.li[index]=el}} className="toggle"/><label>{item}</label><button onClick={()=>{that.handledelete(index)}} className="lose">×</button></li>)
		})
	
		return (
			<div className='Memorandum'>
				<div><h1>备忘录</h1></div>
				<div className="todo">
					<input type="text" ref={(el)=>{this.input=el}} className="todoinput" onKeyDown={(e)=>{this.addtodoitem(e)}} />
					<ul>{list}</ul>
				</div>
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
	)(Memorandum);
