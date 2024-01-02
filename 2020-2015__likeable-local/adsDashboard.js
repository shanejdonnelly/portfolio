const ns = 'likeablelocal/adsDashboard';

const GET_INSIGHTS = `${ns}/GET_INSIGHTS`;
const GET_INSIGHTS_SUCCESS = `${ns}/GET_INSIGHTS_SUCCESS`;
const GET_INSIGHTS_FAIL = `${ns}/GET_INSIGHTS_FAIL`;

const GET_LOCATION_AND_DEMOGRAPHICS = `${ns}/GET_LOCATION_AND_DEMOGRAPHICS`;
const GET_LOCATION_AND_DEMOGRAPHICS_SUCCESS = `${ns}/GET_LOCATION_AND_DEMOGRAPHICS_SUCCESS`;
const GET_LOCATION_AND_DEMOGRAPHICS_FAIL = `${ns}/GET_LOCATION_AND_DEMOGRAPHICS_FAIL`;

const GET_ADS_IN_RANGE = `${ns}/GET_ADS_IN_RANGE`;
const GET_ADS_IN_RANGE_SUCCESS = `${ns}/GET_ADS_IN_RANGE_SUCCESS`;
const GET_ADS_IN_RANGE_FAIL = `${ns}/GET_ADS_IN_RANGE_FAIL`;

const initialState = {
  accountInsights: null,
  adsInRange: [],
  gettingAdsInRange: false,
  locationAndDemographics: [
    { key: 'page_fans_gender_age', label: 'Age and Gender', value: true, data: null },
    { key: 'page_fans_city', label: 'Locations', value: true, data: null }
  ],
  gettingLocationAndDemographics: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ADS_IN_RANGE:
      return {
        ...state,
        gettingAdsInRange: true
      };
    case GET_ADS_IN_RANGE_SUCCESS:
      return {
        ...state,
        adsInRange: action.result.data,
        gettingAdsInRange: false
      };
    case GET_ADS_IN_RANGE_FAIL:
      return {
        ...state,
        gettingAdsInRange: false
      };
    case GET_LOCATION_AND_DEMOGRAPHICS:
      return {
        ...state,
        gettingLocationAndDemographics: true
      };
    case GET_LOCATION_AND_DEMOGRAPHICS_SUCCESS:
      const data2 = action.result.data && action.result.data.results ? action.result.data.results : null;
      return {
        ...state,
        gettingLocationAndDemographics: false,
        locationAndDemographics: state.locationAndDemographics.map(insight => {
          insight.data = data2 ? data2[insight.key].results : null;
          return insight;
        })
      };
    case GET_LOCATION_AND_DEMOGRAPHICS_FAIL:
      return {
        ...state,
        gettingLocationAndDemographics: false
      };
    case GET_INSIGHTS:
      return {
        ...state,
        gettingInsights: true
      };
    case GET_INSIGHTS_SUCCESS:
      return {
        ...state,
        gettingInsights: false,
        accountInsights: action.result.data
      };
    case GET_INSIGHTS_FAIL:
      return {
        ...state,
        gettingInsights: false
      };
    default:
      return state;
  }
}

export function getAdsInRange(orgId, startDate, endDate) {
  return {
    types: [GET_ADS_IN_RANGE, GET_ADS_IN_RANGE_SUCCESS, GET_ADS_IN_RANGE_FAIL],
    promise: client => client.get(`/org/${orgId}/reporting/adsInRange?start=${startDate}&end=${endDate}`)
  };
}

export function getAdAccountOverviewData(adAccountId, startDate, endDate) {
  return {
    types: [GET_INSIGHTS, GET_INSIGHTS_SUCCESS, GET_INSIGHTS_FAIL],
    promise: client =>
      client.get(`/facebook/adAccount/${adAccountId}/insights?since=${startDate}&until=${endDate}`, {
        data: {
          startDate,
          endDate
        }
      })
  };
}

export function getLocationAndDemographics(orgId, startDate, endDate) {
  const metrics = 'page_fans_city,page_fans_gender_age';
  return {
    types: [GET_LOCATION_AND_DEMOGRAPHICS, GET_LOCATION_AND_DEMOGRAPHICS_SUCCESS, GET_LOCATION_AND_DEMOGRAPHICS_FAIL],
    promise: client =>
      client.get(`/org/${orgId}/reporting/pageStats?since=${startDate}&until=${endDate}&metrics=${metrics}`)
  };
}
