const fs = require("fs");
const path = require("path");

const createVersionSpec = (version_spec) => {
  const versionElements = version_spec.split(/\./);
  return {
    major: parseInt(versionElements[0]),
    minor: parseInt(versionElements[1]),
    patch: versionElements[2],
    version(version, bumps) {
      return [
        Math.max(this.major, version.major),
        Math.max(this.minor, version.minor),
        version.major < this.major || version.minor < this.minor
          ? 0
          : Math.max(0, version.patch) + bumps,
      ].join(".");
    },
    asString() {
      return [this.major, this.minor, this.patch].join(".");
    },
  };
};

const versionSpec = async (version_spec_input) => {
  if (/[0-9*]+\.[0-9*]+\.[0-9*]+/.test(version_spec_input)) {
    return createVersionSpec(version_spec_input);
  } else {
    const content = await fs.promises.readFile(
      path.join(process.env.GITHUB_WORKSPACE, version_spec_input),
      { encoding: "utf8" }
    );
    const row = content
      .split(/\\[nrt]/g)
      .find((line) => line.startsWith("version"));
    const version_spec = row.split("=")[1];
    return createVersionSpec(version_spec);
  }
};

exports.versionSpec = versionSpec;
