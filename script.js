function loadCSS(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(`Failed to load CSS: ${href}`);
    document.head.appendChild(link);
  });
}

function loadJS(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load JS: ${src}`);
    document.body.appendChild(script);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function loadSection(sectionName) {
  try {
    const container = document.getElementById(`${sectionName}-container`);
    if (!container)
      throw new Error(`Container not found: ${sectionName}-container`);

    const res = await fetch(`${sectionName}/${sectionName}.html`);
    if (!res.ok) throw new Error(`Failed to load HTML for ${sectionName}`);
    const html = await res.text();
    container.innerHTML = html;

    await loadCSS(`${sectionName}/${sectionName}.css`);
    await loadJS(`${sectionName}/${sectionName}.js`);

    const initFn = window[`init${capitalize(sectionName)}Section`];
    if (typeof initFn === "function") initFn();

    console.log(`${sectionName} loaded and initialized.`);
  } catch (error) {
    console.error(error);
  }
}

[
  "header",
  "hero",
  "company",
  "feature",
  "result",
  "about",
  "testimonial",
  "location",
  "faq",
  "downloadApp",
  "footer",
].forEach(loadSection);
