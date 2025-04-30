document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            const isOpen = dropdown.style.display === 'block';
            
            // Close all other dropdowns
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            dropdown.style.display = isOpen ? 'none' : 'block';
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.menu-dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });

    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Save button functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // منو دراپ‌داون
    const postMenus = document.querySelectorAll('.post-menu');
    
    postMenus.forEach(menu => {
        const menuIcon = menu.querySelector('i.fa-ellipsis-h');
        const dropdown = menu.querySelector('.menu-dropdown');
        
        menuIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // بستن همه منوهای دیگر
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.style.display = 'none';
                }
            });
            
            // تغییر وضعیت منوی فعلی
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                dropdown.style.display = 'block';
            }
        });
    });
    
    // بستن منو با کلیک خارج از آن
    document.addEventListener('click', function() {
        document.querySelectorAll('.menu-dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });

    // Event Details Close Button
    const eventDetails = document.getElementById('eventDetails');
    const closeEventBtn = document.querySelector('.close-event-btn');
    
    if (closeEventBtn) {
        closeEventBtn.addEventListener('click', function() {
            eventDetails.classList.remove('active');
        });
    }

    // Post Menu Toggle
    const menuToggles = document.querySelectorAll('.menu-toggle');
    
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.menu-dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.menu-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });
});

// Calendar Functionality
const events = {
    '2024-03-15': {
        title: 'همایش کلاسیک‌بازان',
        time: '۱۴:۰۰ تا ۱۸:۰۰',
        location: 'تهران، پارکینگ مرکزی',
        description: 'همایش سالانه کلاسیک‌بازان با حضور بیش از ۵۰ خودرو کلاسیک'
    },
    '2024-03-20': {
        title: 'مسابقه نمایشی',
        time: '۱۰:۰۰ تا ۱۷:۰۰',
        location: 'اصفهان، پیست سرعت',
        description: 'مسابقه نمایشی با حضور رانندگان حرفه‌ای'
    },
    '2024-03-25': {
        title: 'کارگاه تعمیر و نگهداری',
        time: '۰۹:۰۰ تا ۱۳:۰۰',
        location: 'شیراز، مرکز تعمیرات تخصصی',
        description: 'کارگاه آموزشی تعمیر و نگهداری خودروهای لوکس'
    }
};

function initCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const eventDetails = document.getElementById('eventDetails');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();
        
        const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
                          'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        let calendarHTML = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += '<div class="calendar-day"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = events[dateString];
            const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
            
            calendarHTML += `
                <div class="calendar-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''}" 
                     data-date="${dateString}">
                    ${day}
                </div>`;
        }
        
        calendarDays.innerHTML = calendarHTML;
        
        // Add click event listeners to days
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', () => {
                const date = day.dataset.date;
                if (events[date]) {
                    const event = events[date];
                    eventDetails.innerHTML = `
                        <h4>جزئیات همایش</h4>
                        <div class="event-content">
                            <p class="event-title">${event.title}</p>
                            <p class="event-time"><i class="far fa-clock"></i> ${event.time}</p>
                            <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                            <p class="event-description">${event.description}</p>
                        </div>
                    `;
                    eventDetails.classList.add('active');
                } else {
                    eventDetails.classList.remove('active');
                }
            });
        });
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    updateCalendar();
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalendar); 