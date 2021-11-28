const _ = require('lodash');

// prepare the input for db save()
exports.prepareInput = function (schema, params, ignore) {
    let fields = _.map(schema, (x,v) => {return v;});
    let ignoreFields = ignore || {};
    let inputData = {};
    _.each(fields, v => { 
        if(_.has(params, v) && !_.has(ignoreFields, v)){
            inputData[v] = (params[v]);
        }
    });

    return inputData;
}