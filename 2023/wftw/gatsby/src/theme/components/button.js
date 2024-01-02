const Button = {
    baseStyle: {
        borderRadius: '2px',
        fontSize: '18px',
        fontWeight: '700'
    },
    variants: {
        'black': {
            bg: 'black',
            borderRadius: '30px',
            borderWidth: '2px',
            borderColor: 'white',
            borderStyle: 'solid',
            color: 'white',
            padding: '22px 36px',
            _hover: {
                bg: 'transparent',
                borderColor: 'black',
                color: 'white',
                transition: 'all .3s ease',
            }
        },
        'white': {
            bg: 'white',
            borderRadius: '30px',
            borderWidth: '2px',
            borderColor: 'white',
            borderStyle: 'solid',
            color: 'black',
            padding: '22px 36px',
            _hover: {
                bg: 'transparent',
                color: 'white',
                transition: 'all .3s ease',
            }
        }
    }
}

export default Button;