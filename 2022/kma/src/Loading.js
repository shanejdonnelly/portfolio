import React from "react"
import ContentLoader from "react-content-loader"

const Loading = (props) => (
    <ContentLoader
        speed={2}
        width={900}
        height={110}
        viewBox="0 0 900 110"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="2" y="9" rx="3" ry="3" width="602" height="89" />
    </ContentLoader>
)

export default Loading;