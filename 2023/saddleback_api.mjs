import Redis from "ioredis"
const client = new Redis({
    port: "41203",
    connectTimeout: 3000
});

/*
    Helper methods
*/

//
//getTimeDiff()
//
const getTimeDiff = function (redisTimestamp) {
    const now = new Date();
    const redisTime = new Date(redisTimestamp);

    //get the diff in ms, divide to get seconds
    const diff = Math.abs(now.getTime() - redisTime.getTime()) / 1000;

    //invalidate the cached data every minute
    return diff > 60
}

//
//camelCase()
//
const camelCase = function (str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

//
// simplifyUnits()
//
const simplifyUnits = function (o) {
    return {
        value: o?.countryValue || null,
        unit: o?.countryUnit || null
    }
}


//
//getToken()
//
const getToken = async function () {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    //get token for api calls
    const res = await fetch("https://mountain.live/token", requestOptions)
    const tokenData = await res.json();

    let token = null;
    if (tokenData && tokenData.access_token) {
        token = tokenData.access_token;
    }

    return token;
}

//
//formatSnow()
//
const formatSnow = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        const snow = data.snowZones[0];
        formattedData = {
            id: snow.id,
            altitude: simplifyUnits(snow.altitude),
            altitudeLevel: snow.altitudeLevel,
            avalancheRisk: snow.avalancheRisk,
            snowQuality: snow.snowQuality,
            snowTotalDepth: simplifyUnits(snow.snowTotalDepth),
            overnight: simplifyUnits(snow.snowTotalDepth),
            freshSnowFallDepth12H: simplifyUnits(snow.freshSnowFallDepth12H),
            freshSnowFallDepth24H: simplifyUnits(snow.freshSnowFallDepth24H),
            freshSnowFallDepth48H: simplifyUnits(snow.freshSnowFallDepth48H),
            freshSnowFallDepth72H: simplifyUnits(snow.freshSnowFallDepth72H),
            freshSnowFallDepth7D: simplifyUnits(snow.freshSnowFallDepth7D),
            snowFallDepthCompleteSeason: snow.snowFallDepthCompleteSeason,
            lastSnowFallDepth: simplifyUnits(snow.lastSnowFallDepth),
            lastModified: snow.lastModified,
            snowSynthetic: data.snowSynthetic,
            snowDetailed: data.snowDetailed,
            windDirections: data.windDirections
        }
    }
    return formattedData
}

//
//formatWeather()
//
const formatWeather = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {

        const rangeleyTownWeather = data.weatherZones.find(zone => zone.id === "888")
        const summitWeather = data.weatherZones.find(zone => zone.id === "889")
        const baseWeather = data.weatherZones.find(zone => zone.id === "890")
        const rangeleyTopWeather = data.weatherZones.find(zone => zone.id === "891")

        formattedData = {
            rangeleyTown: {
                altitude: simplifyUnits(rangeleyTownWeather.altitude),
                ...rangeleyTownWeather
            },
            summit: {
                altitude: simplifyUnits(summitWeather.altitude),
                ...summitWeather
            },
            base: {
                altitude: simplifyUnits(baseWeather.altitude),
                ...baseWeather
            },
            rangeleyTop: {
                altitude: simplifyUnits(rangeleyTopWeather.altitude),
                ...rangeleyTopWeather
            },
            temperatureInversion: data.temperatureInversion,
            weatherSkyInfos: data.weatherSkyInfos,
            weatherPreviews: data.weatherPreviews
        }
    }
    return formattedData
}

//
//formatForecast()
//
const formatForecast = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        const summitWeather = data.weatherZones.find(zone => zone.id === "889")
        const baseWeather = data.weatherZones.find(zone => zone.id === "890")
        formattedData = {
            summit: {
                altitude: simplifyUnits(summitWeather.altitude),
                ...summitWeather
            },
            base: {
                altitude: simplifyUnits(baseWeather.altitude),
                ...baseWeather
            },
            temperatureInversion: data.temperatureInversion,
            weatherSkyInfos: data.weatherSkyInfos,
            weatherPreviews: data.weatherPreviews
        }
    }
    return formattedData
}

