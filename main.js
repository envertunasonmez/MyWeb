// Scroll Header Blur & Transparent
window.addEventListener('scroll', function () {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(1, 4, 32, 0.7)';
    header.style.backdropFilter = 'blur(6px)';
  } else {
    header.style.background = '#010420';
    header.style.backdropFilter = 'none';
  }

  if (window.scrollY > 10) {
    header.classList.add('transparent');
  } else {
    header.classList.remove('transparent');
  }
});

// Teknoloji kutuları scroll ve indicator
const scrollContainer = document.getElementById('techStackScroll');
if (scrollContainer) {
  const techItems = scrollContainer.querySelectorAll('.tech-item');
  const indicator = document.getElementById('techIndicator');
  const itemWidth = 212; // 200 + 12 gap
  const visibleCount = 3;
  const totalItems = techItems.length;
  const pageCount = Math.ceil(totalItems / visibleCount);

  // Dotları oluştur
  indicator.innerHTML = '';
  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      scrollContainer.scrollTo({
        left: i * itemWidth * visibleCount,
        behavior: 'smooth'
      });
    });
    indicator.appendChild(dot);
  }
  const dots = indicator.querySelectorAll('.dot');

  scrollContainer.addEventListener('scroll', () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const page = Math.round(scrollLeft / (itemWidth * visibleCount));
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[page]) dots[page].classList.add('active');
  });

  // Mouse drag
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  scrollContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  scrollContainer.addEventListener('touchend', () => {
    isDown = false;
  });
  scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}

// Sayfa yüklenince animasyonlu görünme
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.fade-slide-down').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });

  // Ensure initial section has animation on first render too
  const main = document.getElementById('mainContent');
  requestAnimationFrame(() => main?.classList.add('visible'));
});

// Navigation Events
const showSection = (section) => {
  const main = document.getElementById('mainContent');
  const projects = document.getElementById('projectsContent');
  const services = document.getElementById('servicesContent');

  // Hide all
  [main, projects, services].forEach(el => {
    el.style.display = 'none';
    el.classList.remove('visible');
  });

  // Show target with smooth animation
  const target = section === 'home' ? main : section === 'projects' ? projects : services;
  target.style.display = 'block';
  // next frame to trigger CSS transition
  requestAnimationFrame(() => target.classList.add('visible'));
};


document.getElementById('homeNav').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('home');
});

document.getElementById('servicesNav').addEventListener('click', (e) => {
  e.preventDefault();
    console.log("Services clicked");
  showSection('services');
});

document.getElementById('projectsNav').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('projects');
});


// Mobile Drawer
const menuBtn = document.getElementById('menuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

menuBtn?.addEventListener('click', () => {
  mobileDrawer.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (
    mobileDrawer.classList.contains('open') &&
    !mobileDrawer.contains(e.target) &&
    e.target !== menuBtn &&
    !menuBtn.contains(e.target)
  ) {
    mobileDrawer.classList.remove('open');
  }
});

// Drawer Navigation
document.getElementById('drawerHome').addEventListener('click', (e) => {
  e.preventDefault();
  mobileDrawer.classList.remove('open');
  showSection('home');
});

document.getElementById('drawerServices').addEventListener('click', (e) => {
  e.preventDefault();
  mobileDrawer.classList.remove('open');
  showSection('services');
});

document.getElementById('drawerProjects').addEventListener('click', (e) => {
  e.preventDefault();
  mobileDrawer.classList.remove('open');
  showSection('projects');
});

const showProjects = () => {
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('servicesContent').style.display = 'none';
  document.getElementById('projectsContent').style.display = 'block';
};
document.getElementById('projectsNav')?.addEventListener('click', function (e) {
  e.preventDefault();
  showProjects();
});
document.getElementById('drawerProjects')?.addEventListener('click', function (e) {
  e.preventDefault();
  mobileDrawer.classList.remove('open');
  showProjects();
});
// infoIcon click handled below with indicator setup

// Popup slider için görseller
const galleryImages = [
  "ip6.jpg",
  "ip1.jpg",
  "ip2.jpg",
  "ip3.jpg",
  "ip4.jpg",
  "ip5.jpg",

  // istediğin kadar ekle, yolu doğru ver
];

const popupPanel = document.getElementById("popupPanel");
const popupImage = document.getElementById("popupImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const popupIndicators = document.getElementById("popupIndicators");
const infoIcon = document.getElementById("infoIcon");

let currentIndex = 0;

// Indicator dotları oluştur
function createIndicators() {
  popupIndicators.innerHTML = "";
  galleryImages.forEach((img, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      showImage(currentIndex);
    });
    popupIndicators.appendChild(dot);
  });
}

// Görsel göster
function showImage(index) {
  popupImage.src = galleryImages[index];
  // Dot active güncelle
  [...popupIndicators.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Önceki görsel
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

// Sonraki görsel
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

// Popup açma
infoIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // tıklamanın yayılmasını engelle
  popupPanel.style.display = "flex";
  currentIndex = 0;
  showImage(currentIndex);
  createIndicators();
});

// Overlay'e tıklayınca kapat (web ve mobil)
popupPanel.addEventListener("click", (e) => {
  if (e.target === popupPanel) {
    popupPanel.style.display = "none";
  }
});


// ESC ile popup kapatma
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popupPanel.style.display = "none";
  }
});
// Popup dışına tıklayınca kapat
document.addEventListener("click", (e) => {
  if (!popupPanel.contains(e.target) && e.target !== infoIcon) {
    popupPanel.style.display = "none";
  }
});