$(document).ready(function ($) {
  const websiteId = $('body').data('websiteid')
  const dealerName = $('body').data('dealername')

  //set baselines
  const time_now  = (new Date()).getTime();
  const visitorString = `${dealerName}_${websiteId}`;
  let uniqueVisitor = true;
  let numPageViews = 1;

  //check if been to site before; if so, adjust baseline vars
  if(!!localStorage.getItem(visitorString)){
    //check lastclear now
    const lastclear = localStorage.getItem('lastclear');
    const days30 = 1000 * 60 * 60 * 24 * 30;

    //lastclear saved as string in localStorage, so parseInt to do math
    if ((time_now - parseInt(lastclear)) > days30) {
      localStorage.clear();
      localStorage.setItem('lastclear', time_now);
    }
    else{ //lastclear is within last 30 days...
      uniqueVisitor = false;
      numPageViews = parseInt(localStorage.getItem(visitorString)) + 1;
    }
  }
  else{ //first visit, so set for uniqueVisitor
    localStorage.setItem('lastclear', time_now);
  }

  //set or adjust localStorage value
  localStorage.setItem(visitorString, numPageViews)

  //visit time to save in client time as opposed to server time
  const dateTimeString = new Date().toString();
  $.post('https://app.cargrove.com/analytics/website', {
    websiteId,
    uniqueVisitor,
    numPageViews,
    href: location.href,
    pathname: location.pathname,
    pixelRatio: window.devicePixelRatio,
    screenHeight: window.screen.availHeight,
    screenWidth: window.screen.availWidth,
    browserWidth: window.innerWidth,
    browserHeight: window.innerHeight,
    clientDateTime: dateTimeString
  })
});
