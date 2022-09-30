import * as React from "react"
import { Box } from "@chakra-ui/react"
import Review from "./Review"
import ReviewSummary from "./ReviewSummary"

export default function ReviewsWrap({ reviews }) {
  /*
  const reviews = [
    {
      reviewTitle: "Absolutely the best curtains!",
      body: "I am new to this product line and I absolutely love it....Great smell that leaves you fresh and clean. I would love to see them add a body moisturizer into their inventory....I have ordered three times to stock all my bathrooms and will definitely be a repeat customer....",
      productTitle: "Abigail Tier Curtain",
      reviewerName: "Frederick Jones",
      numStars: 5,
      reviewDate: "02-14-2022",
      verified: true,
      recommend: true,
      product: {
        ratingAverage: 4.88194,
        numRatings: 144,
        ratingDistribution: { 1: 0, 2: 0, 3: 5, 4: 7, 5: 132 },
      },
    },
  ]
*/

  return (
    <Box>
      <ReviewSummary data={reviews[0].product} />

      {reviews &&
        reviews.length &&
        reviews.map((r, index) => (
          <Review review={r} isLast={index === reviews.length - 1} />
        ))}
    </Box>
  )
}
