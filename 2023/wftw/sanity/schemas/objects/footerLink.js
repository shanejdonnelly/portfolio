export default {
    name: 'footerLink',
    title: 'Footer Link',
    type: 'object',
    fields: [
        {
            name: 'text',
            title: 'Link Text',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Link URL',
            type: 'string',
        },
        {
            name: 'fontWeight',
            title: 'Font Weight',
            type: 'string',
            options: {
                list: [
                    { title: 'Normal', value: '400' },
                    { title: 'Bold', value: '700' }
                ],
            }
        }
    ],
    preview: {
        select: {
            text: 'text',
        },
        prepare(selection) {
            const { text } = selection
            return {
                title: text
            }
        }
    }
}