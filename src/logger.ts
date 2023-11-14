import pino from "pino";
import prettyPino from "pino-pretty";
import { isDev } from "./utils/env";

let prettyTransport;
if (isDev()) {
  prettyTransport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    }
  };
}

const logger = isDev() ? 
  pino(prettyPino({
    colorize: true,
  })) : 
  pino();

export default logger;
