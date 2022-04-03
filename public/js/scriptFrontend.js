//========= modal box - personal information =========
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');

const hiddenModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

try {
  btnsOpenModal.addEventListener("click", () => {
    openModal();
  });
   
  btnCloseModal.addEventListener("click", () => {
    hiddenModal();
  });
  
  overlay.addEventListener("click", () => {
    hiddenModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      openModal();
    }
  });
}
catch(err) {

}
