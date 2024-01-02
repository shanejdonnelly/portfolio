const Button = {
    // 1. We can update the base styles
    baseStyle: {
        borderRadius: '2px',
        fontSize: '14px',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    // 2. We can add a new button size or extend existing
    sizes: {
        xs: {
            fontSize: '13px',
        },
        sm: {
            fontSize: '13px',
        },
        md: {
            fontSize: '13px',
        },
        lg: {
            fontSize: '15px',
        },
    },
    // 3. We can add a new visual variant
    variants: {
        'solid': {
            _hover: {
                bg: 'gray.800'
            },
            color: 'white'
        },
        'heroOutline': {
            border: '1px solid',
            borderColor: 'black',
            color: 'gray.700',
            fontWeight: '400',
            position: 'relative',
            _hover: {
                bg: 'black',
                color: 'white'
            },
            _disabled: {
                position: 'relative',
                opacity: '0.2'
            }
        },
        'productOption': {
            border: '1px solid',
            borderColor: 'black',
            color: 'gray.700',
            fontWeight: '400',
            position: 'relative',
            _hover: {
                bg: 'gray.300'
            },
            _disabled: {
                position: 'relative',
                opacity: '0.2'
            }
        },
        'productOptionDiscontinued': {
            border: '1px solid',
            borderColor: 'black',
            color: 'gray.700',
            fontWeight: '400',
            position: 'relative',
            _hover: {
                bg: 'gray.300'
            },
            _disabled: {
                position: 'relative',
                opacity: '0.2'
            },
            _before: {
                borderTop: '1px solid',
                borderColor: 'black',
                content: "''",
                position: 'absolute',
                top: '50%',
                transform: 'rotate(135deg)',
                transformOrigin: 'center',
                width: '44px'
            }
        },
        'productOptionDiscontinuedActive': {
            bg: 'black',
            border: '1px solid',
            borderColor: 'black',
            color: 'white',
            fontWeight: '400',
            position: 'relative',
            _hover: {
                bg: 'gray.300'
            },
            _disabled: {
                position: 'relative',
                opacity: '0.2'
            },
            _before: {
                borderTop: '1px solid',
                borderColor: 'white',
                content: "''",
                position: 'absolute',
                top: '50%',
                transform: 'rotate(135deg)',
                transformOrigin: 'center',
                width: '44px'
            }
        },

        'productOptionActive': {
            bg: 'black',
            border: '1px solid',
            borderColor: 'black',
            color: 'white',
            fontWeight: '400',
            position: 'relative',
            _disabled: {
                opacity: '0.2',
                position: 'relative',
            }
        },
        'roundOutline': {
            borderRadius: '30px',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: '400',
            padding: '22px 36px',
            _hover: {
                bg: 'black',
                color: 'white',
                transition: 'all .3s ease',
            }
        },
        'roundSolid': {
            borderRadius: '20px'
        },
        'with-shadow': {
            bg: 'red.400',
            boxShadow: '1px 0 6px 0px rgba(0,0,0,0.6)',
        },
        'blue': {
            bg: 'darkblue',
            color: 'white',
            px: 8,
            _disabled: {
                bg: 'darkblue',
            },
            _hover: {
                bg: '#174C70',
                color: 'rgba(255,255,255,0.9)',
                _disabled: {
                    bg: 'darkblue'
                }
            }
        },
    },
}

export default Button;

