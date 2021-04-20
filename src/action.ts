import { exec } from "@actions/exec";
import { info, getInput } from "@actions/core";

import { reporter, defaultVersion, setupTestReporter } from "./setup";

export async function pre() {
  const reporterVersion = getInput("version") || defaultVersion;
  await setupTestReporter(reporterVersion);
}

export async function main() {
  await pre();
  const command = getInput("command");
  await exec(`${reporter} ${command}`);

  info("did something");
  return 0;
}
