export default {
    name: 'menu',
    title: 'Menus',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'handle',
            title: 'Handle',
            type: 'string',
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'menuItem' }]
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
        {
            name: 'sortOrder',
            title: 'Sort Order',
            type: 'number',
        }
    ],
}