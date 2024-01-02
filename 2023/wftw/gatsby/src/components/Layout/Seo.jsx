import * as React from "react"

export default function Seo({
  location,
  description,
  title,
  children = null,
  ogType = "website",
  isPasswordProtectedPage = false,
}) {
  const [isPreviewServer, setIsPreviewServer] = React.useState(false)

  React.useEffect(() => {
    setIsPreviewServer(window.location.href.includes("previews.wftw.me"))
  }, [])

  const defaultTitle =
    "Strategic Advertising Agency in Portland, Maine - Words From The Woods"

  const defaultDescription =
    "Strategic Advertising Agency in Portland, Maine. We tell brand stories in engaging ways that help our partners achieve their business goals."

  return (
    <>
      {isPasswordProtectedPage || isPreviewServer ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : null}
      <meta
        name="description"
        content={description ? description : defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? title : defaultTitle}</title>
      <link
        rel="canonical"
        href={`https://www.wftw.me${
          location && location.pathname ? location.pathname : ""
        }`}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title ? title : defaultTitle} />
      <meta
        property="og:description"
        content={description ? description : defaultDescription}
      />
      <meta
        property="og:url"
        content={`https://www.wftw.me${
          location && location.pathname ? location.pathname : ""
        }`}
      />
      <meta property="og:site_name" content="Words From The Woods" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="google-site-verification"
        content="dd7nMJlGV9pxoJKYrW8AdSTzPFeS0eDufz_7W5KhLgc"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      {children}
    </>
  )
}
