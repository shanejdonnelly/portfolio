const csv = require('csvtojson')
const fetch = require('isomorphic-fetch')

const endpoint = "https://api-us-east-1.graphcms.com/v2/ckrmerqpt2wlf01z1g47z9ukm/master";
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzQzMjU5NzMsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2Nrcm1lcnFwdDJ3bGYwMXoxZzQ3ejl1a20vbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOThhOTJiNjQtMDQ4YS00NDU0LWJkM2YtYTkyOGZlNTNkNDk2IiwianRpIjoiY2t1c3JoanJlMGxyODAxeGkzY2cyMXp4MyJ9.aovRIKRKx3vfJVnresKLHzsZ95PgmtlzW8xZzyBA56GIUsXXxzeQ4GPeMOyc3YOj0BXeVpUVYzMWwvr__633I4lLvvgohoRywIfWozDbkduR9a639R7Gzf1qhDhRx-NHhYaSALgB42KEOGuz7dwtOogD6OEBaGwQ52j8pG0ITeluWTG6xuK-0MgCUXHdpeejaUYH78TtGz3idmBPWXkQzhS9M26IPDDS8MFZu5QCsCqXbnf2r-pGPtXFwv-R4OuG9LCwGO7F1x8UYgySQF-Wyy8IpPah8IBeacXzFSQhkRRWKlubfYpevUoU6TpzyQETHiCqtnl07owJxRx4RM52UZSedLAxLzl6qbraEdXCm2vX3I-Js_IkFX17l3x9rz-omUL8Zk19wV6UpY-ZoCfwzP37nry61fvdsDWHO9Jct1gxV8M-vgP2szkIY1kk7HkPOrUk2TBK8cG_9_UnNag7_NHTBpWvitHoLbo9zkWmWgxO413eDSjFXfqT_J1SEGpiGpqVk0n6uBchYxZe---bWfgPSp1rCyo9Kh3UVSrSLUHi_lQrNiMRMzjd89S0S4JkjLdoWmDgmSIiOgNP-6q9ziVRIJV3ZJODlhxX5X_hakU4Hv2XtnmpRQJA7zr1oECuJS0d5kA10JEQb1WicB79RlQv2iBxw14WzsbzAUR0SdU";

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
