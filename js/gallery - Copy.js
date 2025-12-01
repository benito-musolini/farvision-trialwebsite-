// js/gallery.js - SIMPLE WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Gallery.js is LOADED!');
    
    // Get project info from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project') || 'Project Gallery';
    const projectId = urlParams.get('id') || 'default';
    
    console.log('📁 Project ID:', projectId);
    console.log('📝 Project Name:', projectName);
    
    // Update page title
    document.getElementById('projectTitle').textContent = projectName;
    
    // SIMPLE TEST IMAGES - Using Unsplash placeholders
    const galleryGrid = document.getElementById('imageGallery');
    galleryGrid.innerHTML = '<p class="text-center">Loading images...</p>';
    
    // Different image sets based on project ID
    const imageSets = {
        'mbogori-school': [
            'images/mbogo.png',
            'images/projects/mbogo2.png',
            'images/projects/mbogo3.png',
            'images/projects/mbogo4.png'
        

        ],
        'ruiru-flats': [
            'images/projects/lema4.jpeg',
            'images/projects/lema2.jpeg',
            'images/projects/lema3.jpeg',
            'images/projects/lema1.jpeg',
            'images/projects/lema5.jpeg',
            'images/projects/apartment.jpeg',
            'images/projects/lema6.jpeg'
        ],
        
        'edmer': [
            'images/projects/ruiru1.jpeg',
            'images/projects/ruiru2.jpeg',
            'images/projects/ruiru4.jpeg',
            'images/projects/ruiru5.jpeg',
            'images/projects/ruiru8.jpeg',
            'images/projects/ruiru7.jpeg'
        ],

        'vega-factory': [
            'images/projects/vega1.jpeg',
            'images/projects/vega2.jpeg',
            'images/projects/vega3.jpeg',
            'images/projects/vega.jpeg',
            'images/projects/vega5.jpeg'
        ],

        'gitare-road': [
            'images/projects/road1.png',
            'images/projects/road2.png'
        ],

        'trinity-nrg': [
            'images/projects/tri1.jpeg',
            'images/projects/tri2.jpeg',
            'images/projects/tri3.jpeg',
            'images/projects/tri4.jpeg',
            'images/projects/tri5.jpeg',
            'images/projects/tri6.jpeg'
        ],


    };
    
    // Get the right images for this project
    const imagesToShow = imageSets[projectId] || imageSets['default'];
    console.log('🖼️ Loading', imagesToShow.length, 'images');
    
    // Clear and add images
    galleryGrid.innerHTML = '';
    
    imagesToShow.forEach((imgSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <img src="${imgSrc}" class="gallery-img" alt="Project Image ${index + 1}">
            <div class="gallery-overlay">
                <div class="zoom-icon">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Initialize modal after a short delay
    setTimeout(initializeModal, 1000);
});

function initializeModal() {
    console.log('🔧 Initializing modal functionality...');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    
    if (galleryItems.length === 0) {
        console.error('❌ No gallery items found!');
        return;
    }
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
    
    console.log('✅ Modal ready with', images.length, 'images');
    
    // Click functionality for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            modalImage.src = images[currentImageIndex];
            modal.show();
        });
    });
    
    // Previous button
    const prevBtn = document.querySelector('.nav-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            modalImage.src = images[currentImageIndex];
        });
    }
    
    // Next button
    const nextBtn = document.querySelector('.nav-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            modalImage.src = images[currentImageIndex];
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal._isShown) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                modalImage.src = images[currentImageIndex];
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                modalImage.src = images[currentImageIndex];
            } else if (e.key === 'Escape') {
                modal.hide();
            }
        }
    });
}