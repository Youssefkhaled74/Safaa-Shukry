// Add the real public links here when available.
const config = { phone: '201553678171', youtube: 'https://youtu.be/NscQ3lkaeZU?si=W9MOfRQ25b8vRVK6', email: '' };
const languageButton = document.querySelector('#language');
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(el => { el.innerHTML = el.dataset[lang]; });
  languageButton.textContent = lang === 'ar' ? 'English ↗' : 'العربية ↗';
  languageButton.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل للعربية');
  document.title = lang === 'ar' ? 'صفاء شكري | الكيمياء ببساطة' : 'Safaa Shukry | Chemistry made clear';
  try { localStorage.setItem('safaa-language', lang); } catch {}
  document.querySelector('#form-status').textContent = '';
}
languageButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
let savedLanguage; try { savedLanguage = localStorage.getItem('safaa-language'); } catch {}
setLanguage(savedLanguage === 'en' ? 'en' : 'ar');
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-grade]').forEach(link => link.addEventListener('click', () => { document.querySelector('[name=grade]').value = link.dataset.grade; }));
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const ar = document.documentElement.lang === 'ar';
  if (!String(data.get('student')).trim()) { form.elements.student.setCustomValidity(ar ? 'اكتب اسم الطالب' : 'Please enter the student name'); form.elements.student.reportValidity(); return; }
  const message = ar
    ? `مرحبًا مس صفاء، أريد الاستفسار عن الحجز.\nاسم الطالب: ${String(data.get('student')).trim()}\nرقم الموبايل: ${data.get('phone')}\nالصف: ${form.elements.grade.selectedOptions[0].textContent}\nنوع الطلب: ${data.get('type')}\n${String(data.get('note')).trim()}`
    : `Hello Mrs. Safaa, I'd like to inquire about a booking.\nStudent: ${String(data.get('student')).trim()}\nPhone: ${data.get('phone')}\nYear: ${form.elements.grade.selectedOptions[0].textContent}\nRequest: ${data.get('type')}\n${String(data.get('note')).trim()}`;
  const url = `https://wa.me/${config.phone}?text=${encodeURIComponent(message)}`;
  const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener'; link.click();
  const status = document.querySelector('#form-status');
  status.textContent = ar ? 'طلبك جاهز. لو واتساب ما فتحش، ' : 'Your request is ready. If WhatsApp did not open, ';
  const retry = document.createElement('a'); retry.href = url; retry.target = '_blank'; retry.rel = 'noopener'; retry.textContent = ar ? 'اضغط هنا' : 'click here'; retry.style.textDecoration = 'underline'; status.append(retry);
});
document.querySelector('[name=student]').addEventListener('input', event => event.target.setCustomValidity(''));
const dialog = document.querySelector('#image-dialog');
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => { const img = document.querySelector('#dialog-image'); img.src = button.dataset.image; img.alt = button.querySelector('img').alt; dialog.showModal(); }));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
if (config.youtube) { document.querySelector('#youtube-link').href = config.youtube; document.querySelector('#youtube-link').dataset.ar = 'شاهد على YouTube ↗'; document.querySelector('#youtube-link').dataset.en = 'Watch on YouTube ↗'; const hint = document.querySelector('.muted'); if (hint) hint.hidden = true; }
if (config.email) { const container = document.querySelector('#email-contact'); const link = document.createElement('a'); link.href = `mailto:${config.email}`; link.textContent = config.email; container.querySelector('strong').replaceChildren(link); container.querySelector('strong').removeAttribute('data-ar'); container.querySelector('strong').removeAttribute('data-en'); }
setLanguage(document.documentElement.lang);
