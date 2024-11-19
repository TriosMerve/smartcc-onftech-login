var wWidth = $(window).width();

$(window).on("load", function () {
  if ($(".preloader").length) {
    $(".preloader").addClass("last");
    setTimeout(() => {
      $(".preloader").remove();
    }, 100);
  }
});

function setVh() {
    const vh = Math.max(window.innerHeight, document.documentElement.clientHeight) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Sayfa yüklendiğinde ve ekran yeniden boyutlandırıldığında çalıştır
window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);


document.addEventListener('DOMContentLoaded', function () {
    // Tüm formları seç
    const forms = document.querySelectorAll('.form');

    forms.forEach((form) => {
        const errorMessage = form.querySelector('.errorMessage');  // errorMessage'ı burada tanımlayın
        const errorText = errorMessage.querySelector('span');  // errorText'i burada tanımlayın

        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Formun varsayılan gönderilme işlemini engelle

            // Form içindeki gerekli alanları seç
            const emailField = form.querySelector('#email');
            const userNameField = form.querySelector('#userName');
            const passwordField = form.querySelector('#password');
            // const passwordAgainField = form.querySelector('#passwordAgain');

            let hasError = false;
            let errorMessages = []; // Tüm hata mesajlarını toplamak için bir dizi

            // Hata mesajlarını sıfırla
            form.querySelectorAll('.position-relative').forEach((field) => {
                field.classList.remove('error');
            });
            errorMessage.classList.remove('active');
            errorText.innerHTML = '';

            // Email doğrulaması (email alanı varsa)
            if (emailField) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailField.value.trim()) {
                    emailField.closest('.position-relative').classList.add('error');
                    errorMessages.push(`Email alanı boş olamaz.`);
                    hasError = true;
                } else if (!emailRegex.test(emailField.value.trim())) {
                    emailField.closest('.position-relative').classList.add('error');
                    errorMessages.push(`Lütfen geçerli bir e-posta adresi girin.`);
                    hasError = true;
                }
            }

            // Kullanıcı adı kontrolü (userName alanı varsa)
            if (userNameField) {
                if (!userNameField.value.trim()) {
                    userNameField.closest('.position-relative').classList.add('error');
                    errorMessages.push(`Kullanıcı adı boş olamaz.`);
                    hasError = true;
                }
            }

            // Şifre kontrolü (password alanı varsa)
            if (passwordField) {
                if (!passwordField.value.trim()) {
                    passwordField.closest('.position-relative').classList.add('error');
                    errorMessages.push(`Şifre alanı boş olamaz.`);
                    hasError = true;
                }
            }

            // Şifre tekrar kontrolü (passwordAgain alanı varsa)
            // if (passwordAgainField) {
            //     if (!passwordAgainField.value.trim()) {
            //         passwordAgainField.closest('.position-relative').classList.add('error');
            //         errorMessages.push(`Şifre tekrar alanı boş olamaz.`);
            //         hasError = true;
            //     } else if (passwordField && passwordAgainField.value.trim() !== passwordField.value.trim()) {
            //         passwordAgainField.closest('.position-relative').classList.add('error');
            //         errorMessages.push(`Girilen şifreler eşleşmiyor.`);
            //         hasError = true;
            //     }
            // }

            // Hata varsa mesajları göster
            if (hasError) {
                errorMessage.classList.add('active');
                errorText.innerHTML = `<b>Hatalar:</b><ul>` + errorMessages.map(msg => `<li>${msg}</li>`).join('') + `</ul>`;
            } else {
                // Hata yoksa işlem başarılı
                errorMessage.classList.remove('active');
                errorText.innerHTML = ''; // Hata mesajını sıfırla
                alert('Form başarıyla gönderildi!');
            }
        });

        // Şifre göster/gizle işlevi
        const togglePasswordButton = form.querySelector('.togglePassword');
        const passwordField = form.querySelector('#password');
        if (togglePasswordButton && passwordField) {
            togglePasswordButton.addEventListener('click', function () {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text'; // Parolayı görünür hale getir
                    this.innerHTML = '<span class="icon-eye-cancel"></span>'; // İkonu "Hide" olarak değiştir
                } else {
                    passwordField.type = 'password'; // Parolayı gizle
                    this.innerHTML = '<span class="icon-eye"></span>'; // İkonu "Show" olarak değiştir
                }
            });
        }

        // Hata mesajını kapatma işlevi
        const closeButton = form.querySelector('.closeButton');
        if (closeButton) {
            closeButton.addEventListener('click', function (e) {
                e.preventDefault();
                errorMessage.classList.remove('active');  // Burada errorMessage'ı kullanabilirsiniz
            });
        }
    });
});

