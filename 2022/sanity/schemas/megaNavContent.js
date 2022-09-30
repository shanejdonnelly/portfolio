export default {
    name: 'megaNavContent',
    title: 'MegaNav Content',
    type: 'document',
    fields: [
        {
            name: 'parentCollection',
            title: 'Parent Collection',
            type: 'string',
            description: 'Must be spelled exactly as in Shopify.'
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
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        },
        {
            name: 'shopLink',
            title: 'Shop Link',
            type: 'string',
        },
    ],

    preview: {
        select: {
            title: 'description',
            media: 'mainImage'
        }
    }
}