export function normalizeEnvironment(): NodeJS.ProcessEnv {
  const env = process.env;

  env.GIT_COMMIT_SHA = env.GITHUB_SHA;
  env.GIT_BRANCH =
    env.GITHUB_HEAD_REF || env.GITHUB_REF?.replace(/^refs\/heads\//, "");
  env.CI_NAME = "Github Actions";
  env.CI_BUILD_ID = env.GITHUB_RUN_ID;
  env.CI_BUILD_URL = `https://github.com/${env.GITHUB_REPOSITORY}/runs/${env.GITHUB_RUN_ID}`;

  return env;
}
