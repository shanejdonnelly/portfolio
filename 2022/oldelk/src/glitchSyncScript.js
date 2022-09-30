const dayjs = require('dayjs')
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
    // Set this to true for detailed logging:
    logger: false,
});

fastify.get("/", function (request, reply) {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ hello: "world" });
});

fastify.get("/sync", function (request, reply) {
    /*
      - fetch barrel data from Google Sheet
      - import data to Sanity
  */

    const googleKey =
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC6gg/a8ZT1qq1y\nA3sQKkRdDat2YSGTCz8tBjgSgGDzRDk8ltfQ2j0YIPb+1TbucwP8tNKLx78jNFW7\nLvw2KxMiGuFe+GFbmbPcYYHjW3jkEbECER6pLySbJliR0KEc4/A6eKKokdJLR2IY\n6OXeLQYUvbEBEokb+O2WfmqD1U02f1yxXh6NtCvInWKkn02gA62gRhI6atCvP/Oe\n4x3G875l13zCjKZuSuN3b5PejSNt8ipAACJR6i5YFr+QM8HG2Y55p63BAPBA6SYb\ngsOP0nSJaRoAUFnjYVCH1TgT0b9PeIpV5/faDkx8HyYjMSS6L0KQwqZU79paWg/3\nMp4QFQpdAgMBAAECggEAS8FDZmdk3UonrB080aqRXQiN4gX+6KaTURrrEJzDhFvs\nMa+FVogmc5QELyr0ZnMiJfVeZbdK7CY4QlEJ0Yi6e0pWy0fw549tTnDunKYNWvnS\nn2fLv+VtpXU0WXnXzw/Ihj90tiqQs9H5RuvmXlGEXE1WRXy9Yza/bjbH1eeANsdf\n8njV7bKorEhEDmWlkoCyV/clx/pTfh1q+VHbTinTvP4lNaZyQwUKpVyzibef226u\n/VKvtp/z4hS6pL42NGaxaUyblTX9FWL5l32oGz5wfcfw0PZZyl92kWiAHJFeb5a2\n+fBQe7PxFe2jJlfuWODh+CMfVLbEDG6ZTXkXIfgGowKBgQDkq2Z2sv50mKjJl5K6\nJ9Aq0RK/ojcmuNeV8zZlBvabV2IpMQDd20yhMJp2vJrYOxr1IU2EcsKOhQLjzCjj\nxXw/xzOBYxUMEj4WmJzHseOn7tnIlM53IvTl7Fg80g3z0gzt0KTK8SUdlr77HooP\nDR4HVTb+LNKPLfxasJ8BwdMGOwKBgQDQzKW1yMS5YqgsS6J6B/aboRsyLKTmUced\n4Y94aDt5sDBNn1ScjrXxM4+7m3cm6vom0vxyNR1lhCoDjnLAKt9a8IqBUNASQPgE\nIAc/h0JSGaPA1X1x7+onk/tB5x11g6aWS//7bOGKKaUI4f4AWibsi8i/zTuVrxpj\nBBI6I7XwRwKBgQDSWtpnV0G9ALJEwKq5lOZqfOpCX3dcp62qw5HGXiF9xWUHf4zM\ninBz18JAeD/5qmWiGoC01t0jPjjqVWVIIuOpyBYZcIxsDlwPbVTMX1iNo6u0WS+V\naRLgcAq76H/tS82Y99ag2jTKg2IsoGtgbTCyjjGIoLMSA7uhsdiURTlbAQKBgQCL\nLr+Pa6NnCFKeJFTMD57dowjj60qIlR8BKShf1OtAdKfeNkVKjv7NJ9e58Sn98UiK\ntL2+y5Uq5Gy1LjFj07BLiGhrRxlL8a7h4Q+z00/sNlcn5afXWVu2wjgMeCj0+qsD\nKOocCTpWxOfUAgE07uNfbtaEtCPx5WUrd71GsCNJZQKBgQC/2DE0/Mxo4B7SFF/a\nPI225rRjIXUdOeo6ydnPUqgcpU5dz3I63J7HjDF0fuNYaNZ/+UhC4x8FAMxBHQmo\nNGExnJUY5GCGBqzsryOsb42y/3G8GQkd/94mrr7AJuX3WOua++rtw8hQ/kUTYnwj\nxy7w35xm4N9xTnPpXB8ifQlDTQ==\n-----END PRIVATE KEY-----\n";
    const { GoogleSpreadsheet } = require("google-spreadsheet");

    const sanityClient = require("@sanity/client");
    const client = sanityClient({
        projectId: "s7d1n0k7",
        dataset: "production",
        apiVersion: "2022-01-13",
        token:
            "ski4tGb69Za3GkqqcOTlfEw7sx0mPkcF1dTusfrvvhh8b8mhmGsM1Ua8u3bjNKJqSpc7EQywPHypks61lLbaOHEPET2NMVWCYxEORUTRESfUTKqGg5tgm0Uhcwyale5NH5zMlYIsfyWKDn3gLmjCYkt3ZaGpkYpmePa3LWJfFhyKRTHTXZvm",
        useCdn: false,
    });

    /*
      HELPER functions
  */
    const roundDown = function (num) {
        num = parseInt(num);
        return Math.floor(num);
    };
    const validDate = function (d) {
        return Date.parse(d);
    };
    const formatDate = function (d) {
        const newDate = new Date(d);
        const year = newDate.getFullYear();
        const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        const day = ("0" + newDate.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    /*
      BEGIN Netlify Function
  */
    const thing = async function (event, context) {
        /*
            ----------------------------
            FETCH rows from Google Sheet
            ----------------------------
        */
        const doc = new GoogleSpreadsheet(
            "1dKey6dIBMaCBvuKgr0QgmmHfryGOjKLE2gtCpX5BeIA"
        );

        // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: "single-barrel-app@old-elk.iam.gserviceaccount.com",
            private_key: googleKey,
        });

        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        // read rows
        const rows = await sheet.getRows(); // can pass in { limit, offset }
        console.log("Hello! you have the sheet!");
        console.log("rows length = ", rows.length);
        console.log("rows[17]  = ", rows[17]);

        /*
            ----------------------------------------------------------------------------------
            LOOP over rows from sheet, find new entries and create new Sanity barrel documents
            ----------------------------------------------------------------------------------
        */

        function isWithin90Days(dateShipped) {
            const today = dayjs();
            const stopDate = dayjs(dateShipped).add(90, "day");

            return today.isBefore(stopDate, "day");
        }

        //filter out rows with a dateShipped value past 90 days
        const inProcessBarrels = rows.filter((r) =>
            r.dateShipped ? isWithin90Days(r.dateShipped) : true
        );

        //using setTimeout to simply avoid Sanity api rate limit
        inProcessBarrels.forEach((bar, index) => {
            setTimeout(() => {
                //check if barrel number is format correctly. Ex: 15-1234
                //once the hyphen is removed, the id should be all numbers
                //going to run barrelNumber thru parseInt() and back toSting() below to make sure it's valid
                const idString = bar.barrelNumber
                    ? bar.barrelNumber.replace("-", "")
                    : "no barrel number";
                const idInt = parseInt(idString);

                const buyerSplit = bar.buyer ? bar.buyer.split(" - ") : null
                //handle buyer names with dashes by getting the last element, which is the ID
                //then either grab first array el, or join what's left to get the name again
                const buyerId = buyerSplit ? buyerSplit.pop() : "";
                const buyer = buyerSplit && buyerSplit.length > 1 ? buyerSplit.join(" - ") : buyerSplit[0];

                //compare barrel number strings to make sure field is formatted correctly
                if (idString === idInt.toString()) {
                    console.log("starting barrel # ", bar.barrelNumber);
                    const newBarrel = {
                        _id: bar.barrelNumber,
                        _type: "barrel",
                        buyer,
                        buyerId,
                        secondaryLabel: [bar.labelTop, bar.labelBottom],
                        whiskeyType: bar.whiskeyType || "",
                        barrelId: bar.barrelNumber,
                        teamMember: bar.teamMember || "",
                        physicalBarrel: bar.includeBarrel || "None",
                        proof: bar.proof ? roundDown(bar.proof).toString() : "",
                    };

                    //can't have null dates in Sanity, so check before adding to object
                    if (validDate(bar.dateChosen)) {
                        newBarrel.chosenDate = formatDate(bar.dateChosen);
                    }
                    if (validDate(bar.dateBottled)) {
                        newBarrel.bottleDate = formatDate(bar.dateBottled);
                    }
                    if (validDate(bar.datePOReceived)) {
                        newBarrel.poReceivedDate = formatDate(bar.datePOReceived);
                    }
                    if (validDate(bar.dateShipped)) {
                        newBarrel.shipDate = formatDate(bar.dateShipped);
                    }
                    if (bar.numCases) {
                        newBarrel.casesProduced = roundDown(bar.numCases);
                    }

                    //mutation
                    client
                        .createOrReplace(newBarrel)
                        .then((res) => {
                            console.log(
                                `Barrel was created or updated: document ID is ${res._id}`
                            );
                        })
                        .catch((e) => {
                            console.log("ERROR");
                            console.log(e);
                        });
                }
            }, 200 * index);
        });

        reply
            .code(200)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({ hello: "world" });
    };

    thing();
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, "0.0.0.0", function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
});



