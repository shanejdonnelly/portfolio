export default {
    name: 'learnMoreCard',
    title: 'Learn More Card',
    type: 'object',
    fields: [
        {
            name: 'imageSrc',
            title: 'Card Image',
            type: 'image'
        },

        {
            name: 'link',
            title: 'Link',
            type: 'string'
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        }
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
}
