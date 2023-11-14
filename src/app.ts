import { startServer } from "./server";
import { getEnv } from "./utils/env";

async function main() {
  await startServer(parseInt(getEnv('SERVER_PORT')));
}
main();
