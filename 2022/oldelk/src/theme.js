// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Component style overrides
const overrides = {
    colors: {
        brand: '#a38e4d',
        black: '#1e1e1e'
    },
    fonts: {
        heading: 'abolition',
        body: 'futura-pt'
    },
    styles: {
        global: {
            body: {
            }
        },

    },
    components: {
        Button: {
            sizes: {
                xxl: {
                    height: '50px'
                }
            },
            variants: {
                solid: {
                    backgroundColor: 'black',
                    borderRadius: 0,
                    color: 'white',
                    fontSize: '14px',
                    padding: '8px 48px',
                    textTransform: 'uppercase',
                    _hover: {
                        backgroundColor: 'black',
                        boxShadow: '0 0 4px 0 rgba(0,0,0,0.2)',
                        color: 'gray.200'
                    }
                },
                solidBevel: {
                    backgroundColor: '#a38e4d',
                    color: 'black',
                    fontSize: '16px',
                    textAlign: 'center'
                }
            }
        },
        Heading: {
            variants: {
                bevelBox: {
                    backgroundColor: 'black',
                    color: 'brand',
                    fontSize: '32px',
                    fontWeight: '400',
                    left: '50%',
                    letterSpacing: '1.5px',
                    padding: '0 12px',
                    position: 'absolute',
                    textTransform: 'uppercase',
                    top: '-21px',
                    transform: 'translateX(-50%)',
                    width: 'max-content'
                }
            }
        },
        Link: {
            baseStyle: {
                textDecoration: 'underline',
                _hover: {
                    textDecoration: 'none'
                }
            }
        },
        Input: {
            variants: {
                outline: {
                    field: {
                        borderRadius: 0,
                        _focus: {
                            borderColor: 'gray.500',
                            boxShadow: 0
                        }
                    }

                }
            }

        },
        SimpleGrid: {
            variants: {
                barrelDetail: {
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'brand'
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
        },
        Text: {
            variants: {
                label: {
                    color: 'white',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '20px',
                    textTransform: 'uppercase'
                }
            }
        }
    },
}

export default extendTheme(overrides)