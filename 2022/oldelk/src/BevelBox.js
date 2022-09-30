import { Box, Heading, StylesProvider } from '@chakra-ui/react';
import styles from './bevelbox.module.css'

const BevelBox = ({ children, label }) => {
    return (
        <Box position={'relative'} p={7} pt={'26px'} width={'100%'} className={styles.bevelBox}>
            <Heading variant={'bevelBox'}>{label}</Heading>
            {children}
        </Box>
    )
}

export default BevelBox;