var bodyParser = require('body-parser');
var maongoose = require('mongoose');

//connect to database
maongoose.connect('mongodb://onkar:omkar123@ds125021.mlab.com:25021/todo');

//create a scema - this is like a blueprint
var todoSchema = new maongoose.Schema({
  item: String
});

var Todo = maongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
    
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });    
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });    
  });
};