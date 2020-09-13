* Node js is a runtime enviroment where we can run JS in backhand.

* views directory is default directory hence if we do not define the file path then it will bydefault search that file in views directory

* after setting view engine no need for ejs extension

* body-parser is for getting data from form (otherwise body object in req.body.name does not work)

* mongoose is to connect with DB using JS.that's why we need connect command in app.js file.

* findById takes a parameter on the basis of which it going to find the in the database and return whole info about that.

* collection.drop() in mongo is to drop everything from data base

* REST stand for representation of state transfer

* Routs(GET, POST,...) callback function has 2 parameter req and res.

* DB methods (create, findById,....) callback function also has 2 parameter err (error) and data (data releted to that method).

* <% is when we don't have any html tag before or after this and <%= is when we have an html tag brfore or after this.

* <%- is when we have to run html tag inside this.

* app.use(express.static('public')); is to access local file in public directry

* blog.-id gives the id created by database.

* HTML or ejs do not have PUT or DELETE method they only have GET and POST method so, for using PUT method we us _method=PUT in action and POST as method and a POST request is send to the server or app.js if _method=PUT it treat POST method as PUT.

* expressSanitizer is used to remove script tag from <%-

* ./ is for current directory





