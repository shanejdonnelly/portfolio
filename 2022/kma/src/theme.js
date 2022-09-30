// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Component style overrides
const overrides = {
    fonts: {
        heading: 'questa-slab,serif'
    },
    components: {
        Button: {
            baseStyle: {
                borderColor: 'blue.900'
            },
            variants: {
                darkBlue: {
                    backgroundColor: 'blue.900',
                    borderColor: 'blue.900',
                    color: 'white',
                    _hover: {
                        backgroundColor: 'blue.700',
                        borderColor: 'blue.700'
                    }
                }
            },
        },
        Link: {
            baseStyle: {
                textDecoration: 'underline',
                _hover: {
                    textDecoration: 'none'
                }
            }
        },
        Tag: {
            sizes: {
                xl: {
                    container: {
                        minH: 10,
                        minW: 10,
                        fontSize: "md",
                        borderRadius: "md",
                        px: 3,
                    }
                }
            }
        }
    },
}

export default extendTheme(overrides)