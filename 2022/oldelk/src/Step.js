import { Box, Image, Flex, Text } from '@chakra-ui/react';

const Step = ({ stepNumber, last, label, stepCompleted, nextStepCompleted }) => {
    return (
        <Flex flexDir={'column'} flex={{ base: '0 0 100%', md: '0 0 25%' }} alignItems={'center'} mt={{ base: 8, md: 0 }}>
            <Flex flexDir={'column'} opacity={stepCompleted ? '1' : '0.3'} textAlign={'center'} w={'100%'} alignItems={'center'} mb={{ base: 2, md: 1 }}>
                <Text color={'brand'} variant={'label'} fontStyle={'italic'} fontWeight={'400'} lineHeight={'none'}>Step {stepNumber}</Text>
                <Text color={'brand'} fontWeight={800} textTransform={'uppercase'} minH={{ md: '50px', lg: '0' }}>{label}</Text>
            </Flex>
            <Flex
                flexDir={'column'}
                textAlign={'center'}
                w={'100%'}
                alignItems={'center'}
                _after={last ? null : {
                    md: {
                        opacity: nextStepCompleted ? '1' : '0.3',
                        content: `""`,
                        height: '2px',
                        backgroundColor: 'brand',
                        left: '50%',
                        order: '-1',
                        position: 'relative',
                        top: '50%',
                        width: '100%'
                    }
                }}
            >
                <Box position={'relative'} backgroundColor={'black'} outline={'8px solid var(--chakra-colors-black)'} height={'55px'} width={'55px'} padding={2} zIndex={1}>
                    <Box position={'absolute'} top={0} left={0} borderRadius={'50%'} borderColor={'brand'} borderStyle={'solid'} borderWidth={'2px'} height={'55px'} width={'55px'} opacity={stepCompleted ? '1' : '0.3'}></Box>
                    {stepCompleted && (
                        <Image src='https://oldelk.netlify.app/icon-logo-circle.png' alt='Step complete logo' />
                    )}
                </Box>
            </Flex>

        </Flex>
    )
}

export default Step;