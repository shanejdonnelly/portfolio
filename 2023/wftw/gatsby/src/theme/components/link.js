const Link = {
    baseStyle: {
        fontWeight: '500',
        _hover: {
            textUnderlineOffset: '2px'
        }
    },
    variants: {
        'breadcrumb': {
            _hover: {
                textDecoration: 'none'
            }
        },
        'footer': {
            fontSize: '18px',
            fontWeight: '500',
            textUnderlineOffset: '2px'
        },
        'desktopNav': {
            fontSize: '20px',
            marginLeft: '48px',
            _hover: {
                textUnderlineOffset: '4px'
            }
        },
        'mobileNav': {
            color: 'black',
            fontSize: '36px',
            fontWeight: '700'
        }
    },
}

export default Link;
