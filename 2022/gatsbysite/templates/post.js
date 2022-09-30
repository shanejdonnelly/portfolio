import React from "react"
import { Link } from "gatsby"
import {
    Box,
    Container,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'
import Layout from "../components/Layout/Layout"
import Seo from "../components/Layout/Seo"
import serializers from "../utils/sanitySerializers"
import BasePortableText from "@sanity/block-content-to-react";

const NewsTemplate = ({ pageContext }) => {
    const { _rawBody, intro, mainImage, mainImageAltText, title, categories, publishedAt } = pageContext

    return (
        <Layout>
            <Container maxW={'container.xl'}>
                <Flex flexDir="column">
                    <Heading variant={"pageTitle"} my={8}>
                        {title}
                    </Heading>
                    <Text>{publishedAt}</Text>
                    {intro ? (
                        <Flex
                            flexWrap={'wrap'}
                            alignItems={"center"}
                            my={8}
                        >
                            {mainImage?.asset?.url && (
                                <Box flex={{ base: '0 0 100%', md: '0 0 50%' }} pr={4}>
                                    <Image
                                        src={mainImage.asset.url}
                                        alt={mainImageAltText ? mainImageAltText : title}
                                        pb={8}
                                    />
                                </Box>
                            )}
                            {intro && (
                                <Box flex={{ base: '0 0 100%', md: '0 0 50%' }} pr={4}>
                                    <Text pl={4} fontSize='2xl'>{intro}</Text>
                                </Box>
                            )}

                        </Flex>

                    ) : (
                        <Flex
                            alignItems={"center"}
                            my={8}
                        >
                            {mainImage?.asset?.url && (
                                <Box minH='400px' flex={{ base: '0 0 100%' }} pr={4} backgroundImage={`url(${mainImage.asset.url})`} backgroundSize='cover' backgroundPosition='center' />
                            )}
                        </Flex>

                    )}
                    {_rawBody && (
                        <Box className="template-post-bodyWrap">
                            <BasePortableText
                                blocks={_rawBody}
                                projectId="1w3k1nck"
                                dataset="production"
                                imageOptions={{ w: 600, fit: 'max' }}
                                serializers={serializers}
                            />
                        </Box>
                    )}
                    {categories?.title && (
                        <Text>Posted in: {categories?.title}</Text>
                    )}
                </Flex>
            </Container>
        </Layout>
    )
}
export default NewsTemplate

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
