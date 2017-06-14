import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { archiveConversation } from 'redux/modules/messageCenter';
import PostPreview from './PostPreview';
import { FBBody, FBComment, FBHeader, FBReplyField, InstagramComment } from 'components/SocialPreviews';
import { SecondaryButton } from 'components';
import * as styles from './Conversation.scss';

@connect(
  state => ({
    organization: state.organization.current,
    theme: state.theme
  }),
  { archiveConversation }
)
class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 0, showCommentInput: false };
  }

  static defaultProps = {
    thread: {}
  };

  static propTypes = {
    archiveConversation: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired,
    thread: PropTypes.object
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.thread && nextProps.thread) {
      if (this.props.thread.Messages.length !== nextProps.thread.Messages.length) {
        this.setState({ showCommentInput: false });
      }
    }
  };
  /** *********************************************************************************************

  EVENT HANDLER METHODS

************************************************************************************************/

  handleDelete = () => {
    this.props.archiveConversation(this.props.organization.id, this.props.thread.id);
  };

  /** *********************************************************************************************

  RENDER METHODS

************************************************************************************************/

  renderFBComment = (comment, key) => {
    const thread = this.props.thread;
    let replies = null;
    let commentStyle = { opacity: 1 };
    const replyStyle = { opacity: 1 };

    if (comment.Messages) {
      if (comment.Messages.length) {
        replies = comment.Messages.map((reply, index) => (
          <FBComment
            togglePostLike={this.props.handlePostToggleLike}
            key={index}
            isReply
            comment={reply}
            style={replyStyle}
            conversationId={comment.ConversationId}
            parent={thread.parentEntity}
          />
        ));
      }
    }
    return (
      <div className={styles.commentWrap}>
        <FBComment
          togglePostLike={this.props.handlePostToggleLike}
          comment={comment}
          replies={replies}
          key={key}
          style={commentStyle}
          conversationId={comment.ConversationId}
          parent={thread.parentEntity}
        />
      </div>
    );
  };

  renderFBReview = (review, index) => {
    const thread = this.props.thread;
    let replies = null;

    if (review.Messages) {
      if (review.Messages.length) {
        replies = review.Messages.map((reply, index) => (
          <FBComment
            key={index}
            isReply
            comment={reply}
            conversationId={thread.Messages[0].ConversationId}
            parent={thread.parentEntity}
          />
        ));
      }
    }
    return (
      <div className={styles.commentWrap}>
        <FBComment
          comment={review}
          replies={replies}
          key={index}
          conversationId={thread.Messages[0].ConversationId}
          parent={thread.parentEntity}
        />
      </div>
    );
  };

  renderFBDM = (msg, parentEntity, index) => {
    const owner = msg.authorPlatformId !== parentEntity.facebookId;
    const alignSelf = owner ? 'flex-end' : 'flex-start';
    const backgroundColor = owner ? '#4080ff' : '#f1f0f0';
    const color = owner ? 'white' : 'black';

    if (msg.details && msg.details.message && msg.details.message.attachments) {
      const atts = msg.details.message.attachments;
      let images = atts.map((a, index) => {
        if (a.type === 'image') {
          return <img style={{ alignSelf }} src={a.payload.url} key={index} />;
        }
        return <div key={index} />;
      });

      if (msg.text) {
        images = [
          <h3 className={styles.dmItem} key={index} style={{ alignSelf, backgroundColor, color }}>
            {msg.text}
          </h3>,
          ...images
        ];
      }
      return images;
    }
    return (
      <h3 className={styles.dmItem} key={index} style={{ alignSelf, backgroundColor, color }}>
        {msg.text}
      </h3>
    );
  };

  renderInstagramComment = (msg, index) => (
    <div className={styles.commentWrap}>
      <InstagramComment comment={msg} key={index} />
    </div>
  );

  render() {
    const { thread } = this.props;
    const modelName = thread ? thread.ObjectType.modelName : null;
    let buttonText = 'Comment';
    let convo;
    let isDM = false;

    if (modelName === 'FacebookObject') {
      const type = thread ? thread.parentEntity.facebookObjectType : null;
      if (type === 'PAGE_POST') {
        convo = thread.Messages.map((msg, index) => this.renderFBComment(msg, index));
      } else if (type === 'USER_PROFILE') {
        buttonText = 'Reply';
        isDM = true;
        convo = (
          <div className={styles.dmWrap}>
            {thread.Messages.map((msg, index) => this.renderFBDM(msg, thread.parentEntity, index))}
          </div>
        );
      } else if (type === 'PAGE_RATING') {
        convo = (
          <div className={styles.reviewWrap}>
            {thread.Messages.map((msg, index) => this.renderFBReview(msg, index))}
          </div>
        );
      } else {
        // no thread
        convo = null;
      }
    } else if (modelName === 'InstagramObject') {
      convo = thread.Messages.map((msg, index) => this.renderInstagramComment(msg, index));
    }

    return (
      <div>
        {convo}
        {this.state.showCommentInput &&
          <FBReplyField conversationId={thread.id} parent={thread.parentEntity} isDM={isDM} />}

        {thread &&
          <div className={styles.replyWrap}>
            <SecondaryButton
              type="button"
              label={this.state.showCommentInput ? 'Cancel' : buttonText}
              onClick={() => this.setState({ showCommentInput: !this.state.showCommentInput })}
              style={{ marginTop: 12 }}
            />
          </div>}
      </div>
    );
  }
}

export default Conversation;
