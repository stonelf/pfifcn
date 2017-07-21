// Generated by CoffeeScript 1.6.2
var app, express, feedsapi, firebase, fork, getSearchResult, http, io, path, querystring, routes, routesapi, server, url, user, validate;

getSearchResult = function(query) {
  return "searhc result of: " + query;
};

validate = function(data) {
  return data;
};

querystring = require("querystring");

routesapi = require('./routes/api');

express = require("express");

routes = require("./routes");

firebase = require("firebase");

user = require("./routes/user");

http = require("http");

path = require("path");

feedsapi = require("./api/feeds.js");

fork = require("child_process").fork;

app = express();

url = require("url");

querystring = require("querystring");

server = http.createServer(app);

io = require("socket.io").listen(server);

app.set("port", process.env.PORT || 3000);

app.set("views", __dirname + "/views");

app.set("view engine", "jade");

app.use(express.favicon());

app.use(express.logger("dev"));

app.use(express.bodyParser());

app.use(express.methodOverride());

app.use(app.router);

app.use(express["static"](path.join(__dirname, "public")));

app.enable("trust proxy");

if ("development" === app.get("env")) {
  app.use(express.errorHandler());
}

app.get("/", routes.index);

app.get("/users", user.list);

app.get("/api/feeds/note", routesapi.feedOfNote);

app.get("/api/feeds/user", routesapi.feedOfUser);

server.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
  return 0;
});

io.sockets.on("connection", function(socket) {
  socket.send("hello from the game server");
  return socket.on("search", function(data) {
    return socket.emit("searchResult", getSearchResult(validate(data)));
  });
});