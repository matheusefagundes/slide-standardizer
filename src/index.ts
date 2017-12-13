import * as meow from 'meow';
import { Result, Options } from 'meow';
import { MainController } from "./controller/MainController";

const cliOptions: Options = {
  description: `
  Usage:

    slide-standardizer styles.json input/ output/
  `,
  help: ``
};

const cli: Result = meow(cliOptions);
processInput(cli.input);

function processInput(cliInput: Array<string>) {
  if(cliInput.length < 3) {
    cli.showHelp();
  } else {
    new MainController().standardize(cliInput[0], cliInput[1], cliInput[2]);
  }
}
