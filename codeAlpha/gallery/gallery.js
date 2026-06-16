/*const images = document.querySelectorAll(".gallery img");
const popup = document.querySelector(".popup");
const popupImg = document.querySelector(".popup-img");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
    img.addEventListener("click", () => {
        popup.style.display = "flex";
        popupImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
    if(e.target === popup){
        popup.style.display = "none";
    }
});

const search = document.getElementById("search");

search.addEventListener("keyup", () => {
    let value = search.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        card.style.display =
        card.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
    });
});
document.querySelectorAll(".filter-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        let category = btn.dataset.category;

        document.querySelectorAll(".card")
        .forEach(card => {

            if(category === "all" ||
               card.classList.contains(category))
                card.style.display = "block";
            else
                card.style.display = "none";
        });
    });
});*/
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const lightboxTitle = document.querySelector(".lightbox-title");
    const lightboxCategory = document.querySelector(".lightbox-category");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let activeItems = [...galleryItems]; // Keeps track of currently filtered items
    let currentIndex = 0;

    /* --- 1. Dynamic Categorized Filtering --- */
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Switch active class on buttons
            document.querySelector(".filter-btn.active").classList.remove("active");
            button.classList.add("active");

            const targetCategory = button.getAttribute("data-target");

            // Filter items logic
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                if (targetCategory === "all" || itemCategory === targetCategory) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });

            // Update active items list for lightbox navigation sync
            activeItems = galleryItems.filter(item => !item.classList.contains("hide"));
        });
    });

    /* --- 2. Advanced Lightbox Logic --- */
    const updateLightbox = (index) => {
        const currentItem = activeItems[index];
        const imgElement = currentItem.querySelector("img");
        const titleText = currentItem.querySelector("h3").innerText;
        const categoryText = currentItem.querySelector(".category").innerText;

        // Populate Lightbox data
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        lightboxTitle.innerText = titleText;
        lightboxCategory.innerText = categoryText;
        currentIndex = index;
    };

    // Open Lightbox on image click
    galleryItems.forEach(item => {
        item.querySelector(".image-box").addEventListener("click", () => {
            // Find current item index within the active/filtered dataset
            currentIndex = activeItems.indexOf(item);
            if (currentIndex !== -1) {
                updateLightbox(currentIndex);
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent page scrolling
            }
        });
    });

    // Close Lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox(); // Close if clicking outside the image container
    });

    /* --- 3. Lightbox Navigation (Next/Prev) --- */
    const showNext = () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= activeItems.length) nextIndex = 0; // Loop back to start
        updateLightbox(nextIndex);
    };

    const showPrev = () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = activeItems.length - 1; // Loop to the end
        updateLightbox(prevIndex);
    };

    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });

    /* --- 4. Keyboard Support --- */
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });
});