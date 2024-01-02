const Text = {
    baseStyle: {
        color: 'gray.700',
        fontWeight: '400'
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
            fontSize: '16px',
            fontWeight: '700',
            lineHeight: '20px'
        }
    },
}

export default Text;
