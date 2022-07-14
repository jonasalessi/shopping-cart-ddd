import express from "express";
import Http from "./Http";
import { ParamsDictionary } from "express-serve-static-core";
import bodyParser from "body-parser";

export default class ExpressHttp implements Http {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
  }

  route(method: string, url: string, callback: (params: CallbackParam) => any | void): Http {
    this.app[method](url, async (req: express.Request, resp: express.Response) => {
      const result = await callback({ params: req.params, body: req.body });
      resp.json(result);
    });
    return this;
  }

  async listen(port: number): Promise<void> {
    await this.app.listen(port);
  }
}

type CallbackParam = {
  params?: ParamsDictionary;
  body?: any;
};
