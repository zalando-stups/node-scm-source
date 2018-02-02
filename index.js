var process = require('child_process'),
    Q = require('q'),
    LINE_BREAK = /\r?\n|\r/gi;

/**
 * Returns the scm-source.json accoring to
 * http://stups.readthedocs.io/en/latest/user-guide/application-development.html#scm-source-json
 *
 * @return {Object} scm-source.json
 */
function getScmSource(done) {
    var hasExecSync = !!process.execSync;
    if (arguments.length === 0 && !hasExecSync) {
        // no callback and no execSync
        throw new Error('You are lacking child_process.execSync. Please use Node >= 0.12 or provide a callback to node-scm-source.');
    }
    var exec = hasExecSync ? process.execSync : process.exec,
        REV_CMD = 'git rev-parse HEAD',
        URL_CMD = 'git config --get remote.origin.url',
        STATUS_CMD = 'git status --porcelain',
        AUTHOR_CMD = 'id -un';

    if (hasExecSync) {
        var revision = String(exec(REV_CMD)),
            url = String(exec(URL_CMD)),
            status = String(exec(STATUS_CMD)),
            author = String(exec(AUTHOR_CMD)),
            json = {
                revision: revision.replace(LINE_BREAK, ''),
                url: 'git:' + url.replace(LINE_BREAK, ''),
                status: status.replace(LINE_BREAK, ' ').trim(),
                author: author.replace(LINE_BREAK, '')
            };
        if (arguments.length === 1) {
            done(json);
        } else {
            return json;
        }
    }

    Q.all([
        Q.nfcall(exec, REV_CMD),
        Q.nfcall(exec, URL_CMD),
        Q.nfcall(exec, STATUS_CMD),
        Q.nfcall(exec, AUTHOR_CMD)
    ])
    .spread(function(revision, url, status, author) {
        revision = revision[0];
        url = url[0];
        status = status[0];
        author = author[0];
        done({
            revision: revision.replace(LINE_BREAK, ''),
            url: 'git:' + url.replace(LINE_BREAK, ''),
            status: status.replace(LINE_BREAK, ' ').trim(),
            author: author.replace(LINE_BREAK, '')
        });
    });
}

module.exports = getScmSource;
