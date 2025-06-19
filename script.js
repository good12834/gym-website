// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        const statusDiv = this.querySelector('.form-status');
        statusDiv.style.display = 'block';
        
        // Simulate success (you would normally check for actual success/error)
        if (Math.random() > 0.1) { // 90% success rate for demo
            statusDiv.className = 'form-status success';
            statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
            this.reset();
        } else {
            statusDiv.className = 'form-status error';
            statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
        }
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }, 1500);
});

// Auto-fill subject based on URL parameters
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    if (subject) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect.querySelector(`option[value="${subject}"]`)) {
            subjectSelect.value = subject;
        }
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#000000';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Schedule tab functionality
document.querySelectorAll('.schedule-nav button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and days
        document.querySelectorAll('.schedule-nav button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.schedule-day').forEach(day => day.classList.remove('active'));
        
        // Add active class to clicked button and corresponding day
        this.classList.add('active');
        document.getElementById(this.dataset.day).classList.add('active');
    });
});

// Booking functionality
document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function() {
        const classInfo = this.closest('.schedule-item');
        const time = classInfo.querySelector('.time').textContent;
        const className = classInfo.querySelector('.class').textContent;
        
        // You can replace this with your actual booking system
        alert(`Booking ${className} for ${time}. This feature will be connected to the booking system.`);
    });
});

// Optional: Auto-rotate testimonials
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonials.forEach(card => card.style.opacity = '0');
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex].style.opacity = '1';
}

// Uncomment below if you want auto-rotating testimonials
// setInterval(rotateTestimonials, 5000);

// Gallery filtering
document.querySelectorAll('.gallery-filter button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.gallery-filter button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            const parent = item.parentElement;
            if (filter === 'all' || parent.dataset.category === filter) {
                parent.style.display = 'block';
            } else {
                parent.style.display = 'none';
            }
        });
    });
});

// Enhanced Gallery Modal
function openGalleryModal(element) {
    const modal = document.getElementById('galleryModal');
    const modalImg = modal.querySelector('.modal-body img');
    const modalTitle = modal.querySelector('.modal-image-title');
    const modalDesc = modal.querySelector('.modal-image-description');
    const featuresList = modal.querySelector('.facility-features-list');
    
    const img = element.parentElement.querySelector('img');
    const title = element.querySelector('h4').textContent;
    const desc = element.querySelector('p').textContent;
    
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    
    // Add facility-specific features
    const features = getFacilityFeatures(title);
    featuresList.innerHTML = features.map(feature => 
        `<li><i class="fas ${feature.icon}"></i> ${feature.text}</li>`
    ).join('');
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function getFacilityFeatures(facilityName) {
    const features = {
        'Weight Training Area': [
            { icon: 'fa-dumbbell', text: 'Premium Equipment' },
            { icon: 'fa-users', text: 'Personal Training Available' },
            { icon: 'fa-clock', text: '24/7 Access' }
        ],
        'Cardio Zone': [
            { icon: 'fa-tv', text: 'Individual TV Screens' },
            { icon: 'fa-heart', text: 'Heart Rate Monitoring' },
            { icon: 'fa-fan', text: 'Climate Controlled' }
        ],
        // Add more facility-specific features
    };
    
    return features[facilityName] || [
        { icon: 'fa-check', text: 'Modern Equipment' },
        { icon: 'fa-clock', text: 'Available 24/7' },
        { icon: 'fa-shield-alt', text: 'Safe & Clean Environment' }
    ];
}

// Enhanced Animations
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

const animationObserver = new IntersectionObserver(handleIntersection, {
    threshold: 0.2
});

// Add fade-in class to elements
document.querySelectorAll('.blog-card, .gallery-item, .testimonial-card').forEach(element => {
    element.classList.add('fade-in');
    animationObserver.observe(element);
});

// Add pulse animation to call-to-action buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.classList.add('pulse');
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // You can add your newsletter subscription logic here
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    
    // Reset form
    this.reset();
});

