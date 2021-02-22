const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const analyticSchema = new mongoose.Schema({
  websiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website'
  },
  geo: {
    is_metric: Boolean,
    is_eu: Boolean,
    longitude: Number,
    latitude: Number,
    country_geo_id: Number,
    zip_code: String,
    city: String,
    region_code: String,
    region_name: String,
    continent_code: String,
    continent_name: String,
    capital: String,
    country_name: String,
    country_code: String
  },
  uniqueVisitor: Boolean,
  numPageViews: Number,
  pathname: String,
  href: String,
  userAgent: String,
  ip: String,
  browser: String,
  browserVersion: String,
  device: String,
  engine: String,
  engineVersion: String,
  os: String,
  osVersion: String,
  pixelRatio: String,
  screenHeight: String,
  screenWidth: String,
  browserWidth: String,
  browserHeight: String,
  clientDateTime: String
},
{ timestamps: true });

analyticSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });

const Analytic = mongoose.model('Analytic', analyticSchema);

module.exports = Analytic;