//
// LIFTS FUNCTIONS
//
const simplifyLiftData = function (lift) {
    return {
        id: lift?.id || null,
        name: lift?.name || null,
        description: lift?.description || null,
        type: lift?.type || null,
        openingStatus: lift?.openingStatus || null,
        openingStatusCompl: lift?.openingStatusCompl || null,
        operatingHours: {
            beginTime: lift?.openingTimesTh && !!lift.openingTimesTh.length && lift.openingTimesTh[0]?.beginTime ? lift.openingTimesTh[0].beginTime : null,
            endTime: lift?.openingTimesTh && !!lift.openingTimesTh.length && lift.openingTimesTh[0]?.endTime ? lift.openingTimesTh[0].endTime : null,
        },
        lastModified: lift?.lastModified || null,
        operating: lift?.operating || null,
        liftType: lift?.liftType || null,
        departureAltitude: lift?.departureAltitude ? simplifyUnits(lift.departureAltitude) : null,
        arrivalAltitude: lift?.arrivalAltitude ? simplifyUnits(lift.arrivalAltitude) : null,
        uphillCapacity: lift?.uphillCapacity ? simplifyUnits(lift.uphillCapacity) : null,
        length: lift?.length ? simplifyUnits(lift.length) : null,
        duration: lift?.duration ? simplifyUnits(lift.duration) : null,
        capacity: lift?.capacity ? simplifyUnits(lift.capacity) : null,
        speed: lift?.speed ? simplifyUnits(lift.speed) : null,
        message: lift?.messagePoi && lift?.messagePoi?.data && !!lift.messagePoi.data.length ? lift.messagePoi.data[0].data : ''
    }
}

const formatLifts = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        formattedData = data.sectors
    }
    const lifts = {}
    formattedData.forEach(d => {
        //each of these is an area of the mountain
        if (d && d.lifts && !!d.lifts.length) {
            //might be more than one lift per area
            d.lifts.forEach(lift => {
                const liftName = camelCase(lift.name);
                lifts[liftName] = simplifyLiftData(lift)
            })
        }
    })

    return lifts
}
//END LIFTS FUNCTIONS

//
//formatLiftStatus()
//
const formatLiftStatus = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        formattedData = data.sectors
    }

    let totalLifts = 0;
    let openLifts = 0;
    formattedData.forEach(d => {
        //each of these is an area of the mountain
        if (d && d.lifts && !!d.lifts.length) {
            //might be more than one lift per area
            d.lifts.forEach(lift => {
                totalLifts = totalLifts + 1;
                if (lift.openingStatus && lift.openingStatus === 'OPEN') {
                    openLifts = openLifts + 1;
                }
            })
        }
    })

    return {
        totalLifts,
        openLifts
    }
}

//
// TRAIL FUNCTIONS
//
const simplifyTrailData = function (trail) {
    return {
        id: trail?.id || null,
        name: trail?.name || '',
        type: trail?.type || '',
        openingStatus: trail?.openingStatus || null,
        openingStatusCompl: trail?.openingStatusCompl || null,
        operatingHours: {
            beginTime: trail?.openingTimesTh && !!trail.openingTimesTh.length && trail.openingTimesTh[0]?.beginTime ? trail.openingTimesTh[0].beginTime : null,
            endTime: trail?.openingTimesTh && !!trail.openingTimesTh.length && trail.openingTimesTh[0]?.endTime ? trail.openingTimesTh[0].endTime : null,
        },
        lastModified: trail?.lastModified || null,
        operating: trail?.operating || false,
        trailType: trail?.trailType || null,
        trailLevel: trail?.trailLevel || null,
        groomingStatus: trail?.groomingStatus || null,
        snowQuality: trail?.snowQuality || null,
        arrivalAltitude: trail?.arrivalAltitude ? simplifyUnits(trail.arrivalAltitude) : null,
        averageSlope: trail?.averageSlope ? simplifyUnits(trail.averageSlope) : null,
        averageSpeed: trail?.averageSpeed ? simplifyUnits(trail.averageSpeed) : null,
        averageWidth: trail?.averageWidth ? simplifyUnits(trail.averageWidth) : null,
        length: trail?.length ? simplifyUnits(trail.length) : null,
        surface: trail?.surface ? simplifyUnits(trail.surface) : null,
        snowMaking: trail?.snowMaking || false,
        moguls: trail?.moguls || false,
        nightSkiing: trail?.nightSkiing || false,
        countInTotals: trail?.countInTotals || false,
        message: trail?.messagePoi && trail?.messagePoi?.data && !!trail.messagePoi.data.length ? trail.messagePoi.data[0].data : ''
    }
}
const formatTrailsByName = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        formattedData = data.sectors
    }
    const trails = {}
    formattedData.forEach(d => {
        //each of these is an area of the mountain
        if (d && d.trails && !!d.trails.length) {
            //loop over trails in the area
            d.trails.forEach(trail => {
                const trailName = camelCase(trail.name);
                trails[trailName] = simplifyTrailData(trail)

            })
        }
    })

    return trails
}
const formatTrailsByDifficulty = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        formattedData = data.sectors
    }
    const trails = {
        greenCircle: [],
        blueSquare: [],
        blackDiamond: [],
        doubleBlackDiamond: [],
        terrainParks: [],
        uphill: []
    }
    formattedData.forEach(d => {
        //each of these is an area of the mountain
        if (d && d.trails && !!d.trails.length) {
            //loop over trails in the area
            d.trails.forEach(trail => {
                if (trail.trailType === 'SNOWPARK') {
                    trails.terrainParks.push(simplifyTrailData(trail))
                }
                else if (trail.trailType === 'SKI_TOURING') {
                    trails.uphill.push(simplifyTrailData(trail))
                }
                else if ((trail.trailType === 'DOWNHILL_SKIING' || trail.trailType === 'GLADES') && trail.operating) {
                    if (trail.trailLevel === 'GREEN_CIRCLE') {
                        trails.greenCircle.push(simplifyTrailData(trail))
                    }
                    else if (trail.trailLevel === 'BLUE_SQUARE') {
                        trails.blueSquare.push(simplifyTrailData(trail))
                    }
                    else if (trail.trailLevel === 'BLACK_DIAMOND') {
                        trails.blackDiamond.push(simplifyTrailData(trail))
                    }
                    else if (trail.trailLevel === 'DOUBLE_BLACK_DIAMOND') {
                        trails.doubleBlackDiamond.push(simplifyTrailData(trail))
                    }
                }
            })
        }
    })

    return trails
}

