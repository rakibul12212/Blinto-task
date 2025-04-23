


// Dynamically load hero.html content inside #hero-container
// Utility function to load a CSS file dynamically
function loadCSS(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      // CSS already loaded
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(`Failed to load CSS: ${href}`);
    document.head.appendChild(link);
  });
}

// Utility function to load a JS file dynamically
function loadJS(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      // Script already loaded
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load JS: ${src}`);
    document.body.appendChild(script);
  });
}

// Function to load a section: HTML + CSS + JS
async function loadSection(sectionName) {
  try {
    // Load the HTML and insert into container
    const res = await fetch(`${sectionName}/${sectionName}.html`);
    if (!res.ok) throw new Error(`Failed to load HTML for ${sectionName}`);
    const html = await res.text();
    document.getElementById(`${sectionName}-container`).innerHTML = html;

    // Load CSS and JS for the section
    await loadCSS(`${sectionName}/${sectionName}.css`);
    await loadJS(`${sectionName}/${sectionName}.js`);
  } catch (error) {
    console.error(error);
  }
}

// Load the sections you want
loadSection('header');
loadSection('hero');
loadSection('company')
loadSection('feature')

