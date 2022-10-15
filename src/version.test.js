const { fromTag } = require("./version");

describe("version", () => {
  describe("from tag", () => {
    test("without prefix", async () => {
      const version = fromTag({ name: "1.0.1", commit: { sha: "abc123" } });
      expect(version.major).toBe(1);
      expect(version.minor).toBe(0);
      expect(version.patch).toBe(1);
      expect(version.sha).toBe("abc123");
      expect(version.name).toBe("1.0.1");
    });
    test("with prefix", async () => {
      const version = fromTag(
        { name: "v.1.0.1", commit: { sha: "abc123" } },
        "v."
      );
      expect(version.major).toBe(1);
      expect(version.minor).toBe(0);
      expect(version.patch).toBe(1);
      expect(version.sha).toBe("abc123");
      expect(version.name).toBe("v.1.0.1");
    });
  });
  test("asString", async () => {
    const versionA = fromTag({ name: "1.0.2", commit: { sha: "abc123" } });
    expect(versionA.asString()).toBe("1.0.2");
  });
});
