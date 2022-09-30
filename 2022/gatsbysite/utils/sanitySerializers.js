import * as React from "react"
import { Table, Tr, Th, Td } from "@chakra-ui/react"

const serializers = {
    types: {
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