//from ads.js (route file)
app.get('/facebook/adAccount/:accountId/insights', requireUser, handlers.getAdAccountInsights);

//from ads.handlers.js
export function getAdAccountInsights(adAccountId, since, until) {
  const Models = require('../../db/models');
  return new Promise((resolve, reject) => {
    const data = {
      access_token: masterAccessToken,
      fields: adDashboardInsightFields,
      time_range: { since: moment(since).format('YYYY-MM-DD'), until: moment(until).format('YYYY-MM-DD') },
      time_increment: 1
    };
    const url = `${fbApiVersion}/${adAccountId}/insights`;
    FB.api(url, 'get', data, response => {
      if (!response || response.error) {
        return reject(response ? response.error : new Error('Failed to get ad account insights'));
      }
      return resolve(response.data);
    });
  });
}

//from facebookAds.js module
export function getAdAccountInsights(adAccountId, since, until) {
  const Models = require('../../db/models');
  return new Promise((resolve, reject) => {
    const data = {
      access_token: masterAccessToken,
      fields: adDashboardInsightFields,
      time_range: { since: moment(since).format('YYYY-MM-DD'), until: moment(until).format('YYYY-MM-DD') },
      time_increment: 1
    };
    const url = `${fbApiVersion}/${adAccountId}/insights`;
    FB.api(url, 'get', data, response => {
      if (!response || response.error) {
        return reject(response ? response.error : new Error('Failed to get ad account insights'));
      }
      return resolve(response.data);
    });
  });
}
