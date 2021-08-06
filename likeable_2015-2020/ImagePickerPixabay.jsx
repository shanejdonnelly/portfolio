import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import * as styles from './ImagePicker.scss';

export default class ImagePickerPixabay extends Component {
  constructor(props) {
    super(props);
    const key = '13292995-e70ed88611ab433d88f8f56bc';
    this.state = {
      images: [],
      searchValue: '',
      loading: false,
      hasMore: true,
      searchUrl: `https://pixabay.com/api/?key=${key}&image_type=photo&safesearch=true`,
      page: 1
    };

    // pre-populate images for better looking UI
    fetch(`https://pixabay.com/api/?key=${key}&image_type=photo&safesearch=true&q=`, {
      method: 'get'
    })
      .then(res => res.json())
      .then(response => {
        const images = response.hits;
        this.setState({
          images: this.state.images.concat(images)
        });
      });

    this.searchImages = _.debounce(this._searchImages, 500);
  }

  _searchImages = nextPage => {
    const { searchUrl, searchValue, page, loading } = this.state;
    if (searchValue.length < 1) {
      return;
    }
    if (loading) {
      return;
    }

    let url = `${searchUrl}&q=${searchValue.replace(' ', '+')}`;
    if (nextPage) {
      url += `&page=${nextPage}`;
    }

    this.setState({
      loading: true
    });
    fetch(url, {
      method: 'get'
    })
      .then(res => res.json())
      .then(response => {
        const images = response.hits;
        let hasMore = true;
        const { total, totalHits } = response;
        if (totalHits <= page * 20) {
          hasMore = false;
        }

        this.setState({
          images: this.state.images.concat(images),
          page: nextPage || 1,
          loading: false,
          hasMore
        });
      });
  };

  onSearchChange = event => {
    const value = event.target.value;
    event.stopPropagation();
    this.setState({
      searchValue: value,
      page: 1,
      images: []
    });
    if (value) {
      this.searchImages();
    }
  };

  onKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.reset();
    }
  };

  reset = () => {
    this.setState({ searchValue: '' });
  };

  loadMore = () => {
    const { searchValue, page } = this.state;
    const nextPage = parseInt(page) + 1;
    if (searchValue) {
      this.searchImages(nextPage);
    }
  };

  render() {
    const { images, loading, hasMore } = this.state;
    const { handleSelectImage, selectedImages } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <div className={styles.pixabayWrapper} style={images.length ? { height: 400 } : { height: 100 }}>
          <TextField
            value={this.state.searchValue}
            onChange={this.onSearchChange}
            onKeyDown={this.onKeyDown}
            defaultValue="Search Images..."
            fixedFloatingLabel
            floatingLabelText="Search Stock Images"
            style={{ marginLeft: 214 }}
          />
          {!!images.length && (
            <div className={styles.pixabayContentWrap}>
              <InfiniteScroll
                loadMore={this.loadMore}
                hasMore={!loading && hasMore}
                initialLoad={false}
                useWindow={false}
                threshold={700}
                style={{ borderTop: '1px solid rgb(224, 224, 224)' }}
              >
                {images.map((image, index) => (
                  <div
                    key={`image_${index}`}
                    className={`${styles.pixabayImage} ${
                      _.some(selectedImages, image) ? styles.selectedPixabayImage : ''
                    }`}
                    style={{ backgroundImage: `url(${image.previewURL})` }}
                    onClick={() => {
                      handleSelectImage(image);
                    }}
                  />
                ))}
              </InfiniteScroll>
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 13,
            color: '#333333',
            margin: 8,
            padding: '4px 8px 2px'
          }}
        >
          POWERED BY
          <a href="https://pixabay.com/" target="_blank" rel="noopener">
            <img
              style={{
                height: 32,
                marginLeft: 8
              }}
              src="https://s3.amazonaws.com/likeabucket/user_upload/216/E4N9_ORlK.png"
            />
          </a>
        </div>
      </div>
    );
  }
}

ImagePickerPixabay.defaultProps = {
  placeholder: 'Search for images',
  imagePlaceholderColor: '#000000',
  loader: <p>Loading...</p>
};
