const { context } = require("@actions/github");
const { fromTag, highest } = require('./version');

const lastVersionByTag = async (github, tag_prefix) => {
    return github.paginate(github.rest.repos.listTags, {
        owner: context.repo.owner,
        repo: context.repo.repo,
    }).then(tags => {
        const versions = tags.map(tag => fromTag(tag, tag_prefix));
        return versions.reduce(highest, fromTag({name: "0.0.0", commit:{sha: ""}}));
    });
}

const numberOfBumps = async (github, sha) => {
    const options = {
        owner: context.repo.owner,
        repo: context.repo.repo,
    }
    if (sha && sha.trim().length > 0) {
        options.sha = sha.trim();
    }
    return github
      .paginate(github.rest.repos.listCommits, options)
      .then(commits => {
          let commitCount = 0;
          let mergeCount = 0;
          let index = commits.length -1;
          while(index >= 0) {
            const commit = commits[index];
            commitCount++
            if (commit.parents.length > 1) {
              mergeCount++;
              commitCount = 0;
            }
            index--
          }
          return mergeCount + commitCount;
      })
}

exports.lastVersionByTag = lastVersionByTag;
exports.numberOfBumps = numberOfBumps;