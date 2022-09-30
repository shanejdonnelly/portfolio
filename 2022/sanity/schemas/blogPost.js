export default {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
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
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'mainImageAltText',
            title: 'Image Alt Text',
            type: 'string'
        },
        {
            name: 'intro',
            title: 'Excerpt',
            type: 'text',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }]
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime'
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        }
    ],
    initialValue: () => ({
        author: { _ref: 'ae71dcf1-aab1-47cf-8e94-2934f5cb7cc7' },
        categories: [{ _ref: 'd60443f5-6ef3-4b9d-ac69-4e4620b16105' }],
        publishedAt: (new Date()).toISOString()
    }),
    preview: {
        select: {
            title: 'title',
            media: 'mainImage'
        }
    }
}