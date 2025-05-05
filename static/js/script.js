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

    // Clubs dropdown functionality
    const clubsHeader = document.querySelector('.clubs-header');
    const clubsGrid = document.querySelector('.clubs-grid');
    const viewAllClubs = document.querySelector('.view-all-clubs');

    if (clubsHeader && clubsGrid && viewAllClubs) {
        // ابتدا همه المان‌ها را مخفی می‌کنیم
        clubsGrid.style.display = 'none';
        viewAllClubs.style.display = 'none';

        clubsHeader.addEventListener('click', function() {
            // تغییر وضعیت active
            this.classList.toggle('active');
            
            // نمایش یا مخفی کردن المان‌ها
            if (this.classList.contains('active')) {
                clubsGrid.style.display = 'grid';
                viewAllClubs.style.display = 'block';
            } else {
                clubsGrid.style.display = 'none';
                viewAllClubs.style.display = 'none';
            }
        });
    }

    // News Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Chat Menu Toggle
    const menuBtn = document.querySelector('.chat-actions .action-btn');
    const chatMenu = document.querySelector('.chat-menu');

    if (menuBtn && chatMenu) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            chatMenu.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function() {
            chatMenu.classList.remove('show');
        });

        // Prevent menu from closing when clicking inside it
        chatMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Chat Functionality
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const messagesContainer = document.querySelector('.messages-container');
    const attachFileBtn = document.getElementById('attachFile');
    const attachImageBtn = document.getElementById('attachImage');
    const filePreview = document.querySelector('.file-preview');
    const filePreviewImg = document.getElementById('filePreview');
    const fileName = document.querySelector('.file-name');
    const fileSize = document.querySelector('.file-size');
    const removeFileBtn = document.getElementById('removeFile');
    let selectedFile = null;

    // Send Message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message || selectedFile) {
            const messageBubble = document.createElement('div');
            messageBubble.className = 'message-bubble sent';
            
            let content = `<div class="message-content">`;
            
            if (message) {
                content += `<p>${message}</p>`;
            }
            
            if (selectedFile) {
                if (selectedFile.type.startsWith('image/')) {
                    content += `<img src="${URL.createObjectURL(selectedFile)}" alt="Uploaded Image" style="max-width: 200px; border-radius: 8px; margin-top: 8px;">`;
                } else {
                    content += `
                        <div class="file-preview" style="margin-top: 8px;">
                            <i class="fas fa-file" style="font-size: 24px; color: #666;"></i>
                            <div class="file-info">
                                <div class="file-name">${selectedFile.name}</div>
                                <div class="file-size">${formatFileSize(selectedFile.size)}</div>
                            </div>
                        </div>
                    `;
                }
            }
            
            content += `
                <span class="message-time">${getCurrentTime()}</span>
                <span class="message-status"><i class="fas fa-check"></i></span>
            </div>`;
            
            messageBubble.innerHTML = content;
            messagesContainer.appendChild(messageBubble);
            
            // Clear input and file
            messageInput.value = '';
            clearFilePreview();
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate typing indicator
            showTypingIndicator();
        }
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Get current time
    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        typingIndicator.style.display = 'flex';
        
        setTimeout(() => {
            typingIndicator.style.display = 'none';
        }, 2000);
    }

    // Handle file selection
    function handleFileSelect(file) {
        selectedFile = file;
        
        if (file.type.startsWith('image/')) {
            filePreviewImg.src = URL.createObjectURL(file);
            filePreviewImg.style.display = 'block';
        } else {
            filePreviewImg.style.display = 'none';
        }
        
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        filePreview.style.display = 'flex';
    }

    // Clear file preview
    function clearFilePreview() {
        selectedFile = null;
        filePreview.style.display = 'none';
        filePreviewImg.src = '';
        fileName.textContent = '';
        fileSize.textContent = '';
    }

    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    attachFileBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => handleFileSelect(e.target.files[0]);
        input.click();
    });

    attachImageBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => handleFileSelect(e.target.files[0]);
        input.click();
    });

    removeFileBtn.addEventListener('click', clearFilePreview);

    // Auto-scroll to bottom on load
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const chatArea = document.querySelector('.chat-area');
    const fileInput = document.getElementById('chatBgInput');
    const urlInput = document.getElementById('chatBgUrlInput');
    const setBtn = document.getElementById('setChatBgBtn');

    // تغییر بک‌گراند با انتخاب فایل
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                chatArea.style.setProperty('background', `linear-gradient(rgba(30,32,36,0.55), rgba(30,32,36,0.55)), url('${evt.target.result}') center center/cover no-repeat`, 'important');
            };
            reader.readAsDataURL(file);
        }
    });

    // تغییر بک‌گراند با وارد کردن آدرس عکس
    setBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        if (url) {
            chatArea.style.setProperty('background', `linear-gradient(rgba(30,32,36,0.55), rgba(30,32,36,0.55)), url('${url}') center center/cover no-repeat`, 'important');
        }
    });

    // Hamburger sidebar menu functionality
    const sidebarMenuBtn = document.getElementById('sidebarMenuBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    if (sidebarMenuBtn && sidebarMenu) {
        sidebarMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebarMenu.style.display = (sidebarMenu.style.display === 'block') ? 'none' : 'block';
        });
        // Close menu when clicking outside
        document.addEventListener('click', function() {
            sidebarMenu.style.display = 'none';
        });
        // Prevent menu from closing when clicking inside
        sidebarMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Calendar Functionality
