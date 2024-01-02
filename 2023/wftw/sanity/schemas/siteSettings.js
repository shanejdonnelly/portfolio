export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'metaDescription',
            title: 'Meta Description',
            description: 'Default meta description. Can be set on a per page basis as well.',
            type: 'text',
            rows: 4
        },
        {
            name: 'images',
            title: 'Footer Logos',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            name: 'footerLinks',
            title: 'Footer right-hand text links',
            type: 'array',
            of: [{ type: 'footerLink' }]
        },
        {
            name: 'footerText',
            title: 'Footer Text',
            description: 'Footer description of WFTW.',
            type: 'text',
            rows: 4
        }
    ],
    preview: {
        select: {
            media: 'images'
        },
        prepare(selection) {
            const { media } = selection
            return {
                title: 'Site Settings'
            }
        }
    }
}