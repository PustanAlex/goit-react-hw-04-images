const ImageGalleryItem = ({image, handleSelectedImg}) => {
    
    const handleClick = () => {
        handleSelectedImg(image.webformatURL);
    };

    return (
        <li className="ImageGalleryItem">
        <img
          className='ImageGalleryItem-image'
          src={image.webformatURL}
          alt={image.tags}
          onClick={handleClick} 
        />
      </li>
    )

}

export default ImageGalleryItem;