const events = {
    // رویدادهای گذشته (قبل از 15 بهمن)
    '2024-01-10': {
        title: 'نمایشگاه خودروهای کلاسیک',
        time: '۱۰:۰۰ تا ۲۰:۰۰',
        location: 'تهران، نمایشگاه بین‌المللی',
        description: 'نمایشگاه خودروهای کلاسیک با حضور کلکسیونرهای برجسته',
        club: 'کلاب خودروهای کلاسیک'
    },
    '2024-01-15': {
        title: 'مسابقه رالی',
        time: '۰۸:۰۰ تا ۱۸:۰۰',
        location: 'مشهد، پیست رالی',
        description: 'مسابقه رالی با حضور تیم‌های حرفه‌ای',
        club: 'کلاب رالی ایران'
    },
    '2024-01-20': {
        title: 'همایش خودروهای اسپرت',
        time: '۱۶:۰۰ تا ۲۲:۰۰',
        location: 'اصفهان، پیست سرعت',
        description: 'همایش خودروهای اسپرت با حضور برندهای معروف',
        club: 'کلاب خودروهای اسپرت'
    },
    '2024-01-25': {
        title: 'کارگاه تعمیر موتور',
        time: '۰۹:۰۰ تا ۱۳:۰۰',
        location: 'شیراز، مرکز تعمیرات تخصصی',
        description: 'کارگاه آموزشی تعمیر و نگهداری موتورهای اسپرت',
        club: 'کلاب مکانیک‌های حرفه‌ای'
    },
    '2024-01-30': {
        title: 'نمایشگاه لوازم یدکی',
        time: '۱۰:۰۰ تا ۱۸:۰۰',
        location: 'تهران، نمایشگاه لوازم یدکی',
        description: 'نمایشگاه لوازم یدکی با تخفیف ویژه',
        club: 'کلاب قطعات خودرو'
    },

    // رویدادهای آینده (بعد از 15 بهمن)
    '2024-02-15': {
        title: 'مسابقه نمایشی',
        time: '۱۰:۰۰ تا ۱۷:۰۰',
        location: 'اصفهان، پیست سرعت',
        description: 'مسابقه نمایشی با حضور رانندگان حرفه‌ای',
        club: 'کلاب رانندگان حرفه‌ای'
    },
    '2024-02-20': {
        title: 'همایش کلاسیک‌بازان',
        time: '۱۴:۰۰ تا ۱۸:۰۰',
        location: 'تهران، پارکینگ مرکزی',
        description: 'همایش سالانه کلاسیک‌بازان با حضور بیش از ۵۰ خودرو کلاسیک',
        club: 'کلاب خودروهای کلاسیک'
    },
    '2024-02-25': {
        title: 'کارگاه تعمیر و نگهداری',
        time: '۰۹:۰۰ تا ۱۳:۰۰',
        location: 'شیراز، مرکز تعمیرات تخصصی',
        description: 'کارگاه آموزشی تعمیر و نگهداری خودروهای لوکس',
        club: 'کلاب مکانیک‌های حرفه‌ای'
    },
    '2024-02-30': {
        title: 'نمایشگاه خودروهای لوکس',
        time: '۱۰:۰۰ تا ۲۰:۰۰',
        location: 'تهران، نمایشگاه بین‌المللی',
        description: 'نمایشگاه خودروهای لوکس با حضور برندهای معروف',
        club: 'کلاب خودروهای لوکس'
    }
};

