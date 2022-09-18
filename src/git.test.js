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
});


