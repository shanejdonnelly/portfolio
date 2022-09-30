# KMA HR Job Board

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app is loaded into https://www.kmahr.com/jobs

Jobs are fetched from KMA's Lever job board

## Development Details

- Link paths must include `/jobs` path  
- To see the app locally, you need to hit: localhost:3000/jobs  
- Development uses master branch, live site uses production.

### Workflow

- Make any working edits to master branch
- When pushed to Github, this branch kicks off a build in Netlify
- The master branch can be previewed at [https://master--kma-job-board.netlify.app/jobs](https://master--kma-job-board.netlify.app/jobs)

#### To deploy to production

- Merge master branch into production and push to Github (kicking off a new Netlify build)
- Production Netlify instance is [https://kma-job-board.netlify.app/jobs](https://kma-job-board.netlify.app/jobs)
- When done building, inspect the Netlify source and grab the new script and css paths from the HEAD.
- They will look like below, but with different cache-busting numbers
  - `<script defer="defer" src="/static/js/main.27d04a24.js"></script>`
  - `<link href="/static/css/main.bb9b735e.css" rel="stylesheet">`
- Paste the new script and css paths into the `/jobs` page on KMA's site
- DONE!