// اضافه کردن رویداد امروز
const today = new Date();
const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
events[todayString] = {
    title: 'رویداد امروز',
    time: '۱۰:۰۰ تا ۱۸:۰۰',
    location: 'تهران، پارکینگ مرکزی',
    description: 'رویداد ویژه امروز'
};

function getEventStatus(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    const feb15 = new Date('2024-02-15'); // تغییر تاریخ مرجع به 15 بهمن
    
    // تنظیم ساعت‌ها به 0 برای مقایسه دقیق تاریخ
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    feb15.setHours(0, 0, 0, 0);
    
    if (eventDate.getTime() === today.getTime()) {
        return 'today-event';
    } else if (eventDate < feb15) {
        return 'past-event';
    } else {
        return 'future-event';
    }
}

function initCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // ایجاد المان برای نمایش جزئیات رویداد
    const eventDetailsContainer = document.createElement('div');
    eventDetailsContainer.className = 'event-details';
    eventDetailsContainer.style.display = 'none';
    document.querySelector('.calendar-container').appendChild(eventDetailsContainer);

    function closeEventDetails() {
        eventDetailsContainer.classList.add('hide');
        setTimeout(() => {
            eventDetailsContainer.style.display = 'none';
            eventDetailsContainer.classList.remove('hide');
        }, 300);
    }

    function showEventDetails(event, date) {
        if (!event) {
            // نمایش پیام "رویدادی وجود ندارد"
            eventDetailsContainer.innerHTML = `
                <div class="event-header">
                    <h4>جزئیات روز</h4>
                    <button class="close-event-btn">×</button>
                </div>
                <div class="no-event-message">
                    <i class="fas fa-calendar-times"></i>
                    رویدادی برای این روز وجود ندارد
                </div>
            `;
            
            eventDetailsContainer.style.display = 'block';
            eventDetailsContainer.classList.add('show');
            
            // اضافه کردن event listener برای دکمه بستن
            const closeBtn = eventDetailsContainer.querySelector('.close-event-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeEventDetails);
            }
            return;
        }

        const eventDate = new Date(date);
        const today = new Date();
        const feb15 = new Date('2024-02-15');
        
        // تنظیم ساعت‌ها به 0 برای مقایسه دقیق تاریخ
        eventDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        feb15.setHours(0, 0, 0, 0);
        
        let statusBadge = '';
        if (eventDate < feb15) {
            statusBadge = `
                <div class="event-status past">
                    <i class="fas fa-history"></i>
                    <span>این رویداد به پایان رسیده است</span>
                </div>
            `;
        } else if (eventDate.getTime() === today.getTime()) {
            statusBadge = `
                <div class="event-status today">
                    <i class="fas fa-clock"></i>
                    <span>رویداد امروز</span>
                </div>
            `;
        } else {
            statusBadge = `
                <div class="event-status future">
                    <i class="fas fa-calendar-check"></i>
                    <span>رویداد آینده</span>
                </div>
            `;
        }
        
        eventDetailsContainer.innerHTML = `
            <div class="event-header">
                <h4>${event.title}</h4>
                <button class="close-event-btn">×</button>
            </div>
            <div class="event-body">
                ${statusBadge}
                <div class="event-club">
                    <i class="fas fa-users"></i>
                    <span>${event.club}</span>
                </div>
                <div class="event-info">
                    <div class="event-info-item">
                        <i class="fas fa-clock"></i>
                        <div class="event-info-content">
                            <h5>زمان برگزاری</h5>
                            <p>${event.time}</p>
                        </div>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="event-info-content">
                            <h5>محل برگزاری</h5>
                            <p>${event.location}</p>
                        </div>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-info-circle"></i>
                        <div class="event-info-content">
                            <h5>درباره رویداد</h5>
                            <p>${event.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        eventDetailsContainer.style.display = 'block';
        eventDetailsContainer.classList.add('show');
        
        // اضافه کردن event listener برای دکمه بستن
        const closeBtn = eventDetailsContainer.querySelector('.close-event-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEventDetails);
        }
    }

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
            const eventStatus = hasEvent ? getEventStatus(dateString) : '';
            
            calendarHTML += `
                <div class="calendar-day ${hasEvent ? 'has-event' : ''} ${isToday ? 'today' : ''} ${eventStatus}" 
                     data-date="${dateString}">
                    ${day}
                </div>`;
        }
        
        calendarDays.innerHTML = calendarHTML;
        
        // اضافه کردن event listener برای همه روزها
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', () => {
                const date = day.dataset.date;
                showEventDetails(events[date], date);
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