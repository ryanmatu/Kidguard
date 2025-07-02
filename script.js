const scanBtn = document.getElementById('scanBtn');
const otpBtn = document.getElementById('otpBtn');
const otpField = document.getElementById('otpField');

scanBtn.addEventListener('click', () => {
  otpField.style.display = 'none';
  scanBtn.classList.add('active');
  otpBtn.classList.remove('active');
});

otpBtn.addEventListener('click', () => {
  otpField.style.display = 'block';
  otpBtn.classList.add('active');
  scanBtn.classList.remove('active');
});



