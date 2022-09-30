export default {
    name: 'categoryCard',
    title: 'Category Card',
    type: 'object',
    fields: [
        {
            name: 'categoryLink',
            title: 'Category Link',
            type: 'string'
        },
        {
            name: 'categoryTitle',
            title: 'Category Title',
            type: 'string'
        },
        {
            name: 'imageSrc',
            title: 'Card Image',
            type: 'image'
        },
        {
            name: 'links',
            title: 'Category Links',
            type: 'array',
            of: [{ type: 'link' }]
        }
    ],
    preview: {
        select: {
            title: 'categoryTitle',
        }
    }
}
