import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  // API'den gelen resim URL'lerini saklayacak state'i tanımla
  const [images, setImages] = useState([]);
  // Anlık olarak görüntülenen resmin index'ini saklayacak state'i tanımla
  const [currentIndex, setCurrentIndex] = useState(0);

  // Bileşen yüklendiğinde API'den verileri almak için useEffect hook'u kullan
  useEffect(() => {
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
      .then(response => response.json())
      .then(data => {
        // API'den gelen veriyi işleyerek sadece resim URL'lerini al
        const photoUrls = data.photos.map(photo => photo.img_src);
        // Resim URL lerini statee kaydet
        setImages(photoUrls);
      })
      .catch(error => console.error(error));
  }, []); // Bu useEffect, component yüklendiğinde yalnızca bir kez çalışacak

  // Sonraki resme geçişi sağlayan fonksiyon
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  // Önceki resme geçişi sağlayan fonksiyon
  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  // Noktalardan birine tıklanınca ilgili resme geçişi sağlayan fonksiyon
  const handleDotClick = index => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      {/* Resimlerin geçişlerini sağlayan animasyonlu bileşen */}
      <AnimatePresence>
        <motion.img 
          key={images[currentIndex]} // Anlık olarak görüntülenen resmin URL'sini key olarak kullan
          src={images[currentIndex]} // Anlık olarak görüntülenen resmin URL'sini src olarak kullan
          initial={{ opacity: 0 }} // Başlangıç animasyonu
          animate={{ opacity: 1 }} // Görünür animasyonu
          exit={{ opacity: 0 }} // Çıkış animasyonu
        />
      </AnimatePresence>
      
      <div className="slide_direction">
        <div className="left" onClick={handlePrevious}>
        </div>
        <div className="right" onClick={handleNext}>
        </div>
      </div>

      
      <div className="indicator">
        {/* Her resim için bir nokta  */}
        {images.map((_, index) => (
          <motion.div
            key={index} // Her noktanın key'i, resim dizinini temsil eder
            className={`dot ${currentIndex === index ? "active" : ""}`} // Aktif nokta için "active" class'ını ekle
            onClick={() => handleDotClick(index)} // Noktaya tıklandığında ilgili resme geçişi sağlayan fonksiyonu çağır
            initial={{ opacity: 0 }} // Başlangıç animasyonu
            animate={{ opacity: 1 }} // Görünür animasyonu
            exit={{ opacity: 0 }} // Çıkış animasyonu
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
