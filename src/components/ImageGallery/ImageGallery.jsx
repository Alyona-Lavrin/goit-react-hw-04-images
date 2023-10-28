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
    async function fetchLoad() {
      try {
        const response = await getImages(inputValue, page)
        setState({
          images: response.hits,
          total: response.totalHits,
          status: 'resolve',
          inputValue: inputValue,
        });
      } catch (error) {
        setState(
          { 
            ...state, 
            status: 'rejected', 
            inputValue: inputValue
          }
        )
      }
    };

    if (state.inputValue !== inputValue && inputValue !== '') {
      fetchLoad();
    }

    async function fetchLoadMore() {
      try {
        const response = await getImages(inputValue, page);
        setState(
          {
            ...state,
            images: [...state.images, ...response.hits],
            status: 'resolve',
            page: page,
          }
        );
      } catch (error) {
        setState({ ...state, status: 'rejected', page: page })
      }
    };

    if (state.page !== page && page > 1) {
      fetchLoadMore();
    }
  }, [state, inputValue, page]);

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