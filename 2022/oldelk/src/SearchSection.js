import { Button, Center, Container, Flex, FormControl, FormLabel, Input, Spinner, VStack } from '@chakra-ui/react';

const SearchSection = ({ barrelId, loading, setBarrelId, handleSubmit, isInvalid, buyerId, setBuyerId }) => {

    const handleBarrelIdChange = (e) => {
        setBarrelId(e.target.value);
    }

    const handleBarrelIdKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleBuyerIdChange = (e) => {
        setBuyerId(e.target.value);
    }

    return (
        <Container maxW={'container.xl'} mb={8} mt={8} >
            <VStack spacing={6}>
                <Center>
                    <FormControl>
                        <FormLabel fontSize={'15px'} mr={0} fontWeight={800} marginBottom={5} textAlign={'center'}>
                            Please enter your Buyer ID and Single Barrel number:
                        </FormLabel>
                        <Flex justifyContent={'space-around'} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                            <Input
                                autoFocus={true}
                                isInvalid={isInvalid}
                                errorBorderColor='red.600'
                                value={buyerId}
                                onChange={handleBuyerIdChange}
                                flex={{ base: '0 0 100%', md: '0 0 280px' }}
                                placeholder='Buyer ID'
                                mr={{ base: 0, md: 2 }}
                                mb={{ base: 2, md: 0 }} />
                            <Input
                                isInvalid={isInvalid}
                                errorBorderColor='red.600'
                                value={barrelId}
                                onChange={handleBarrelIdChange}
                                onKeyDown={handleBarrelIdKeyDown}
                                flex={{ base: '0 0 100%', md: '0 0 280px' }}
                                placeholder='Barrel Number'
                                ml={{ base: 0, md: 2 }} />
                        </Flex>
                    </FormControl>
                </Center>
                <Center>
                    {loading ? (
                        <Spinner color={'brand'} size={'lg'} />
                    ) : (
                        <Button size={'md'} h={'45px'} pr={'60px'} pl={'60px'} onClick={handleSubmit}>Search</Button>
                    )}
                </Center>
            </VStack>
        </Container>
    )
}

export default SearchSection;
