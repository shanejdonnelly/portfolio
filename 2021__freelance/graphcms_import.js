const csv = require('csvtojson')
const fetch = require('isomorphic-fetch')

const endpoint = "https://api-us-east-1.graphcms.com/v2/";
const token = "token";

csv({delimiter:';'})
.fromFile('./data/producers-export1.csv')
.then(async producers => {
    for (let index = 0; index < producers.length; index++) {
        const response = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
            method: 'POST',
            body: JSON.stringify({
                query: `
                    mutation{
                        createProducer(data:{
                            name: "${producers[index].name}",
                            content: "${producers[index].content}"
                        }){
                            id
                            content
                            name
                        }
                    } 
                `
            })
        })

        // Parse the response to verify success
        const body = await response.json()
        const data = await body.data

        console.log('Uploaded', data)
    }

})