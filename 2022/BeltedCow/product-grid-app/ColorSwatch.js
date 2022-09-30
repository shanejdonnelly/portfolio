import { AspectRatio, Box, Image, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { variantColorList } from '../variantColors'
import * as React from 'react'

const ColorSwatch = ({ variant, handleSetVariant, isActive }) => {
    const formatColorName = (name) => {
        //remove spaces
        const temp1 = name.split(' ').join('')
        const temp2 = temp1.split('/').join('')
        return temp2.toLowerCase()
    }

    const formattedColorName = variant.colorName ? formatColorName(variant.colorName) : 'white'

    const getBackground = () => {
        if (!variantColorList[formattedColorName]) {
            //console.log(variant.colorName)
        }
        const numColors = variantColorList[formattedColorName].hexCodes ? variantColorList[formattedColorName].hexCodes.length : 0
        if (numColors === 1) {
            return variantColorList[formattedColorName].hexCodes[0];
        }
        else if (numColors === 2) {
            return `linear-gradient(135deg, ${variantColorList[formattedColorName].hexCodes[0]} 0 50%, ${variantColorList[formattedColorName].hexCodes[1]} 50% 100%);`
        }
        else if (numColors === 3) {
            return `linear-gradient(to left, ${variantColorList[formattedColorName].hexCodes[0]} 0 33.3%, ${variantColorList[formattedColorName].hexCodes[1]} 33.3% 66.6%, ${variantColorList[formattedColorName].hexCodes[2]} 66.6% 100%);`
        }
        else {
            return variantColorList.natural.hexCodes[0]
        }
    }

    return (
        <Box
            title={variant.colorName}
            cursor='pointer'
            h='25px'
            flex='0 0 25px'
            borderRadius={'50%'}
            mr={2}
            mb={2}
            background={() => getBackground()}
            border='1px solid #ccc'
            outline={isActive ? '2px solid #b1b1b1' : '2px solid transparent'}
            outlineOffset='2px'
            onClick={() => handleSetVariant(variant)}>
        </Box>
    )
}
export default ColorSwatch;