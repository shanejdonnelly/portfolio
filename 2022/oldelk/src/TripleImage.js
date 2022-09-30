import { Flex, Center, Image } from '@chakra-ui/react';

const TripleImage = () => {
    return (
        <Flex justifyContent={'space-evenly'} mt={12} w={'100%'}>
            <Center marginX={4} maxW={'78px'}>
                <Image src='https://oldelk.netlify.app/icon-single-barrel.png' alt='Old Elk Single Barrel logo' width={'100%'} />
            </Center>

            <Center marginX={4} maxW={'78px'}>
                <Image src='https://oldelk.netlify.app/icon-logo-shadow.png' alt='Old Elk logo' width={'100%'} />
            </Center>

            <Center marginX={4} maxW={'78px'}>
                <Image src='https://oldelk.netlify.app/icon-fort-collins.png' alt='Old Elk, Fort Collins Colorado logo' width={'100%'} />
            </Center>
        </Flex>
    )
}

export default TripleImage;