//END TRAIL FUNCTIONS

//
//formatTrailStatus()
//
const formatTrailStatus = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let formattedData = null
    if (data) {
        formattedData = data.sectors
    }


    let totalTrails = 0;
    let openTrails = 0;
    let groomedTrails = 0;
    let totalParks = 0;
    let openParks = 0;
    let openUphill = 0;
    formattedData.forEach(d => {
        //each of these is an area of the mountain
        if (d && d.trails && !!d.trails.length) {
            //loop over trails in the area
            d.trails.forEach(trail => {
                //numTrails & numParks
                if (trail.trailType && trail.trailType === 'SNOWPARK') {
                    totalParks = totalParks + 1;
                    if (trail.openingStatus && trail.openingStatus === 'OPEN') {
                        openParks = openParks + 1
                    }
                }
                else if (trail.trailType === 'SKI_TOURING') {
                    if (trail.openingStatus && trail.openingStatus === 'OPEN') {
                        openUphill = openUphill + 1
                        //also add to total trail count
                        totalTrails = totalTrails + 1
                        openTrails = openTrails + 1
                    }
                }
                //avoid trails that shouldn't be counted
                else if (trail.countInTotals) {
                    totalTrails = totalTrails + 1;
                    if (trail.openingStatus && trail.openingStatus === 'OPEN') {
                        openTrails = openTrails + 1
                    }
                }
                //all together parks and trails for groomed status
                if (trail.groomingStatus && trail.groomingStatus === 'GROOMED') {
                    groomedTrails = groomedTrails + 1
                }
                if (trail.groomingStatus && trail.groomingStatus === 'MORNING_GROOMED') {
                    groomedTrails = groomedTrails + 1
                }
            })
        }
    })


    return {
        totalTrails,
        openTrails,
        groomedTrails,
        totalParks,
        openParks,
        openUphill
    }

}

//
//formatWebcams()
//
const formatWebcams = function (d) {

    //const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    const webcams = {}


    d.resorts.forEach(r => {
        r.webcams.forEach((webcam, index) => {
            const name = webcam?.name?.data && !!webcam.name.data.length ? webcam.name.data[0].data : `webcam_${index}`
            webcams[camelCase(name)] = {
                id: webcam?.id || null,
                name,
                altitude: simplifyUnits(webcam.altitude),
                latitude: webcam?.latitude?.value || null,
                longitude: webcam?.longitude?.value || null,
                description: webcam?.description || null,
                type: webcam?.type || null,
                urls: webcam?.urls || null,
                lastModified: webcam?.lastModified || null,
                main: webcam?.main || false,
                enabledOnDevice: webcam?.enabledOnDevice || false,
                order: webcam?.order || null
            }
        })
    })

    return webcams

}

