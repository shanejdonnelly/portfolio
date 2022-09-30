export default {
    name: 'promoBar',
    title: 'Promo / Notification Bar',
    type: 'document',
    fields: [
        {
            name: 'promoBar',
            title: 'Promo / Notification Text',
            type: 'blockContent',
        },
        {
            name: 'bgColor',
            title: 'Background Color (hex code)',
            type: 'string'
        },
        {
            name: 'color',
            title: 'Text Color (hex code)',
            type: 'string'
        }
    ],
    preview: {
        select: {
            title: 'promoBar'
        }
    }
}