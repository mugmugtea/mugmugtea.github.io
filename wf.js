const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal-overlay');
const closeButtons = document.querySelectorAll('.modal-overlay .close-area');
let activeModal = null;
let historyStatePushed = false;

function closeActiveModal() {
    if (!activeModal) {
        return;
    }
    activeModal.classList.remove('show');
    activeModal = null;
}

function openModal(modal) {
    if (!modal || activeModal === modal) {
        return;
    }

    if (activeModal && activeModal !== modal) {
        activeModal.classList.remove('show');
    }

    if (!history.state || history.state.modal !== modal.id) {
        history.pushState({ modal: modal.id }, '', `#${modal.id}`);
        historyStatePushed = true;
    }

    activeModal = modal;
    modal.classList.add('show');
}

function handleModalCloseRequest() {
    if (!activeModal) {
        return;
    }
    if (historyStatePushed) {
        history.back();
    } else {
        closeActiveModal();
    }
}

// 初始化第一個 history state，確保後退時仍留在本頁
window.addEventListener('load', () => {
    history.replaceState({ modal: null }, '', window.location.href);
});

window.addEventListener('popstate', (event) => {
    const state = event.state;
    if (!state || !state.modal) {
        closeActiveModal();
        historyStatePushed = false;
        return;
    }

    const targetModal = document.getElementById(state.modal);
    if (targetModal) {
        openModal(targetModal);
    }
});

// 點擊卡片打開對應的模態框
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            openModal(modal);
        }
    });
});

// 點擊背景空白處關閉模態框
modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            handleModalCloseRequest();
        }
    });
});

// 點擊 X 關閉按鈕
closeButtons.forEach(button => {
    button.addEventListener('click', handleModalCloseRequest);
});
