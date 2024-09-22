import React from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";

const SearchResultCard = (props) => {
  const { productDetail, images, category, ratings } = props;
  return (
    <div className="search-result-card">
      <div className="h-[350px] overflow-hidden relative">
        <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 rounded-t-2xl text-white">
          <h3 className="text-xl font-semibold">{category}</h3>
        </div>
        {images.map((img, index) => (
          <img
            className="object-cover w-full h-full"
            src={img.url}
            alt={img}
            key={index}
          />
        ))}
      </div>
      <div className="content">
        <h1>{productDetail.name}</h1>
        <p>{productDetail.kitchen}</p>
        <span>{productDetail.description.slice(0, 20)}</span>
      </div>
      <div className="footer">
        <span className="flex items-center">
          Puan:
          <StarRatings
            rating={ratings}
            name="rating"
            starDimension="14px"
            starSpacing="1px"
            starRatedColor="#ffb829"
          />
        </span>
        <span>Fiyat:{productDetail.price.toFixed(2)}₺</span>
      </div>
    </div>
  );
};
SearchResultCard.propTypes = {
  productDetail: PropTypes.shape({
    name: PropTypes.string,
    kitchen: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
  category: PropTypes.string,
  ratings: PropTypes.number,
};
export default SearchResultCard;
