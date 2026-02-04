// بيانات الصور للمعرض
const galleryImages = [
    { src: "https://i.postimg.cc/rpsN7WTz/IMG_20251226_WA0008.jpg", category: "nature", title: "منظر طبيعي خلاب" },
    { src: "https://i.postimg.cc/1tLBGzLM/IMG_20251226_WA0023.jpg", category: "portrait", title: "جلسة تصوير شخصية" },
    { src: "https://i.postimg.cc/150BFsMH/IMG_20251226_WA0016.jpg", category: "events", title: "تصوير حفل زفاف" },
    { src: "https://i.postimg.cc/ZR1H8q1d/IMG_20251226_WA0027.jpg", category: "nature", title: "غروب الشمس" },
    { src: "https://i.postimg.cc/QMjSBjRT/IMG_20260204_WA0056.jpg", category: "portrait", title: "بورتريه احترافي" },
    { src: "https://i.postimg.cc/6QzcnDK6/IMG_20260204_WA0057.jpg", category: "nature", title: "منظر طبيعي " },
    { src: "https://i.postimg.cc/tg4Byw3F/IMG_20251226_WA0030.jpg", category: "portrait", title: "جلسة تصوير فنية" },
    { src: "https://i.postimg.cc/L8NVyDcS/IMG_20251226_WA0011.jpg", category: "architecture", title: "تصميم داخلي" },
];

// تحميل المعرض عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // عرض جميع الصور في البداية
    displayImages(galleryImages);
    
    // إضافة أحداث لأزرار التصفية
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // تصفية الصور حسب التصنيف
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                displayImages(galleryImages);
            } else {
                const filteredImages = galleryImages.filter(image => image.category === filter);
                displayImages(filteredImages);
            }
        });
    });
    
    // وظيفة عرض الصور
    function displayImages(images) {
        galleryGrid.innerHTML = '';
        
        images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', image.category);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}">
                <div class="overlay">${image.title}</div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
        
        // إضافة حدث النقر للصور الجديدة
        const newGalleryItems = document.querySelectorAll('.gallery-item');
        newGalleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                // استدعاء وظيفة فتح نافذة العرض من script.js
                openLightbox(imgSrc, imgAlt);
            });
        });
    }
});

// نسخ وظيفة فتح نافذة العرض هنا لاستخدامها في gallery.js
function openLightbox(src, alt) {
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
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '5px';
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.left = '20px';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.cursor = 'pointer';
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target !== img) {
            document.body.removeChild(lightbox);
        }
    });
}
