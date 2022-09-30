# Old Elk Barrel Tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Old Elk's current site runs on SquareSpace. This app is loaded into https://www.oldelk.com/track-my-single-barrel 

Sanity is the datastore for the app. https://www.sanity.io/manage/personal/project/
Repo here: https://github.com/50FISH

## Development Details 

* SquareSpace site has several custom CSS rules which can be found in the page settings.
* The tracker page contains an empty div which is the react app root  
* The script and css tags which load the app are added/updated in the page settings 
* Image assets reference absolute paths and are served from Netlify 
* Development uses master branch, live site uses production. 

### Workflow 

* Make any working edits to master branch 
* When pushed to Github, this branch kicks off a build in Netlify 
* The master branch can be previewed at [https://master--elegant-murdock-ac9e84.netlify.app/](https://master--elegant-murdock-ac9e84.netlify.app/) 

#### To deploy to production 

* Merge master branch into production and push to Github (kicking off a new Netlify build)
* Production Netlify instance is [https://elegant-murdock-ac9e84.netlify.app/](https://elegant-murdock-ac9e84.netlify.app/) 
* When done building, inspect the Netlify source and grab the new script and css paths from the HEAD. 
* They will look like below, but with different cache-busting numbers 
  * `<script defer="defer" src="/static/js/main.27d04a24.js"></script>`  
  * `<link href="/static/css/main.bb9b735e.css" rel="stylesheet">` 
* Paste the new script and css paths into the SquareSpace page settings (be sure to use the absolute path to these)
* DONE! 