// Class filtering
document.querySelectorAll('.classes-filter button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.classes-filter button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter classes
        document.querySelectorAll('[data-category]').forEach(card => {
            if (filter === 'all' || card.dataset.category.includes(filter)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Class details modal
function showClassDetails(className) {
    const modal = new bootstrap.Modal(document.getElementById('classDetailsModal'));
    const contentDiv = document.getElementById('classDetailsContent');
    
    // You can customize this content based on the class
    const classDetails = {
        'Yoga Flow': {
            description: 'A dynamic form of yoga that synchronizes breath with movement. This class focuses on flexibility, strength, and mindfulness.',
            benefits: ['Improved flexibility', 'Stress reduction', 'Better posture', 'Enhanced strength'],
            equipment: ['Yoga mat', 'Yoga blocks (optional)', 'Water bottle'],
            instructor: 'Jane Smith'
        },
        'CrossFit': {
            description: 'High-intensity functional training that combines weightlifting, gymnastics, and cardio.',
            benefits: ['Increased strength', 'Better endurance', 'Weight loss', 'Improved agility'],
            equipment: ['Various weights', 'Jump rope', 'Training shoes', 'Water bottle'],
            instructor: 'Mike Johnson'
        },
        // Add details for other classes...
    };

    const details = classDetails[className] || {
        description: 'Class details coming soon.',
        benefits: ['Improved fitness', 'Better health'],
        equipment: ['Comfortable clothes', 'Water bottle'],
        instructor: 'TBA'
    };

    contentDiv.innerHTML = `
        <h4>${className}</h4>
        <p>${details.description}</p>
        <h5>Benefits:</h5>
        <ul>
            ${details.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        <h5>Required Equipment:</h5>
        <ul>
            ${details.equipment.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <p><strong>Instructor:</strong> ${details.instructor}</p>
    `;
    
    modal.show();
}

function bookClass() {
    // Add your booking logic here
    alert('Booking system will be implemented soon!');
}

// Pricing toggle functionality
document.getElementById('pricingToggle').addEventListener('change', function() {
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    
    monthlyPrices.forEach(price => {
        price.style.display = this.checked ? 'none' : 'block';
    });
    
    annualPrices.forEach(price => {
        price.style.display = this.checked ? 'block' : 'none';
    });
});

// Trainer filtering
document.querySelectorAll('.trainer-categories button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.trainer-categories button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        document.querySelectorAll('.trainer-card').forEach(card => {
            const parent = card.parentElement;
            if (filter === 'all' || parent.dataset.category.includes(filter)) {
                parent.style.display = 'block';
            } else {
                parent.style.display = 'none';
            }
        });
    });
});

// Trainer Details Modal
function showTrainerDetails(trainerName) {
    const modal = document.getElementById('trainerModal');
    const modalImg = modal.querySelector('.trainer-modal-img');
    const contentDiv = document.getElementById('trainerDetailsContent');
    const timeSlotsDiv = modal.querySelector('.time-slots');
    
    // Get trainer details
    const trainerDetails = getTrainerDetails(trainerName);
    
    // Update modal content
    modalImg.src = document.querySelector(`img[alt="${trainerName}"]`).src;
    modalImg.alt = trainerName;
    
    contentDiv.innerHTML = `
        <h4>${trainerName}</h4>
        <span class="trainer-title">${trainerDetails.title}</span>
        <div class="trainer-rating mb-3">
            ${getStarRating(trainerDetails.rating)}
            <span>(${trainerDetails.reviews} reviews)</span>
        </div>
        <p>${trainerDetails.bio}</p>
        <h5>Certifications</h5>
        <ul>
            ${trainerDetails.certifications.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
        <h5>Specializations</h5>
        <div class="mb-3">
            ${trainerDetails.specialties.map(specialty => 
                `<span class="badge bg-primary me-2">${specialty}</span>`
            ).join('')}
        </div>
    `;
    
    // Add time slots
    timeSlotsDiv.innerHTML = generateTimeSlots();
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function getTrainerDetails(trainerName) {
    const details = {
        'John Doe': {
            title: 'Fitness Expert',
            rating: 5,
            reviews: '120+',
            bio: 'Certified personal trainer with over 10 years of experience in transforming lives through fitness.',
            certifications: [
                'NASM Certified Personal Trainer',
                'CrossFit Level 2 Trainer',
                'Precision Nutrition Coach'
            ],
            specialties: ['Weight Training', 'HIIT', 'CrossFit', 'Nutrition']
        },
        // Add details for other trainers
    };
    
    return details[trainerName] || {
        title: 'Fitness Trainer',
        rating: 5,
        reviews: '100+',
        bio: 'Experienced fitness professional dedicated to helping clients achieve their goals.',
        certifications: ['Certified Personal Trainer'],
        specialties: ['Fitness', 'Strength Training']
    };
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function generateTimeSlots() {
    const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
    return slots.map(time => 
        `<div class="time-slot" onclick="selectTimeSlot(this)">${time}</div>`
    ).join('');
}

function selectTimeSlot(element) {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    element.classList.add('selected');
}

function bookTrainer() {
    const selectedTime = document.querySelector('.time-slot.selected');
    if (selectedTime) {
        alert(`Session booked for ${selectedTime.textContent}`);
    } else {
        alert('Please select a time slot');
    }
}

// Blog filtering
document.querySelectorAll('.blog-categories button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.blog-categories button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter blog posts
        document.querySelectorAll('[data-category]').forEach(post => {
            if (filter === 'all' || post.dataset.category === filter) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});

// Blog newsletter subscription
document.querySelector('.blog-subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Add your newsletter subscription logic here
    alert(`Thank you for subscribing to our blog! We'll send updates to ${email}`);
    
    this.reset();
});

// Like functionality
document.querySelectorAll('.far.fa-heart').forEach(heart => {
    heart.addEventListener('click', function() {
        this.classList.toggle('fas');
        this.classList.toggle('far');
        const likesText = this.parentElement.textContent;
        const likes = parseInt(likesText.match(/\d+/)[0]);
        this.parentElement.innerHTML = `<i class="${this.className}"></i> ${this.classList.contains('fas') ? likes + 1 : likes - 1} Likes`;
    });
});

// Enhanced blog post interactions
function sharePost(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this awesome fitness article!',
            url: window.location.href
        })
        .then(() => updateShareCount())
        .catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
        updateShareCount();
    }
}

