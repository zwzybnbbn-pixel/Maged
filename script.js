// تفعيل القائمة المتنقلة للهواتف
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على أي رابط
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // إضافة تأثير التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثير التمرير لشريط التنقل
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // معرض الصور التفاعلي (إذا كان موجودًا في الصفحة)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // إنشاء نافذة عرض الصورة
            openLightbox(imgSrc, imgAlt);
        });
    });
    
    // وظيفة فتح نافذة عرض الصورة
    function openLightbox(src, alt) {
        // إنشاء العنصر
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '10000';
        
        // إضافة الصورة
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.borderRadius = '5px';
        
        // إضافة زر الإغلاق
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.left = '20px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.cursor = 'pointer';
        
        // إضافة العناصر إلى النافذة
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        
        // إضافة النافذة إلى الجسم
        document.body.appendChild(lightbox);
        
        // إضافة حدث الإغلاق
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target !== img) {
                document.body.removeChild(lightbox);
            }
        });
    }
});