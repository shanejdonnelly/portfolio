export default {
    name: 'videoBlock',
    title: 'Video Block',
    type: 'object',
    fields: [
        {
            name: 'nickname',
            title: 'Section Nickname',
            type: 'string'
        },
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
        {
            name: 'fullBleed',
            title: 'Full Bleed Row',
            type: 'boolean'
        },
        {
            name: 'paddingTop',
            title: 'Row Padding Top',
            type: 'string',
            description: 'Default is none. Determines amount of top bg color.',
            options: {
                list: [
                    { title: 'None', value: 'none' },
                    { title: 'Small', value: 'small' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' }
                ],
            },
        },

        {
            name: 'paddingBottom',
            title: 'Row Padding Bottom',
            type: 'string',
            description: 'Default is none. Determines amount of bottom bg color.',
            options: {
                list: [
                    { title: 'None', value: 'none' },
                    { title: 'Small', value: 'small' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' }
                ],
            },
        },
        {
            name: 'splitGradientBg',
            title: 'Gradient Background',
            description: 'Gradient BG instead of split bg colorw. Use a generator like https://cssgradient.io/ to create a single CSS line. Example: linear-gradient(45deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            type: 'text',
            rows: 2
        },
        {
            name: 'bgColorTop',
            title: 'Row Top Half Bg Color',
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
            name: 'bgColorBottom',
            title: 'Row Bottom Half Bg Color',
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
        }

    ],
    preview: {
        select: {
            nickname: 'nickname',
            media: 'imageUrl'
        },
        prepare(selection) {
            const { nickname, media } = selection
            return {
                title: nickname && !!nickname.length ? nickname : 'Video Block',
                media: media
            }
        }
    }
}