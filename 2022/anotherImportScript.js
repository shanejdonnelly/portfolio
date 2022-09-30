/*
    Function that saves Bread pre-approved user emails to Klaviyo
*/
const Klaviyo = require('node-klaviyo');
const KlaviyoClient = new Klaviyo({
    publicToken: 'zDszuf'
});
const leadsJson = require('./bread.json')

// helper to delay execution by 300ms to 1100ms
async function delay() {
    const durationMs = Math.random() * 900 + 900;
    return new Promise((resolve) => {
        setTimeout(() => resolve(), durationMs);
    });
}


async function loadLeads(lead) {
    const email = lead.Email
    //const leadToken = lead['Lead Token']
    const today = new Date();

    //Push To Klaviyo
    const res = await KlaviyoClient.public.identify({
        email: email,
        properties: {
            "Bread Pre-appproval Date": today.toLocaleDateString("en-US")
        },
        post: true //defaults to false
    });
    console.log('response from Klaviyo = ', res)
    return res
}


async function main() {
    // make an API request for each player
    const leads = leadsJson

    for (const [index, lead] of leads.entries()) {
        console.log(`${index} -- ${lead.Email}`)
        await loadLeads(lead);
        // be polite to our friendly data hosts and
        // don't crash their servers
        await delay();
    }
    console.log("Done!");

}

main();