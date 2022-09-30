import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './wholesale-order-app/chakra-theme'
import App from './wholesale-order-app/App'

const WholesaleOrderApp = ({ context }) => {
    const productId = context.productId;
    const productSku = context.productSku;
    const variantData = context.variantData
    return (
        <ChakraProvider resetCSS={false} theme={theme}>
            <App
                productId={productId}
                productOptions={variantData.data.site.product.productOptions}
                productSku={productSku}
                rawRelatedProducts={variantData.data.site.product.relatedProducts}
                token={context.token}
                variantData={variantData.data.site.product.variants}
                hasVariantInventory={variantData.data.site.product.inventory.hasVariantInventory}
            />
        </ChakraProvider>
    )
}

export default WholesaleOrderApp;