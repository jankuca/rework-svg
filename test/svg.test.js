var svg = require('../src/svg');
var expect = require('expect.js');


describe('SVG_PATTERN', function () {

  it('should match no rules', function (done) {
    var value = 'url("./img/icon.svg") svg()';

    value.replace(svg.SVG_PATTERN, function (match, pre_whitespace, url_match, svg_style_json) {
      expect(pre_whitespace).to.equal('');
      expect(url_match).to.equal('"./img/icon.svg"');
      expect(svg_style_json).to.be(undefined);
      done();
    });
  });

  it('should match a single rule', function (done) {
    var value = 'url("./img/icon.svg") svg({' +
      'path { fill: #FF0000; }' +
    '})';

    value.replace(svg.SVG_PATTERN, function (match, pre_whitespace, url_match, svg_style_json) {
      expect(pre_whitespace).to.equal('');
      expect(url_match).to.equal('"./img/icon.svg"');
      expect(svg_style_json).to.equal('path { fill: #FF0000; }');
      done();
    });
  });

  it('should match two rules', function (done) {
    var value = 'url("./img/icon.svg") svg({' +
      'path#p1 { fill: #00FF00; }' +
      'path[id="p2"] { fill: #FF0000; }' +
    '})';

    value.replace(svg.SVG_PATTERN, function (match, pre_whitespace, url_match, svg_style_json) {
      expect(pre_whitespace).to.equal('');
      expect(url_match).to.equal('"./img/icon.svg"');
      expect(svg_style_json).to.equal('path#p1 { fill: #00FF00; }' + 'path[id="p2"] { fill: #FF0000; }');
      done();
    });
  });

  it('should match two rules with new line between', function (done) {
    var value = 'url("./img/icon.svg") svg({' +
      'path#p1 { fill: #00FF00; }' + '\n' +
      'path[id="p2"] { fill: #FF0000; }' +
    '})';

    value.replace(svg.SVG_PATTERN, function (match, pre_whitespace, url_match, svg_style_json) {
      expect(pre_whitespace).to.equal('');
      expect(url_match).to.equal('"./img/icon.svg"');
      expect(svg_style_json).to.equal('path#p1 { fill: #00FF00; }' + '\n' + 'path[id="p2"] { fill: #FF0000; }');
      done();
    });
  });

});