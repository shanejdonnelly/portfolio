import { FaRegIdBadge } from "react-icons/fa";

const Button = {
    // 1. We can update the base styles
    baseStyle: {
        fontSize: '13px',
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
            }
        },
        'productOption': {
            border: '2px solid',
            borderColor: 'gray.700',
            color: 'gray.700',
            position: 'relative',
            _hover: {
                bg: 'gray.200'
            },
            _disabled: {
                position: 'relative',
                _before: {
                    borderColor: 'gray.400',
                    borderBottom: '2px solid',
                    content: "''",
                    position: 'absolute',
                    width: '100%',
                    transform: 'rotate(17deg)',
                    transformOrigin: 'center',
                },

            }
        },
        'productOptionActive': {
            bg: 'gray.500',
            border: '2px solid',
            borderColor: 'gray.700',
            color: 'white',
            position: 'relative',
            _disabled: {
                position: 'relative',
                _before: {
                    borderColor: 'gray.400',
                    borderBottom: '2px solid',
                    content: "''",
                    position: 'absolute',
                    width: '100%',
                    transform: 'rotate(17deg)',
                    transformOrigin: 'center',
                },

            }
        },
        'roundOutline': {
            borderRadius: '30px',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontWeight: '400',
            padding: '22px 36px'
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
            _hover: {
                bg: '#174C70',
                color: 'rgba(255,255,255,0.9)'
            }
        },
        // 4. We can override existing variants
        solid: (props) => ({
            bg: props.colorMode === 'dark' ? 'gray.300' : 'gray.500',
            color: 'white'
        }),
    },
}

export default Button;

