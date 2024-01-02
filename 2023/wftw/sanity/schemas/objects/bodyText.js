import blockContentImage from "./blockContentImage"

//https://www.sanity.io/docs/portable-text-editor-configuration
export default {
    name: 'bodyText',
    title: 'Body Text',
    type: 'object',
    fields: [
        {
            name: 'nickname',
            title: 'Section Nickname',
            type: 'string',
        },
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Large Text', value: 'largeText' }
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underine', value: 'underline' },
                            { title: 'Strikethrough', value: 'strike-through' }
                        ]
                    },
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                    ]
                },
                blockContentImage
            ]
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
        {
            name: 'sectionWidth',
            title: 'Section Width',
            type: 'string',
            options: {
                list: [
                    { title: '800px', value: '800px' },
                    { title: '1048px', value: '1048px' },
                    { title: 'Full Width', value: '100%' },
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
            nickname: 'nickname',
        },
        prepare(selection) {
            const { nickname } = selection
            return {
                title: nickname && !!nickname.length ? nickname : 'Text',
            }
        }
    }
}