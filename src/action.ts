import { exec } from "@actions/exec";
import { info, getInput } from "@actions/core";

import { normalizeEnv } from "./environment";
import { reporter, defaultVersion, setupTestReporter } from "./setup";

export async function pre() {
  const reporterVersion = getInput("version") || defaultVersion;
  await setupTestReporter(reporterVersion);
  return 0;
}

export async function main() {
  await pre();
  const args = getInput("command").split(' ').map(arg => arg.trim());
  const env = normalizeEnv() as { [ key: string ]: string }
  await exec(reporter, args, { env });
  return 0;
}
