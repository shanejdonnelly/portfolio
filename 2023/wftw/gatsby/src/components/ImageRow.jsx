import * as React from "react"
import { Grid, GridItem } from "@chakra-ui/react"
import { checkForImageWithMargin } from "../helpers"
import ImageBlock from "./ImageBlock"
import Row from "./Row"
import ImageRowVideo from "./ImageRowVideo"

export default function ImageRow({ data }) {
  const hasImageWithMargin = checkForImageWithMargin(data.images)
  let imageAlignment = data.imageAlignment ? data.imageAlignment : "center"
  if (hasImageWithMargin) {
    imageAlignment = "start"
  }

  const numImages = data?.images ? data.images.length : 0

  return numImages > 0 ? (
    <Row data={data}>
      <Grid
        alignItems={imageAlignment}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: numImages > 1 ? "repeat(2,1fr)" : "repeat(1, 1fr)",
        }}
        gap={12}
      >
        {!!data.images.length &&
          data.images.map((i, index) => {
            if (i._type === "imageBlock") {
              return (
                <GridItem
                  display="flex"
                  justifyContent="center"
                  key={`imageBlock_${index}`}
                >
                  <ImageBlock data={i} />
                </GridItem>
              )
            } else if (i._type === "imageRowVideo") {
              return <ImageRowVideo data={i} key={`imageRowVideo_${index}`} />
            }
          })}
      </Grid>
    </Row>
  ) : null
}
