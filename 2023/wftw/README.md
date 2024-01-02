<h1 align="center">
  WFTW Website
</h1>

This site is built using Gatsby & Sanity, deployed via Netlify. It features a live preview within Sanity that is powered by a DigitalOcean server. The repo contains the code for both Gatsby and Sanity.

## Gatsby notes 

This site composes a number of components and makes them all available as building blocks within `/src/templates/page.js`. 

The `gatsby-node.js` file handles all Graphql queries, page generation and routing. 

ChakraUI React component library is used throughout. Check `/src/theme` for custom variants.


## Sanity notes

To make changes to Sanity, you need to have Sanity's CLI tools installed. Then, edit the appropriate schema file and run: 

`sanity deploy`

`sanity graphql deploy` (this isn't always necessary, but won't hurt anything to run)

## Deploy notes

The site is automatically deployed when the `production` branch is pushed to Github. 

Staging previews are available when using the `main` branch at: [https://main--wftw.netlify.app/](https://main--wftw.netlify.app/)

## Sanity Preview notes

Custom code in the `/structure` directory creates the preview tab and deals with routing, etc for the preview within Sanity.

The preview server runs a development Gatsby server that watches for changes in Sanity data. Look at the Sanity config in `gatsby-config.js` for details.

To update the code, you need to manually pull the production branch on the server. 

Deploy process: 

- SSH into the server  

- Attach to the running Screen session  
 `screen -r`
- Kill the development server  
 `Ctrl C`
- Change to the site root directory and pull from Github  
 `cd ../ && git pull origin production`
- Change back to the Gatsby directory and start the server again  
 `cd gatsby && npm run develop`
- Detach from the running screen session  
 `Ctrl a d`
- Exit the SSH window  
  `exit`
