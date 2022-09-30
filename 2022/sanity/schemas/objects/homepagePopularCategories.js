export default {
    name: 'homepagePopularCategories',
    title: 'Homepage Section - Popular Categories',
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
            name: 'categoryCards',
            title: 'Category Cards',
            type: 'array',
            of: [{ type: 'categoryCard' }]
        }
    ],
    preview: {
        select: {
            title: 'categoryCards.0.categoryTitle',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: `Popular Categories`,
            }
        }
    }
}
