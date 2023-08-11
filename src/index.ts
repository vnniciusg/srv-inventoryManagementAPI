import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { Product } from "./entity/Product";

import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.POSTGRES_USER);

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    await AppDataSource.manager.save(
      AppDataSource.manager.create(Product, {
        qntd: 12,
        name: "Saw",
      })
    );

    await AppDataSource.manager.save(
      AppDataSource.manager.create(Product, {
        qntd: 654,
        name: "A",
      })
    );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/products to see results"
    );
  })
  .catch((error) => console.log(error));
