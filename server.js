// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */

   res.send({todos: todos});

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */

   //find the maximum of of the todos array which is the last number
   var maxID=0;
   todos.forEach(function(todo){
     if(todo._id > maxID){
       maxID=todo._id;
     }
   });
   /* when we array.push, we want to set max id to id+1 to make it the last index of the array  */
   todos.push({_id: maxID+1, task: req.body.task, description: req.body.description});
   todos.forEach(function(todo){
     if(todo._id === maxID+1){
       res.send(todo);
     }
   });
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   /* first convert string into number, iterate with forEach if each of the todo _id is the same as the id number then send the "todo" as the response*/

   var idNum = parseInt(req.params.id);
   todos.forEach(function(todo){
     if(todo._id===idNum){
       res.send(todo);
       console.log(1);
     }
   });
   console.log("this works");
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   /* change string to integers*/
   var todoID = parseInt(req.params.id);
   /*filter function, filter(fun), object:id, so we're saying, todos.filter by id, [0]= delte 1 item from an array as instructed */
   var todoDelete = todos.filter(function (todo){
     return todo._id === todoID;
   })[0];

   todos.splice(todos.indexOf(todoDelete), 1);
   res.json(todoDelete);


});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
