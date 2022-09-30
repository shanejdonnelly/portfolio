import { Flex } from '@chakra-ui/react';
import Step from './Step'
import styles from './bevelbox.module.css'

const Stepper = ({ stepLabels, chosenDate, bottleDate, poReceivedDate, shipDate }) => {
    const dateBits = [chosenDate, bottleDate, poReceivedDate, shipDate]
    return (
        <Flex
            className={styles.bevelBox}
            flexWrap={'wrap'}
            maxW={'container.xl'}
            p={7}
            spacing={8}
            width={'100%'}
        >
            {stepLabels.map((label, index) =>
                <Step
                    key={`step_${index}`}
                    last={stepLabels.length === (index + 1)}
                    stepNumber={index + 1}
                    nextStepCompleted={!!dateBits[index + 1]}
                    stepCompleted={!!dateBits[index] || !!dateBits[index + 1]}
                    label={label}
                />
            )}
        </Flex>
    )
}

export default Stepper;