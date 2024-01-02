export default {
    name: 'contactForm',
    title: 'Contact Form',
    type: 'object',
    fields: [
        {
            name: 'nickname',
            title: 'Section Nickname',
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
            name: 'buttonVariant',
            title: 'Button Color',
            type: 'string',
            description: 'Default is white',
            options: {
                list: [
                    { title: 'White', value: 'white' },
                    { title: 'Black', value: 'black' }
                ],
            },
        },
        {
            name: 'paddingBottom',
            title: 'Row Padding Bottom',
            type: 'string',
            description: 'Default is none. Determines amount of bottom bg color.',
            options: {
                list: [
                    { title: 'None', value: 'none' },
                    { title: 'Small', value: 'small' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' }
                ],
            },
        },
        {
            name: 'paddingTop',
            title: 'Row Padding Top',
            type: 'string',
            description: 'Default is none. Determines amount of top bg color.',
            options: {
                list: [
                    { title: 'None', value: 'none' },
                    { title: 'Small', value: 'small' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' }
                ],
            },
        },
        {
            name: 'splitGradientBg',
            title: 'Gradient Background',
            description: 'Gradient BG instead of split bg colorw. Use a generator like https://cssgradient.io/ to create a single CSS line. Example: linear-gradient(45deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            type: 'text',
            rows: 2
        },

        {
            name: 'bgColorTop',
            title: 'Row Top Half Bg Color',
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
            name: 'bgColorBottom',
            title: 'Row Bottom Half Bg Color',
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
        }

    ],
    preview: {
        select: {
            nickname: 'nickname'
        },
        prepare(selection) {
            const { nickname } = selection
            return {
                title: nickname && !!nickname.length ? nickname : 'Contact Form',
            }
        }
    }
}