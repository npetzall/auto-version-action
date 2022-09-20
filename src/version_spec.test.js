const path = require('path')
const { versionSpec } = require('./version_spec');

describe("version_spec", () => {
  test("input is version_spec", async() => {
    const version_spec = await versionSpec("0.0.*");
    expect(version_spec.version({major:1, minor: 2, patch: 3}, 4)).toBe("1.2.7")
  });
  test("input is file", async() => {
    const version_spec = await versionSpec(path.join('.jest','version.test.properties'));
    expect(version_spec.version({major:0, minor: 2, patch: 3}, 4)).toBe("0.3.0")
  });

  test("spec is equal to version", async() => {
    const version_spec = await versionSpec("0.3.*");
    expect(version_spec.version({major:0, minor: 3, patch: 3}, 4)).toBe("0.3.7")
  });

  test("spec is minor.higher than version", async() => {
    const version_spec = await versionSpec("0.3.*");
    expect(version_spec.version({major:0, minor: 2, patch: 3}, 4)).toBe("0.3.0")
  });

  test("spec is major.higher than version", async() => {
    const version_spec = await versionSpec("1.3.*");
    expect(version_spec.version({major:0, minor: 3, patch: 3}, 4)).toBe("1.3.0")
  });
});