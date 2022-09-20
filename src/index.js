const github = require('@actions/github');
const core = require('@actions/core');
const git = require('./git');

async function run() {
  try {
    const tag_prefix = core.getInput('tag-prefix');
    const gh_token = core.getInput('github-token');

    const octokit = github.getOctokit(gh_token);

    const last_tagged_version = await git.lastVersionByTag(octokit, tag_prefix);
    core.setOutput("last-tagged-version", last_tagged_version.asString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
