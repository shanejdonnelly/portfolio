/*
    - consume post checkout webhook from Shopify
    - if checkout does not contain an Extend warranty
        -- create a lead through Extend
        -- push lead into Klaviyo

        https://github.com/klaviyo/node-klaviyo

*/
const Klaviyo = require('node-klaviyo');
const fetch = require('node-fetch')
const KlaviyoClient = new Klaviyo({
    publicToken: 'zDszuf'
});

/*
    Helper Methods
*/
function purchasedWarranty(lineItems) {
    let hasWarranty = false;
    lineItems.forEach(line => {
        if (line.title.includes('Extend Protection')) {
            hasWarranty = true;
        }
    });
    return hasWarranty;
}

function findHighestPriceItem(lineItems) {
    var highestLineItem = lineItems[0];
    lineItems.forEach(line => {
        if ((line.price * 100) > (highestLineItem.price * 100)) {
            highestLineItem = line;
        }
    })
    return highestLineItem;
}

function makeCents(price) {
    return price * 100;
}

/*
    BEGIN Netlify Function
*/
exports.handler = function (event, context, callback) {
    //send back a response to the webhook
    //TODO verify webhook integrity
    callback(null, {
        statusCode: 200,
        body: "Thank You Shopify",
    });

    const order = JSON.parse(event.body);

    //abort if no line items or already purchased warranty
    if (!order.line_items || !order.line_items.length || purchasedWarranty(order.line_items)) {
        return false;
    }

    const createdAtDate = new Date(order.created_at)
    const createdAt = createdAtDate.getTime(); //millisecond timestamp
    const item = findHighestPriceItem(order.line_items)

    /*
    prepare the Extend request
    */
    const data = {
        "customer": {
            "email": order.email
        },
        "quantity": item.quantity,
        "product": {
            "purchasePrice": {
                "currencyCode": "USD",
                "amount": makeCents(item.price)
            },
            "referenceId": item.variant_id,
            "transactionDate": createdAt,
            "transactionId": order.id
        }
    }

    //create the Extend lead
    fetch(`https://api.helloextend.com/stores/${process.env.EXTEND_STORE_ID}/leads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json; version=2021-04-01',
            'X-Extend-Access-Token': process.env.EXTEND_API_KEY,
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(res => {
            //Push To Klaviyo
            KlaviyoClient.public.identify({
                email: order.email,
                properties: {
                    "Extend-Lead-Token": res.leadToken
                },
                post: true //defaults to false
            });
        })
}
