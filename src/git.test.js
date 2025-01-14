import { latestRelease, numberOfBumps } from './git'

describe('latestRelease', () => {
  test('no tags returned', async () => {
    const github = {
      rest: {
        repos: {
          getLatestRelease: async () => {
            return new Promise((resolve) => resolve({ status: 404 }))
          }
        }
      }
    }
    const version = await latestRelease(github)
    expect(version.asString()).toBe('0.0.0')
    expect(version.sha).toBe('')
  })
  test('release returned', async () => {
    const github = {
      rest: {
        repos: {
          getLatestRelease: async () => {
            return new Promise((resolve) =>
              resolve({
                status: 200,
                data: {
                  tag_name: 'v0.0.1',
                  target_commitish: '6c8d18338b149c8487eb2a2aa25335c273381a94'
                }
              })
            )
          }
        }
      }
    }
    const version = await latestRelease(github, 'v')
    expect(version.asString()).toBe('0.0.1')
    expect(version.sha).toBe('6c8d18338b149c8487eb2a2aa25335c273381a94')
  })
})

const fiveCommits = [
  {
    sha: '6dcb09b5b57875f334f61aebed695e2e4193db51',
    commit: {
      tree: {
        url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db51'
      }
    },
    parents: [
      {
        url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db52'
      }
    ]
  },
  {
    sha: '6dcb09b5b57875f334f61aebed695e2e4193db52',
    commit: {
      tree: {
        url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db52'
      }
    },
    parents: [
      {
        url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db53'
      }
    ]
  },
  {
    sha: '6dcb09b5b57875f334f61aebed695e2e4193db53',
    commit: {
      tree: {
        url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db53'
      }
    },
    parents: [
      {
        url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db54'
      }
    ]
  },
  {
    sha: '6dcb09b5b57875f334f61aebed695e2e4193db54',
    commit: {
      tree: {
        url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db54'
      }
    },
    parents: [
      {
        url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db55'
      }
    ]
  },
  {
    sha: '6dcb09b5b57875f334f61aebed695e2e4193db55',
    commit: {
      tree: {
        url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db55'
      }
    },
    parents: [
      {
        url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        sha: '6dcb09b5b57875f334f61aebed695e2e4193db56'
      }
    ]
  }
]

describe('numberOfBumps', () => {
  test('5 commits', async () => {
    const github = {
      paginate() {
        return new Promise((resolve) => {
          resolve(fiveCommits)
        })
      },
      rest: {
        repos: {
          listCommits: {}
        }
      }
    }
    const bumps = await numberOfBumps(github, 'abc')
    expect(bumps).toBe(5)
  })
  test('2 merges(2+2 commits) and 1 commit', async () => {
    const github = {
      paginate() {
        return new Promise((resolve) => {
          resolve([
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            },
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                },
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            },
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            },
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            },
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                },
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            },
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            },
            {
              sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
              commit: {
                tree: {
                  url: 'https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              },
              parents: [
                {
                  url: 'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
                  sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e'
                }
              ]
            }
          ])
        })
      },
      rest: {
        repos: {
          listCommits: {}
        }
      }
    }
    const bumps = await numberOfBumps(github, '')
    expect(bumps).toBe(3)
  })
  test('filter by sha', async () => {
    const github = {
      paginate() {
        const fn = arguments[2]
        const results = fn(
          {
            status: 200,
            data: fiveCommits
          },
          () => {}
        )
        return new Promise((resolve) => {
          resolve(results)
        })
      },
      rest: {
        repos: {
          listCommits: {}
        }
      }
    }
    const bumps = await numberOfBumps(
      github,
      '6dcb09b5b57875f334f61aebed695e2e4193db54'
    )
    expect(bumps).toBe(3)
  })
})
