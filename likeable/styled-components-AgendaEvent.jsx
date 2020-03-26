import React from 'react';
import moment from 'moment';
import { prettifyAdObjective } from '../../helpers/adTypeFromPost';
import { PostListContent, SocialNetworkIconBar } from 'components';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  border: 0;
  justify-content: space-between;
  align-content: center;
  overflow: hidden;
  min-height: 28px;
`;

const PostWrap = styled.div`
  display: flex;
`;

const Time = styled.div`
  border-left: 1px solid #dddddd;
  flex: 0 0 95px;
  max-width: 95px;
  padding: 15px 10px;
`;

const Date = styled.div`
  flex: 0 0 135px;
  max-width: 135px;
  padding: 15px 10px;
`;

const FilterTypeWrap = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 160px;
  font-size: 13px;
  margin-right: 36px;
`;

const FilterTypeCircle = styled.div`
  background-color: rgb(${props => props.bgColor});
  border-radius: 50%;
  display: inline;
  float: left;
  height: 18px;
  margin-right: 8px;
  width: 18px;
`;

function AgendaEvent(props) {
  const {
    deletingPost,
    deleteLivePost,
    event,
    handleDelete,
    handleEdit,
    handleReuse,
    organization,
    parsedLinks,
    parseLink
  } = props;
  const imageUrl =
    event.post.S3Files && event.post.S3Files.length && event.post.S3Files[0].fullyQualifiedUrl
      ? [event.post.S3Files[0].fullyQualifiedUrl]
      : event.post.type === 'AD' && event?.post?.adDetails?.creative?.thumbnail_url
      ? event.post.adDetails.creative.thumbnail_url
      : null;
  let postType = 'textPost';
  if (event.post.linkUrl) {
    postType = 'linkPost';
  } else if (imageUrl) {
    postType = 'imagePost';
  } else if (event.post.videoUrl) {
    postType = 'videoPost';
  }

  if (postType === 'linkPost') {
    if (parsedLinks[event.post.linkUrl]) {
      event.post.linkData = parsedLinks[event.post.linkUrl];
    } else {
      parseLink(event.post.linkUrl);
    }
  }

  const belowMessageContent =
    postType === 'linkPost' ? (
      <a href={event.post.linkUrl} style={{ color: '#1f5180', textDecoration: 'none', fontSize: 13 }} target="_blank">
        <i className="fa fa-link" style={{ marginRight: 6 }} />
        Link Post
      </a>
    ) : postType === 'videoPost' ? (
      <span style={{ fontSize: 13 }}>Video Post</span>
    ) : null;

  const message = event.post.message
    ? event.post.message
    : postType === 'linkPost' && event.post.linkData
    ? event.post.linkData.parsing
      ? 'Loading...'
      : event.post.linkData.description
    : 'No message';

  let image = imageUrl;
  if (postType === 'linkPost' && !imageUrl) {
    if (event.post.linkData && !event.post.linkData.parsing && event.post.linkData.imageUrl) {
      image = event.post.linkData.imageUrl;
    }
  }

  const videoUrl = event.post.videoUrl;

  let bgColor;
  let filterName;
  switch (event.itemFilterType) {
    case 'CANVAS_APP_INSTALLS_AD':
    case 'CANVAS_APP_ENGAGEMENT_AD':
    case 'EVENT_RESPONSES_AD':
    case 'LINK_CLICKS_AD':
    case 'OFFER_CLAIMS_AD':
    case 'PAGE_LIKES_AD':
    case 'MOBILE_APP_INSTALLS_AD':
    case 'MOBILE_APP_ENGAGEMENT_AD':
    case 'PRODUCT_CATALOG_SALES_AD':
    case 'VIDEO_VIEWS_AD':
    case 'LEAD_GENERATION_AD':
    case 'LOCAL_AWARENESS_AD':
    case 'BRAND_AWARENESS_AD':
    case 'REACH_AD':
    case 'APP_INSTALLS_AD':
    case 'CONVERSIONS_AD':
      bgColor = '189,153,219';
      filterName = prettifyAdObjective(event.itemFilterType);
      break;
    case 'POST_ENGAGEMENT_AD':
      bgColor = '186,159,134';
      filterName = 'Boosted Post';
      break;
    case 'CUSTOM_CONTENT':
      bgColor = '244,184,87';
      filterName = 'Custom Content';
      break;
    case 'GROUP_POST':
      bgColor = '65,198,174';
      filterName = 'Group Post';
      break;
    case 'COMPOSED_CONTENT':
      bgColor = '184,209,235';
      filterName = 'Composed Content';
      break;
    case 'SUBSCRIBED_CONTENT':
      bgColor = '185,94,94';
      filterName = 'Subscribed Content';
      break;
    default:
      bgColor = '245,166,35';
      filterName = 'Other';
  }

  const createActionButtons = post => {
    const pastPost = moment(post.publishAt).isBefore(moment());
    let actions = [];
    if (post.type === 'AD') {
      return false;
    } else if (pastPost) {
      actions = [
        post?.PostResult?.results && post.PostResult.results.length > 0 ? (
          <FlatButton>
            <MenuItem
              innerDivStyle={{ alignItems: 'center', display: 'flex', height: 32 }}
              style={{ minHeight: 32, width: 112 }}
              primaryText={
                <span
                  style={{
                    fontFamily: 'Open Sans',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    fontSize: 13,
                    color: 'rgb(97,97,97)'
                  }}
                >
                  View Post
                </span>
              }
              rightIcon={<ArrowDropRight style={{ height: 32, margin: 0 }} />}
              menuItems={post.PostResult.results
                .filter(r => r.account.platform !== 'Instagram')
                .map(({ account, response }) => (
                  <MenuItem
                    primaryText={account.platform}
                    onClick={() => {
                      if (response.error && `${response.state}` !== '1') {
                        return alert(`This post was unable to be submitted. (Error: ${response.error})`);
                      }
                      if (response.url.includes('twitter.com')) {
                        const sa = (() => {
                          const sap = post.SocialAccountPosts.find(
                            s => s.SocialAccount.platformId === account.platform_id
                          );
                          return sap ? sap.SocialAccount : null;
                        })();

                        if (sa) {
                          const id = `${response.url}`.split('/').pop();
                          window.open(`https://twitter.com/${sa.username}/status/${id}`, '_blank');
                        }
                      } else {
                        window.open(response.url, '_blank');
                      }
                    }}
                  />
                ))}
            />
          </FlatButton>
        ) : null,

        post.PostResult &&
        post.PostResult.results &&
        post.PostResult.results.length > 0 &&
        post.PostResult.results.filter(r => ['Facebook page', 'Twitter'].includes(r.account.platform)).length > 0 ? (
          <FlatButton style={{ marginLeft: 24 }}>
            <MenuItem
              innerDivStyle={{ alignItems: 'center', display: 'flex', height: 32 }}
              style={{ minHeight: 32, width: 126 }}
              primaryText={
                <span
                  style={{
                    fontFamily: 'Open Sans',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    fontSize: 13,
                    color: 'rgb(97,97,97)'
                  }}
                >
                  Delete Post
                </span>
              }
              rightIcon={<ArrowDropRight style={{ height: 32, margin: 0 }} />}
              menuItems={post.PostResult.results
                .filter(r => ['Facebook page', 'Twitter'].includes(r.account.platform))
                .map(({ account, response }) => (
                  <MenuItem
                    primaryText={account.platform}
                    onClick={async () => {
                      try {
                        if (
                          confirm(
                            `This will permanently delete this post from your ${account.platform}. Are you sure you wish to delete this?`
                          )
                        ) {
                          await deleteLivePost(
                            organization.id,
                            post.id,
                            (() => {
                              const sap = post.SocialAccountPosts.find(
                                s => s.SocialAccount.platformId === account.platform_id
                              );
                              return sap ? sap.SocialAccountId : null;
                            })()
                          );
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  />
                ))}
            />
          </FlatButton>
        ) : null,

        <FlatButton
          onClick={() => {
            handleReuse(post);
          }}
          label="Reuse Post"
          style={{ marginLeft: 24 }}
        />
      ];
    } else {
      //future scheduled post
      actions = [
        <FlatButton
          disabled={deletingPost}
          label={
            deletingPost ? (
              <i style={{ fontSize: 20 }} className="fa fa-spinner fa-spin" />
            ) : post.QueueId ? (
              'Replace Queued Post'
            ) : (
              'Delete Post'
            )
          }
          style={{ marginLeft: 24 }}
          onClick={() => handleDelete(post)}
        />,
        <FlatButton
          disabled={deletingPost}
          label="Edit Post"
          style={{ marginLeft: 24 }}
          onClick={() => handleEdit(post)}
        />
      ];
    }

    return actions;
  };

  const pastPost = event.post?.publishAt ? moment(event.post.publishAt).isBefore(moment()) : false;
  return (
    <Wrap>
      <PostWrap>
        <Date>
          {event.post.publishRange ? (
            <>
              <div>
                {moment(event.post.publishRange.start).format('ddd, M/D/YY')}
                <br />
                {moment(event.post.publishRange.start).format('h:mm a')}
              </div>
              <div style={{ fontFamily: 'Oswald', margin: '8px 0' }}>TO</div>
              <div>
                {moment(event.post.publishRange.end).format('ddd, M/D/YY')}
                <br />
                {moment(event.post.publishRange.start).format('h:mm a')}
              </div>
            </>
          ) : (
            moment(event.post.publishAt).format('ddd, M/D/YY')
          )}
        </Date>
        <Time>{event.post.publishRange ? 'Multi-day' : moment(event.post.publishAt).format('h:mm a')}</Time>
        <div style={{ borderLeft: '1px solid #dddddd', display: 'flex', flexDirection: 'column', width: '100%' }}>
          <PostListContent
            style={{ padding: 12 }}
            videoUrl={videoUrl}
            image={image}
            message={message}
            belowMessageContent={belowMessageContent}
          />
          <div style={{ alignItems: 'center', display: 'flex', paddingLeft: 12, paddingBottom: 12 }}>
            <FilterTypeWrap>
              <FilterTypeCircle bgColor={bgColor} />
              {filterName}
            </FilterTypeWrap>

            {event.post.type !== 'AD' && (
              <>
                <div style={{ display: 'flex', flex: '0 0 240px', marginRight: 36 }}>
                  <span style={{ fontSize: 13, marginRight: 8 }}>{pastPost ? 'Posted' : 'Posting'} to:</span>
                  <SocialNetworkIconBar
                    networks={new Set(event.post.platforms.map(p => (p.includes('linkedin') ? 'linkedin' : p)))}
                    iconSize="medium"
                    style={{ flex: '1 0 auto', flexWrap: 'nowrap', overflow: 'hidden' }}
                  />
                </div>
                {createActionButtons(event.post)}
              </>
            )}
          </div>
        </div>
      </PostWrap>
    </Wrap>
  );
}

export default AgendaEvent;
