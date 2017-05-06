var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

var Article = function(article){
	this.title = article.title,
	this.content = article.content,
	this.name = article.name
};
//保存文章
Article.prototype.save = function(callback){
	 var date = new Date();
	  //存储各种时间格式，方便以后扩展
	  var time = {
	      date: date,
	      year : date.getFullYear(),
	      month : date.getFullYear() + "-" + (date.getMonth() + 1),
	      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
	      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
	      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
	  };

	var article = {
		title: this.title,
		content: this.content,
		name: this.name,
		time: time,
		like: 0
	};

	mongodb.open(function(err,db){
		if(err){return callback(err);}
		else{db.collection('article', function(err,col){
			 if(err){mongodb.close();return callback(err);}
			 else{
			 	col.insert(article,{safe:true},function(err, data){
			 		mongodb.close();
			 		if(err){return callback(err);}
			 		callback(null);
			 	});
			 }
		});}
	});
}

//读取文章列表
Article.prototype.getarticleList = function(page,callback){
	mongodb.open(function(err, db){
		if(err){return callback(err);}
		db.collection('article',function(err, col){
			if(err){mongodb.close(); return callback(err);}
			/*col.find({}).toArray(function(err,data){
				mongodb.close();
				if(err){return callback(err);}
				return callback(null, data);*/
				col.find({},{limit: 5,skip: (page-1)*5}).sort({time: -1}).toArray(function(err, data){
					mongodb.close();
					return callback(null, data)
				});
			})

			/*col.count({},function(err,count){
				col.find({},{limit:5,skip:(page-1)*5}).sort({time:-1}).toArray(function(err,data){
					mongodb.close();
					if(err){return callback(err);}
					if(data){
						var page = {};
						page["count"] = count;
						page["limitNum"] = 5;
						callback(null,data,page);
					}
				});
			});*/
		});
};


//title读取某篇文章
Article.prototype.getOne = function(id,callback){
	mongodb.open(function(err,db){
		if(err){//console.log('err');
		return callback(err);}
		db.collection('article',function(err,col){
			if(err){mongodb.close();//console.log('errr');
			return callback(err);}
			col.find({"_id": ObjectID(id)}).toArray(function(err, data){
				if(err){
					mongodb.close();
					return callback(err)
				}
				col.update({'_id': ObjectID(id)}, {$inc: {'like': 1}}, function(err){
					mongodb.close();
					if(err){
						return callback(err)
					}
				})
				return callback(null, data);
			});
			
		})
	});
}

//username读取文章列表
Article.prototype.getList = function(user_name,callback){
	mongodb.open(function(err,db){
		if(err){return callback(err);}
		db.collection('article', function(err,col){
			if(err){mongodb.close(); return callback(err);}
			col.find({"name":user_name}).sort({time:-1}).toArray(function(err, data){
				mongodb.close();
				if(err){return callback(err);}
				callback(null, data);
			});
		});
	});
};

//插入评论
Article.prototype.insertCom = function(id,comment,callback){
	mongodb.open(function(err,db){
		
		if(err){return callback(err);}
		db.collection('article', function(err,col){
			if(err){mongodb.close();return callback(err);}
			col.update({'_id':ObjectID(id)},{ $push:{"comments":comment}},function(err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				return callback(null);
			});
		});

	});
};

//增加阅读量
Article.prototype.updatelikes = (title)=>{
	mongodb.open(function(err, db){
		if(err){return}
		db.collection('article', function(err, col){
			if(err){mongodb.close();return}
			col.update({'title': title}, {$inc: {'like': 1}}, function(err){
				mongodb.close();
				if(err){return}
			})
			return
		})
	})
}

//删除
Article.prototype.deleteat = function(title, callback){
	mongodb.open(function(err, db){
		if(err){return}
		db.collection('article', function(err, col){
			if(err){mongodb.close();return}
			col.remove({'title': title}, function(err){
				mongodb.close();
				if(err){return}
				return callback(null);
			})
		})
	})
}

module.exports = Article;

