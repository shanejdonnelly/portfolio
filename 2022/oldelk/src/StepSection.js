import { Box, Flex, Text } from '@chakra-ui/react';
import SanityBlockContent from '@sanity/block-content-to-react';
import Stepper from './Stepper'
import styles from './stepsection.module.css'

const TopBarrelSection = ({ barrelData, getCurrentStep }) => {
    return (
        <Flex flexDir={'column'} w={'100%'} alignItems={'center'} justify={'center'} mt={6}>
            <Text variant={'label'} fontStyle={'italic'}>Barrel ID:</Text>
            <Text color={'brand'} fontWeight={800}>{barrelData.barrelId}</Text>
            <Text variant={'label'} fontStyle={'italic'} mt={7}>Your single barrel is currently:</Text>
            <Text fontSize={'52px'} lineHeight={'52px'} textTransform={'uppercase'} color={'brand'} fontWeight={800} mt={1} textAlign={'center'}>{getCurrentStep(barrelData).label}</Text>
            <Box className={styles.linkWrap} maxW={'600px'} textAlign={'center'} color={'white'} fontWeight={800} mt={4} mb={10}>
                <SanityBlockContent blocks={getCurrentStep(barrelData).blurb} />
            </Box>

            <Stepper
                stepLabels={barrelData.customFields[0].stepLabels}
                chosenDate={barrelData.chosenDate}
                bottleDate={barrelData.bottleDate}
                poReceivedDate={barrelData.poReceivedDate}
                shipDate={barrelData.shipDate}
            />

        </Flex>
    )
}

export default TopBarrelSection;