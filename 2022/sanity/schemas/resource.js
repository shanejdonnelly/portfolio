export default {
    name: 'resource',
    title: 'Resource',
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
            name: 'thumbnailImage',
            title: 'Thumbnail image',
            type: 'image'
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image'
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
        {
            name: 'pdf',
            title: 'PDF Download',
            type: 'file',
            accept: '.pdf'
        },
    ],

    preview: {
        select: {
            title: 'title',
            media: 'thumbnailImage'
        }
    }
}