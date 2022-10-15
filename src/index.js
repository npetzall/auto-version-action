const github = require("@actions/github");
const core = require("@actions/core");
const git = require("./git");
const { versionSpec } = require("./version_spec");

async function run() {
  try {
    const version_spec = await versionSpec(core.getInput("version-spec"));

    const octokit = github.getOctokit(core.getInput("github-token"));
    const latest_tagged_version = await git.lastVersionByTag(
      octokit,
      core.getInput("tag-prefix")
    );
    const bumps = await git.numberOfBumps(octokit, latest_tagged_version.sha);
    const current_version = version_spec.version(latest_tagged_version, bumps);

    if (latest_tagged_version.sha === "") {
      core.setOutput("latest-tagged-version", "");
      core.setOutput("latest-tagged-version-name", "");
      core.setOutput("latest-tagged-version-sha", "");
      core.exportVariable("PREV_VERSION", "");
      core.exportVariable("PREV_VERSION_NAME", "");
      core.exportVariable("PREV_VERSION_SHA", "");
    } else {
      core.setOutput("latest-tagged-version", latest_tagged_version.asString());
      core.setOutput("latest-tagged-version-name", latest_tagged_version.name);
      core.setOutput("latest-tagged-version-sha", latest_tagged_version.sha);
      core.exportVariable("PREV_VERSION", latest_tagged_version.asString());
      core.exportVariable("PREV_VERSION_NAME", latest_tagged_version.name);
      core.exportVariable("PREV_VERSION_SHA", latest_tagged_version.sha);
    }
    core.setOutput("version-spec", version_spec.asString());
    core.setOutput("auto-version", current_version);
    core.exportVariable("AUTO_VERSION", current_version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
