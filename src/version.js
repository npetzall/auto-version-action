const fromTag = (tag, tag_prefix) => {
  const versionElements = tag.name.replaceAll(tag_prefix, "").split(/\./);
  return {
    major: parseInt(versionElements[0]),
    minor: parseInt(versionElements[1]),
    patch: parseInt(versionElements[2]),
    sha: tag.commit.sha,
    asString() {
      return [this.major, this.minor, this.patch].join(".");
    },
  };
};

const highest = (versionA, versionB) => {
  if (versionA.major > versionB.major) {
    return versionA;
  }
  if (versionA.major < versionB.major) {
    return versionB;
  }
  if (versionA.minor > versionB.minor) {
    return versionA;
  }
  if (versionA.minor < versionB.minor) {
    return versionB;
  }
  if (versionA.patch > versionB.patch) {
    return versionA;
  }
  if (versionA.patch < versionB.patch) {
    return versionB;
  }
  return versionA;
};

exports.fromTag = fromTag;
exports.highest = highest;
