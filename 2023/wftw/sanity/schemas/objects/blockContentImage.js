export default {
    name: "customImage",
    title: "Image",
    type: "image",
    options: {
        hotspot: true,
    },
    fields: [
        {
            title: "Alternative Text",
            name: "alt",
            type: "string",
            options: {
                isHighlighted: false,
            },
        },
        {
            title: "Link",
            name: "link",
            type: "string",
        },

    ],
};