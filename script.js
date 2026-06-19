
  // Duplicate the logo set so the marquee loops seamlessly
  (function () {
    var track = document.getElementById('logoTrack');
    if (track) {
      var set = track.querySelector('.logo-set');
      if (set) {
        var clone = set.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      }
    }
  })();

  // Nav scroll effect
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Fade-in on scroll — reveal slightly before fully in view, then stop observing
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        } else {
          e.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // Product image lightbox
  document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn 0.2s ease';
      const imgClone = document.createElement('img');
      imgClone.src = img.src;
      imgClone.style.cssText = 'max-width:90vw;max-height:88vh;object-fit:contain;border-radius:8px;box-shadow:0 30px 80px rgba(0,0,0,0.6)';
      overlay.appendChild(imgClone);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // Award & celebration-collage lightbox — click to view large
  document.querySelectorAll('.award-photo, .celeb-collage').forEach(img => {
    img.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn 0.2s ease;padding:4vw;';
      const imgClone = document.createElement('img');
      imgClone.src = this.src;
      imgClone.style.cssText = 'max-width:92vw;max-height:92vh;object-fit:contain;border-radius:8px;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,0.6)';
      overlay.appendChild(imgClone);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // Form submit — sends the enquiry to Valmi's email (with the sender's
  // email & contact details) via FormSubmit, then shows the success note.
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.btn-submit');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch('https://formsubmit.co/ajax/commercial1@valmiproducts.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('Request failed');
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
      setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 6000);
    } catch (err) {
      alert("Sorry, your message couldn't be sent right now. Please email commercial1@valmiproducts.com or call +91 83290 25179.");
    } finally {
      btn.textContent = orig;
      btn.disabled = false;
    }
  }

  // Product tabs (UI only - filter would need real data)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
