var fc2svg = require('fusioncharts2svg');

module.exports = function (data) {
    // EDITING STARTS HERE
    var options = {
        type: "doughnut2d",
        width: 500,
        height: 500,
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Monthly revenue for last year",
                "subCaption": "Harry's SuperMart",
                "xAxisName": "Month",
                "yAxisName": "Revenues (In USD)",
                "numberPrefix": "$",
                "paletteColors": "#0075c2 ",
                "bgColor": "#ffffff ",
                "borderAlpha": "20",
                "canvasBorderAlpha": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "placevaluesInside": "1",
                "rotatevalues": "1",
                "valueFontColor": "#ffffff ",
                "showXAxisLine": "1",
                "xAxisLineColor": "#999999 ",
                "divlineColor": "#999999 ",
                "divLineIsDashed": "1",
                "showAlternateHGridColor": "0",
                "subcaptionFontBold": "0",
                "subcaptionFontSize": "14"
            },
            data: data,
            trendlines: [
                {
                    "line": [
                        {
                            "startvalue": "700000",
                            "color": "#1aaf5d ",
                            "valueOnRight": "1",
                            "displayvalue": "Monthly Target"
                        }
                    ]
                }
            ]
        }
    };

    // EDITING ENDS HERE
    return fc2svg.fromObject(options);
};
