var process = require('child_process'),
    execSync = process.execSync,
    LINE_BREAK = /\r?\n|\r/gi;

/**
 * Returns the scm-source.json accoring to
 * http://stups.readthedocs.org/en/latest/user-guide/application-development.html#docker
 *
 * @return {Object} scm-source.json
 */
function getScmSource() {
    var revision = String(execSync('git rev-parse HEAD')),
        url = String(execSync('git config --get remote.origin.url')),
        status = String(execSync('git status --porcelain')),
        author = String(execSync('id -un'));

    return {
        revision: revision.replace(LINE_BREAK, ''),
        url: url.replace(LINE_BREAK, ''),
        status: status.replace(LINE_BREAK, ' ').trim(),
        author: author.replace(LINE_BREAK, '')
    };
}

module.exports = getScmSource;