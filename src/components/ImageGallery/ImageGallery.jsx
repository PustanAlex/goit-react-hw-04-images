import React, { useState, useEffect, useCallback } from "react";
import Button from "components/Button/Button";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Loader from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import SearchBar from "components/SearchBar/SearchBar";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQueryParam, setSearchQueryParam] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [iconsPerPage, setIconsPerPage] = useState(12);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchImage = useCallback(() => {
    const API_KEY = "43501408-f2ca706ad0af36d7ba8bbed94";
    const URL = `https://pixabay.com/api/?q=${submittedQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${iconsPerPage}`;
    setLoading(true);

    fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      if (pageNumber === 1) {
        setImages(data.hits);
      } else {
        setImages((prevImages) => [...prevImages, ...data.hits]);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
      setError(error.message);
      setLoading(false);
    });
}, [submittedQuery, pageNumber, iconsPerPage]);

  useEffect(() => {
    setIconsPerPage(12);
    fetchImage();
  }, [fetchImage]);

  const handleSearchInput = (e) => {
    setSearchQueryParam(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQueryParam);
    setIconsPerPage(12);
    setPageNumber(1);
  };

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleSelectedImg = (imageURL) => {
    setSelectedImg(imageURL);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar
        handleSubmit={handleSubmit}
        handleSearchInput={handleSearchInput}
      />
      <ul className="ImageGallery">
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            handleSelectedImg={handleSelectedImg}
          />
        ))}
      </ul>
      <Button handleLoadMore={handleLoadMore} />
      {selectedImg && (
        <Modal
          imageURL={selectedImg}
          onClose={handleCloseModal}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default ImageGallery;
