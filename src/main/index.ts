import * as bodyParser from "body-parser";
import * as express from "express";
import {Request, Response} from "express";
import {
  IApiManagerOutput,
  IApiUtterance,
  IDialogScriptParamState,
} from "hal-protocols";

import model from "../../config/model";
import logger from "./log/logger";

const port = process.env.NODE_PORT || 8083;
const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/generate", (req: Request, res: Response) => {
  const request: IApiManagerOutput = req.body;
  logger.debug("\n***\n***\n***");
  logger.debug(`/generate: Request body`, request);
  const replySentences = [];

  request.received.forEach((intent: IDialogScriptParamState) => {
      const { received } = model[request.language][intent.name];
      let template = received[Math.floor(Math.random() * received.length)];

      if (intent.value) {
        intent.value.forEach((val) => {
          template = template.replace("{}", val);
        });
      }

      replySentences.push(template);
  });

  logger.debug(`/generate: Collected reply sentences:`, replySentences);
  logger.debug(`/generate: Request language: ${request.language} and expect param: ${request.expect}`);
  logger.debug(`/generate: Language model:`, model);
  // All expected sentences
  const expectSentences = model[request.language][request.expect].expect;
  // Series according to expectationCount
  const expectedSeries = expectSentences[Math.min(expectSentences.length - 1, request.expectationCount - 1)];
  replySentences.push(expectedSeries[Math.floor(Math.random() * expectedSeries.length)]);

  const reply: IApiUtterance = {
    sessionId: request.sessionId,
    utterance: replySentences.join(" "),
  };

  logger.info("/generate: Response body", reply);
  res.send(reply);
});

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}!`);
});
