import { Flex, Text, VStack, useBreakpoint } from '@chakra-ui/react';
import BevelBox from './BevelBox';
import TripleImage from './TripleImage';

const SecondaryLabel = ({ labelArray }) => {
    const breakpoint = useBreakpoint()
    return (
        <Flex flexDir={'column'} w={'100%'}>
            <BevelBox label={'Secondary Label'}>
                <VStack>
                    {labelArray.map((label, index) =>
                        <Text color={'white'} lineHeight={4} textAlign={'center'} fontWeight={700} fontSize={'lg'} as="h4" key={`label_${index}`}>{label}</Text>
                    )}
                </VStack>
                <Text
                    mt={'20px'}
                    mb={'-16px'}
                    color={'white'}
                    opacity={0.4}
                    lineHeight={'1.1'}
                    textAlign={'center'}
                    fontStyle={'italic'}
                >
                    For any questions regarding the secondary label, please contact your Old Elk representative.
                </Text>
            </BevelBox>

            {(breakpoint !== 'base' && breakpoint !== 'sm') && (
                <TripleImage />
            )}
        </Flex>
    )
}

export default SecondaryLabel;