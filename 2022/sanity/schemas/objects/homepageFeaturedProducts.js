export default {
    name: 'homepageFeaturedProducts',
    title: 'Homepage Section - Featured Products',
    type: 'object',
    fields: [
        {
            name: 'backgroundColor',
            title: 'Section Background Color',
            description: 'Background color for row (use hex code or color name)',
            type: 'string'
        },
        {
            name: 'featuredProducts',
            title: 'Featured Products',
            type: 'array',
            of: [{ type: 'productCard' }]
        }

    ],
    initialValue: {
        backgroundImageOverlayColor: 'transparent'
    },
    preview: {
        select: {
            title: 'backgroundColor',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: `Featured Products`
            }
        }
    }
}