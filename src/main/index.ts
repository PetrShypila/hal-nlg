import {
  IApiManagerOutput,
  IApiUtterance,
  IDialogScriptParamState
} from "alfred-protocols";
import * as bodyParser from "body-parser";
import * as express from "express";
import {Request, Response} from "express";

import model from '../../config/model';

const port = process.env.NODE_PORT || 8083;
const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/generate', (req: Request, res: Response) => {
  const request: IApiManagerOutput = req.body;
  const replySentences = [];

  request.received.forEach((intent: IDialogScriptParamState) => {
      const { received } = model[request.language][intent.name];
      let template = received[Math.floor(Math.random() * received.length)];

      if(intent.value) {
        intent.value.forEach((val) => {
          template = template.replace("{}", val);
        });
      }

      replySentences.push(template);
  });
  // All expected sentences
  const expectSentences = model[request.language][request.expect].expect;
  // Series according to expectationCount
  const expectedSeries = expectSentences[Math.min(expectSentences.length - 1, request.expectationCount-1)];
  replySentences.push(expectedSeries[Math.floor(Math.random() * expectedSeries.length)]);

  const reply: IApiUtterance = {
    sessionId: request.sessionId,
    utterance: replySentences.join(" "),
  };

  res.send(reply);
});

app.listen(port, () => {
  /* tslint:disable:no-console */
  console.log(`Example app listening on port ${port}!`);
});
