import React, { useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";

export const App = () => {
  const [state, setState] = useState(
    {
      inputValue: '',
      modalImg: '',
      showModal: false,
      page: 1,
    }
  );

  const { inputValue, modalImg, showModal ,page} = state;

  const getInputValue = handleValue => {
    setState({ ...state, inputValue: handleValue, page: 1 })
  }

  const toggleModal = () => {
    setState({...state, showModal: !showModal })
  }

  const getLargeImg = url => {
    toggleModal();
    setState({ ...state, modalImg: url });
  }

  const loadMoreBtn = () => {
    setState({
      ...state, 
      page: state.page + 1,
    });
  };

  return (
    <>
      <Searchbar getInputValue={getInputValue}/>
      <ImageGallery inputValue={inputValue} onClick={getLargeImg} loadMoreBtn={loadMoreBtn} page={page}/>
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </>
  )
}

export default App;