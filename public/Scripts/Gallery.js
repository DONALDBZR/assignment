let slideIndex = 0;
// Calling the show Slides function
showSlides();
// Show Slide function
function showSlides() {
    // Local variables
    let index;
    let slides = document.getElementsByClassName("card");
    // For-loop for not displaying the image at the current index
    for (index = 0; index < slides.length; index++) {
        slides[index].style.display = "none";
    }
    slideIndex++;
    // If-statement to verify whether the slide index is greater than the slides's size
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    // Showing the slides
    slides[slideIndex - 1].style.display = "flex";
    setTimeout(showSlides, 2000);
}