//
//formatMountainReport
//
const formatMountainReport = function (d) {
    //fugly, PITA, terrible, no good error checking
    let report = ''
    if (d.resorts && !!d.resorts.length) {
        const x = d.resorts[0]
        if (x.resortInfos && !!x.resortInfos.length) {
            const y = x.resortInfos[0]
            if (y.data && !!y.data.length) {
                const z = y.data[0]
                if (z.data) {
                    report = z.data
                }
            }
        }
    }
    return report
}

//
//formatOther()
//
const formatOther = function (d) {
    const data = d && d.resorts && !!d.resorts.length ? d.resorts[0] : null
    let otherData = {}
    let otherDataArray = []
    data.sectors.forEach(s => {
        if (s.others) {
            otherDataArray = [...otherDataArray, ...s.others]
        }
    })
    if (otherDataArray.length) {
        otherDataArray.forEach(o => {
            if (o.operating) {
                otherData[camelCase(o.name)] = {
                    id: o.id,
                    name: o?.name || '',
                    type: o?.otherType || '',
                    openingStatus: o?.openingStatus || null,
                    operatingHours: {
                        beginTime: o?.openingTimesTh && !!o.openingTimesTh.length && o.openingTimesTh[0]?.beginTime ? o.openingTimesTh[0].beginTime : null,
                        endTime: o?.openingTimesTh && !!o.openingTimesTh.length && o.openingTimesTh[0]?.endTime ? o.openingTimesTh[0].endTime : null,
                    },
                    lastModified: o?.lastModified || null,
                    message: o?.messagePoi && o?.messagePoi?.data && !!o.messagePoi.data.length ? o.messagePoi.data[0].data : ''
                }
            }
        })
    }
    return otherData
}

//
//formatRawData()
//
const formatRawData = function (d) {
    const poi = d && d[0] ? d[0] : { content: null }
    const snow = d && d[1] ? d[1] : { content: null }
    const weather = d && d[2] ? d[2] : { content: null }
    const webcams = d && d[3] ? d[3] : { content: null }
    const mountainReport = d && d[4] ? d[4] : { content: null }

    return {
        respTimestamp: poi.respTimestamp,
        lastSnowfallDate: '',
        snow: formatSnow(snow.content),
        weather: formatWeather(weather.content),
        forecast: formatForecast(weather.content),
        liftStatus: formatLiftStatus(poi.content),
        trailStatus: formatTrailStatus(poi.content),
        lifts: formatLifts(poi.content),
        trailsByName: formatTrailsByName(poi.content),
        trailsSorted: formatTrailsByDifficulty(poi.content),
        other: formatOther(poi.content),
        webcams: formatWebcams(webcams.content),
        mountainReport: formatMountainReport(mountainReport.content)
    }
}
/*
    END Helper methods
*/

let redisData = null

export const handler = async () => {
    try {
        //get data from Redis store
        const allData = await client.get('data');
        redisData = allData ? JSON.parse(allData) : null

        //default to getting fresh data from api
        let redisDataStale = true;
        if (redisData) {
            redisDataStale = getTimeDiff(redisData.respTimestamp)
        }

        //use data from Redis if fresh
        if (redisData && !redisDataStale) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    data: redisData
                })
            }
        }
        //hit mountain.live servers for new data
        else {
            const token = await getToken();

            let data = null
            if (token) {
                //START make calls now

                var myHeaders2 = new Headers();
                myHeaders2.append("Authorization", `Bearer ${token}`);

                var requestOptions2 = {
                    method: 'GET',
                    headers: myHeaders2,
                    redirect: 'follow'
                };

                //fetch in parallel
                const responses = await Promise.all([
                    fetch("https://api.mountain.live/mountain_secured/poi/2.0?country=en_US&resort", requestOptions2),
                    fetch("https://api.mountain.live/mountain_secured/snow/1.0?country=en_US&resort", requestOptions2),
                    fetch("https://api.mountain.live/mountain_secured/weather/2.0?country=en_US&resort", requestOptions2),
                    fetch("https://api.mountain.live/mountain_secured/resort-webcam/1.0?country=en_US&resort", requestOptions2),
                    fetch("https://api.mountain.live/mountain_secured/resort-opening/1.0?country=en_US&resort", requestOptions2),
                ])

                const rawData = await Promise.all(responses.map(r => r.json()))

                data = rawData ? formatRawData(rawData) : null;

                //send data to upstash Redis store
                await client.set('data', JSON.stringify(data));

                // END other calls
            }

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    data
                })
            }

        }
    }
    catch (err) {
        console.log('error', err)
        console.log('returning cached data')
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                data: redisData
            })
        }

    }
}