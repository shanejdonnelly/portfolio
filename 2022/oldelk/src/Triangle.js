import { Center } from '@chakra-ui/react';

const Triangle = ({ color, size }) => {
    return (
        <Center
            borderStyle={'solid'}
            borderColor={`${color} transparent transparent transparent`}
            borderWidth={`${size} ${size} 0 ${size} `}
            height={0}
            width={0}
        />
    )
}

export default Triangle;