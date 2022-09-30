import React from 'react';
import useOnScreen from './useOnScreen'
import { Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerFooter, Flex, Heading, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, CheckCircleIcon, LockIcon } from '@chakra-ui/icons'
import ProductCard from './ProductCard';

const AddToCart = ({ btnVariant, clearState, lineItems, numItems, productOptions, relatedProducts, token, setBtnDisabled, btnDisabled }) => {
    const [showModal, setShowModal] = React.useState(false)
    const [prevNumItems, setPrevNumItems] = React.useState(0)

    //only allow 4 related products 
    //relatedProducts = relatedProducts && !!relatedProducts.length ? relatedProducts.filter(rp => rp.image && rp.image.data) : []
    relatedProducts = relatedProducts && !!relatedProducts.length ? relatedProducts.slice(0, 4) : []

    const elementRef = React.useRef(null);
    //const isOnScreen = useOnScreen(elementRef);

    const toast = useToast();

    const option_gift = productOptions && !!productOptions.edges.length ? productOptions.edges.find(po => po.node.displayName === 'Make it a Gift') : null
    const option_gift_entityId = option_gift ? option_gift.node.entityId : 9966

    const option_gift2 = productOptions && !!productOptions.edges.length ? productOptions.edges.find(po => po.node.displayName === 'Is this a Gift?') : null
    const option_gift2_entityId = option_gift2 ? option_gift2.node.entityId : 7923

    const option_personalizeHat = productOptions && !!productOptions.edges.length ? productOptions.edges.find(po => po.node.displayName === 'Personalize Your Hat') : null
    const option_personalizeHat_entityId = option_personalizeHat ? option_personalizeHat.node.entityId : 7984

    const option_customText = productOptions && !!productOptions.edges.length ? productOptions.edges.find(po => po.node.displayName === 'Custom Text') : null
    const option_customText_entityId = option_customText ? option_customText.node.entityId : 7985

    const option_selectTextColor = productOptions && !!productOptions.edges.length ? productOptions.edges.find(po => po.node.displayName === 'Select Your Text Color') : null
    const option_selectTextColor_entityId = option_selectTextColor ? option_selectTextColor.node.entityId : 7986

    const miscProductOptions = []
    if (option_gift) {
        miscProductOptions.push({
            "optionId": option_gift_entityId,
            "optionValue": 458
        })
    }
    if (option_gift2) {
        miscProductOptions.push({
            "optionId": option_gift2_entityId,
            "optionValue": 458
        })
    }
    if (option_personalizeHat) {
        miscProductOptions.push({
            "optionId": option_personalizeHat_entityId,
            "optionValue": 352
        })
    }
    if (option_customText) {
        miscProductOptions.push({
            "optionId": option_customText_entityId,
            "optionValue": ''
        })
    }
    if (option_selectTextColor) {
        miscProductOptions.push({
            "optionId": option_selectTextColor_entityId,
            "optionValue": 404
        })
    }

    const addToCart = function () {
        setBtnDisabled(true)
        const _lineItems = lineItems.map(item => {
            if (item.quantity > 0) {
                return item;
            }
        }).filter(item => {
            if (item !== undefined) {
                return item;
            }
        });

        if (_lineItems.length < 1) {
            setBtnDisabled(false)
            toast({
                title: 'Please add at least 1 item',
                status: 'info',
                duration: 4000,
                isClosable: true,
            })
        } else {
            fetch(`/api/storefront/carts`)
                .then(response => response.json())
                .then(cart => {
                    if (cart.length > 0) {
                        return addToExistingCart(cart[0].id, _lineItems)
                    } else {
                        return createNewCart(_lineItems)
                    }
                })
                //.then(() => window.location = '/cart.php')
                .catch(err => {
                    toast({
                        title: 'Unable to add items to cart',
                        description: 'Please refresh the page and try again',
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                    console.log(err)
                })
        }

        function createNewCart(items) {
            const _items = items.map(i => {
                return {
                    optionSelections: miscProductOptions,
                    ...i
                }
            })


            return fetch('/api/storefront/carts', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "lineItems": _items }),
            })
                .then(response => response.json())
                .then(data => {
                    setBtnDisabled(false)
                    setShowModal(true)
                    setPrevNumItems(numItems)
                    clearState()
                })
                .catch(error => console.error(error));
        };

        function addToExistingCart(cart_id, items) {
            //https://developer.bigcommerce.com/api-reference/6b15c26ac7d24-add-cart-line-items
            //see optionSelections in body parameters
            //
            //hard coded option below is for Gift Tin
            //found optionId and optionValue by using BigCommerce graphql explorer -- use entityId
            const _items = items.map(i => {
                return {
                    optionSelections: miscProductOptions,
                    ...i
                }
            })

            return fetch(`/api/storefront/carts/${cart_id}/items`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "lineItems": _items })
            })
                .then(response => response.json())
                .then(data => {
                    setBtnDisabled(false)
                    setShowModal(true)
                    setPrevNumItems(numItems)
                    clearState()
                })
                .catch(() => {
                    return Promise.reject("There was an issue adding items to your cart. Please try again.")
                })
        }
    }

    const btnText = `Add ${numItems > 0 ? numItems : ''} Items To Cart`;
    return (
        <>
            <Button ref={elementRef} variant={btnVariant} isLoading={btnDisabled} onClick={addToCart}>{btnText}</Button>

            <Drawer
                isOpen={showModal}
                placement='right'
                onClose={() => { setShowModal(false) }}
                size='md'
                autoFocus={false}
            >
                <DrawerOverlay />
                <DrawerContent overflow={'scroll'}>
                    <Flex flexDir={'column'}>
                        <Flex justifyContent={'space-between'} height='50px' pl={4} >
                            <Flex alignItems={'center'} onClick={() => { setShowModal(false) }}>
                                <ArrowBackIcon mr={2} fontSize='xl' />
                                <Text fontSize='sm' lineHeight={'50px'}>
                                    Continue Shopping
                                </Text>
                            </Flex>
                            <DrawerCloseButton onClick={() => { setShowModal(false) }} />
                        </Flex>
                        <Divider mt={0} style={{borderColor: '#777'}} />
                    </Flex>

                    <Flex flexDir={'column'} p={6}>
                        <Text color='green' mb={4}>
                            <CheckCircleIcon color={'green'} mr={2} />
                            {prevNumItems} Items Added to Cart
                        </Text>

                        <Flex justifyContent={'space-around'}>
                            <Button variant='outline' mr={3} onClick={() => { window.location = '/cart.php' }}>
                                Review Order
                            </Button>
                            <Button variant='solid' leftIcon={<LockIcon />} onClick={() => { window.location = '/checkout' }}>Checkout</Button>
                        </Flex>

                        <Flex flexDir={'column'}>
                            <Heading size={'md'} mt={12}>
                                Related Products
                            </Heading>
                            <Divider mb={8} mt={2} style={{borderColor: '#777'}} />
                            <SimpleGrid
                                columns={2}
                                columnGap={10}
                                rowGap={10}
                            >
                                {relatedProducts && !!relatedProducts.length && relatedProducts.map((rp, index) => (
                                    <ProductCard key={`productCard_${index}`} product={rp} />)
                                )}
                            </SimpleGrid>
                        </Flex>
                    </Flex>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddToCart;