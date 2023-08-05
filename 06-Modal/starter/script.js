'use strict';

// Select the elements of interest.
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

// Create a function that uses the event listener method to open the modal window.
const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

// Create a function that uses the event listener method to close the modal window.
const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

// Add an event listener to each one of the buttons selected (only the ones that show the modal).
for (let i = 0; i < btnOpenModal.length; i++) {
	btnOpenModal[i].addEventListener('click', openModal);
}

// Add an event listener to the close button.
btnCloseModal.addEventListener('click', closeModal);

// Add an event listener to the overlay, so that the modal window is closed when the user clicks outside of it.
overlay.addEventListener('click', closeModal);

// Adding keyboard events
document.addEventListener('keydown', function (e) {
	// Accessing the event object to obtain the name of the key, and using it to check if the pressed key was Esc.
	// We can only close the modal when it isn't hidden.
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});
