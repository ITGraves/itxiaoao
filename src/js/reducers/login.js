import thunkMiddleware from 'redux-thunk'
import {combineReducers,createStore,applyMiddleware} from "redux"

//登陆框
const LoginBoxData = (state={type:'',isShow:false}, action)=>{
	switch (action.type){
		case 'logShow':
            let isShow = false
			return Object.assign({},state,{type:action.type,isShow:!action.isShow})		
		case 'regShow':
			return Object.assign({},state,{type:action.type,isShow:!action.isShow});	
		case 'logClose':
			return Object.assign({},state,{isShow:isShow})
		case 'loginSubmit':
			return Object.assign({},state,{data: action.data});
		case 'regSubmit':
			return Object.assign({},state,{data: action.data});
		default: 
		
			return state;
		
	}
}

//是否登陆
const LoginTop = (state={type:'',data:''},action)=>{
	switch (action.type){
		case "loginIn":
			return Object.assign({},state,{type:action.type,data:action.data.info.name});
		case 'loginOut':
			return Object.assign({},state,{type:action.type,data:''});
		default:
			return state;
	}
}

//提示信息
const tipsBox = (state={message:''},action)=>{
	switch (action.type){
		case 'showTips':
			return Object.assign({},state,{type:action.type,message:action.message})
		case 'hideTips':
			return Object.assign({},state,{type:action.type,message:action.message});
		default:
			return state
	}
}

//文章列表
const article_list = (state = {content: ''}, action) =>{
	switch (action.type){
		case 'article_list':
			return Object.assign({},state,{type: action.type, content: action.article_data});
		default:
			return state
	}
}

//具体文章内容
const article_detail = (state = {}, action) =>{
	switch (action.type){
		case "detail": 
			return Object.assign({}, state, {type: action.type, detail: action.detail})
		default: 
			return state
	}
}

/*const isLogin = (state={isLogin:false},action)=>{
	switch (action.type){
		case 'loginIn':
			return Object.assign({},state,{isLogin:true,info:action.userInfo});
	}
}*/

const stores = combineReducers({
	LoginBoxData,
	tipsBox,
	LoginTop,
	article_list,
	article_detail
})

export default stores;