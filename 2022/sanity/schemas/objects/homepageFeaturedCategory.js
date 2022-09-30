export default {
    name: 'homepageFeaturedCategory',
    title: 'Homepage Section - Featured Category',
    type: 'object',
    fields: [
        {
            name: 'headline',
            title: 'Headline',
            type: 'string'
        },
        {
            name: 'backgroundColor',
            title: 'Row Background Color',
            description: 'Background color for row (use hex code or color name)',
            type: 'string'
        },
        {
            name: 'categoryLinks',
            title: 'Featured Categories',
            type: 'array',
            of: [{ type: 'roundImageLink' }]
        }
    ],
    initialValue: {
        backgroundColor: 'transparent',
    },
    preview: {
        select: {
            headline: 'headline',
        },
        prepare(selection) {
            const { headline } = selection
            return {
                title: `Featured Category - ${headline}`,
            }
        }
    }
}
