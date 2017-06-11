"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const fs_utils_1 = require("@gradealabs/fs-utils");
const index_1 = require("./index");
const tree = [
    '.widow/file.txt',
    '.widow/a.txt',
    '.widow/b.txt',
    '.widow/folder/other.txt',
    '.widow/folder/me.txt',
    '.widow/folder/you.txt'
];
describe('widowmaker', function () {
    beforeEach(function () {
        return tree.reduce((p, x) => {
            return p.then(() => {
                return fs_utils_1.mkdir(path.dirname(x)).then(() => fs_utils_1.touch(x));
            });
        }, Promise.resolve());
    });
    afterEach(function () {
        return fs_utils_1.rmdir('.widow');
    });
    it('should delete files', function (done) {
        index_1.default('.widow/file.txt', ['.widow/a.txt', '.widow/b.txt'])
            .then(() => {
            assert.ok(!fs.existsSync('.widow/file.txt'));
            assert.ok(!fs.existsSync('.widow/a.txt'));
            assert.ok(!fs.existsSync('.widow/b.txt'));
        })
            .then(done, done);
    });
    it('should delete directories', function (done) {
        index_1.default('.widow/folder', ['.widow/a.txt', '.widow/b.txt'])
            .then(() => {
            assert.ok(!fs.existsSync('.widow/folder'));
            assert.ok(!fs.existsSync('.widow/folder/me.txt'));
            assert.ok(!fs.existsSync('.widow/a.txt'));
            assert.ok(!fs.existsSync('.widow/b.txt'));
        })
            .then(done, done);
    });
    it('should skip non-existant files/directories', function (done) {
        index_1.default('.widow/folder', '.widow/notthere', ['.widow/a.txt', '.widow/b.txt'])
            .then(() => {
            assert.ok(!fs.existsSync('.widow/folder'));
            assert.ok(!fs.existsSync('.widow/folder/me.txt'));
            assert.ok(!fs.existsSync('.widow/a.txt'));
            assert.ok(!fs.existsSync('.widow/b.txt'));
        })
            .then(done, done);
    });
});
