const github = require("@actions/github");
const core = require("@actions/core");
const git = require("./git");
const { versionSpec } = require("./version_spec");

async function run() {
  try {
    const version_spec = await versionSpec(core.getInput("version-spec"));

    const octokit = github.getOctokit(core.getInput("github-token"));
    const last_tagged_version = await git.lastVersionByTag(
      octokit,
      core.getInput("tag-prefix")
    );
    const bumps = await git.numberOfBumps(octokit, last_tagged_version.sha);
    const current_version = version_spec.version(last_tagged_version, bumps);

    core.setOutput("last-tagged-version", last_tagged_version.asString());
    core.setOutput("version-spec", version_spec.asString());
    core.setOutput("current-version", current_version);
    core.exportVariable("AUTO_VERSION", current_version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
