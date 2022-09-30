import React from 'react';
import { Spacer, Box, Image, Heading, Text, Flex, TableContainer, Table, Tr, Th, Td, Thead, Tbody, Tfoot, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast } from '@chakra-ui/react';
import { formatDollars, getVariantLineItemQuantity } from './helpers'

const VariantRow = ({ v, lineItems, handleQuantityChange, productSku, tracksVariantInventory }) => {
    //manage this in state to allow showing toast when input value was automatically adjusted to match qty available
    const [rangeOverflow, setRangeOverflow] = React.useState(false)

    const toast = useToast();

    const handleOnInvalid = (message) => {
        if (message === 'rangeOverflow') {
            setRangeOverflow(true)
        }
    }
    const handleOnBlur = () => {
        if (rangeOverflow) {
            setRangeOverflow(false)
            toast({
                title: "We don't have that many!",
                description: 'We updated the quantity to what we have in stock',
                status: 'warning',
                duration: 4000,
                isClosable: true,
            })
        }
    }
    const handleChange = (value, cv, colorName) => {
        setRangeOverflow(false)
        //check that value is greater than 0 -- avoids NaN appearing in Input
        value ? handleQuantityChange(cv.id, value, colorName) : handleQuantityChange(cv.id, 0, colorName)
    }

    const getSkuSize = (cv) => {
        const splitSku = cv.sku ? cv.sku.split('-') : []
        return splitSku.length > 3 ? splitSku[3] : cv.sku
    }

    const sizeLabels = v.colorVariants.map(cv => {
        if (cv.option_values && !!cv.option_values.length) {
            const sizeOption = cv.option_values.find(v => v.option_display_name === 'Size')
            if(sizeOption){
                return sizeOption.label
            }
            else{
                return getSkuSize(cv)
            }
        }
        else {
            return getSkuSize(cv)
        }
    })

    const showSizeCol = !!sizeLabels.length && sizeLabels[0]

    const constrainQuantity = (qty) => {
        return qty && qty < 50 ? qty : '50+'
    }

    return (
        <Flex flexWrap="wrap" mb={{ base: 4, md: 8 }} mt={{ base: 4, md: 8 }} maxW={'960px'} ml='auto' mr='auto'>
            <Flex flex={{ base: '0 0 100%', lg: '0 0 25%' }} alignItems={'center'} flexDir={{ base: 'row', lg: 'column' }} justifyContent='center' >
                {v.colorVariants && !!v.colorVariants.length && v.colorVariants[0].image_url && (
                    <Image src={v.colorVariants[0].image_url} alt={`${v.colorName} ${v.colorVariants[0].sku}`} maxW={'240px'} pr={8} pl={8} />
                )}
                <Box pl={4} pr={4}>
                    <Heading textTransform={'none'} textAlign={'center'} as='h5' size='xs'>{v.colorName}</Heading>
                    <Text textAlign={'center'} fontSize='xs'>SKU: {v && !!v.colorVariants.length && v.colorVariants[0].sku ? v.colorVariants[0].sku : ''}</Text>
                </Box>
            </Flex>
            <Spacer />
            <Flex direction={'column'} flex={{ base: '0 0 100%', lg: '0 0 75%' }}>
                <TableContainer display='flex' alignItems={'center'}>
                    <Table size={'sm'} variant={'striped'} colorScheme={'gray'}>
                        <Thead>
                            <Tr>
                                {showSizeCol && (
                                    <Th>Size</Th>
                                )}
                                <Th>Price</Th>
                                <Th>Qty Available</Th>
                                <Th>Quantity</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {v.colorVariants.map((cv, index) => (
                                <Tr className='bulk-variant-row' key={`cvRow_${index}`}>
                                    {showSizeCol && (
                                        <Td className='bulk-variant-col'>{sizeLabels[index] ? sizeLabels[index] : ''}</Td>
                                    )}
                                    <Td className='bulk-variant-col'>{formatDollars(cv.calculated_price)}</Td>
                                    <Td className='bulk-variant-col'>{tracksVariantInventory ? constrainQuantity(cv.inventory_level) : '50+'}</Td>
                                    <Td className='bulk-variant-col' width={'90px'}>
                                        <NumberInput
                                            onChange={(valueAsNumber) => handleChange(valueAsNumber, cv, v.colorName)}
                                            defaultValue={0}
                                            value={getVariantLineItemQuantity(cv.id, lineItems)}
                                            min={0}
                                            max={tracksVariantInventory ? cv.inventory_level : 9999}
                                            onInvalid={handleOnInvalid}
                                            onBlur={handleOnBlur}
                                            isDisabled={tracksVariantInventory && cv.inventory_level === 0}
                                            size={'sm'}
                                        >
                                            <NumberInputField borderRadius={0} />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                {showSizeCol && (
                                    <Th></Th>
                                )}
                                <Th></Th>
                                <Th></Th>
                                <Th><span style={{ paddingRight: '8px' }}>Total</span> {v.quantity}</Th>

                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Flex>
        </Flex>
    )
}

export default VariantRow;