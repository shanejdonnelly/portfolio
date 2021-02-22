const { promisify } = require('util');
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');
const validator = require('validator');
const parser = require('ua-parser-js');
const Analytic = require("../models/Analytic");
const Website = require('../models/Website');

/**
 * POST /analytics/website
 */
exports.postWebsiteAnalytics = async (req, res) => {
  try{
    const ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //this is from Cloudflare, but only offers country ip info
//    const country_code = headers['cf-ipcountry'];
    var ua = parser(req.headers['user-agent']);

    const response = await axios.get(`https://api.astroip.co/66.243.204.35/?api_key=1d6d6e8e-b5fd-415d-b2f9-4b6fa80b3a97`)
    const geo = response.data.geo || {}

    const newAnalytic = new Analytic({
      geo,
      websiteId: req.body.websiteId,
      uniqueVisitor: req.body.uniqueVisitor,
      numPageViews: req.body.numPageViews,
      href: req.body.href,
      pathname: req.body.pathname,
      userAgent: ua.ua,
      browser: ua.browser.name,
      browserVersion: ua.browser.version,
      device: ua.device.type || 'Unknown',
      engine: ua.engine.name,
      engineVersion: ua.engine.version,
      os: ua.os.name,
      osVersion: ua.os.version,
      ip,
      pixelRatio: req.body.pixelRatio,
      screenHeight: req.body.screenHeight,
      screenWidth: req.body.screenWidth,
      browserWidth: req.body.browserWidth,
      browserHeight: req.body.browserHeight,
      clientDateTime: req.body.clientDateTime
    });
    const savedAnalytic = await newAnalytic.save();
    console.log(savedAnalytic)
    res.json({ success: true });
  }
  catch(e){
    console.error('failed to save the analytics info from website visit')
    res.json({
      data: {error: 'darn'}
    });
  }
};
