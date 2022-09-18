# Auto Version Action

Idea is to provide a calculated version to a run like [shipkit-auto-version](https://github.com/shipkit/shipkit-auto-version)

## Inputs

## `github-token`

**Required** normally this should be `${{ secrets.GITHUB_TOKEN }}` so that the repository can be accessed.

## `version-spec`

Path to a file containing `version=[version specification]`  
Can also be a `[version specification]` as value, but that would mean that the workflow needs updating for each minor/major version  

**Default** `version.properties`

## `tag-prefix`

Used so that versions can be extracted from tags.  

**Default** `v`

## Outputs

## `last-tagged-version`

Previous version based of the tag with the highest version number

## `version-spec`

Version specification used

## `current-version`

Version for this build

## Example usage

```yaml
uses: npetzall/auto-version-action@[sha]
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```