function updateShareCount() {
    const sharesElement = document.querySelector('.shares-count');
    const currentShares = parseInt(sharesElement.textContent);
    sharesElement.textContent = `${currentShares + 1} Shares`;
}

// Bookmark functionality
document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        // Save to localStorage
        const postId = this.closest('.blog-card').dataset.postId;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        
        if (icon.classList.contains('fas')) {
            if (!bookmarks.includes(postId)) {
                bookmarks.push(postId);
            }
        } else {
            const index = bookmarks.indexOf(postId);
            if (index > -1) {
                bookmarks.splice(index, 1);
            }
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });
});

// Read More functionality
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const content = this.closest('.blog-card').querySelector('.read-more-content');
        const isExpanded = content.style.display !== 'none';
        
        content.style.display = isExpanded ? 'none' : 'block';
        this.textContent = isExpanded ? 'Read More' : 'Show Less';
    });
});

// Comments functionality
function showComments(button) {
    const commentsSection = button.closest('.blog-card').querySelector('.comments-section');
    const isVisible = commentsSection.style.display !== 'none';
    
    commentsSection.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Show Comments' : 'Hide Comments';
    
    if (!isVisible && !commentsSection.querySelector('.comment')) {
        loadComments(commentsSection);
    }
}

function loadComments(section) {
    // Simulate loading comments from server
    const comments = [
        { author: 'Jane Doe', date: '2 days ago', text: 'Great tips! Really helpful for beginners.' },
        { author: 'John Smith', date: '1 day ago', text: 'I would add that consistency is key!' },
        { author: 'Mike Johnson', date: '5 hours ago', text: 'These tips helped me get started. Thanks!' }
    ];
    
    const commentsList = section.querySelector('.comments-list');
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
}

// Tag filtering
function filterByTag(tag) {
    // Add your tag filtering logic here
    alert(`Filtering posts by tag: ${tag}`);
}

// Testimonial filtering
document.querySelectorAll('.testimonial-filters button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.testimonial-filters button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        document.querySelectorAll('.testimonials-grid [data-category]').forEach(card => {
            if (filter === 'all' || card.dataset.category.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Review modal rating functionality
document.querySelectorAll('.rating-input i').forEach(star => {
    star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        updateStars(rating);
    });
    
    star.addEventListener('click', function() {
        const rating = this.dataset.rating;
        updateStars(rating, true);
    });
});

document.querySelector('.rating-input').addEventListener('mouseleave', function() {
    const selectedRating = this.querySelector('i.active');
    if (!selectedRating) {
        clearStars();
    } else {
        updateStars(selectedRating.dataset.rating);
    }
});

function updateStars(rating, clicked = false) {
    document.querySelectorAll('.rating-input i').forEach(star => {
        const starRating = star.dataset.rating;
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
            if (clicked) {
                star.classList.add('active');
            }
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

function clearStars() {
    document.querySelectorAll('.rating-input i').forEach(star => {
        star.classList.remove('fas', 'active');
        star.classList.add('far');
    });
}

function openReviewModal() {
    const modal = new bootstrap.Modal(document.getElementById('reviewModal'));
    modal.show();
}

function submitReview() {
    // Add your review submission logic here
    alert('Thank you for your review! It will be published after moderation.');
    const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
    modal.hide();
}

function showFullTestimonial(button) {
    const card = button.closest('.testimonial-card');
    const content = card.querySelector('.testimonial-body');
    content.classList.toggle('expanded');
    button.textContent = content.classList.contains('expanded') ? 'Show Less' : 'Read More';
}

// Enhanced Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Search overlay functionality
    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const searchOverlay = document.querySelector('.search-overlay');

    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchOverlay.querySelector('input').focus();
    });

    searchClose.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });

    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = togglePassword.previousElementSibling;

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Login form handling
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        alert('Login functionality will be implemented here');
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}); 