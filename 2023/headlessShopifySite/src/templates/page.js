import React from "react"
import {
    Box,
    Container,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react'
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import serializers from "../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react";

const PageTemplate = ({ pageContext }) => {
    const { _rawBody, mainImage, mainImageAltText, title } = pageContext

    return (
        <Layout>
            <Container maxW={"container.xl"} className="page">
                <Flex flexDir="column">
                    <Heading variant={"pageTitle"} my={8}>
                        {title}
                    </Heading>
                    {mainImage?.asset?.url && (
                        <Image
                            src={mainImage.asset.url}
                            alt={mainImageAltText}
                            pb={8}
                        />
                    )}
                    {_rawBody && (
                        <BasePortableText
                            className="sanityContent"
                            blocks={_rawBody}
                            projectId="1w3k1nck"
                            dataset="production"
                            serializers={serializers}
                        />
                    )}
                </Flex>
            </Container>
        </Layout>
    )
}
export default PageTemplate

export const Head = ({ location, params, data, pageContext }) => {
    return (
        <Seo
            title={pageContext?.title || null}
            location={location}
            params={params}
            pageContext={pageContext}
            data={data}
        />
    )

}
