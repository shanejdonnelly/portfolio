const csv = require('csvtojson')
const fetch = require('isomorphic-fetch')

const endpoint = "https://api-us-east-1.graphcms.com/v2//master";
const token = ""

csv({delimiter:';'})
.fromFile('./data/producers-export1.csv')
.then(async producers => {
    try{
        for (let index = 0; index < 1; index++) {
                                const description = {
                                    "children": [
                                        {
                                        "type": "paragraph",
                                        "children": [
                                        {
                                            "text": "${producers[index].content}"
                                        }
                                        ]
                                    }
                                    ]
                                  }

            const response = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`},
                method: 'POST',
                body: JSON.stringify({
                    query: `
                        mutation{
                            createProducer(data:{
                                name: ${producers[index].name},
                                description: ${description}
                                })
                                {
                                    id
                                    name
                                    description{
                                        raw
                                    }
                                }
                            })
                        } 
                    `
                })
            })

            // Parse the response to verify success
            const body = await response.json()
            console.log(body)
            const data = await body.data

            console.log('Uploaded', data)
        }

    }
    catch(error){
        console.log(error)
    }

})
