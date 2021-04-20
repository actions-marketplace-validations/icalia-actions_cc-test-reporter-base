import os from "os";
import fs from "fs";
import { cacheDir, downloadTool, find as findTool } from "@actions/tool-cache";
import path from "path";
import { addPath } from "@actions/core";

async function downloadTestReporter(version: string): Promise<string> {
  const platform = os.platform();
  const downloadPath = await downloadTool(
    `https://codeclimate.com/downloads/test-reporter/test-reporter-${version}-${platform}-amd64`
  );

  let reporterPath = path.join(path.dirname(downloadPath), reporter);
  fs.renameSync(downloadPath, reporterPath);
  fs.chmodSync(reporterPath, "0555");

  return await cacheDir(path.dirname(reporterPath), reporter, version);
}

export const reporter = "cc-test-reporter";
export const defaultVersion = "0.10.0";

export async function setupTestReporter(version: string): Promise<void> {
  let reporterPath = findTool(reporter, version);
  if (!reporterPath) reporterPath = await downloadTestReporter(version);
  addPath(reporterPath);
}
