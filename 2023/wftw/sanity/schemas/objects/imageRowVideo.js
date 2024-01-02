export default {
    name: 'imageRowVideo',
    title: 'ImageRowVideo',
    type: 'object',
    fields: [
        {
            name: 'imageUrl',
            title: 'Background Image',
            type: 'image',
            options: {
                hotspot: true,
                crop: true
            },
            description: 'If there is a video, this image will be displayed while the background video loads. If no video is selected, this image is featured.'
        },
        {
            name: 'aspectRatio',
            title: 'Aspect Ratio',
            description: 'Default value is 12/12 - square',
            type: 'number',
            options: {
                list: [
                    { title: '16/9 - best for full width', value: 16 / 9 },
                    { title: '12/12 - best for square', value: 12 / 12 },
                    { title: '9/16 - best for tall', value: 9 / 16 }
                ],
            },
        },
        {
            name: 'vimeoBackgroundVideoId',
            title: 'Background Video ID (Vimeo)',
            type: 'string',
            description: 'Video to be used as background. Will autoplay, loop and should be short. (Just the id from the vimeo url. EX: 789140154)',
        },
        {
            name: 'vimeoVideoId',
            title: 'Video ID (Vimeo)',
            type: 'string',
            description: 'Full video to play when user clicks on background video. (Just the id from the vimeo url. EX: 789140154)',
        },
        {
            name: 'videoBgColor',
            title: 'Video Background Color',
            description: 'Useful when using a vertical video, because the preview will not fill the container',
            type: 'color',
            options: {
                colorList: [
                    '#FF0000',
                    '#0000FF',
                    '#FFFF00',
                    '#FFFFFF',
                    '#000000'
                ]
            }
        },
        {
            name: 'mainText',
            title: 'Main Text',
            type: 'string'
        },
        {
            name: 'subText',
            title: 'Sub Text',
            type: 'string'
        },
        {
            name: 'textColor',
            title: 'Text Color',
            type: 'color',
            options: {
                colorList: [
                    '#FF0000',
                    '#0000FF',
                    '#FFFF00',
                    '#FFFFFF',
                    '#000000'
                ]
            }
        },
        {
            name: 'textAlignment',
            title: 'Text Alignment',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' },
                    { title: 'Center', value: 'center' },
                ],
            },
        },
        {
            name: 'marginTop',
            title: 'Margin Top',
            type: 'number',
            description: 'To offset image vertically. Percentage based.'
        },

        {
            name: 'borderTopLeftRadius',
            title: 'Border Top Left Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'borderTopRightRadius',
            title: 'Border Top Right Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'borderBottomRightRadius',
            title: 'Border Bottom Right Radius',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'borderBottomLeftRadius',
            title: 'Border Bottom Left Radius',
            type: 'boolean',
            initialValue: false
        },
    ],
    preview: {
        select: {
            mainText: 'mainText',
            media: 'imageUrl'
        },
        prepare(selection) {
            const { mainText, media } = selection
            return {
                title: 'Video',
                media: media
            }
        }
    }

}