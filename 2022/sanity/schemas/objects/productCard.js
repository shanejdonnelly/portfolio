export default {
    name: 'productCard',
    title: 'Product Card',
    type: 'object',
    fields: [
        {
            name: 'imageSrc',
            title: 'Image',
            type: 'image'
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
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string'
        },
        {
            name: 'buttonText',
            title: 'Button Text',
            type: 'string'
        },
        {
            name: 'buttonColor',
            title: 'Button Color',
            type: 'string'
        },
        {
            name: 'buttonTextColor',
            title: 'Button Text Color',
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
        },
        {
            name: 'buttonVariant',
            title: 'Button Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Round Outline', value: 'roundOutline' },
                    { title: 'Outline', value: 'outline' },
                    { title: 'Text Only', value: 'ghost' },
                    { title: 'Round Solid', value: 'roundSolid' },
                    { title: 'Solid', value: 'solid' }
                ]
            }
        }
    ],
    initialValue: {
        roundImage: 'false',
        buttonTextColor: '#0a3f63',
        buttonColor: '#0a3f63'
    },
    preview: {
        select: {
            title: 'title',
        }
    }
}
