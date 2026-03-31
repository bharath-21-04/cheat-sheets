/* ──────────────────────────────────────────────────
   Spotlight Search — Cmd+K / Ctrl+K cross-page search
   Searches all cheatsheet pages, sections & descriptions
   ────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Search Index ── */
  const pages = [
    { title: 'TypeScript', file: 'typescript-dev.html', desc: 'Types, generics, utility types, advanced patterns, async, decorators, tsconfig', tags: 'typescript ts language', cat: 'Languages' },
    { title: 'Go', file: 'go-dev.html', desc: 'Goroutines, channels, interfaces, structs, error handling, concurrency, modules', tags: 'go golang language', cat: 'Languages' },
    { title: 'Python — Interview', file: 'python-interview.html', desc: 'Data structures, algorithms, complexity, built-in functions, OOP, common patterns', tags: 'python interview dsa', cat: 'Languages' },
    { title: 'Python — Development', file: 'python-dev.html', desc: 'FastAPI, SQLAlchemy, async, packaging, testing, typing, decorators, project structure', tags: 'python dev fastapi sqlalchemy', cat: 'Languages' },
    { title: 'Ruby', file: 'ruby.html', desc: 'Strings, arrays, hashes, blocks, OOP, modules, enumerable, file I/O, Rails', tags: 'ruby rails language', cat: 'Languages' },
    { title: 'Rust', file: 'rust.html', desc: 'Ownership, borrowing, lifetimes, structs, enums, traits, pattern matching, Cargo', tags: 'rust language systems', cat: 'Languages' },
    { title: 'Swift', file: 'swift.html', desc: 'Optionals, collections, closures, protocols, async/await, actors, SwiftUI', tags: 'swift ios apple language', cat: 'Languages' },
    { title: 'Kotlin', file: 'kotlin.html', desc: 'Null safety, coroutines, data classes, sealed classes, collections, generics, Android, Ktor, Multiplatform', tags: 'kotlin android jetpack compose ktor kmp', cat: 'Languages' },
    { title: 'Dart', file: 'dart.html', desc: 'Classes, null safety, async, collections, mixins, generics, patterns, Flutter, Riverpod', tags: 'dart flutter riverpod mobile language', cat: 'Languages' },
    { title: 'Java + Spring Boot', file: 'java-springboot-dev.html', desc: 'REST APIs, JPA, Security, dependency injection, annotations, testing, configuration', tags: 'java spring boot jpa', cat: 'Java Ecosystem' },
    { title: 'Java Collections', file: 'java-collections.html', desc: 'List, Set, Map, Queue, Stack, Streams API, String methods, Arrays, Optional, java.time', tags: 'java collections streams', cat: 'Java Ecosystem' },
    { title: 'FastAPI + UV Python', file: 'fastapi-uv.html', desc: 'UV package manager, venv, FastAPI routes, Pydantic, auth, SQLAlchemy, Docker deployment', tags: 'fastapi uv python pydantic', cat: 'Backend Frameworks' },
    { title: 'Go Gin', file: 'go-gin.html', desc: 'Routing, middleware, request binding, JWT auth, GORM database, validation, testing', tags: 'go gin gorm jwt', cat: 'Backend Frameworks' },
    { title: 'Django & Flask', file: 'python-frameworks.html', desc: 'Models, ORM, views, forms, auth, Django REST Framework, Blueprints, SQLAlchemy', tags: 'django flask python drf', cat: 'Backend Frameworks' },
    { title: 'TS Backend Frameworks', file: 'ts-backend.html', desc: 'Express, Hono, Elysia, NestJS, tRPC, oRPC, Bun — routes, middleware, type-safe APIs', tags: 'express hono elysia nestjs trpc bun', cat: 'Backend Frameworks' },
    { title: 'React, Vue, Nuxt, Svelte', file: 'frontend-frameworks.html', desc: 'React hooks & patterns, Vue 3 Composition API, Nuxt 3, Svelte 5 runes, state management', tags: 'react vue nuxt svelte frontend', cat: 'Frontend & CSS' },
    { title: 'CSS', file: 'css-cheatsheet.html', desc: 'Selectors, box model, flexbox, grid, animations, responsive design, everyday patterns', tags: 'css flexbox grid animations', cat: 'Frontend & CSS' },
    { title: 'PostgreSQL', file: 'postgresql.html', desc: 'Schema design, joins, indexes, transactions, window functions, JSON, CTEs, performance', tags: 'postgresql sql database', cat: 'Databases & ORMs' },
    { title: 'NoSQL', file: 'nosql.html', desc: 'MongoDB CRUD, aggregation, Redis data types, caching patterns, DynamoDB', tags: 'mongodb redis dynamodb nosql', cat: 'Databases & ORMs' },
    { title: 'Drizzle & Prisma', file: 'drizzle-prisma.html', desc: 'Schema definition, CRUD queries, relations, migrations, Drizzle Studio, Prisma Client', tags: 'drizzle prisma orm typescript', cat: 'Databases & ORMs' },
    { title: 'OAuth & Auth Concepts', file: 'oauth-concepts.html', desc: 'OAuth 2.0 flows, OIDC, JWT claims, JWKS, PKCE, token management, security best practices', tags: 'oauth oidc jwt pkce auth', cat: 'Security & Auth' },
    { title: 'Better Auth', file: 'better-auth.html', desc: 'TypeScript auth library — email/password, OAuth providers, sessions, 2FA, plugins, Next.js', tags: 'better-auth typescript auth 2fa', cat: 'Security & Auth' },
    { title: 'Algorithms & Sorting', file: 'algorithms.html', desc: 'Sorting algorithms, binary search, BFS/DFS, dynamic programming, greedy, backtracking', tags: 'algorithms sorting dfs bfs dp greedy', cat: 'Computer Science' },
    { title: 'System Design', file: 'system-design.html', desc: 'Scaling, load balancers, caching, CAP theorem, message queues, microservices, common designs', tags: 'system design scaling cap microservices', cat: 'Computer Science' },
    { title: 'OS Concepts', file: 'os-concepts.html', desc: 'Processes, threads, CPU scheduling, memory management, deadlocks, file systems, networking', tags: 'operating system processes threads memory', cat: 'Computer Science' },
    { title: 'AI & LLM', file: 'ai-llm.html', desc: 'Prompt engineering, token optimization, RAG, embeddings, API usage, evaluation metrics', tags: 'ai llm prompt rag embeddings gpt', cat: 'AI & Tools' },
    { title: 'Data Engineering', file: 'data-engineering.html', desc: 'Snowflake, PySpark, Pandas, Polars, Airflow, dbt, Kafka, ETL, data modeling, warehouse', tags: 'snowflake pyspark pandas airflow dbt kafka etl data warehouse polars', cat: 'Data & ML' },
    { title: 'Data Science', file: 'data-science.html', desc: 'NumPy, Pandas, Matplotlib, Seaborn, statistics, EDA, feature engineering, scikit-learn, metrics', tags: 'numpy pandas matplotlib seaborn sklearn statistics eda feature engineering', cat: 'Data & ML' },
    { title: 'AI & ML Development', file: 'ai-ml-dev.html', desc: 'PyTorch, TensorFlow, Keras, CNNs, RNNs, Transformers, Hugging Face, MLOps, GPU training', tags: 'pytorch tensorflow keras cnn rnn transformer huggingface mlops', cat: 'Data & ML' },
    { title: 'Python Tricks & Interviews', file: 'python-tricks.html', desc: 'Matrix input, one-liners, collections, itertools, bitwise tricks, sorting, interview patterns', tags: 'python tricks interview matrix collections itertools competitive', cat: 'Data & ML' },
  ];

  /* ── Build searchable text per entry ── */
  pages.forEach(p => {
    p._search = (p.title + ' ' + p.desc + ' ' + p.tags + ' ' + p.cat).toLowerCase();
  });

  /* ── Create DOM ── */
  const overlay = document.createElement('div');
  overlay.className = 'spotlight-overlay';
  overlay.innerHTML = `
    <div class="spotlight-modal">
      <div class="spotlight-input-wrap">
        <svg class="spotlight-search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="spotlight-input" placeholder="Search all cheatsheets..." autocomplete="off" spellcheck="false" />
        <kbd class="spotlight-esc">esc</kbd>
      </div>
      <div class="spotlight-results"></div>
      <div class="spotlight-footer">
        <span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>esc</kbd> close</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const modal = overlay.querySelector('.spotlight-modal');
  const input = overlay.querySelector('.spotlight-input');
  const results = overlay.querySelector('.spotlight-results');

  let activeIdx = 0;

  /* ── Category icon mapping ── */
  const catIcons = {
    'Languages': '🗂',
    'Java Ecosystem': '☕',
    'Backend Frameworks': '⚙️',
    'Frontend & CSS': '🎨',
    'Databases & ORMs': '🗃',
    'Security & Auth': '🔐',
    'Computer Science': '🧠',
    'AI & Tools': '🤖',
    'Data & ML': '📊',
  };

  /* ── Render results ── */
  function render(query) {
    const q = query.toLowerCase().trim();
    let filtered = pages;
    if (q) {
      const words = q.split(/\s+/);
      filtered = pages.filter(p => words.every(w => p._search.includes(w)));
    }

    if (filtered.length === 0) {
      results.innerHTML = '<div class="spotlight-empty">No results found</div>';
      return;
    }

    /* Group by category */
    const grouped = {};
    filtered.forEach(p => {
      (grouped[p.cat] = grouped[p.cat] || []).push(p);
    });

    let html = '';
    let idx = 0;
    for (const cat in grouped) {
      html += `<div class="spotlight-cat">${catIcons[cat] || ''} ${cat}</div>`;
      grouped[cat].forEach(p => {
        const active = idx === activeIdx ? ' spotlight-active' : '';
        html += `<a href="${p.file}" class="spotlight-item${active}" data-idx="${idx}">
          <div class="spotlight-item-title">${highlight(p.title, q)}</div>
          <div class="spotlight-item-desc">${highlight(p.desc, q)}</div>
        </a>`;
        idx++;
      });
    }
    results.innerHTML = html;
    totalCount = idx;

    /* Scroll active into view */
    const activeEl = results.querySelector('.spotlight-active');
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
  }

  let totalCount = pages.length;

  function highlight(text, query) {
    if (!query) return text;
    const words = query.split(/\s+/).filter(Boolean).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!words.length) return text;
    const re = new RegExp('(' + words.join('|') + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  /* ── Open / Close ── */
  function open() {
    overlay.classList.add('spotlight-open');
    input.value = '';
    activeIdx = 0;
    render('');
    setTimeout(() => { input.focus(); input.select(); }, 50);
  }

  function close() {
    overlay.classList.remove('spotlight-open');
    input.blur();
  }

  function navigate() {
    const item = results.querySelector(`.spotlight-item[data-idx="${activeIdx}"]`);
    if (item) window.location.href = item.getAttribute('href');
  }

  /* ── Events ── */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('spotlight-open') ? close() : open();
    }
    if (e.key === 'Escape' && overlay.classList.contains('spotlight-open')) {
      e.preventDefault();
      close();
    }
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });

  input.addEventListener('input', () => {
    activeIdx = 0;
    render(input.value);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = (activeIdx + 1) % totalCount;
      render(input.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = (activeIdx - 1 + totalCount) % totalCount;
      render(input.value);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      navigate();
    }
  });

  results.addEventListener('click', e => {
    const item = e.target.closest('.spotlight-item');
    if (item) {
      e.preventDefault();
      window.location.href = item.getAttribute('href');
    }
  });

  results.addEventListener('mousemove', e => {
    const item = e.target.closest('.spotlight-item');
    if (item) {
      activeIdx = parseInt(item.dataset.idx);
      render(input.value);
    }
  });

  /* ── Add Cmd+K hint button to nav ── */
  const navRight = document.querySelector('.nav-right');
  if (navRight) {
    const btn = document.createElement('button');
    btn.className = 'spotlight-trigger';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span class="spotlight-trigger-text">Search</span><kbd>${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+'}K</kbd>`;
    btn.addEventListener('click', open);
    navRight.insertBefore(btn, navRight.firstChild);
  }

  /* also add trigger for index (no nav-right) */
  const navLeft = document.querySelector('.nav-left');
  if (!navRight && navLeft) {
    const wrap = document.createElement('div');
    wrap.className = 'nav-right';
    const btn = document.createElement('button');
    btn.className = 'spotlight-trigger';
    btn.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span class="spotlight-trigger-text">Search</span><kbd>${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+'}K</kbd>`;
    btn.addEventListener('click', open);
    wrap.appendChild(btn);
    navLeft.parentElement.appendChild(wrap);
  }

})();
