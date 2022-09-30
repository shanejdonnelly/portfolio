import React from 'react';
import { Link as ReachLink } from "@reach/router";
import { Heading, Box, LinkOverlay, LinkBox, Flex } from '@chakra-ui/react';
import { LocationIcon, PersonIcon, BriefcaseIcon } from './Icons';

const JobBoardCard = ({ data }) => {
    return (
        <LinkBox w={'100%'} m={2} >
            <LinkOverlay as={ReachLink} to={`/jobs/job/${data.id}`} w={'100%'}>
                <Box boxShadow={'lg'} bgColor={'white'} p={4} border={"1px"} borderRadius={'lg'} w={"100%"}>
                    <Heading fontFamily={'body'} as='h3' size='md'>
                        {data.text}
                    </Heading>
                    <Flex flexDir={{ base: 'column', md: 'row' }}>
                        <Flex alignItems={'center'} mr={{ base: 0, md: 6 }}>
                            <PersonIcon boxSize={'14px'} color={'gray.400'} mr={2} />
                            {data.categories.department}
                        </Flex>
                        <Flex alignItems={'center'} mr={{ base: 0, md: 6 }}>
                            <LocationIcon boxSize={'14px'} color={'gray.400'} mr={2} />
                            {data.categories.location}
                        </Flex>
                        <Flex alignItems={'center'} mr={{ base: 0, md: 6 }}>
                            <BriefcaseIcon boxSize={'14px'} color={'gray.400'} mr={2} />
                            {data.categories.team}
                        </Flex>
                    </Flex>
                </Box>
            </LinkOverlay>
        </LinkBox >
    )
}

export default JobBoardCard;