[![Testing](https://github.com/npetzall/auto-version-action/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/npetzall/auto-version-action/actions/workflows/main.yml)
[![CodeQL](https://github.com/npetzall/auto-version-action/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/npetzall/auto-version-action/actions/workflows/codeql-analysis.yml)
[![Check dist/](https://github.com/npetzall/auto-version-action/actions/workflows/check-dist.yml/badge.svg?branch=main)](https://github.com/npetzall/auto-version-action/actions/workflows/check-dist.yml)

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

## `latest-tagged-version`

Previous version based of the tag with the highest version number  
Also exported as env `PREV_VERSION`

## `latest-tagged-version-name`

Tag name for the latest-tagged-version  
Also exported as env `PREV_VERSION_NAME`

## `latest-tagged-version-sha`

Commit hash for the latest-tagged-version  
Also exported as env `PREV_VERSION_SHA`

## `version-spec`

Version specification used

## `auto-version`

Version for this build  
Also exported as env `AUTO-VERSION`

## Example usage

```yaml
uses: npetzall/auto-version-action@[sha]
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```
```yaml
- name: Auto-version
  id: auto-version
  uses: npetzall/auto-version-action@[sha]
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
- name: Print details from auto-version-action
  run: |
    echo "latest-tagged-version: ${{ steps.auto-version.outputs.latest-tagged-version }}"
    echo "latest-tagged-version-name: ${{ steps.auto-version.outputs.latest-tagged-version-name }}"
    echo "latest-tagged-version-sha: ${{ steps.auto-version.outputs.latest-tagged-version-sha }}"
    echo "version-spec: ${{ steps.auto-version.outputs.version-spec }}"
    echo "auto-version: ${{ steps.auto-version.outputs.auto-version }}"
- name: Print exported env
  run: |
    echo "PREV_VERSION: $PREV_VERSION"
    echo "PREV_VERSION_NAME: $PREV_VERSION_NAME"
    echo "PREV_VERSION_SHA: $PREV_VERSION_SHA"
    echo "AUTO_VERSION: $AUTO_VERSION"
  if: ${{ runner.os == 'Linux' }}
- name: Print exported env
  run: |
    Write-Host "PREV_VERSION: ${env:PREV_VERSION}"
    Write-Host "PREV-VERSION_NAME: ${env:PREV_VERSION_NAME}"
    Write-Host "PREV-VERSION_SHA: ${env:PREV_VERSION:SHA}"
    Write-Host "AUTO-VERSION: ${env:AUTO_VERSION}"
  if: ${{ runner.os == 'Windows' }}
```
