import React from "react"
import {
    Box,
    Button,
    Container,
    Grid,
    Heading,
    Image,
    Link,
    Text
} from '@chakra-ui/react'
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import serializers from "../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react";

const ResourceTemplate = ({ pageContext }) => {
    const { _rawBody, mainImage, pdf, title } = pageContext

    return (
        <Layout>
            <Container maxW={'container.xl'} className="page">
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
                    <Box>
                        {pdf && (
                            <Box border='1px solid' borderColor='gray.400' px={6} pt={4} pb={4} mb={8}>
                                <Text color='black' fontWeight='700' textTransform='uppercase' mb={1}>Download the measuring guide</Text>
                                <Text color='black' mb={3}>Download the complete guide including room worksheet.</Text>
                                <Button as={Link} href={pdf?.asset?.url} _hover={{ textDecor: 'none' }} isExternal={true} variant='productOption'>Download PDF</Button>
                            </Box>
                        )}
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
                    </Box>
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
