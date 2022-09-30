import React from 'react';
import { Box, Center, Flex, Heading, Slide, Spacer, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { flattenVariantData, formatDollars, getColorTotal, getNumItemsTotal, getSubtotal, sortByColor } from './helpers';
import AddToCart from './AddToCart'
import VariantRow from './VariantRow'

const App = ({ hasVariantInventory = false, productId, rawRelatedProducts, productOptions, variantData, token }) => {
    const [colorSortedVariants, setColorSortedVariants] = React.useState([]);
    const [variants, setVariants] = React.useState([]);
    const [lineItems, setLineItems] = React.useState([]);
    const [numItems, setNumItems] = React.useState(0)
    const [subtotal, setSubtotal] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [btnDisabled, setBtnDisabled] = React.useState(false);

    //make relatedProducts array that is consumed by ProductCard (by way of AddToCart)
    let relatedProducts = [] 
    if(rawRelatedProducts && !!rawRelatedProducts.edges.length){
       relatedProducts = rawRelatedProducts.edges.map(rp => {
        return {
            name: rp.node.name,
            image: rp.node.defaultImage?.url,
            price: rp.node.prices?.price?.value || '',
            url: `https://www.beltedcow.com${rp.node.path}` 
        }
       })
    }

    const clearFormState = function () {
        const _lineItems = lineItems.map(item => {
            item.quantity = 0;
            return item;
        })
        setNumItems(0)
        setSubtotal(0)
        setLineItems(_lineItems)
    }

    React.useEffect(() => {
        const data = flattenVariantData(variantData)

        const lineItems = data.map(variant => {
            return { variantId: variant.id, quantity: 0, productId: parseInt(productId) }
        });

        setLineItems(lineItems)

        setLoading(true)
        //now get the inventory per variant which is null from Graphql data above
        fetch(`https://belted.netlify.app/.netlify/functions/getVariant?productId=${productId}`)
            .then(response => response.json())
            .then(res => {
                setLoading(false)
                const inventory_data = res.data
                const _variants = data.map(v => {
                    const item = inventory_data.find(i => i.id === v.id)
                    if (item) {
                        v.inventory_level = item.inventory_level
                    }
                    else {
                        v.inventory_level = 100
                    }
                    return v
                })
                setVariants(_variants)
                setColorSortedVariants(sortByColor(_variants))
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setVariants(data)
                setColorSortedVariants(sortByColor(data))
            })


    }, [])


    const handleQuantityChange = function (variantId, qty, colorName) {
        const _lineItems = [...lineItems];
        _lineItems.forEach(item => {
            if (item.variantId === variantId) {
                item.quantity = parseInt(qty);
            }
        })

        const _colorSortedVariants = [...colorSortedVariants]
        const colorTotal = getColorTotal(_lineItems, _colorSortedVariants, colorName)

        _colorSortedVariants.forEach(colorGroup => {
            if (colorGroup.colorName === colorName) {
                colorGroup.quantity = colorTotal;
            }
        })

        setColorSortedVariants(_colorSortedVariants)
        setNumItems(getNumItemsTotal(_lineItems))
        setSubtotal(getSubtotal(_lineItems, variants))
        setLineItems(_lineItems)
    }

    return (
        <section className="wholesaleForm--wrap" style={{ position: 'relative' }}>
            <div id="wholesaleFormAnchor" style={{ position: 'absolute', top: '-140px', left: 0 }}></div>
            <Box backgroundColor={'#1a2735'} pt={3} pb={3}>
                <Heading as='h3' size={'md'} lineHeight={8} color={'white'} textAlign={'center'}>Bulk Order</Heading>
                <Text fontSize={'sm'} textAlign="center" color="white">Enter your desired quantities below and then add to cart.</Text>
            </Box>

            {!colorSortedVariants.length && (
                <Center>
                    {loading ? (
                        <Spinner mt={8} />
                    ) : (
                        <Heading as='h4' size={'md'} mt={8}>No variants available for this product.</Heading>
                    )}
                </Center>
            )}
            {!!colorSortedVariants.length && colorSortedVariants.map((v, index) => (
                <VariantRow v={v} handleQuantityChange={handleQuantityChange} lineItems={lineItems} key={`variantRow_${index}`} tracksVariantInventory={hasVariantInventory} />
            ))}


            {!!colorSortedVariants.length && (
                <Flex ml='auto' mr='auto' maxW={'960px'} pr={4} >
                    <Spacer />
                    <Flex>
                        <Flex justifyContent={'flex-end'} mr={6}>
                            {numItems > 0 && (
                                <Text color={'gray.500'} onClick={clearFormState} cursor='pointer' mr={2} lineHeight={10} fontSize='xs' textAlign={'right'}>Clear All</Text>
                            )}
                        </Flex>
                        <AddToCart btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled} token={token} relatedProducts={relatedProducts} btnVariant={'outline'} lineItems={lineItems} numItems={numItems} clearState={clearFormState} productOptions={productOptions} />
                    </Flex>
                </Flex>

            )}
            {!!colorSortedVariants.length && (
                <Slide direction='bottom' in={numItems > 0} position='fixed' bottom={0} left={0} width='100vw'>
                    <Flex background={'white'} boxShadow='0 -1px 6px 4px rgba(0,0,0,0.2)'>
                        <Flex pt={2} pb={2} ml='auto' mr='auto' maxW={'container.xl'} pr={4} width='100%' >
                            <Spacer />
                            <Flex>
                                <Flex justifyContent={'flex-end'} mr={6}>
                                    <Text color={'gray.500'} mr={2} lineHeight={10} fontSize='xs' textAlign={'right'}>Subtotal</Text>
                                    <Text fontSize={'xl'} lineHeight={10} textAlign={'right'}>{formatDollars(subtotal)}</Text>
                                </Flex>
                                <AddToCart btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled} token={token} relatedProducts={relatedProducts} btnVariant={'solid'} lineItems={lineItems} numItems={numItems} clearState={clearFormState} productOptions={productOptions} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Slide>
            )}
        </section>
    )
}

export default App;