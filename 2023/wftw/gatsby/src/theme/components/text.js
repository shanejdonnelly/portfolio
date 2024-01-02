const Text = {
    baseStyle: {
        color: 'gray.700',
        fontSize: '18px',
        fontWeight: '400',
        letterSpacing: '.04em'
    },
    variants: {
        'activeMainNavLink': {
            borderBottomWidth: '3px',
            borderBottomColor: 'gray.600',
            borderBottomStyle: 'solid',
            color: 'gray.600',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase'
        },
        'mainNavLink': {
            color: 'gray.600',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        'upperCaseLabel': {
            color: 'black',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '20px'
        }
    },
}

export default Text;
