import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './wholesale-order-app/chakra-theme'
import App from './product-grid-app/App'

const ProductGridApp = ({ context, getProductsByIds }) => {
    return (
        <ChakraProvider theme={theme}>
            <App context={context} getProductsByIds={getProductsByIds} />
        </ChakraProvider>
    )
}

export default ProductGridApp;