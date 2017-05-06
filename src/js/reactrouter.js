import {Router,Route,browserHistory, IndexRoute, hashHistory} from 'react-router';
import Login from './components/login';
import React,{Component} from 'react';
import Nav from './components/Nav'
import {render} from 'react-dom';
import Main from './components/main';
import {Provider,connect} from 'react-redux';
import {combineReducers, createStore, applyMiddleware} from "redux"
import {LogReg} from './actions/login'
import stores from './reducers/login'
import thunkMiddleware from 'redux-thunk' 
import TipsBox from './components/TipsBox'
import Post_article from './components/Post_article'
import About from './components/About'
import Articlelist from './components/Articlelist'
import Detail from './components/Detail'
import Memorandum from './components/Memorandum'
import Personal from './components/personal'

let store = createStore(
  stores,
  applyMiddleware(thunkMiddleware)
)

/*const Post_article = {
	path: 'post',
	getComponent(nextState,callback){
		require.ensure([],(require)=>{
			return callback(null,require('./components/Post_article'))
		});
	}
}
*/
class App extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		
	}

	render(){
		return (
			<div className="page">
				<Nav/>
				<TipsBox/>
				<div>{this.props.children}</div>
			</div>
		)
	}
}

render((
	<Provider store={store}>
		<Router history = {hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Main}/>
				<Route path="post" component={Post_article}/>
				<Route path="About" component={About}/>
				<Route path="detail" component={Detail}/>
				<Route path="Memorandum" component={Memorandum}/>
				<Route path="personal" component={Personal}/>
			</Route>
		</Router>
	</Provider>

), document.getElementById('app'));

