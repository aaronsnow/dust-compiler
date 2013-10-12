/* global describe, it */
'use strict';

var fs = require('fs'),
    compile = require('../../lib/compile.js');


describe('compile', function () {
    it('should compile a template with only a source path and filename provided', function (done) {
        // techincally it should work with only a filename, but I don't want mock data mixed with
        // the mocha tests.  The default path when no path is provided is '.'
        compile('test.dust', './test/mock/');

        // wait 1.5 seconds before reading the file
        setTimeout(function () {
            fs.readFile('test.js', 'utf-8', function (error, data) {
                if (error) { console.log(error); }

                data.should.be.a('string');
                data.should.contain('dust.register("test"');
                done();
            });
        }, 1500);
    });

    it('should compile a template with a source path, filename, and destination path provided', function (done) {
        compile('test.dust', './test/mock/', './test/mock/');

        // wait 1.5 seconds before reading the file
        setTimeout(function () {
            fs.readFile('./test/mock/test.js', 'utf-8', function (error, data) {
                if (error) { console.log(error); }

                data.should.be.a('string');
                data.should.contain('dust.register("test"');
                done();
            });
        }, 1500);
    });

    it('should compile a template and default to NOT include the path in the registered name if options.includepath is not set', function (done) {
        compile('test.dust', './test/mock/', './test/mock/');

        // wait 1.5 seconds before reading the file
        setTimeout(function () {
            fs.readFile('./test/mock/test.js', 'utf-8', function (error, data) {
                if (error) { console.log(error); }

                data.should.be.a('string');
                data.should.contain('dust.register("test"');
                done();
            });
        }, 1500);
    });

    it('should include the path as the registered dust template name if options.includepath is set', function (done) {
        compile('test.dust', './test/mock/', './test/mock/', { includepath: true });

        // wait 1.5 seconds before reading the file
        setTimeout(function () {
            fs.readFile('./test/mock/test.js', 'utf-8', function (error, data) {
                if (error) { console.log(error); }

                data.should.be.a('string');
                data.should.contain('dust.register("./test/mock/test"');
                done();
            });
        }, 1500);
    });
});
