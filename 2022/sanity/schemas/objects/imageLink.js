export default {
    name: 'roundImageLink',
    title: 'Image & Text Link',
    type: 'object',
    fields: [
        {
            name: 'imageUrl',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'linkText',
            title: 'Link Text',
            type: 'string'
        },
        {
            name: 'linkUrl',
            title: 'Link Url',
            type: 'string'
        },
        {
            name: 'roundImage',
            title: 'Round Image',
            type: 'string',
            options: {
                list: [
                    { title: 'Yes', value: 'true' },
                    { title: 'No', value: 'false' }
                ]
            },
        }
    ],
    initialValue: {
        roundImage: 'true',
    },
    preview: {
        select: {
            title: 'linkText',
        }
    }
}
