import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Image, Link, Table, Tr, Th, Td } from "@chakra-ui/react"

const serializers = {
    types: {
        imageWithLink: ({ node }) => {
            //check if there is an image first
            if (node?.asset?.url) {
                const image = (
                    <Image
                        src={node.asset.url}
                        alt={node?.altText ? node.altText : ''}
                        boxSize="600px"
                        objectFit="contain"
                    />
                )
                //if there is a link, wrap, otherwise just plain image
                return node?.link ? (
                    <Link as={GatsbyLink} to={node.link}>
                        {image}
                    </Link>
                ) : image

            }
            return true;
        },
        table: ({ node }) => (
            <Table my={8}>
                {node.rows.map((row, index) =>
                    index === 0 ? (
                        <Tr>
                            {row.cells.map((cell) => (
                                <Th>{cell}</Th>
                            ))}
                        </Tr>
                    ) : (
                        <Tr>
                            {row.cells.map((cell) => (
                                <Td>{cell}</Td>
                            ))}
                        </Tr>
                    )
                )}
            </Table>
        ),
    },
}

export default serializers