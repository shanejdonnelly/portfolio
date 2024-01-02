export default {
    name: 'imageBlock',
    title: 'Image Block',
    type: 'object',
    fields: [
        {
            name: 'imageUrl',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
                crop: true
            }
        },
        {
            name: 'aspectRatio',
            title: 'Aspect Ratio',
            description: 'Default value is 12/12 - square',
            type: 'number',
            options: {
                list: [
                    { title: '16/9 - best for full width', value: 16 / 9 },
                    { title: '12/12 - best for square', value: 12 / 12 },
                    { title: '9/16 - best for tall', value: 9 / 16 }
                ],
            },
        },

        {
            name: 'mainText',
            title: 'Main Text',
            type: 'string'
        },
        {
            name: 'subText',
            title: 'Sub Text',
            type: 'string'
        },
        {
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            options: {
                colorList: [
                    '#FF0000',
                    '#0000FF',
                    '#FFFF00',
                    '#FFFFFF',
                    '#000000'
                ]
            }
        },
        {
            name: 'marginTop',
            title: 'Margin Top',
            type: 'number',
            description: 'To offset image vertically. Percentage based.'
        },
        {
            name: 'borderTopLeftRadius',
            title: 'Border Top Left Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'borderTopRightRadius',
            title: 'Border Top Right Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'borderBottomRightRadius',
            title: 'Border Bottom Right Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'borderBottomLeftRadius',
            title: 'Border Bottom Left Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'textAlignment',
            title: 'Text Alignment',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                    { title: 'Center', value: 'center' },
                ],
            },
        },
    ],
    preview: {
        select: {
            mainText: 'mainText',
            media: 'imageUrl'
        },
        prepare(selection) {
            const { mainText, media } = selection
            return {
                title: 'Image',
                media: media
            }
        }
    }
}