import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface ProductImageGalleryProps {
  images: string[];
}

const CustomCarousel: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const maxIndex = images.length - 1;
  const theme = useTheme();

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const handleBack = () => {
    setSelectedIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;
      if (Math.abs(delta) > 50) {
        delta > 0 ? handleNext() : handleBack();
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", userSelect: "none" }}>
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{ position: "relative" }}
      >
        <Card raised sx={{ borderRadius: 3, overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={images[selectedIndex]}
            alt={`Producto ${selectedIndex + 1}`}
            sx={{
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Card>

        <IconButton
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(46, 7, 7, 0.6)",
            "&:hover": { bgcolor: "rgba(107, 102, 102, 0.48)" },
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(46, 7, 7, 0.6)",
            "&:hover": { bgcolor: "rgba(107, 102, 102, 0.48)" },
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>

      <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        {images.map((img, index) => (
          <Grid item key={index}>
            <Box
              component="img"
              src={img}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                border:
                  selectedIndex === index
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                transition: "border 0.3s",
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        {selectedIndex + 1} de {images.length}
      </Typography>
    </Box>
  );
};

export default CustomCarousel;
