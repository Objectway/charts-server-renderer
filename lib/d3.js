var d3 = require('d3')
    , document = require('jsdom').jsdom()
    , xmldom = require('xmldom')
    ;

module.exports = function (configType, data) {
    var xml = d3.select(document.body).append("svg").attr('xmlns', 'http://www.w3.org/2000/svg');

    xml = require('../config/' + configType)(document, xml, data);

    return new xmldom.XMLSerializer().serializeToString(xml);
};