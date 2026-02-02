// معالجة نموذج التواصل
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const whatsappForm = document.getElementById('sendWhatsApp');
    const whatsappMessage = document.getElementById('whatsappMessage');
    
    // رقم واتساب الهدف
    const whatsappNumber = "967773684474";
    
    // ========== معالجة النموذج العادي ==========
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                eventDate: document.getElementById('event-date').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter').checked
            };
            
            // التحقق من صحة البيانات
            if (!formData.name || !formData.email || !formData.message) {
                showMessage(formMessage, 'يرجى ملء جميع الحقول الإلزامية', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showMessage(formMessage, 'يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // إظهار رسالة نجاح
            showMessage(formMessage, 'تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت.', 'success');
            
            // إرسال نسخة إلى واتساب (اختياري)
            sendWhatsAppNotification(formData);
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // إرسال البيانات إلى الخادم (في تطبيق حقيقي)
            // sendFormData(formData);
        });
    }
    
    // ========== معالجة نموذج واتساب ==========
    if (whatsappForm) {
        whatsappForm.addEventListener('click', function() {
            // جمع بيانات نموذج واتساب
            const whatsappData = {
                name: document.getElementById('whatsapp-name').value.trim(),
                service: document.getElementById('whatsapp-service').value,
                message: document.getElementById('whatsapp-message').value.trim()
            };
            
            // التحقق من البيانات
            if (!whatsappData.name) {
                showMessage(whatsappMessage, 'يرجى إدخال اسمك', 'error');
                document.getElementById('whatsapp-name').focus();
                return;
            }
            
            if (!whatsappData.message) {
                showMessage(whatsappMessage, 'يرجى كتابة رسالتك', 'error');
                document.getElementById('whatsapp-message').focus();
                return;
            }
            
            // إنشاء رسالة واتساب منسقة
            const formattedMessage = formatWhatsAppMessage(whatsappData);
            
            // إرسال إلى واتساب
            sendToWhatsApp(formattedMessage);
            
            // إظهار رسالة نجاح
            showMessage(whatsappMessage, 'جاري فتح واتساب لإرسال رسالتك...', 'success');
            
            // إعادة تعيين النموذج بعد تأخير بسيط
            setTimeout(() => {
                document.getElementById('whatsapp-name').value = '';
                document.getElementById('whatsapp-service').selectedIndex = 0;
                document.getElementById('whatsapp-message').value = '';
                whatsappMessage.style.display = 'none';
            }, 3000);
        });
    }
    
    // ========== تفعيل الأسئلة الشائعة ==========
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // إغلاق جميع العناصر الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // فتح/إغلاق العنصر الحالي
            item.classList.toggle('active');
        });
    });
    
    // ========== وظائف المساعدة ==========
    
    // التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // عرض الرسائل
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = element.className.split(' ')[0] + ' ' + type;
        element.style.display = 'block';
        
        // إخفاء الرسالة بعد 5 ثوانٍ
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
    
    // تنسيق رسالة واتساب
    function formatWhatsAppMessage(data) {
        let message = `*رسالة جديدة من موقع عبدالله عوض بن غديد*\n\n`;
        message += `*الاسم:* ${data.name}\n`;
        
        if (data.service) {
            message += `*نوع الخدمة:* ${data.service}\n`;
        }
        
        message += `*الرسالة:*\n${data.message}\n\n`;
        message += `_هذه الرسالة أرسلت عبر موقع المصور الإلكتروني_`;
        
        return encodeURIComponent(message);
    }
    
    // إرسال إلى واتساب
    function sendToWhatsApp(message) {
        // تنظيف رقم الهاتف (إزالة أي رموز غير رقمية)
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        
        // إنشاء رابط واتساب
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${message}`;
        
        // فتح واتساب في نافذة جديدة
        window.open(whatsappURL, '_blank');
    }
    
    // إرسال إشعار إلى واتساب عند إرسال النموذج العادي (اختياري)
    function sendWhatsAppNotification(formData) {
        // يمكن تفعيل هذه الميزة إذا أردت إرسال نسخة من النموذج العادي إلى واتساب
        const sendCopy = confirm("هل تريد إرسال نسخة من رسالتك إلى واتساب للرد السريع؟");
        
        if (sendCopy) {
            let message = `*نسخة من رسالة الموقع*\n\n`;
            message += `*الاسم:* ${formData.name}\n`;
            message += `*البريد:* ${formData.email}\n`;
            
            if (formData.phone) {
                message += `*الهاتف:* ${formData.phone}\n`;
            }
            
            if (formData.service) {
                message += `*الخدمة:* ${formData.service}\n`;
            }
            
            if (formData.eventDate) {
                message += `*تاريخ المناسبة:* ${formData.eventDate}\n`;
            }
            
            message += `*الرسالة:*\n${formData.message}\n\n`;
            message += `_تم إرسال هذه الرسالة عبر النموذج العادي في الموقع_`;
            
            const encodedMessage = encodeURIComponent(message);
            const cleanNumber = whatsappNumber.replace(/\D/g, '');
            const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
            
            // فتح واتساب بعد تأخير بسيط
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1000);
        }
    }
    
    // وظيفة إرسال البيانات إلى الخادم (وهمية للتوضيح)
    function sendFormData(data) {
        // في التطبيق الحقيقي، هنا ترسل البيانات إلى الخادم
        console.log('بيانات النموذج المرسلة:', data);
        
        /*
        // مثال على استخدام Fetch API
        fetch('https://your-server.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showMessage(formMessage, 'تم إرسال رسالتك بنجاح!', 'success');
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage(formMessage, 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
        });
        */
    }
});
// ========== ميزات إضافية للواتساب ==========

// نسخ رقم الهاتف عند النقر
document.addEventListener('DOMContentLoaded', function() {
    // إضافة زر نسخ الرقم إذا أردت
    const phoneNumberElement = document.querySelector('.whatsapp-alternative strong');
    
    if (phoneNumberElement) {
        // إضافة زر نسخ بجانب الرقم
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.className = 'copy-number-btn';
        copyButton.title = 'نسخ الرقم';
        
        phoneNumberElement.parentNode.insertBefore(copyButton, phoneNumberElement.nextSibling);
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText('967773684474')
                .then(() => {
                    // تغيير الأيقونة مؤقتًا للإشارة إلى النجاح
                    const originalHTML = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    copyButton.style.backgroundColor = '#2ecc71';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = originalHTML;
                        copyButton.style.backgroundColor = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('فشل في نسخ الرقم: ', err);
                });
        });
    }
    
    // حفظ بيانات النموذج في التخزين المحلي (للاستمرارية)
    const whatsappInputs = document.querySelectorAll('#whatsapp-name, #whatsapp-service, #whatsapp-message');
    
    // استعادة البيانات المحفوظة
    whatsappInputs.forEach(input => {
        const savedValue = localStorage.getItem(`whatsapp_${input.id}`);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // حفظ البيانات عند التغيير
        input.addEventListener('input', function() {
            localStorage.setItem(`whatsapp_${input.id}`, input.value);
        });
    });
    
    // زر مسح البيانات المحفوظة
    const clearDataBtn = document.createElement('button');
    clearDataBtn.textContent = 'مسح البيانات المحفوظة';
    clearDataBtn.className = 'clear-data-btn';
    clearDataBtn.style.display = 'block';
    clearDataBtn.style.margin = '10px auto';
    clearDataBtn.style.padding = '8px 15px';
    clearDataBtn.style.backgroundColor = '#e74c3c';
    clearDataBtn.style.color = 'white';
    clearDataBtn.style.border = 'none';
    clearDataBtn.style.borderRadius = '5px';
    clearDataBtn.style.cursor = 'pointer';
    
    const whatsappFormContainer = document.querySelector('.whatsapp-form');
    if (whatsappFormContainer) {
        whatsappFormContainer.appendChild(clearDataBtn);
        
        clearDataBtn.addEventListener('click', function() {
            whatsappInputs.forEach(input => {
                localStorage.removeItem(`whatsapp_${input.id}`);
                input.value = '';
            });
            alert('تم مسح البيانات المحفوظة بنجاح');
        });
    }
});

// أضف تنسيقات CSS للزر الجديد
const additionalStyles = `
.copy-number-btn {
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    margin-right: 8px;
    font-size: 0.9rem;
    padding: 5px;
    border-radius: 4px;
}

.copy-number-btn:hover {
    background-color: #f0f0f0;
}

.clear-data-btn:hover {
    background-color: #c0392b !important;
}
`;

// إضافة التنسيقات إلى الصفحة
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
// معالجة جميع نماذج التواصل في الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // رقم واتساب الهدف
    const whatsappNumber = "967773684474";
    
    // ========== النموذج العادي ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // التحقق من البيانات
            if (!validateForm(formData, formMessage)) return;
            
            // عرض رسالة النجاح
            showMessage(formMessage, 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.', 'success');
            
            // اقتراح إرسال نسخة إلى واتساب
            setTimeout(() => {
                if (confirm('هل تريد إرسال نسخة من رسالتك إلى واتساب للرد السريع؟')) {
                    sendToWhatsApp(formData, 'رسالة من موقع المصور');
                }
            }, 1000);
            
            // إعادة تعيين النموذج
            contactForm.reset();
        });
    }
    
    // ========== نموذج واتساب ==========
    const whatsappBtn = document.getElementById('sendWhatsApp');
    const whatsappMsg = document.getElementById('whatsappMessage');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const whatsappData = {
                name: document.getElementById('whatsapp-name').value.trim(),
                service: document.getElementById('whatsapp-service').value,
                message: document.getElementById('whatsapp-message').value.trim()
            };
            
            // التحقق من البيانات
            if (!whatsappData.name || !whatsappData.message) {
                showMessage(whatsappMsg, 'يرجى إدخال الاسم ورسالتك', 'error');
                return;
            }
            
            // إرسال إلى واتساب
            sendToWhatsApp(whatsappData, 'رسالة عبر واتساب من الموقع');
            
            // رسالة نجاح
            showMessage(whatsappMsg, 'جاري فتح واتساب لإرسال رسالتك...', 'success');
            
            // تنظيف النموذج بعد التأخير
            setTimeout(() => {
                document.getElementById('whatsapp-name').value = '';
                document.getElementById('whatsapp-service').selectedIndex = 0;
                document.getElementById('whatsapp-message').value = '';
                whatsappMsg.style.display = 'none';
            }, 2000);
        });
    }
    
    // ========== الأسئلة الشائعة ==========
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
    
    // ========== وظائف المساعدة ==========
    
    // التحقق من صحة النموذج
    function validateForm(data, messageElement) {
        if (!data.name || !data.email || !data.message) {
            showMessage(messageElement, 'يرجى ملء جميع الحقول الإلزامية', 'error');
            return false;
        }
        
        if (!isValidEmail(data.email)) {
            showMessage(messageElement, 'يرجى إدخال بريد إلكتروني صحيح', 'error');
            return false;
        }
        
        return true;
    }
    
    // التحقق من البريد الإلكتروني
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // عرض الرسائل
    function showMessage(element, text, type) {
        if (!element) return;
        
        element.textContent = text;
        element.className = element.className.split(' ')[0] + ' ' + type;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
    
    // إرسال إلى واتساب
    function sendToWhatsApp(data, title) {
        let message = `*${title}*\n\n`;
        message += `👤 *الاسم:* ${data.name}\n`;
        
        if (data.email) message += `📧 *البريد:* ${data.email}\n`;
        if (data.phone) message += `📱 *الهاتف:* ${data.phone}\n`;
        if (data.service) message += `🎯 *الخدمة:* ${data.service}\n`;
        
        message += `\n💬 *الرسالة:*\n${data.message}\n\n`;
        message += `📍 *مصدر الرسالة:* موقع عبدالله عوض بن غديد`;
        
        const encodedMessage = encodeURIComponent(message);
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    }
    
    // تتبع النقر على روابط التواصل الاجتماعي
    const socialLinks = document.querySelectorAll('.social-card, .social-mini, .footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.className.includes('instagram') ? 'Instagram' :
                           this.className.includes('youtube') ? 'YouTube' :
                           this.className.includes('facebook') ? 'Facebook' :
                           this.className.includes('whatsapp') ? 'WhatsApp' : 'Social';
            
            // يمكنك إضافة تتبع هنا (Google Analytics مثلاً)
            console.log(`النقر على ${platform}: ${this.href}`);
        });
    });
});