const log = require('./logger');
const config = require ('./../config');
const pgQuery = require ('./pgQuery');

// log (await bitmex.fetchBalance ());
var printingFormat = function (rawFormat){
    return rawFormat;
}

var display = async function(words)
{
    log(`display (${words}`);
    try{
        // let result =  await pgQuery.get_OHLCV(tf, epochStartDate, epochEndDate);
        return words;
    }
    catch(e){
        log.error ('ErrorS: ', e);
    }
}

module.exports = {
    display: display,
    printingFormat:printingFormat
}
