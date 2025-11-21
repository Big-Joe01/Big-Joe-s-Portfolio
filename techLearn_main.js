// Sample course data
const courses = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        category: "web",
        description: "Learn the core concepts of JavaScript programming",
        thumbnail: "assets/js-course.jpg",
        lessons: [
            { id: 1, title: "Introduction to JavaScript", type: "video", duration: "15:30" },
            { id: 2, title: "Variables and Data Types", type: "video", duration: "22:15" },
            { id: 3, title: "JavaScript Cheat Sheet", type: "pdf", pages: 12 }
        ]
    },
    {
        id: 2,
        title: "Python for Data Science",
        category: "data",
        description: "Master Python for data analysis and visualization",
        thumbnail: "assets/python-course.jpg",
        lessons: [
            { id: 1, title: "Python Basics", type: "video", duration: "18:45" },
            { id: 2, title: "NumPy Fundamentals", type: "video", duration: "25:10" },
            { id: 3, title: "Pandas Guide", type: "pdf", pages: 18 }
        ]
    },
    {
        id: 3,
        title: "React Native Mobile Development",
        category: "mobile",
        description: "Build cross-platform mobile apps with React Native",
        thumbnail: "assets/react-native-course.jpg",
        lessons: [
            { id: 1, title: "React Native Setup", type: "video", duration: "12:20" },
            { id: 2, title: "Core Components", type: "video", duration: "28:45" },
            { id: 3, title: "React Native API Reference", type: "pdf", pages: 24 }
        ]
    }
];

// Check if user is logged in (simulated)
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update auth link based on login status
    updateAuthLink();
    
    // Load appropriate content based on page
    if (document.getElementById('featured-courses')) {
        loadFeaturedCourses();
    }
    
    if (document.getElementById('all-courses')) {
        loadAllCourses();
    }
    
    if (document.getElementById('course-detail-container')) {
        loadCourseDetail();
    }
    
    // Filter courses
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterCourses(this.dataset.filter);
        });
    });
});

// Update auth link in navigation
function updateAuthLink() {
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (currentUser) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', logout);
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    }
}

// Load featured courses on homepage
function loadFeaturedCourses() {
    const featuredContainer = document.getElementById('featured-courses');
    
    // Display first 3 courses as featured
    const featuredCourses = courses.slice(0, 3);
    
    featuredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        featuredContainer.appendChild(courseCard);
    });
}

// Load all courses on courses page
function loadAllCourses() {
    const allCoursesContainer = document.getElementById('all-courses');
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        allCoursesContainer.appendChild(courseCard);
    });
}

// Create course card HTML
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.category = course.category;
    
    card.innerHTML = `
        <img src="${course.thumbnail}" alt="${course.title}">
        <div class="course-info">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span>${course.lessons.length} lessons</span>
                <span>${getCourseType(course)}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function() {
        window.location.href = `course-detail.html?id=${course.id}`;
    });
    
    return card;
}

// Get course type (video/pdf)
function getCourseType(course) {
    const hasVideo = course.lessons.some(lesson => lesson.type === 'video');
    const hasPdf = course.lessons.some(lesson => lesson.type === 'pdf');
    
    if (hasVideo && hasPdf) return 'Videos & PDFs';
    if (hasVideo) return 'Videos';
    return 'PDFs';
}

// Filter courses by category
function filterCourses(category) {
    const allCourses = document.querySelectorAll('.course-card');
    
    allCourses.forEach(course => {
        if (category === 'all' || course.dataset.category === category) {
            course.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
}

// Load course detail page
function loadCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
        window.location.href = 'courses.html';
        return;
    }
    
    const container = document.getElementById('course-detail-container');
    container.innerHTML = `
        <div class="course-detail">
            <h2>${course.title}</h2>
            <div class="course-meta">
                <span>Category: ${getCategoryName(course.category)}</span>
                <span>${course.lessons.length} lessons</span>
            </div>
            <div class="course-description">
                <p>${course.description}</p>
            </div>
            
            <h3>Course Content</h3>
            <div class="lesson-list">
                ${course.lessons.map(lesson => `
                    <div class="lesson-card">
                        <div class="lesson-info">
                            <span class="icon">${lesson.type === 'video' ? '▶️' : '📄'}</span>
                            <div>
                                <h4>${lesson.title}</h4>
                                <small>${lesson.type === 'video' ? lesson.duration : `${lesson.pages} pages`}</small>
                            </div>
                        </div>
                        <button class="btn">View</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add click handlers to lesson buttons
    const lessonButtons = document.querySelectorAll('.lesson-card .btn');
    lessonButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const lesson = course.lessons[index];
            if (lesson.type === 'video') {
                showVideoLesson(lesson);
            } else {
                showPdfLesson(lesson);
            }
        });
    });
}

// Show video lesson
function showVideoLesson(lesson) {
    alert(`Would play video: ${lesson.title}\n\nIn a real implementation, this would open a video player.`);
}

// Show PDF lesson
function showPdfLesson(lesson) {
    alert(`Would open PDF: ${lesson.title}\n\nIn a real implementation, this would display the PDF or download it.`);
}

// Get category name
function getCategoryName(category) {
    const categories = {
        web: 'Web Development',
        data: 'Data Science',
        mobile: 'Mobile Development'
    };
    return categories[category] || category;
}