// ============================================================
// CONFIGURATION - Update these with your details
// ============================================================

// EmailJS (free at https://www.emailjs.com - 200 emails/month)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';       // EmailJS > Account > Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // EmailJS > Email Services > Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // EmailJS > Email Templates > Template ID

// Business WhatsApp (country code + number, no + or spaces)
const BUSINESS_WHATSAPP = '917736761067';           // Your WhatsApp number

// Clinic name
const CLINIC_NAME = 'Shanthi Wellness Medical Center';

// ============================================================
// APP LOGIC
// ============================================================

// Initialize EmailJS
(function () {
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

// Form submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');

    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const treatment = document.getElementById('treatment').value;
    const message = document.getElementById('message').value.trim();

    // Format date nicely
    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Email template parameters
    const templateParams = {
        to_email: email,
        to_name: name,
        phone: phone,
        date: formattedDate,
        time: time,
        treatment: treatment,
        message: message || 'None',
        clinic_name: CLINIC_NAME
    };

    // Show success page
    function showSuccess() {
        // Populate booking summary
        document.getElementById('summaryName').textContent = name;
        document.getElementById('summaryTreatment').textContent = treatment;
        document.getElementById('summaryDate').textContent = formattedDate;
        document.getElementById('summaryTime').textContent = time;
        document.getElementById('summaryEmail').textContent = email;

        // Switch to thank you view
        document.getElementById('formSection').classList.add('hidden');
        document.getElementById('thankYouSection').classList.remove('hidden');

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Build WhatsApp message (formatted for business)
        const whatsappText = encodeURIComponent(
            `🙏 *New Appointment Booking*\n` +
            `━━━━━━━━━━━━━━━━━\n\n` +
            `👤 *Patient:* ${name}\n` +
            `📞 *Phone:* ${phone}\n` +
            `📧 *Email:* ${email}\n\n` +
            `🌿 *Treatment:* ${treatment}\n` +
            `📅 *Date:* ${formattedDate}\n` +
            `🕐 *Time:* ${time}\n\n` +
            `📝 *Notes:* ${message || 'None'}\n\n` +
            `━━━━━━━━━━━━━━━━━\n` +
            `Booked via ${CLINIC_NAME} Online`
        );

        // Open WhatsApp after showing success
        setTimeout(function () {
            window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${whatsappText}`, '_blank');
        }, 2500);

        // Redirect to home page after 6 seconds
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 6000);
    }

    // Send email or skip if not configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // EmailJS not set up yet - still works for WhatsApp
        console.warn('EmailJS not configured. Set up keys in app.js to enable email confirmations.');
        showSuccess();
    } else {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function () {
                showSuccess();
            })
            .catch(function (error) {
                console.error('EmailJS Error:', error);
                // Still show success - WhatsApp will work regardless
                showSuccess();
            });
    }
});
