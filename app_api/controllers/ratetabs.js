var mongoose = require('mongoose');
var Rt = mongoose.model('Ratetab');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*module.exports.test = function (req, res) {
  sendJSONresponse(res, 200, {"status" : "success"});
};
*/

/* GET list of interest rate tables for a specific mortgage category*/
module.exports.ratetabsListByCategory = function(req, res) {
  
  var mcat = req.query.mcat;
    
  if (!mcat) {
    console.log('ratetabsListByCaregory missing params');
    sendJSONresponse(res, 404, {"message" : "mcat query parameter is required"});
    return;
  }

  Rt
    .find()
    .exec(function(err, rtabs) {
      if (err) {
        console.log('Mongodb find error:', err);
        sendJSONresponse(res, 404, err);
      } else {
        var rtabs_out = [];

        rtabs.forEach(function(item) {

	  var tab_date = item.timestamp.getFullYear() + '-' + (item.timestamp.getMonth() + 1) + '-' + item.timestamp.getDate();	  

          rtab_out = {
            variabel: item.mcats[mcat].variabel,
            vast1jr: item.mcats[mcat].vast1jr,
            vast5jr: item.mcats[mcat].vast5jr,
            vast10jr: item.mcats[mcat].vast10jr,
            vast15jr: item.mcats[mcat].vast15jr,
            vast20jr: item.mcats[mcat].vast20jr,
            vast30jr: item.mcats[mcat].vast30jr,
            date: tab_date
          };
          rtabs_out.push(rtab_out);
        });
        sendJSONresponse(res, 200, rtabs_out);
      } 
    });
}




