var mongodb = require('./db');

function User(user){
	this.name = user.userName;
	this.password = user.password;
  this.msg = '';
	this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback){
	//存入数据库的用户文档
	var user = {
		name: this.name,
		password: this.password,
		email: this.email,
    msg: this.msg
	};
	//打开数据库
	mongodb.open(function(err,db){

		if(err){
			return callback(err);
		}else{
			db.collection('users',function(err,col){
				if(err){
					mongodb.close();
					return callback(err);
				}else{
					col.insert(user,{safe: true},function(err,data){
						mongodb.close();
						if(err){
							return callback(err);
						}
						callback(null,user[0]);
					});
				}
			});
		}

	});

};

//读取用户信息
User.prototype.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};

User.prototype.gee = function(name, password, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name,
        password: password
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};

//修改用户信息
User.prototype.updateinf = (name, newmsg, callback) =>{
  mongodb.open(function(err, db){
    if(err){return callback(err)}
    db.collection('users', function(err, col){
      if(err){return callback(err)}
      col.update({'name':name}, {$set: {name: newmsg.name, msg: newmsg.msg}}, function(err){
        mongodb.close();
        if(err){return callback(err)}
        return callback(null);
      })
    })
  })
}