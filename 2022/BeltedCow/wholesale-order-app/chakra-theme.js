// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Component style overrides
const overrides = {
    colors: {
        brand: '#f26254'
    },
    fonts: {
        body: '"Open Sans",sans-serif',
        heading: 'Montserrat,Helvetica,Arial,Sans-Serif'
    },
    components: {
        Button: {
            variants: {
                solid: {
                    backgroundColor: 'brand',
                    borderColor: 'brand',
                    color: 'white',
                    fontSize: '13px',
                    width: '225px',
                    _hover: {
                        backgroundColor: 'brand',
                        boxShadow: '1px 1px 4px 0 rgba(0,0,0,0.3)',
                        color: 'rgba(255,255,255,0.85)',
                        fontWeight: 'bold'
                    }
                },
                outline: {
                    backgroundColor: 'white',
                    borderColor: 'brand',
                    color: 'brand',
                    fontSize: '13px',
                    width: '225px',
                    _hover: {
                        backgroundColor: 'white',
                        boxShadow: '1px 1px 4px 0 rgba(0,0,0,0.3)',
                        fontWeight: 'bold'
                    }
                }
            },
        },
        Text: {
            baseStyle: {
                margin: 0
            }
        },
        Table: {
            baseStyle: {
                th: {
                    color: 'black',
                    textTransform: 'none'
                }
            },
            sizes: {
                sm: {
                    th: {
                        px: "3",
                        py: "1",
                        lineHeight: "3",
                        fontSize: "xs",
                    },
                    td: {
                        px: "3",
                        py: "1",
                        fontSize: "xs",
                        lineHeight: "3",
                    },
                }
            },
            variants: {
                striped: {
                    td: {
                        borderBottom: 0,
                        color: 'gray.800'
                    },
                    th: {
                        borderBottom: 0,
                        color: 'gray.800',
                        lineHeight: '8'
                    },
                    tbody: {
                        tr: {
                            td: {
                                background: 'white'
                            },
                            _odd: {
                                td: {
                                    background: 'gray.50'
                                },
                                th: {
                                    background: 'gray.50'
                                }
                            }
                        },
                    },
                }
            }
        }

    },
}

export default extendTheme(overrides)