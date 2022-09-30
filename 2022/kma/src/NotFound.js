import { Link as ReachLink } from '@reach/router'
import { Center, Link, VStack, Heading, Text } from '@chakra-ui/react';


const NotFound = () => {
    //when app is loaded in WP, this is necessary
    window.scrollTo(0, 0);

    return (
        <>
            <VStack spacing={2} alignContent={'center'} >
                <Heading as="h2" size={'lg'}>Hmm, we can't find that.</Heading>
                <Text>Try clicking one of the links below.</Text>
            </VStack>
            <Center marginTop={10}>
                <Link as={ReachLink} to="/jobs">See All KMA Jobs</Link>
                <Link as={ReachLink} to="/jobs/clients" marginLeft={8}>See All KMA Clients</Link>
            </Center>
        </>
    )
}

export default NotFound;