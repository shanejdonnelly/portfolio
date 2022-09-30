export default {
    name: 'buttonRow',
    title: 'Button Row',
    type: 'object',
    fields: [
        {
            name: 'name',
            title: 'Row Name',
            type: 'string'
        },
        {
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'button' }]
        },
        {
            name: 'backgroundColor',
            title: 'Row Background Color',
            type: 'string',
            description: 'Background color can be a hex code or color name.'
        },
        {
            name: 'buttonColor',
            title: 'Button Color',
            type: 'string',
            description: 'Button color can be a hex code or color name.'
        },
        {
            name: 'textColor',
            title: 'Text Color',
            type: 'string',
            description: 'Text color can be a hex code or color name.'
        },
        {
            name: 'buttonVariant',
            title: 'Button Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Round Outline', value: 'roundOutline' },
                    { title: 'Outline', value: 'outline' },
                    { title: 'Text Only', value: 'ghost' },
                    { title: 'Round Solid', value: 'roundSolid' },
                    { title: 'Solid', value: 'solid' }
                ]
            }
        },
    ],
    initialValue: {
        backgroundColor: 'white',
        buttonColor: '#c1c1c1',
        textColor: '#333333',
        name: 'New Button Row'
    },
    preview: {
        select: {
            title: 'name',
        },
        prepare(selection) {
            const { title } = selection
            return {
                title: `${title}`
            }
        }
    }
}