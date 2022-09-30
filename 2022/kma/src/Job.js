import { useEffect, useState } from 'react';
import { Link as ReachLink, navigate } from '@reach/router'
import { Helmet } from "react-helmet";
import { Box, Button, Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { LocationIcon, PersonIcon, BriefcaseIcon } from './Icons';

const Job = ({ jobId }) => {
    const [jobData, setJobData] = useState({})

    useEffect(() => {
        //when app is loaded in WP, this is necessary
        window.scrollTo(0, 0);

        const data = JSON.parse(localStorage.getItem("jobsData"));
        const jobData = data.find(j => j.id === jobId)
        if (!jobData) {
            navigate(`/jobs/notfound`)
        }
        else {
            setJobData(jobData);
        }
    }, [])

    const cleanEmployerName = jobData?.categories?.department.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const dateAdded = jobData.createdAt ? new Date(jobData.createdAt) : new Date();

    return (
        <>
            <Helmet>
                <title>{`${jobData?.text} - ${jobData?.categories?.department}`}</title>
            </Helmet>
            <Box p={4}>
                <Button fontSize={'sm'} onClick={() => window.history.back()} variant="link" leftIcon={<ArrowBackIcon w={5} h={5} />} marginBottom={6} >
                    Back
                </Button>
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    borderBottomWidth='1px'
                    borderStyle={'solid'}
                    borderBottomColor={'gray.300'}
                    mb={8}
                >
                    <Box>
                        <Heading as='h2' size={'lg'} maxW={'700px'}>{jobData?.text}</Heading>

                        <Flex flexDir={{ base: 'column', lg: 'row' }} mb={4}>
                            <Flex alignItems={'center'} mr={{ base: 0, md: 6 }}>
                                <PersonIcon boxSize={'14px'} color={'gray.400'} mr={2} />
                                <Text fontWeight={500} fontSize='16px'>{jobData?.categories?.department}</Text>
                            </Flex>
                            <Flex alignItems={'center'} mr={{ base: 0, md: 6 }}>
                                <LocationIcon boxSize={'14px'} color={'gray.400'} mr={2} />
                                <Text fontWeight={500} fontSize='16px'>{jobData?.categories?.location}</Text>
                            </Flex>
                            <Flex alignItems={'center'} mr={{ base: 0, md: 6 }}>
                                <BriefcaseIcon boxSize={'14px'} color={'gray.400'} mr={2} />
                                <Text fontWeight={500} fontSize='16px'>{jobData?.categories?.team}</Text>
                            </Flex>
                        </Flex>

                    </Box>
                    <Button marginBottom={8} marginTop={0} as="a" href={jobData?.applyUrl} target={'_blank'} variant='darkBlue'>Apply Now</Button>
                </Flex>
                <p dangerouslySetInnerHTML={{ __html: jobData?.description }} />
            </Box>

            {jobData?.lists && !!jobData.lists.length && (
                <Box p={4}>
                    {jobData?.lists.map((list, index) => (
                        <div key={`list_${index}`}>
                            <Heading as='h3' size={'md'}>{list.text}</Heading>
                            <ul dangerouslySetInnerHTML={{ __html: list.content }} />
                        </div>
                    ))}
                </Box>
            )}

            <Box p={4} dangerouslySetInnerHTML={{ __html: jobData.additional }} />

            <Center p={4}>
                <Button as="a" href={jobData?.applyUrl} variant={'darkBlue'} target={'_blank'}>Apply Now</Button>
            </Center>

            <Box p={4}>
                <Text fontSize={'sm'}>Posted: {dateAdded.toDateString()}</Text>
            </Box>

            <Flex flexWrap={'wrap'} marginLeft={4} marginRight={4} marginBottom={8} marginTop={8}>
                <Link onClick={() => navigate(`/jobs/e/${cleanEmployerName}`)} marginRight={8}>See All {jobData?.categories?.department} Jobs</Link>
                <Link as={ReachLink} to="/jobs">See All Jobs</Link>
            </Flex>

        </>
    )
}

export default Job;