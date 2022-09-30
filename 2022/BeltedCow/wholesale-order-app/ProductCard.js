import { AspectRatio, Box, Image, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import { formatDollars } from './helpers'
import * as React from 'react'

const ProductCard = ({ product }) => {
    const { name, image, price, url } = product

    return image ? (
        <LinkBox as={'section'}>
            <Stack spacing={4}>
                <Box position="relative">
                    <AspectRatio ratio={4 / 3}>
                        <img src={image} alt={name} style={{objectFit: 'contain'}} />
                    </AspectRatio>
                </Box>
                <Stack>
                    <Stack spacing="1">
                        <LinkOverlay href={url} fontWeight="medium" color={'gray.700'} fontSize='sm'>
                            {name}
                        </LinkOverlay>
                        <Text fontSize={'md'}>{formatDollars(price)}</Text>
                    </Stack>
                </Stack>
            </Stack>
        </LinkBox>
    ) : null
}
export default ProductCard;