export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        {
            name: 'nickname',
            title: 'Page Nickname',
            type: 'string',
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'parentPath',
            title: 'Parent Page',
            type: 'string',
            description: 'Leave empty for a top level page: "/page-name" With a parent page selected: "/parent-page-name/page-name"',
            options: {
                list: [
                    { title: 'Work', value: 'work' }
                ],
            },
        },
        {
            name: 'components',
            title: 'Page Sections',
            type: 'array',
            of: [{ type: 'bodyText' }, { type: 'breadcrumbs' }, { type: 'contactForm' }, { type: 'hero' }, { type: 'htmlBlock' }, { type: 'imageRow' }, { type: 'logoCycler' }, { type: 'titleText' }, { type: 'videoBlock' }]
        },
        {
            name: 'metaDescription',
            title: 'Meta Description',
            description: 'Meta descriptions should be between 50 and 160 characters.',
            type: 'text',
            rows: 4
        },
        {
            name: 'bgColor',
            title: 'Page Background Color',
            type: 'color',
            options: {
                colorList: [
                    '#FF0000',
                    '#0000FF',
                    '#FFFF00',
                    '#FFFFFF',
                    '#000000'
                ]
            },
            validation: Rule => Rule.required(),
            initialValue: '#000000'
        },
        {
            name: 'navTextColor',
            title: 'Navigation Text Color',
            type: 'color',
            options: {
                colorList: [
                    '#FF0000',
                    '#0000FF',
                    '#FFFF00',
                    '#FFFFFF',
                    '#000000'
                ]
            },
            validation: Rule => Rule.required(),
            initialValue: '#FFFFFF'
        },
        {
            name: 'gradientBg',
            title: 'Gradient Background',
            description: 'Top part of page behind nav and hero area. Use a generator like https://cssgradient.io/ to create a single CSS line. Example: linear-gradient(45deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            type: 'text',
            rows: 2
        },
        {
            name: 'password',
            title: 'Password',
            description: 'Set a password to create a password protected page',
            type: 'string',
        },

    ],
    orderings: [
        {
            title: 'Default',
            name: 'multiple',
            by: [
                { field: 'parentPath', direction: 'desc' },
                { field: 'title', direction: 'asc' }
            ]
        },
        {
            title: 'Nickname',
            name: 'nickname',
            by: [
                { field: 'nickname', direction: 'asc' }
            ]
        },
        {
            title: 'Title',
            name: 'pageTitle',
            by: [
                { field: 'title', direction: 'asc' }
            ]
        },
        {
            title: 'Parent Page',
            name: 'parentPage',
            by: [
                { field: 'parentPath', direction: 'asc' },
                { field: 'title', direction: 'asc' }
            ]
        },
        {
            title: 'Password Pages',
            name: 'password',
            by: [
                { field: 'password', direction: 'asc' },
                { field: 'title', direction: 'asc' }
            ]
        }
    ],
    preview: {
        select: {
            nickname: 'nickname',
            title: 'title',
            parentPath: 'parentPath'
        },
        prepare(selection) {
            function titleCase(string) {
                return string[0].toUpperCase() + string.slice(1).toLowerCase();
            }

            const { nickname, title, parentPath } = selection
            const prefix = parentPath && !!parentPath.length ? `${titleCase(parentPath)} > ` : '';
            return {
                title: nickname && !!nickname.length ? `${prefix}${nickname}` : `${prefix}${title}`
            }
        }

    }
}