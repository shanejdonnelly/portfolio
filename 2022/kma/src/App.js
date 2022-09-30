import React from 'react';
import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import { Router, globalHistory } from "@reach/router";
import { QueryParamProvider } from 'use-query-params';
import NotFound from './NotFound'
import Home from './Home'
import Employer from './Employer'
import Job from './Job'
import Clients from './Clients'
import styles from './app.module.css'

import {
  Center,
  ChakraProvider,
  Container,
  Spinner,
  StylesProvider
} from '@chakra-ui/react';
import theme from './theme'


function App() {
  const [loading, setLoading] = useState(true);
  //only fetch on initial mount
  useEffect(() => {
    fetch('https://api.lever.co/v0/postings/kmaconsultingllc?mode=json')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        localStorage.setItem('jobsData', JSON.stringify(data));
      });
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>KMA Job Board</title>
      </Helmet>

      <Container maxW={'container.lg'} paddingLeft={0} paddingRight={0} className={styles.wrap}>
        {loading ? (
          <Center marginTop={16}>
            <Spinner size={'xl'} />
          </Center>
        ) : (
          <Router basepath='/jobs'>
            <QueryParamProvider {...{ path: '/' }} reachHistory={globalHistory}>
              <Home path="/" />
              <Clients path="/clients" />
              <Job path="/job/:jobId" />
              <Employer path="/e/:employerName" />
              <NotFound default />
            </QueryParamProvider>
          </Router>
        )}
      </Container>
    </ChakraProvider>
  )
}

export default App;