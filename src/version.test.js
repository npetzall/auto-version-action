const {fromTag, highest} = require('./version');

describe("version", () => {
  describe("from tag", () => {
    test("without prefix", async () => {
      const version = fromTag({name: "1.0.1", commit: { sha: "abc123"}});
      expect(version.major).toBe(1);
      expect(version.minor).toBe(0);
      expect(version.patch).toBe(1);
      expect(version.sha).toBe("abc123");
    })
    test("with prefix", async () => {
      const version = fromTag({name: "v.1.0.1", commit: { sha: "abc123"}}, "v.");
      expect(version.major).toBe(1);
      expect(version.minor).toBe(0);
      expect(version.patch).toBe(1);
      expect(version.sha).toBe("abc123");
    })
  })
  describe("comparison", () => {
    test("same version", async () => {
      const versionA = fromTag({name: "1.0.1", commit: { sha: "abc123"}});
      const versionB = fromTag({name: "1.0.1", commit: { sha: "abc123"}});
      const version = highest(versionA, versionB);
      expect(version).toBe(versionA);
    })
    test("different major", async () => {
      const versionA = fromTag({name: "1.0.1", commit: { sha: "abc123"}});
      const versionB = fromTag({name: "2.0.1", commit: { sha: "abc123"}});
      const version = highest(versionA, versionB);
      expect(version).toBe(versionB);
    })
    test("different minor", async () => {
      const versionA = fromTag({name: "1.0.1", commit: { sha: "abc123"}});
      const versionB = fromTag({name: "1.1.1", commit: { sha: "abc123"}});
      const version = highest(versionA, versionB);
      expect(version).toBe(versionB);
    })
    test("different patch", async () => {
      const versionA = fromTag({name: "1.0.2", commit: { sha: "abc123"}});
      const versionB = fromTag({name: "1.0.1", commit: { sha: "abc123"}});
      const version = highest(versionA, versionB);
      expect(version).toBe(versionA);
    })
  });
  test("asString", async() => {
    const versionA = fromTag({name: "1.0.2", commit: { sha: "abc123"}});
    expect(versionA.asString()).toBe("1.0.2");
  })
});