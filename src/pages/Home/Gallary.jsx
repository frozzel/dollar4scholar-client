import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import girl1 from "../../assets/img/blog/blog-recent-6.jpg"
import girl2 from "../../assets/img/blog/blog-recent-7.jpg"
import girl3 from "../../assets/img/blog/blog-recent-8.jpg"
import girl4 from "../../assets/img/blog/blog-recent-9.jpg"
import girl5 from "../../assets/img/blog/blog-recent-10.jpg"
import girl6 from "../../assets/img/blog/blog-recent-2.jpg"



const images = [
  {
    original: `${girl3}`,
    thumbnail: `${girl3}`,
  },
  {
    original: `${girl2}`,
    thumbnail: `${girl2}`,
  },
  {
    original: `${girl1}`,
    thumbnail: `${girl1}`,
  },
  {
    original: `${girl4}`,
    thumbnail: `${girl4}`,
  },
  {
    original: `${girl5}`,
    thumbnail: `${girl5}`,
  },
  {
    original: `${girl6}`,
    thumbnail: `${girl6}`,
  },
];

export default function MyGallery() {
    const falseValue = false;
    const trueValue = true;
   

    return (
    
    <ImageGallery items={images} 
    showNav={falseValue} 
    showThumbnails={falseValue} 
    showFullscreenButton={falseValue}  
    showPlayButton={falseValue}
    showBullets={trueValue}
    autoPlay={trueValue}
    />
   
    );
    }