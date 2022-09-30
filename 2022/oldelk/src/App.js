import { useState } from 'react';
import ReactGA from 'react-ga';
import {
  Center,
  ChakraProvider,
  Container,
  Flex,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import CenterLogo from './CenterLogo';
import BarrelDetails from './BarrelDetails';
import OtherBarrels from './OtherBarrels';
import SecondaryLabel from './SecondaryLabel';
import SearchSection from './SearchSection';
import StepSection from './StepSection';
import Triangle from './Triangle';
import Fonts from './Fonts';
import theme from './theme'

const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 's7d1n0k7',
  dataset: 'production',
  apiVersion: '2022-01-13',
  token: 'skzEZo2hgCrjrDv11fjjCJ6auii57Bgf17akPztnmQxcnpnIdCjgUM97YaWbXTJaKqCTsPHico1bZI1XzEDL1spOgBbPovigbnGxwDm8y2VknvhvMG8B99y2Ejy45wUMNIyPvu261veFxQZUhawqiLvYkc2t7qAzY7yOlTUWlPeDzMkg0KJq',
  useCdn: false,
})

function App() {
  //local state set up
  const [barrelId, setBarrelId] = useState('')
  const [barrelData, setBarrelData] = useState(null)
  const [buyerId, setBuyerId] = useState('')
  const [otherBarrelData, setOtherBarrelData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [firstRun, setFirstRun] = useState(true)

  //Google Analytics set up
  const trackingId = "UA-106784577-1";
  ReactGA.initialize(trackingId);

  const handleActiveBarrelChange = function (id, data) {
    //remove new active barrel from other barrels list
    const _otherBarrelData = otherBarrelData.filter(ob => ob.barrelId !== id)
    //add current barrel data to other barrels list
    _otherBarrelData.push(barrelData)

    setOtherBarrelData(_otherBarrelData)
    //need to add teamMembers and customFields just like in original query
    setBarrelData({ teamMembers: barrelData.teamMembers, customFields: barrelData.customFields, ...data })
    setBarrelId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    ReactGA.event({
      category: 'Barrel Tracker',
      action: 'Searched For Barrel',
      label: `Barrel ID: ${id}`
    });
  }

  const handleSubmit = function () {
    const _buyerId = buyerId.toUpperCase()
    const query = `*[_type == "barrel" && barrelId == $barrelId && buyerId == $buyerId]{
      ..., 
      "teamMembers": *[_type == "teamMember"],
      "customFields": *[_type == "customFields"]
    }`
    const params = { barrelId: barrelId, buyerId: _buyerId }

    setLoading(true)
    setBarrelData(null)

    client.fetch(query, params).then((barrels) => {
      if (barrels && barrels.length) {
        if (firstRun) {
          //set buyerId google analytics custom dimension
          ReactGA.set({ buyerId: _buyerId });
        }
        ReactGA.event({
          category: 'Barrel Tracker',
          action: 'Searched For Barrel',
          label: `Barrel ID: ${barrelId}`
        });

        ReactGA.event({
          category: 'Barrel Tracker',
          action: 'Searched For Barrel (Buyer Name)',
          label: `Buyer Name: ${barrels[0]?.buyer ? barrels[0].buyer : 'No buyer found'}`
        });

        //barrelId is set to be unique in Sanity
        setFirstRun(false)
        setLoading(false)
        setBarrelData(barrels[0])
        setOtherBarrelData(null)

        const query2 = `*[_type == "barrel" && buyerId == $buyerId]{
          ... 
        }`
        const params2 = { buyerId: barrels[0].buyerId }

        client.fetch(query2, params2).then((otherBarrels) => {
          if (otherBarrels && !!otherBarrels.length && otherBarrels.length > 1) {
            otherBarrels = otherBarrels.filter(ob => ob.barrelId !== barrelId)
            setOtherBarrelData(otherBarrels)
          }
        });
      }
      else {
        setFirstRun(false)
        setLoading(false)
      }
    })
  }

  const getCurrentStep = (barrel) => {
    const labels = barrel.customFields[0].stepLabels;
    const blurbs = [barrel.customFields[0].stepContents1, barrel.customFields[0].stepContents2, barrel.customFields[0].stepContents3, barrel.customFields[0].stepContents4]
    const dateBits = [barrel.chosenDate, barrel.bottleDate, barrel.poReceivedDate, barrel.shipDate]
    let currentLabel = labels[0]
    let currentBlurb = blurbs[0]

    dateBits.forEach((bit, index) => {
      //steps not completed will have an undefined date
      if (!!bit) {
        currentLabel = labels[index]
        currentBlurb = blurbs[index]
      }
    })
    return { label: currentLabel, blurb: currentBlurb };
  }
  return (
    <ChakraProvider theme={theme}>
      <SearchSection isInvalid={!firstRun && !barrelData && !loading} barrelId={barrelId} buyerId={buyerId} loading={loading} setBuyerId={setBuyerId} setBarrelId={setBarrelId} handleSubmit={handleSubmit} />

      {!firstRun && !loading && !barrelData && (
        <Container maxW={'container.md'} mt={2}>
          <Text color={'red.600'} textAlign={'center'}>Sorry, we can't find that barrel. Check your barrel number and try searching again.</Text>
        </Container>
      )}

      {barrelData && (
        <Flex flexDir={'column'} w={'100%'} bgColor={'black'} alignItems={'center'}>
          <Triangle color={'white'} size={'16px'} />
          <Container maxW={'container.xl'} pl={8} pr={8}>
            <Flex flexDir={'column'} mt={5} mb={12}>

              <CenterLogo imgAlt="Old Elk Single Barrel logo" imgSrc='https://oldelk.netlify.app/icon-single-barrel.png' width={110} />

              <Container maxW={'920px'}>
                <StepSection barrelData={barrelData} getCurrentStep={getCurrentStep} />

                <Center mt={14} mb={8}>
                  <Text variant={'label'} fontStyle={'italic'}>Your single barrel details:</Text>
                </Center>

                <SimpleGrid maxW={barrelData.secondaryLabel ? { base: '100%' } : { base: '100%', md: '50%' }} ml={barrelData.secondaryLabel ? { base: 0 } : { base: 0, md: '25%' }} columns={barrelData.secondaryLabel ? { base: 1, md: 2 } : { base: 1 }} spacing={{ base: 14, md: 12 }} width={'100%'}>
                  {barrelData.secondaryLabel && (
                    <SecondaryLabel labelArray={barrelData.secondaryLabel} />
                  )}
                  <BarrelDetails barrelData={barrelData} label={'Barrel Details'} />
                </SimpleGrid>

                {otherBarrelData && (
                  <OtherBarrels otherBarrelData={otherBarrelData} handleActiveBarrelChange={handleActiveBarrelChange} />
                )}
              </Container>
            </Flex>
          </Container>
        </Flex>
      )}

    </ChakraProvider>
  );
}

export default App;
