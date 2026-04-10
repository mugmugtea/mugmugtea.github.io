const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal-overlay');

// 點擊卡片打開對應的模態框
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    });
});

// 點擊背景空白處關閉模態框
modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});
