module.exports = function (configType, data) {
    return require('../config/fusion-charts/' + configType)(data);
};
