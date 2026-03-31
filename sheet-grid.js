/**
 * sheet-grid.js
 * Converts cheatsheet pages from single-column scroll to
 * a multi-column masonry card layout with collapsible sections.
 * Only activates on pages that have a .toc element (cheatsheet pages).
 */
(function () {
  'use strict';

  // Only apply to cheatsheet detail pages
  const toc = document.querySelector('.toc');
  if (!toc) return;

  const container = document.querySelector('.container');
  if (!container) return;

  // Widen the container for two-column layout
  container.classList.add('sheet-container');

  // Gather all top-level .section elements inside the container
  const sections = Array.from(container.querySelectorAll(':scope > .section'));
  if (sections.length === 0) return;

  // Create the grid wrapper and insert before the first section
  const grid = document.createElement('div');
  grid.className = 'sections-grid';
  sections[0].parentNode.insertBefore(grid, sections[0]);

  // Move every section into the grid
  sections.forEach(function (section) {
    grid.appendChild(section);
  });

  // Wrap each section's non-header children in a .section-content div
  sections.forEach(function (section) {
    var header = section.querySelector('.section-header');
    if (!header) return;

    var content = document.createElement('div');
    content.className = 'section-content';

    // Move all children except the header into the content wrapper
    var children = Array.from(section.children).filter(function (el) {
      return el !== header;
    });
    children.forEach(function (child) {
      content.appendChild(child);
    });
    section.appendChild(content);
  });

  // After layout settles, add "Show more" buttons to tall sections
  var MAX_HEIGHT = 420;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      grid.querySelectorAll('.section-content').forEach(function (content) {
        if (content.scrollHeight > MAX_HEIGHT) {
          content.style.maxHeight = MAX_HEIGHT + 'px';
          content.classList.add('needs-expand');

          var btn = document.createElement('button');
          btn.className = 'section-expand-btn visible';
          btn.textContent = 'Show more \u2193';
          btn.setAttribute('aria-expanded', 'false');

          btn.addEventListener('click', function () {
            var isExpanded = content.classList.toggle('expanded');
            content.classList.toggle('needs-expand', !isExpanded);

            if (isExpanded) {
              content.style.maxHeight = content.scrollHeight + 'px';
            } else {
              content.style.maxHeight = MAX_HEIGHT + 'px';
              // Scroll the section into view when collapsing
              var section = content.closest('.section');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }

            btn.textContent = isExpanded ? 'Show less \u2191' : 'Show more \u2193';
            btn.setAttribute('aria-expanded', String(isExpanded));
          });

          content.parentElement.appendChild(btn);
        }
      });
    });
  });

  // Patch the existing search filter (V2 pages) to work with the grid
  // The search targets '.section' by class which still works after re-parenting.
  // But we also need to handle CSS column reflow when sections hide/show.
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      // Force the grid to reflow after search hides/shows sections
      grid.style.display = 'none';
      // eslint-disable-next-line no-unused-expressions
      grid.offsetHeight; // trigger reflow
      grid.style.display = '';
    });
  }
})();
