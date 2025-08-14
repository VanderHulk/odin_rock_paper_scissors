const buttons = document.querySelectorAll('.btn__hand');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('wiggling'));
        btn.classList.add('wiggling');
    });
});