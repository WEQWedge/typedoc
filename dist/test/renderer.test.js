"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const FS = require("fs-extra");
const Path = require("path");
const Assert = require("assert");
const typescript_1 = require("typescript");
function getFileIndex(base, dir = '', results = []) {
    const files = FS.readdirSync(Path.join(base, dir));
    files.forEach(function (file) {
        file = Path.join(dir, file);
        if (FS.statSync(Path.join(base, file)).isDirectory()) {
            getFileIndex(base, file, results);
        }
        else {
            results.push(file);
        }
    });
    return results.sort();
}
function compareDirectories(a, b) {
    const aFiles = getFileIndex(a);
    const bFiles = getFileIndex(b);
    Assert.deepEqual(aFiles, bFiles, `Generated files differ. between "${a}" and "${b}"`);
    const gitHubRegExp = /https:\/\/github.com\/[A-Za-z0-9\-]+\/typedoc\/blob\/[^\/]*\/examples/g;
    aFiles.forEach(function (file) {
        const aSrc = FS.readFileSync(Path.join(a, file), { encoding: 'utf-8' })
            .replace('\r', '')
            .replace(gitHubRegExp, '%GITHUB%');
        const bSrc = FS.readFileSync(Path.join(b, file), { encoding: 'utf-8' })
            .replace('\r', '')
            .replace(gitHubRegExp, '%GITHUB%');
        if (aSrc !== bSrc) {
            const err = new Error(`File contents of "${file}" differ.`);
            err.expected = aSrc;
            err.actual = bSrc;
            err.showDiff = true;
            throw err;
        }
    });
}
describe('Renderer', function () {
    const src = Path.join(__dirname, '..', '..', 'examples', 'basic', 'src');
    const out = Path.join(__dirname, '..', 'tmp', 'test');
    let app, project;
    before(function () {
        FS.removeSync(out);
    });
    after(function () {
        FS.removeSync(out);
    });
    it('constructs', function () {
        app = new __1.Application();
        app.bootstrap({
            mode: 'modules',
            logger: 'console',
            target: typescript_1.ScriptTarget.ES5,
            readme: Path.join(src, '..', 'README.md'),
            module: typescript_1.ModuleKind.CommonJS,
            gaSite: 'foo.com',
            name: 'typedoc',
            ignoreCompilerErrors: true
        });
    });
    it('converts basic example', function () {
        this.timeout(0);
        const input = app.expandInputFiles([src]);
        project = app.convert(input);
        Assert(app.logger.errorCount === 0, 'Application.convert returned errors');
        Assert(project instanceof __1.ProjectReflection, 'Application.convert did not return a reflection');
    });
    it('renders basic example', function () {
        this.timeout(0);
        const result = app.generateDocs(project, out);
        Assert(result === true, 'Application.generateDocs returned errors');
        FS.removeSync(Path.join(out, 'assets'));
        compareDirectories(Path.join(__dirname, 'renderer', 'specs'), out);
    });
});
//# sourceMappingURL=renderer.test.js.map