const { context } = require("@actions/github");
const { fromTag } = require("./version");

const latestRelease = async (github, tag_prefix) => {
  return github.rest.repos
    .getLatestRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
    })
    .catch(() => {
      return { status: 404 };
    })
    .then((response) => {
      if (response.status === 404) {
        return fromTag({ name: "0.0.0", commit: { sha: "" } });
      } else {
        return fromTag(
          {
            name: response.data.tag_name,
            commit: { sha: response.data.target_commitish },
          },
          tag_prefix
        );
      }
    });
};

const numberOfBumps = async (github, sha) => {
  const options = {
    owner: context.repo.owner,
    repo: context.repo.repo,
  };
  return github
    .paginate(github.rest.repos.listCommits, options, (response, done) => {
      const commits = [];
      for (const commit of response.data) {
        if (commit.sha === sha) {
          done();
          break;
        }
        commits.push(commit);
      }
      return commits;
    })
    .then((commits) => {
      let commitCount = 0;
      let mergeCount = 0;
      let index = commits.length - 1;
      while (index >= 0) {
        const commit = commits[index];
        commitCount++;
        if (commit.parents.length > 1) {
          mergeCount++;
          commitCount = 0;
        }
        index--;
      }
      return mergeCount + commitCount;
    });
};

exports.latestRelease = latestRelease;
exports.numberOfBumps = numberOfBumps;
