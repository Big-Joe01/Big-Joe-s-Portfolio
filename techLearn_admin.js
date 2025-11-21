// Admin functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin (simulated)
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load admin dashboard stats
    loadAdminStats();
    
    // Load courses table
    loadCoursesTable();
    
    // Load students table
    loadStudentsTable();
    
    // Setup admin navigation
    setupAdminNav();
    
    // Handle course upload form
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('In a real implementation, this would upload the file to a server.');
        });
    }
    
    // Add new course button
    const addCourseBtn = document.getElementById('add-course-btn');
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', function() {
            alert('In a real implementation, this would open a course creation form.');
        });
    }
});

// Load admin dashboard stats
function loadAdminStats() {
    document.getElementById('total-courses').textContent = courses.length;
    
    // Simulate student count
    const users = JSON.parse(localStorage.getItem('users')) || [];
    document.getElementById('total-students').textContent = users.length;
    
    // Calculate total videos and PDFs
    let videoCount = 0;
    let pdfCount = 0;
    
    courses.forEach(course => {
        course.lessons.forEach(lesson => {
            if (lesson.type === 'video') videoCount++;
            if (lesson.type === 'pdf') pdfCount++;
        });
    });
    
    document.getElementById('total-videos').textContent = videoCount;
    document.getElementById('total-pdfs').textContent = pdfCount;
}

// Load courses table
function loadCoursesTable() {
    const tableBody = document.getElementById('courses-table');
    
    courses.forEach(course => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${course.title}</td>
            <td>${getCategoryName(course.category)}</td>
            <td>${course.lessons.length}</td>
            <td>
                <button class="btn btn-sm">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load students table
function loadStudentsTable() {
    const tableBody = document.getElementById('students-table');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${new Date(user.id).toLocaleDateString()}</td>
            <td>${Math.floor(Math.random() * 5)}</td> <!-- Random course count -->
        `;
        
        tableBody.appendChild(row);
    });
}

// Setup admin navigation
function setupAdminNav() {
    const navLinks = document.querySelectorAll('.admin-sidebar a');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = `${this.dataset.section}-section`;
            sections.forEach(section => {
                section.style.display = section.id === sectionId ? 'block' : 'none';
            });
        });
    });
}