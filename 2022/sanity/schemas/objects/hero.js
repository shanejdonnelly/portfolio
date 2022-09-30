export default {
    name: 'hero',
    title: 'Hero',
    type: 'object',
    fields: [
        {
            name: 'textAboveHeading',
            title: 'Small Text Above Heading',
            type: 'string'
        },
        {
            name: 'textBelowHeading',
            title: 'Small Text Below Heading',
            type: 'string'
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string'
        },
        {
            name: 'buttonText',
            title: 'Button Text',
            type: 'string'
        },
        {
            name: 'buttonLink',
            title: 'Button Link',
            type: 'string'
        },
        {
            name: 'backgroundImageOverlayColor',
            title: 'Background Image Overlay Color',
            type: 'string',
            description: 'Background color can be a hex code or color name.'
        },
        {
            name: 'backgroundImageUrl',
            title: 'Image',
            type: 'image'
        }
    ],
    initialValue: {
        backgroundImageOverlayColor: 'transparent'
    },
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: `Hero - ${title}`
            }
        }
    }
}