"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fs_utils_1 = require("@gradealabs/fs-utils");
/**
 * Delete files and directories.
 */
function widowmaker(...filesOrDirectories) {
    // Accept variadic string arguments or an array of strings.
    const files = [].concat(...filesOrDirectories);
    return Promise.all(files.map(fileName => {
        return new Promise((resolve, reject) => {
            fs.unlink(fileName, error => {
                if (error && error.code === 'EPERM') {
                    fs_utils_1.rmdir(fileName).then(resolve, reject);
                }
                else if (error && error.code === 'ENOENT') {
                    resolve();
                    /* istanbul ignore next */
                }
                else if (error) {
                    /* istanbul ignore next */
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    })).then(() => void 0);
}
exports.default = widowmaker;
