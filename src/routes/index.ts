/// <reference path="../_all.d.ts" />
"use strict";

import { Request, Response, NextFunction } from "express";

module Route {

  export class Index {

    public index(req: Request, res: Response, next: NextFunction) {
      //render page
      res.render("index");
    }
  }

  export class Calc {

    public calc(req: Request, res: Response, next: NextFunction) {
      res.render("calc");
    }
  }
}

export = Route;
