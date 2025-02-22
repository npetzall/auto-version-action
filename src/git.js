import { context } from '@actions/github'
import { info } from '@actions/core'
import { fromTag } from './version'

const latestRelease = async (github, tag_prefix) => {
  return github.rest.repos
    .getLatestRelease({
      owner: context.repo.owner,
      repo: context.repo.repo
    })
    .catch(() => {
      return { status: 404 }
    })
    .then((response) => {
      if (response.status === 404) {
        info('No release found')
        return fromTag({ name: '0.0.0', commit: { sha: '' } })
      } else {
        info('Latest release tag: ' + response.data.tag_name)
        return fromTag(
          {
            name: response.data.tag_name,
            commit: { sha: response.data.target_commitish }
          },
          tag_prefix
        )
      }
    })
}

const numberOfBumps = async (github, sha) => {
  const options = {
    owner: context.repo.owner,
    repo: context.repo.repo
  }
  if (sha && sha.length > 0) {
    info('Reading commit until: ' + sha)
  } else {
    info('Reading all commits')
  }
  return github
    .paginate(github.rest.repos.listCommits, options, (response, done) => {
      const commits = []
      for (const commit of response.data) {
        if (commit.sha === sha) {
          info('Matching commit found')
          done()
          break
        }
        commits.push(commit)
      }
      return commits
    })
    .then((commits) => {
      info('Processing ' + commits.length + ' commits')
      let commitCount = 0
      let mergeCount = 0
      let index = commits.length - 1
      while (index >= 0) {
        const commit = commits[index]
        commitCount++
        if (commit.parents.length > 1) {
          mergeCount++
          commitCount = 0
        }
        index--
      }
      info('Merges: ' + mergeCount + ', post merge commits: ' + commitCount)
      return mergeCount + commitCount
    })
}

const _latestRelease = latestRelease
export { _latestRelease as latestRelease }
const _numberOfBumps = numberOfBumps
export { _numberOfBumps as numberOfBumps }
