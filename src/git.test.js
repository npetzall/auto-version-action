const git = require('./git');

describe("git", () => {
  describe("lastVersionByTag", () => {
    test("no tags returned", async () => {
      const github = {
        paginate() {
          return new Promise((resolve) => {
            resolve([])
          });
        },
        rest: {
          repos: {
            listTags: {}
          }
        }
      }
      const version = await git.lastVersionByTag(github);
      expect(version.asString()).toBe("0.0.0");
    });
    test("multiple tags returned", async () => {
      const github = {
        paginate() {
          return new Promise((resolve) => {
            resolve([
              {
                "name": "v0.1.0",
                "commit": {
                  "sha": "1c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
                },
                "zipball_url": "https://github.com/octocat/Hello-World/zipball/v0.1",
                "tarball_url": "https://github.com/octocat/Hello-World/tarball/v0.1",
                "node_id": "MDQ6VXNlcjE="
              },
              {
                "name": "v0.1.1",
                "commit": {
                  "sha": "2c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
                },
                "zipball_url": "https://github.com/octocat/Hello-World/zipball/v0.1",
                "tarball_url": "https://github.com/octocat/Hello-World/tarball/v0.1",
                "node_id": "MDQ6VXNlcjE="
              },
              {
                "name": "v0.2.1",
                "commit": {
                  "sha": "3c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
                },
                "zipball_url": "https://github.com/octocat/Hello-World/zipball/v0.1",
                "tarball_url": "https://github.com/octocat/Hello-World/tarball/v0.1",
                "node_id": "MDQ6VXNlcjE="
              }
            ])
          });
        },
        rest: {
          repos: {
            listTags: {}
          }
        }
      }
      const version = await git.lastVersionByTag(github, "v");
      expect(version.asString()).toBe("0.2.1");
      expect(version.sha).toBe("3c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc")
    })
  });
  describe("numberOfBumps", () => {
    test("5 commits", async () => {
      const github = {
        sha: "",
        paginate() {
          this.sha = arguments[1].sha;
          return new Promise((resolve) => {
            resolve([
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              }
              ])
          });
        },
        rest: {
          repos: {
            listCommits: {}
          }
        }
      }
      const bumps = await git.numberOfBumps(github, "abc");
      expect(github.sha).toBe("abc")
      expect(bumps).toBe(5);
    })
    test("2 merges(2+2 commits) and 1 commit", async () => {
      const github = {
        sha: "",
        paginate() {
          this.sha = arguments[1].sha;
          return new Promise((resolve) => {
            resolve([
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                },{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                },{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
              {
                "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "commit": {
                  "tree": {
                    "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                  },
                },
                "parents": [{
                  "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
                  "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
                }]
              },
            ])
          });
        },
        rest: {
          repos: {
            listCommits: {}
          }
        }
      }
      const bumps = await git.numberOfBumps(github, "");
      expect(github.sha).toBeUndefined();
      expect(bumps).toBe(3);
    })
  })
});


