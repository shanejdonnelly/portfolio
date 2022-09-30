export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [{ type: 'hero' }, { type: 'buttonRow' }, { type: 'homepageFeaturedCategory' }, { type: 'homepageFeaturedProducts' }, { type: 'homepageLearnMore' }, { type: 'homepagePopularCategories' }]
        }
    ],
    preview: {
        select: {
            title: 'sections.0',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: 'Homepage',
            }
        }
    }
}