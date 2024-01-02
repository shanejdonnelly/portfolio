export default {
    name: 'crumb',
    title: 'Crumb',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Breadcrumb Title',
            type: 'string'
        },
        {
            name: 'url',
            title: 'Breadcrumb Link',
            type: 'string'
        },
        {
            name: 'isUppercase',
            title: 'Uppercase',
            type: 'boolean'
        },
        {
            name: 'isBold',
            title: 'Bold',
            type: 'boolean'
        },
        {
            name: 'hasDotAfter',
            title: 'Has Dot After',
            type: 'boolean'
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: title
            }
        }

    }
}