document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const giveRatingBtn = document.getElementById('give-rating-btn');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const stepSuccess = document.getElementById('step-success');
    const reviewForm = document.getElementById('review-form');
    
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating-value');
    const rentalIdInput = document.getElementById('rental-id');
    const commentInput = document.getElementById('comment');
    
    const popup = document.getElementById('error-popup');
    const popupMessage = document.getElementById('popup-message');
    const closePopupBtn = document.getElementById('close-popup');

    // State
    let currentRating = 0;

    // --- Switch from Step 1 to Step 2 ---
    giveRatingBtn.addEventListener('click', () => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
    });

    // Helper to set rating
    function setRating(value) {
        currentRating = value;
        ratingInput.value = currentRating;
        clearClass('hover');
        highlightStars(currentRating, 'selected');
    }

    // --- Star Rating Handlers ---
    stars.forEach((star) => {
        const value = parseInt(star.dataset.value, 10);

        // Hovering over stars
        star.addEventListener('mouseover', () => {
            clearClass('selected');
            highlightStars(value, 'hover');
        });

        // Hover exit -> restore active selection
        star.addEventListener('mouseout', () => {
            clearClass('hover');
            if (currentRating > 0) {
                highlightStars(currentRating, 'selected');
            }
        });

        // Click to set rating
        star.addEventListener('click', () => {
            setRating(value);
        });

        // Keyboard accessibility (Space or Enter)
        star.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setRating(value);
            }
        });
    });

    function highlightStars(count, className) {
        stars.forEach((star) => {
            const value = parseInt(star.dataset.value, 10);
            if (value <= count) {
                star.classList.add(className);
            } else {
                star.classList.remove(className);
            }
        });
    }

    function clearClass(className) {
        stars.forEach((star) => star.classList.remove(className));
    }

    // --- Popup Error Dispatcher ---
    function showError(message) {
        popupMessage.textContent = message;
        popup.classList.remove('hidden');
    }

    closePopupBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // --- Form Validation ---
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const rating = parseInt(ratingInput.value, 10);
        const rentalId = rentalIdInput.value.trim();
        const comment = commentInput.value.trim();

        // 1. Star Rating check (Must be between 1 and 5)
        if (isNaN(rating) || rating < 1 || rating > 5) {
            showError('Validation Error: Please select at least 1 star before submitting.');
            return;
        }

        // 2. Rental ID empty check
        if (!rentalId) {
            showError('Validation Error: Rental Reference Code cannot be empty.');
            return;
        }

        // 3. Rental ID length check
        if (rentalId.length < 3) {
            showError('Validation Error: Rental Code is too short (minimum 3 characters required).');
            return;
        }

        // 4. Comment length check
        if (comment.length > 0 && comment.length < 5) {
            showError('Validation Error: Comment is too short! Please provide more detail or leave blank.');
            return;
        }

        // Success state execution
        popup.classList.add('hidden');
        step2.classList.add('hidden');
        stepSuccess.classList.remove('hidden');
    });
});
