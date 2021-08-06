import gql from "graphql-tag";

const GET_POSTS = gql`
  query {
		posts {
			id
			createdAt
			createdBy{
				id
				picture
				name
			}
			title
			content{
				html
			}
		}
  }
`;

export default GET_POSTS;