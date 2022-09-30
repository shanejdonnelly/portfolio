export default {
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        {
            name: 'linkText',
            title: 'Link Text',
            type: 'string'
        },
        {
            name: 'linkUrl',
            title: 'Link URL',
            type: 'string'
        }
    ],
    preview: {
        select: {
            title: 'linkText',
        }
    }
}
