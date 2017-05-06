import 'isomorphic-fetch';
import Promise from 'es6-promise';

export const requestAPI = "http://localhost:3000/";

/*

*/

//登录注册框
export const LogReg = (type, data)=> {
	switch (type){
		case "logShow":
			return { type : 'logShow' ,isShow:false}
		case "regShow":
			return { type : 'regShow' ,isShow:false}
		case "logClose":
			return { type : "logClose" ,isShow:true}
		case "loginSubmit": 
			return { type : "loginSubmit" ,data}
		case "regSubmit":
			return { type : 'regSubmit' ,data}
	}
}

//提示信息框
const tipsBox = (message,type) => {
	switch(type){
		case 'showTips':
			return {
				type: 'showTips',
				message
			}
		case 'hideTips':
			return {
				type: 'hideTips',
				message
			}
		default:
			return {
				type: 'showTips',
				message
			}
	}
}

export const LoginTop = (type,data)=>{
	switch (type){
		case 'loginIn':
			return {
				type: 'loginIn',
				data
			}
		case 'loginOut':
			return {
				type: 'loginOut'
			}
	}
}

const submitCallback = (dispatch,params,type,data)=>{
	fetch(requestAPI+params,{
		method:'post',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: data
	}).then(function(res){
		return res.json()
	}).then(function(data){
		return dispatch(LogReg(type, data))
	}).then(function(req){
		//console.log(req.data);
		let data = req.data
		if(data.code === 1000){
			dispatch(LogReg("logClose"));
			if(type == 'loginSubmit'){
				_alert(data.message)(dispatch);
				return dispatch(LoginTop('loginIn',data))
			}
			if(type == 'regSubmit'){
				return _alert(data.message)(dispatch)
			}
		}else{
			return _alert(data.message)(dispatch)
		}
	});
}

//提交登陆信息，回调到submitcallback
export const loginSubmit = (type ,data)=>{
	return (dispatch,getState)=>{
		switch (type){
			case 'loginSubmit':
				return submitCallback(dispatch,'login',type,data);
			case 'regSubmit':
				return submitCallback(dispatch,'reg',type,data);
			case 'loginOut':
				return loginOutSubmit(dispatch);
			default:
				return
		}
	}
} 

//退出登陆
export const LoginOut = () =>{
	return (dispatch)=>{
		fetch(requestAPI+'LoginOut',{
			credentials:'include'
		}).then(function(res){
			return res.json();
		}).then(function(data){
			if(data.code === 1000){
				_alert(data.message)(dispatch);
				return dispatch(LoginTop('loginOut'));
			}
		});
	}
}

//登陆状态获取
export const getUserInfo = () => {

	return (dispatch)=>{
		fetch(requestAPI+'getUserInfo',{
			credentials: 'include'

		}).then(function(res)
			{return res.json();}
		).then(function(data){
			if(data.code === 1000){
				
				return dispatch(LoginTop('loginIn',data));
			}else{
				
				return dispatch(LoginTop('loginOut'));
			}
		})
	}
	
}

//弹出框
export const _alert = (message, fn) => {
	
	return function(dispatch){
		
		dispatch(tipsBox(message,'showTips'))
		setTimeout(function(){
			dispatch(tipsBox(message,'hideTips'))
			fn&&fn()
		},1000)
	}

}

export const PostArticle = (data)=>{
	return (dispatch)=>{
		fetch(requestAPI+'post',{
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: data
		}).then(function(res){
			return res.json();
		}).then(function(data){
			if(data.code == 1010){
				dispatch(getArticle_list(1));
				return _alert(data.message)(dispatch);
			}else{
				dispatch(getArticle_list(1));
				return _alert(data.message)(dispatch);
			}
		})
	}
	
}

//按页数查找
export const getArticle_list = (page) => {
	let data = 'num='+page;
	return (dispatch) => {
		fetch(requestAPI+'getArticle_list',{
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: data
		}).then(function(res){
			return res.json();
		}).then(function(data){

			return dispatch(article_list('article_list', data));
		})
	}
}

export const article_list = (type, article_data) =>{
	switch (type){
		case 'article_list':
			return {
				type: 'article_list',
				article_data
			}
		default:
			return
	}
}

//获取某篇具体文章

export const getDetails = (title_id) => {
	return (dispatch) => {
		fetch(requestAPI + 'detail/' + title_id, {
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: ''
		}).then(function(res){
			return res.json();
		}).then(function(data){
			let detail = data.data[0];
			return dispatch(article_detail('detail', detail));
		})
	}	
}

export const article_detail = (type, detail) => {
	switch(type){
		case "detail": 
			return {
				type: 'detail',
				detail: detail
			}
		default: 
			return 
	}
}

//插入评论
export const InsertComment = (data, title_id) => {
	return (dispatch)=>{
		fetch(requestAPI+'insertComment/'+title_id, {
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: data
		}).then(function(res){
			return res.json();
		}).then(function(data){
			if(data.code == 1004){
				return dispatch(_alert('留言失败'));
			}
			return dispatch(_alert('留言成功'));
		})
	}
}

//用户名查询
export const Search = (userName) => {
	return (dispatch)=>{
		fetch(requestAPI+'search/'+userName,{
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: ''
		}).then(function(res){
			return res.json();
		}).then(function(dt){
			if(dt.code==1050){
				return dispatch(_alert('没找到这家伙'))
			}
			return dispatch(article_list('article_list', {'data': dt.data}));
		})
	}
}

//更改信息
export const updateinf = (userName,  data) => {
	return(dispatch)=>{
		fetch(requestAPI+'updateinf/'+userName, {
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: data
		}).then(function(res){
			return res.json()
		}).then(function(data){
			if(data.code==1060){
				return dispatch(_alert('更改成功'))
			}
			return dispatch(_alert('更改失败'))
		})
	}
}

export const deleteat = (index) => {
	return (dispatch) => {
		fetch(requestAPI+'delete', {
			method: 'post',
			credentials: 'include',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: index
		}).then(function(res){
			return res.json();
		}).then(function(data){
			if(data.code==1070){
				return dispatch(_alert('删除成功'))
			}
			return dispatch(_alert('删除失败'))
		})
	}
}





