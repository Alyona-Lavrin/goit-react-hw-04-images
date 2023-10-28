import { useEffect, useState } from 'react';
import s from './ImageGallery.module.css';
import getImages from '../../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export const ImageGallery = ({onClick, inputValue, page, loadMoreBtn}) => {
  const [state, setState] = useState(
    {
      images: [],
      total: 0,
      status: 'idle',
    }
  );

  useEffect(() => {
    if (inputValue !== '') {
      fetchLoad();
    }
  }, [inputValue]);

  useEffect(() => {
    if (page > 1) {
      fetchLoadMore();
    }
  }, [page])

  const fetchLoad = () => {
    getImages(inputValue, page)
      .then(response => {
        setState({
          images: response.hits,
          total: response.totalHits,
          status: 'resolve',
        });
      })
      .catch(error => setState({ ...state, status: 'rejected' }));
  };

  const fetchLoadMore = () => {
    getImages(inputValue, page)
      .then(response => {
        setState(
          {
            ...state,
            images: [...state.images, ...response.hits],
            status: 'resolve',
          }
        );
      })
      .catch(error => setState({ ...state, status: 'rejected' }));
  };

  const { images, status } = state;

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolve') {
    return (
      <>
        <ul className={s.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
        {images.length !== 0 ? (
          <Button onClick={loadMoreBtn} disabled={images.length === state.total} />
        ) : (
          alert('No results')
        )}
      </>
    );
  }
}