const fromTag = (tag, tag_prefix) => {
  const versionElements = tag.name.replaceAll(tag_prefix, '').split(/\./)
  return {
    major: parseInt(versionElements[0]),
    minor: parseInt(versionElements[1]),
    patch: parseInt(versionElements[2]),
    name: tag.name,
    sha: tag.commit.sha,
    asString() {
      return [this.major, this.minor, this.patch].join('.')
    }
  }
}

const _fromTag = fromTag
export { _fromTag as fromTag }
