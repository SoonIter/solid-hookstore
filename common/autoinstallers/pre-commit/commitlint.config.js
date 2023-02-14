module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignore: [(commit) => commit === 'Bump versions', (commit) => commit.startsWith('Update changelogs')]
};
