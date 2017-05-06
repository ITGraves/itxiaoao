var User = require('../model/user');
var Article = require('../model/article');

/* GET home page. */
module.exports = function(app){
	app.post('/', function (req, res) {
		/*var newArticle = new Article({title:null,content:null,name:null});

		newArticle.get(1,function(err,data,pagelist){
			if(err){
				var data = [{title:"null"}];
			}
			if(data){
				console.log(req);
				res.render('index',{
					data: data,
					pagelist: pagelist
				});
			}
		});*/
	});

//登陆状态
	app.get('/getUserInfo',function(req,res){
		//console.log(req);
		if(req.session.log_in){
			var info = { name:req.session.user.name};
			return res.json({code: 1000,message: '已登录', info:info});
		}else{
			return res.json({code: 1001,message: '未登陆'});
		}
	});
//退出登陆
	app.get('/LoginOut',function(req,res){
		if(req.session.log_in){
			req.session.log_in = false;
			return res.json({code:1000,message: '退出成功'});
		}
	});

//接到login的请求
	app.post('/login',function(req,res){
		var user = new User(req.body);
		//console.log(user.name);
		user.gee(user.name, user.password,function(err,data){
			//console.log(data);
			if(err){
				res.end(JSON.stringify({code:1009,message:err}));
			}if(data){
				if(user.password == data.password){
					req.session.user = user;
					req.session.log_in = true;
					res.cookie("name",user.name,{maxAge: 1000*60*60*24*30,httpOnly:true});
					var info = {name: user.name}
					res.end(JSON.stringify({code:1000,message:'登陆成功',info: info}));
				}else{
					res.end(JSON.stringify({code:1001,message:'密码错误'}));
				}
			}else{
				res.end(JSON.stringify({code:1002,message:'用户不存在'}));
			}
		});
	})

//接到register的请求
	app.post('/reg',function(req,res){
		//console.log(req.body);
		var newuser = new User(req.body);
		//console.log(newuser);
		newuser.get(newuser.name,function(err,user){
		//	console.log(user);
			if(err){
				res.end(JSON.stringify({code:1009,message:err}));
			}
			if(user){
				res.end(JSON.stringify({code:1002,message:'用户已存在'}))
			}
			newuser.save(function(err,user){
				res.end(JSON.stringify({code:1000,message:'注册成功'}));
			})
		})
	});

	//上传
	app.post('/post',function(req,res){
		var newArticle = new Article(req.body);

		newArticle.save(function(err){
			if(err){res.end(JSON.stringify({code: 1010, message: '发表失败'}))}
			else{res.end(JSON.stringify({code: 1011, message: '发表成功'}))}
		});
	});

	//文章列表获取
	app.post('/getArticle_list',function(req,res){
		var newArticle = new Article({title: 1, content: 1, name: 1});
		newArticle.getarticleList(req.body.num, function(err, data){
			res.json({"data": data});
		})

	})

	app.post('/detail/:title_id', function(req, res){
		let newArticle = new Article({title: 1, content: 1, name: 1});
		let title = req.params.title_id;
		newArticle.getOne(title, function(err, data){
			if(err){}
			res.json({'data': data});
		});
	});

	//插入评论
	app.post('/insertComment/:title_id', function(req, res){
		let newArticle = new Article({title: 1, content: 1, name: 1});
		//console.log(req.body);
		let title = req.params.title_id;
		newArticle.insertCom(title, req.body, function(err){
			if(err){res.json({'code': 1004})}
			else{res.json({'code': 1005});}	
		});
	})

	//查询
	app.post('/search/:username', function(req, res){
		let newArticle = new Article({title: 1, content: 1, name: 1});
		let name = req.params.username;
		newArticle.getList(name, function(err, data){
			if(err){return res.json({'code':1050})}
			return res.json({'code': 1051, 'data': data})
		})
	})

	app.post('/updateinf/:username', function(req, res){
		let user = new User({userName: '1', password: '1', email: ''});
		let username = req.params.username;
		let newmsg = req.body;
		user.updateinf(username, newmsg, function(err){
			if(err){return res.json({'code':1061})}
			return res.json({'code':1060})
		})
	})

	app.post('/delete', function(req, res){
		let newArticle = new Article({title: 1, content: 1, name: 1});
		console.log(req.body.title)
		newArticle.deleteat(req.body.title, function(err){
			if(err){
				return res.json({'code': 1077})
			}
			return res.json({'code': 1070})
		})
	})
      /*var title;
	  if(req.session.user){
	  	title = req.session.user.name;
	  }else{
	  	title = "d";
	  }

	  var newArticle = new Article({title:null,content:null,name:null});

	  newArticle.getList(title,function(err,data){
	  	if(err){req.flash('error',err);}
	  	if(data){
	  		res.render('index', {
			    title: '主页',
			    user: req.session.user,
			    user_name: title,
			    success: req.flash('success').toString(),
			    error: req.flash('error').toString(),
			    data: data
			});
	  	}
	  });

	  
	});

	app.get('/reg', function (req, res) {
	  res.render('reg', {
	    title: '注册',
	    user: req.session.user,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
	  });
	});

	app.post('/reg', function (req, res) {
	  var name = req.body.name,
	      password = req.body.password,
	      password_re = req.body['password-repeat'];
	  //检验用户两次输入的密码是否一致
	  if (password_re != password) {
	    req.flash('error', '两次输入的密码不一致!'); 
	    return res.redirect('/reg');//返回注册页
	  }
	  //生成密码的 md5 值
	  var md5 = crypto.createHash('md5'),
	      password = md5.update(req.body.password).digest('hex');
	  var newUser = new User({
	      name: name,
	      password: password,
	      email: req.body.email
	  });
	  //检查用户名是否已经存在 
	  User.get(newUser.name, function (err, user) {
	    if (err) {
	      req.flash('error', err);
	      return res.redirect('/');
	    }
	    if (user) {
	      req.flash('error', '用户已存在!');
	      return res.redirect('/reg');//返回注册页
	    }
	    //如果不存在则新增用户
	    newUser.save(function (err, user) {
	      if (err) {
	        req.flash('error', err);
	        return res.redirect('/reg');//注册失败返回主册页
	      }
	      req.session.user = newUser;//用户信息存入 session
	      req.flash('success', '注册成功!');
	      res.redirect('/');//注册成功后返回主页
	    });
	  });
	});

	app.get('/login', function (req, res) {
	    res.render('login', {
	        title: '登录',
	        user: req.session.user,
	        success: req.flash('success').toString(),
	        error: req.flash('error').toString()});
	});

	app.post('/login', function (req, res) {
	  //生成密码的 md5 值
	  var md5 = crypto.createHash('md5'),
	      password = md5.update(req.body.password).digest('hex');
	  //检查用户是否存在
	  User.get(req.body.name, function (err, user) {
	    if (!user) {
	      req.flash('error', '用户不存在!'); 
	      return res.redirect('/login');//用户不存在则跳转到登录页
	    }
	    //检查密码是否一致
	    if (user.password != password) {
	      req.flash('error', '密码错误!'); 
	      return res.redirect('/login');//密码错误则跳转到登录页
	    }
	    //用户名密码都匹配后，将用户信息存入 session
	    req.session.user = user;
	    req.flash('success', '登陆成功!');
	    res.redirect('/');//登陆成功后跳转到主页
	  });
	});

	app.get('/logout', function (req, res) {
	  req.session.user = null;
	  req.flash('success', '登出成功!');
	  res.redirect('/');//登出成功后跳转到主页
	});

	app.get('/post',function(req,res){
		var newArticle = new Article({title:null,content:null,name: null});

		var page = req.query.page;
		newArticle.get(page,function(err,data,pagelist){
			if(err){
				var data = [{title:"null"}];
			}
			if(data){
				res.render('post',{
					title:"上传文章",
					user:req.session.user,
					success:req.flash('success').toString(),
					error: req.flash('error').toString(),
					data: data,
					pagelist: pagelist
				});
			}
		});
	
		
	});

	app.post('/post',function(req,res){
		var currentUser = req.session.user;
		var content = req.body.content;
		content = content.replace('\r\n','<br>');
		var newArticle = new Article({
			title: req.body.title,
			content: content,
			name: currentUser.name
		});

		newArticle.save(function(err){
			if(err){req.flash('error',err);}
			req.flash('success',"上传成功！");
			res.redirect('/');
		});
	});

	app.get('/article_content',function(req,res){
		var id = req.query.id;
		var newArticle = new Article({title:null,content:null,name: null});

		newArticle.getOne(id,function(err,data){
			if(err){
				req.flash('error','留言失败');
				res.redirect('/');
			}

			if(data){
				console.log(data[0].comments);
				var comment = data[0].comments;
				res.render('article_content',{
					title:'文章详情',
					user:req.session.user,
					success:req.flash('success').toString(),
					error:req.flash('error').toString(),
					data: data,
					comment: comment
				});
			}
		})

	});

	app.post('/article_content',function(req,res){
		var newArticle = new Article({title:null,content:null,name: null});
		var title = req.body.title;
		var comment = {
			user_name: req.session.user.name,
			content: req.body.comment
		};
		newArticle.insertCom(title,comment,function(err){
			if(err){req.flash('error',err);}
			req.flash('success',"留言成功");
			res.redirect('/');
		});
	});

	app.get('/ajax',function(req,res){
		res.send(true);
	});*/
}


