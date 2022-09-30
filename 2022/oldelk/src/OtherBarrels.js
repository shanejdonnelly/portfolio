import * as React from 'react'
import { Box, Button, Center, Flex, Grid, GridItem, Text, VStack, useBreakpoint } from '@chakra-ui/react';
import BevelBox from './BevelBox';
import styles from './bevelbutton.module.css'

const OtherBarrels = ({ otherBarrelData, handleActiveBarrelChange }) => {
    return (
        <Flex w={'100%'} flexDir='column'>
            <Center mt={14} mb={4}>
                <Text variant={'label'} fontStyle={'italic'}>Your other single barrels:</Text>
            </Center>

            <BevelBox>
                {otherBarrelData.map((bd, index) => (
                    <Box
                        key={`otherBarrel_${index}`}
                        float={'left'}
                        w={{ base: '100%', md: otherBarrelData.length > 1 ? '50%' : '100%', lg: otherBarrelData.length > 2 ? '33.3%' : otherBarrelData.length > 1 ? '50%' : '100%' }}
                        borderColor='rgba(163,142,77,0.25)'
                        borderRightWidth={index + 1 === otherBarrelData.length ? 0 : { base: 0, md: index % 2 === 0 ? '1px' : '0', lg: (index + 1) % 3 === 0 ? '0' : '1px' }}
                        borderBottomWidth={index + 1 === otherBarrelData.length ? 0 : { base: '1px', md: 0 }}
                        borderStyle='solid'
                        mb={{ base: otherBarrelData.length > 1 ? 4 : 0, md: otherBarrelData.length > 2 ? 8 : 0 }}
                        pb={{ base: otherBarrelData.length > 1 && (otherBarrelData.length !== index + 1) ? 4 : 0, md: 0 }}
                    >
                        <Flex
                            flexDir='column'
                            w={'200px'}
                            mx='auto'
                        >
                            <Text variant="label" textAlign={'center'} mb={1}>
                                Barrel Number:
                            </Text>
                            <Button
                                className={styles.bevelButton}
                                onClick={() => handleActiveBarrelChange(bd.barrelId, bd)}
                                variant='solidBevel'
                                mb={1}>
                                {bd.barrelId}
                            </Button>
                            <Text variant="label" textAlign={'center'}>
                                Whiskey Type:
                            </Text>
                            <Text variant="label" textAlign={'center'} fontWeight='700'>
                                {bd.whiskeyType}
                            </Text>
                        </Flex>

                    </Box>
                ))}
            </BevelBox>
        </Flex>
    )
}

export default OtherBarrels;