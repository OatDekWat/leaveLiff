document.addEventListener("DOMContentLoaded", function() {

    // 1. จัดการการ Toggle Sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }

    // 2. จัดการ Smooth Scroll เมื่อคลิกเมนู
    const sidebarLinks = document.querySelectorAll('#sidebar-wrapper .list-group-item');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href'); // เช่น "#section-dashboard"
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // คำนวณตำแหน่งที่จะเลื่อนไป (หักความสูงของ Navbar ด้านบน)
                const navbarHeight = document.querySelector('.navbar.sticky-top').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // -20 เพื่อให้มีช่องว่าง

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // เลื่อนแบบนุ่มนวล
                });

                // (Optional) ซ่อน Sidebar อัตโนมัติเมื่อคลิก (สำหรับ Mobile)
                if (window.innerWidth < 992) {
                    wrapper.classList.remove('toggled');
                }
                
                // (Optional) ย้าย Active Class
                document.querySelector('.list-group-item.active').classList.remove('active');
                this.classList.add('active');
            }
        });
    });

    // 3. (Bonus) อัปเดต Active Class ที่ Sidebar อัตโนมัติเมื่อ Scroll
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar.sticky-top').offsetHeight;

    window.addEventListener('scroll', function() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50; // หักลบ Navbar และเผื่อระยะ
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // ลบ active ทั้งหมด
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });

        // เพิ่ม active ให้กับ link ที่ตรงกัน
        const activeLink = document.querySelector(`#sidebar-wrapper a[href="#${currentSectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    });

});