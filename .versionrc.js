module.exports = {
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Fixes and improvements' },
    { type: 'perf', section: 'Fixes and improvements' },
    { type: 'chore', section: 'Miscellaneous' },
    { type: 'docs', section: 'Miscellaneous' },
    { type: 'style', section: 'Miscellaneous' },
    { type: 'refactor', section: 'Miscellaneous' },
    { type: 'test', section: 'Miscellaneous' },
    { type: 'ci', section: 'Miscellaneous' },
    { type: 'build', section: 'Miscellaneous' },
  ],
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commits/{{hash}}',
  compareUrlFormat:
    '{{host}}/{{owner}}/{{repository}}/branches/compare/{{currentTag}}%0D{{previousTag}}',
  releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
  bumpFiles: ['package.json'],
  packageFiles: ['package.json'],
}
