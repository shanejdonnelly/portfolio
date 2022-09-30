import React from "react"
import {
    Box,
    Container,
    Grid,
    Heading,
    Image,
} from '@chakra-ui/react'
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import serializers from "../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react";

const ResourceTemplate = ({ pageContext }) => {
    const { _rawBody, mainImage, title, slug, id } = pageContext

    return (
        <Layout>
            <Container maxW={'container.xl'}>
                <Heading variant={"pageTitle"} my={8}>
                    {title}
                </Heading>

                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={6}
                >
                    {_rawBody && (
                        <Box className="template-post-bodyWrap">
                            <BasePortableText
                                blocks={_rawBody}
                                projectId="1w3k1nck"
                                dataset="production"
                                serializers={serializers}
                            />
                        </Box>
                    )}
                    {mainImage?.asset?.url && (
                        <Box flex={{ base: '0 0 100%', md: '0 0 50%' }} pr={4}>
                            <Image
                                src={mainImage.asset.url}
                                alt={title}
                                pb={8}
                            />
                        </Box>
                    )}

                </Grid>
            </Container>
        </Layout>
    )
}
export default ResourceTemplate

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
