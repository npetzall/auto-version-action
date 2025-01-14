import { getOctokit } from '@actions/github'
import {
  getInput,
  info,
  setOutput,
  exportVariable,
  setFailed
} from '@actions/core'
import { latestRelease, numberOfBumps } from './git'
import { versionSpec } from './version_spec'

async function run() {
  try {
    const version_spec = await versionSpec(getInput('version-spec'))
    const octokit = getOctokit(getInput('github-token'))
    const latest_release = await latestRelease(octokit, getInput('tag-prefix'))
    const bumps = await numberOfBumps(octokit, latest_release.sha)
    const current_version = version_spec.version(latest_release, bumps)
    info(
      latest_release.asString() +
        ', ' +
        version_spec.asString() +
        ', ' +
        bumps +
        ' = ' +
        current_version
    )

    if (latest_release.sha === '') {
      setOutput('latest-tagged-version', '')
      setOutput('latest-tagged-version-name', '')
      setOutput('latest-tagged-version-sha', '')
      exportVariable('PREV_VERSION', '')
      exportVariable('PREV_VERSION_NAME', '')
      exportVariable('PREV_VERSION_SHA', '')
    } else {
      setOutput('latest-tagged-version', latest_release.asString())
      setOutput('latest-tagged-version-name', latest_release.name)
      setOutput('latest-tagged-version-sha', latest_release.sha)
      exportVariable('PREV_VERSION', latest_release.asString())
      exportVariable('PREV_VERSION_NAME', latest_release.name)
      exportVariable('PREV_VERSION_SHA', latest_release.sha)
    }
    setOutput('version-spec', version_spec.asString())
    setOutput('auto-version', current_version)
    exportVariable('AUTO_VERSION', current_version)
  } catch (error) {
    setFailed(error.message)
  }
}

run()
