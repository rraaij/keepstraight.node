/// <reference path="_all.d.ts" />

"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as exphbs from "express-handlebars";
import * as indexRoute from "./routes/index";

/**
 * The server.
 * This will be invoked every time a request hits the server.
 * @class Server
 */
class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    // create expressjs application
    this.app = express();

    //configure application
    this.config();

    //configure routes
    this.routes();
  }

  private config() {
    //configure jade
    // this.app.set("views", path.join(__dirname, "views"));
    // this.app.set("view engine", "jade");

    //configure handlebars
    this.app.engine('.hbs', exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: path.join(__dirname, 'views/layouts')
    }));
    this.app.set('view engine', '.hbs');
    this.app.set('views', path.join(__dirname, 'views'));

    //mount logger
    //this.app.use(logger("dev"));

    // CORS
    this.app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    this.app.use((request, response, next) => {
      console.log(request.headers);
      next();
    });

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.static(path.join(__dirname, "bower_components")));

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      console.log(`!! > ERROR:${error} | obj: ${err}`);
      err.status = 404;
      next(err);
    });
  }

  private routes() {
    // get router
    let router: express.Router;
    router = express.Router();

    // create routes
    var index: indexRoute.Index = new indexRoute.Index();
    var calc: indexRoute.Calc = new indexRoute.Calc();

    //home page
    router.get("/", index.index.bind(index.index));
    router.get("/calc", calc.calc.bind(calc.calc));

    router.post("/send", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`>>> Received: user: ${req.body.username} | pwd: ${req.body.password}`);
      res.send(`POST: user: ${req.body.username} | pwd: ${req.body.password}`);
    });

    // use router middleware
    this.app.use(router);
  }
}

var server = Server.bootstrap();
module.exports = server.app;
