import * as React from "react"
import { Flex, Image } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { throttle } from "../helpers"
import Row from "./Row"

function chunkArray(array, size) {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size)
    result.push(chunk)
  }
  return result
}

export default function LogoCycler({ data }) {
  const [imagesArr, setImagesArr] = React.useState(chunkArray(data.images, 2))
  const [imagesArrIndex, setImagesArrIndex] = React.useState(0)
  const [winWidth, setWinWidth] = React.useState(300)
  const [images, setImages] = React.useState(data.images)

  //initial load set winWidth to start process
  React.useEffect(() => {
    setWinWidth(window.innerWidth)
  }, [])

  /*
  SLIDESHOW 
*/
  //every time imagesArrIndex changes, set images - which starts 'slideshow' process over again
  React.useEffect(() => {
    setImages(imagesArr[imagesArrIndex])
  }, [imagesArrIndex])

  //every time images are updated, set new timeout to update imagesArrIndex
  //this is the 'slideshow' mechanism
  React.useEffect(() => {
    setTimeout(() => {
      if (imagesArrIndex < imagesArr.length - 1) {
        setImagesArrIndex(imagesArrIndex + 1)
      } else {
        setImagesArrIndex(0)
      }
    }, 5000)
  }, [images])
  /*
  END SLIDESHOW 
*/

  //set images - which get rendered - after chunking array
  //use index at 0 for safety
  React.useEffect(() => {
    setImages(imagesArr[0])
  }, [imagesArr])

  //when new winWidth, rechunk images array
  React.useEffect(() => {
    if (data.images && data.images.length > 5) {
      if (winWidth < 480) {
        setImagesArr(chunkArray(data.images, 2))
      } else if (winWidth < 992) {
        setImagesArr(chunkArray(data.images, 3))
      } else {
        setImagesArr(chunkArray(data.images, 6))
      }
    } else {
      if (winWidth < 480) {
        setImagesArr(chunkArray(data.images, 2))
      } else {
        setImagesArr(chunkArray(data.images, 3))
      }
    }
  }, [winWidth])

  //watch for window resize and setWinWidth
  React.useEffect(() => {
    const handleResize = throttle(() => {
      setWinWidth(window.innerWidth)
    }, 1000)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  let component = null
  if (images && images.length) {
    component = (
      <Flex justifyContent="center">
        {images.map((i, index) => (
          <Image
            key={`logoImage-${index}`}
            as={GatsbyImage}
            image={i.asset.gatsbyImageData}
            alt={"alt text"}
          />
        ))}
      </Flex>
    )
  }

  return <Row data={data}>{component}</Row>
}
