import * as React from "react"
import Auth from "../components/Auth"
import BodyText from "../components/BodyText"
import Breadcrumbs from "../components/Breadcrumbs"
import ContactForm from "../components/ContactForm"
import Hero from "../components/Hero"
import HtmlBlock from "../components/HtmlBlock"
import ImageRow from "../components/ImageRow"
import Layout from "../components/Layout/Layout"
import LogoCycler from "../components/LogoCycler"
import Seo from "../components/Layout/Seo"
import TitleText from "../components/TitleText"
import VideoBlock from "../components/VideoBlock"

const Page = ({ pageContext, location }) => {
    const [authorized, setAuthorized] = React.useState(false)

    //run on page load to check for existing page auth
    React.useEffect(() => {
        if (pageContext.password) {
            const key = pageContext.slug.current
            if (window) {
                const storedAuth = window.localStorage.getItem(key)
                if (storedAuth && storedAuth === pageContext.password) {
                    setAuthorized(true)
                }
            }
        }
    }, [])

    //when auth changes, set in localStorage
    React.useEffect(() => {
        if (pageContext.password) {
            const key = pageContext.slug.current
            if (authorized === true) {
                window.localStorage.setItem(key, pageContext.password)
            }
            else {
                window.localStorage.setItem(key, pageContext.password)
            }
        }
    }, [authorized])

    const components = pageContext.components && !!pageContext.components.length ? pageContext.components : []

    return pageContext?.password && !!pageContext.password.length && !authorized ? (
        <Layout gatsbyLocation={location} siteSettings={pageContext.siteSettings[0]} navTextColor={pageContext?.navTextColor?.hex ? pageContext.navTextColor.hex : '#ffffff'} gradientBg={pageContext?.gradientBg ? pageContext.gradientBg : 'none'} bgColor={pageContext?.bgColor?.hex ? pageContext.bgColor.hex : '#000000'}>
            <Auth password={pageContext.password} setAuthorized={setAuthorized} />
        </Layout>
    ) : (
        <Layout gatsbyLocation={location} siteSettings={pageContext.siteSettings[0]} navTextColor={pageContext?.navTextColor?.hex ? pageContext.navTextColor.hex : '#ffffff'} gradientBg={pageContext?.gradientBg ? pageContext.gradientBg : 'none'} bgColor={pageContext?.bgColor?.hex ? pageContext.bgColor.hex : '#000000'}>
            {!!components.length &&
                components.map((component, index) => {
                    if (component && component._type) {
                        if (component._type === "htmlBlock") {
                            return <HtmlBlock data={component} key={`htmlBlock${index}`} />
                        }
                        else if (component._type === "videoBlock") {
                            return <VideoBlock data={component} key={`videoBlock${index}`} />
                        }
                        else if (component._type === "breadcrumbs") {
                            return <Breadcrumbs data={component} key={`breadcrumbs${index}`} />
                        }
                        else if (component._type === "titleText") {
                            return <TitleText data={component} key={`titleText_${index}`} pageBgColor={pageContext.bgColor.hex} />
                        }
                        else if (component._type === "logoCycler") {
                            return <LogoCycler data={component} key={`logoCycler_${index}`} />
                        }
                        else if (component._type === "imageRow") {
                            return <ImageRow data={component} key={`imageRow_${index}`} />
                        }
                        else if (component._type === "bodyText") {
                            return <BodyText data={component} key={`bodyText${index}`} />
                        }
                        else if (component._type === "hero") {
                            return <Hero data={component} key={`hero${index}`} />
                        }
                        else if (component._type === "contactForm") {
                            return <ContactForm data={component} key={`contactForm${index}`} />
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false
                    }
                })
            }
        </Layout>
    )
}

export default Page

export const Head = ({ location, pageContext }) => {
    return (
        <Seo
            isPasswordProtectedPage={pageContext?.password && !!pageContext.password.length}
            description={pageContext?.metaDescription || pageContext.siteSettings[0].metaDescription}
            title={pageContext?.title || null}
            location={location}
        />
    )

}
