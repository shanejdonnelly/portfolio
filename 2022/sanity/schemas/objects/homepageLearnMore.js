export default {
    name: 'homepageLearnMore',
    title: 'Homepage Section - Learn More',
    type: 'object',
    fields: [
        {
            name: 'heroBackgroundImageOverlayColor',
            title: 'Hero Image Overlay Color',
            type: 'string'
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image'
        },

        {
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string'
        },
        {
            name: 'heroTextBelowHeading',
            title: 'Hero Text Below Heading',
            type: 'string'
        },
        {
            name: 'heroHeight',
            title: 'Hero Height',
            type: 'string'
        },
        {
            name: 'heroTextColor',
            title: 'Hero Text Color',
            type: 'string'
        },
        {
            name: 'cardRowBackgroundColor',
            title: 'Card Row Background Color',
            description: 'Background color for row (use hex code or color name)',
            type: 'string'
        },
        {
            name: 'learnItems',
            title: 'Learn More Cards',
            type: 'array',
            of: [{ type: 'learnMoreCard' }]
        }
    ],
    initialValue: {
        heroHeight: '25vh',
        heroTextColor: 'white',
        cardRowBackgroundColor: 'white'
    },
    preview: {
        select: {
            title: 'heroHeading',
        }
    }
}
