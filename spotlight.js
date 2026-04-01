/* ──────────────────────────────────────────────────
   Spotlight Search — Cmd+K / Ctrl+K cross-page search
   Searches all cheatsheet pages, sections & descriptions
   ────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Search Index ── */
  const pages = [
    // ── Languages ──────────────────────────────────────────────────
    { title: 'TypeScript', file: 'typescript-dev.html', desc: 'Types, generics, utility types, advanced patterns, async, decorators, tsconfig', tags: 'typescript ts language', cat: 'Languages' },
    { title: 'Go', file: 'go-dev.html', desc: 'Goroutines, channels, interfaces, structs, error handling, concurrency, modules', tags: 'go golang language', cat: 'Languages' },
    { title: 'Python — Interview & Tricks', file: 'python-interview.html', desc: 'Data structures, algorithms, complexity, built-in functions, OOP, one-liners, collections, itertools, bitwise, interview patterns', tags: 'python interview dsa tricks collections itertools competitive', cat: 'Languages' },
    { title: 'Python — Development', file: 'python-dev.html', desc: 'FastAPI, SQLAlchemy, async, packaging, testing, typing, decorators, project structure', tags: 'python dev fastapi sqlalchemy', cat: 'Languages' },
    { title: 'Ruby', file: 'ruby.html', desc: 'Strings, arrays, hashes, blocks, OOP, modules, enumerable, file I/O, Rails', tags: 'ruby rails language', cat: 'Languages' },
    { title: 'Rust', file: 'rust.html', desc: 'Ownership, borrowing, lifetimes, structs, enums, traits, pattern matching, Cargo', tags: 'rust language systems', cat: 'Languages' },
    { title: 'Swift', file: 'swift.html', desc: 'Optionals, collections, closures, protocols, async/await, actors, SwiftUI', tags: 'swift ios apple language', cat: 'Languages' },
    { title: 'Kotlin', file: 'kotlin.html', desc: 'Null safety, coroutines, data classes, sealed classes, collections, generics, Android, Ktor, Multiplatform', tags: 'kotlin android jetpack compose ktor kmp', cat: 'Languages' },
    { title: 'Dart', file: 'dart.html', desc: 'Classes, null safety, async, collections, mixins, generics, patterns, Flutter, Riverpod', tags: 'dart flutter riverpod mobile language', cat: 'Languages' },
    { title: 'C', file: 'c.html', desc: 'Pointers, memory, structs, arrays, I/O, preprocessor, stdlib, linked list', tags: 'c language systems pointers memory', cat: 'Languages' },
    { title: 'C++', file: 'cpp.html', desc: 'STL, templates, smart pointers, RAII, lambdas, move semantics, concurrency', tags: 'cpp c++ language stl templates', cat: 'Languages' },
    { title: 'C#', file: 'csharp.html', desc: 'LINQ, async/await, generics, delegates, properties, .NET, Entity Framework', tags: 'csharp c# dotnet linq entity framework', cat: 'Languages' },
    { title: 'PHP', file: 'php.html', desc: 'Syntax, arrays, OOP, Composer, PDO, superglobals, sessions, regex', tags: 'php language web server', cat: 'Languages' },
    { title: 'JavaScript (ES6+)', file: 'es6.html', desc: 'Arrow functions, destructuring, spread, promises, async/await, modules, classes, iterators', tags: 'javascript es6 es2015 modern js', cat: 'Languages' },
    // ── Java Ecosystem ─────────────────────────────────────────────
    { title: 'Java + Spring Boot', file: 'java-springboot-dev.html', desc: 'REST APIs, JPA, Security, dependency injection, annotations, testing, configuration', tags: 'java spring boot jpa', cat: 'Java Ecosystem' },
    { title: 'Java Collections', file: 'java-collections.html', desc: 'List, Set, Map, Queue, Stack, Streams API, String methods, Arrays, Optional, java.time', tags: 'java collections streams', cat: 'Java Ecosystem' },
    // ── Backend Frameworks ─────────────────────────────────────────
    { title: 'FastAPI + UV Python', file: 'fastapi-uv.html', desc: 'UV package manager, venv, FastAPI routes, Pydantic, auth, SQLAlchemy, Docker deployment', tags: 'fastapi uv python pydantic', cat: 'Backend Frameworks' },
    { title: 'Go Gin', file: 'go-gin.html', desc: 'Routing, middleware, request binding, JWT auth, GORM database, validation, testing', tags: 'go gin gorm jwt', cat: 'Backend Frameworks' },
    { title: 'Django & Flask', file: 'python-frameworks.html', desc: 'Models, ORM, views, forms, auth, Django REST Framework, Blueprints, SQLAlchemy', tags: 'django flask python drf', cat: 'Backend Frameworks' },
    { title: 'TS Backend Frameworks', file: 'ts-backend.html', desc: 'Express, Hono, Elysia, NestJS, tRPC, oRPC, Bun — routes, middleware, type-safe APIs', tags: 'express hono elysia nestjs trpc bun', cat: 'Backend Frameworks' },
    { title: 'Express.js', file: 'express.html', desc: 'Routing, middleware, request/response, error handling, REST API, auth, static files', tags: 'express nodejs javascript backend', cat: 'Backend Frameworks' },
    { title: 'Laravel', file: 'laravel.html', desc: 'Routing, controllers, Eloquent ORM, migrations, Blade, auth, queues, Artisan', tags: 'laravel php framework eloquent blade', cat: 'Backend Frameworks' },
    { title: 'GraphQL', file: 'graphql.html', desc: 'Schema, queries, mutations, subscriptions, resolvers, fragments, variables, Apollo', tags: 'graphql api schema apollo queries mutations', cat: 'Backend Frameworks' },
    { title: 'EJS Templates', file: 'ejs.html', desc: 'Template syntax, partials, layouts, passing data, Express integration', tags: 'ejs templates javascript server-side rendering', cat: 'Backend Frameworks' },
    // ── Frontend & CSS ─────────────────────────────────────────────
    { title: 'React, Vue, Nuxt, Svelte', file: 'frontend-frameworks.html', desc: 'React hooks & patterns, Vue 3 Composition API, Nuxt 3, Svelte 5 runes, state management', tags: 'react vue nuxt svelte frontend', cat: 'Frontend & CSS' },
    { title: 'CSS', file: 'css-cheatsheet.html', desc: 'Selectors, box model, flexbox, grid, animations, responsive design, everyday patterns', tags: 'css flexbox grid animations', cat: 'Frontend & CSS' },
    { title: 'HTML', file: 'html-dev.html', desc: 'Semantic elements, forms, tables, media, accessibility, meta tags, SVG', tags: 'html markup web semantic a11y', cat: 'Frontend & CSS' },
    { title: 'Sass / SCSS', file: 'sass.html', desc: 'Variables, nesting, mixins, extends, functions, modules, partials, operators', tags: 'sass scss css preprocessor', cat: 'Frontend & CSS' },
    { title: 'jQuery', file: 'jquery.html', desc: 'Selectors, DOM manipulation, events, AJAX, animations, plugins, utility', tags: 'jquery javascript dom ajax', cat: 'Frontend & CSS' },
    { title: 'Emmet', file: 'emmet.html', desc: 'HTML/CSS shorthand expansions, abbreviation syntax, lorem, operators', tags: 'emmet abbreviations html css expansion', cat: 'Frontend & CSS' },
    { title: 'InFrontJS', file: 'infrontjs.html', desc: 'Components, routing, state, lifecycle hooks, directives, web components', tags: 'infrontjs javascript framework frontend', cat: 'Frontend & CSS' },
    // ── Databases & ORMs ───────────────────────────────────────────
    { title: 'PostgreSQL', file: 'postgresql.html', desc: 'Schema design, joins, indexes, transactions, window functions, JSON, CTEs, performance', tags: 'postgresql sql database', cat: 'Databases & ORMs' },
    { title: 'NoSQL', file: 'nosql.html', desc: 'MongoDB CRUD, aggregation, Redis data types, caching patterns, DynamoDB', tags: 'mongodb redis dynamodb nosql', cat: 'Databases & ORMs' },
    { title: 'Drizzle & Prisma', file: 'drizzle-prisma.html', desc: 'Schema definition, CRUD queries, relations, migrations, Drizzle Studio, Prisma Client', tags: 'drizzle prisma orm typescript', cat: 'Databases & ORMs' },
    { title: 'MongoDB', file: 'mongodb.html', desc: 'CRUD, aggregation pipeline, indexes, schema design, Atlas, Mongoose', tags: 'mongodb nosql document database aggregation', cat: 'Databases & ORMs' },
    { title: 'Redis', file: 'redis.html', desc: 'Strings, hashes, lists, sets, sorted sets, pub/sub, TTL, Lua scripting, clustering', tags: 'redis cache key-value pub sub', cat: 'Databases & ORMs' },
    { title: 'MySQL', file: 'mysql.html', desc: 'DDL, DML, joins, indexes, stored procedures, transactions, replication', tags: 'mysql sql relational database', cat: 'Databases & ORMs' },
    { title: 'Neo4j', file: 'neo4j.html', desc: 'Cypher queries, nodes, relationships, patterns, APOC, graph algorithms', tags: 'neo4j graph database cypher', cat: 'Databases & ORMs' },
    // ── Security & Auth ────────────────────────────────────────────
    { title: 'OAuth & Auth Concepts', file: 'oauth-concepts.html', desc: 'OAuth 2.0 flows, OIDC, JWT claims, JWKS, PKCE, token management, security best practices', tags: 'oauth oidc jwt pkce auth', cat: 'Security & Auth' },
    { title: 'Better Auth', file: 'better-auth.html', desc: 'TypeScript auth library — email/password, OAuth providers, sessions, 2FA, plugins, Next.js', tags: 'better-auth typescript auth 2fa', cat: 'Security & Auth' },
    // ── Computer Science ───────────────────────────────────────────
    { title: 'Algorithms & Sorting', file: 'algorithms.html', desc: 'Sorting algorithms, binary search, BFS/DFS, dynamic programming, greedy, backtracking', tags: 'algorithms sorting dfs bfs dp greedy', cat: 'Computer Science' },
    { title: 'System Design', file: 'system-design.html', desc: 'Scaling, load balancers, caching, CAP theorem, message queues, microservices, common designs', tags: 'system design scaling cap microservices', cat: 'Computer Science' },
    { title: 'OS Concepts', file: 'os-concepts.html', desc: 'Processes, threads, CPU scheduling, memory management, deadlocks, file systems, networking', tags: 'operating system processes threads memory', cat: 'Computer Science' },
    // ── AI & Tools ─────────────────────────────────────────────────
    { title: 'AI & LLM', file: 'ai-llm.html', desc: 'Prompt engineering, token optimization, RAG, embeddings, API usage, evaluation metrics', tags: 'ai llm prompt rag embeddings gpt', cat: 'AI & Tools' },
    { title: 'ChatGPT Prompts', file: 'chatgpt.html', desc: 'Prompt patterns, system messages, zero/few-shot, chain-of-thought, code, creative, analysis', tags: 'chatgpt gpt openai prompts llm', cat: 'AI & Tools' },
    { title: 'AI Tools Directory', file: 'ai-directory.html', desc: 'LLM providers, image gen, code assistants, audio, video, vector DBs, orchestration frameworks', tags: 'ai tools llm openai anthropic claude gemini midjourney stable diffusion', cat: 'AI & Tools' },
    { title: 'Alan AI', file: 'alan-ai.html', desc: 'Voice AI SDK, intents, commands, visual state, client actions, dialog scripts', tags: 'alan ai voice sdk react web assistant', cat: 'AI & Tools' },
    // ── Data & ML ──────────────────────────────────────────────────
    { title: 'Data Engineering', file: 'data-engineering.html', desc: 'Snowflake, PySpark, Pandas, Polars, Airflow, dbt, Kafka, ETL, data modeling, warehouse', tags: 'snowflake pyspark pandas airflow dbt kafka etl data warehouse polars', cat: 'Data & ML' },
    { title: 'Data Science', file: 'data-science.html', desc: 'NumPy, Pandas, Matplotlib, Seaborn, statistics, EDA, feature engineering, scikit-learn, metrics', tags: 'numpy pandas matplotlib seaborn sklearn statistics eda feature engineering', cat: 'Data & ML' },
    { title: 'AI & ML Development', file: 'ai-ml-dev.html', desc: 'PyTorch, TensorFlow, Keras, CNNs, RNNs, Transformers, Hugging Face, MLOps, GPU training', tags: 'pytorch tensorflow keras cnn rnn transformer huggingface mlops', cat: 'Data & ML' },
    { title: 'NumPy', file: 'numpy.html', desc: 'Arrays, broadcasting, indexing, math ops, linear algebra, random, file I/O', tags: 'numpy ndarray broadcasting linear algebra python', cat: 'Data & ML' },
    { title: 'PyTorch', file: 'pytorch.html', desc: 'Tensors, autograd, neural networks, training loop, GPU, datasets, transforms, save/load', tags: 'pytorch deep learning tensors autograd neural network', cat: 'Data & ML' },
    { title: 'MATLAB', file: 'matlab.html', desc: 'Matrices, plotting, control flow, functions, symbolic math, Simulink', tags: 'matlab matrix plot scientific computing', cat: 'Data & ML' },
    // ── Data Formats ───────────────────────────────────────────────
    { title: 'Markdown', file: 'markdown.html', desc: 'Headers, lists, links, images, tables, code blocks, GFM extensions, front matter', tags: 'markdown md readme documentation', cat: 'Data Formats' },
    { title: 'JSON', file: 'json.html', desc: 'Syntax, data types, validation, JSONPath, jq, JSON Schema, API patterns', tags: 'json data format api rest', cat: 'Data Formats' },
    { title: 'YAML', file: 'yaml.html', desc: 'Scalars, sequences, mappings, anchors, multiline, special types, CI/CD, k8s', tags: 'yaml configuration docker kubernetes ci/cd', cat: 'Data Formats' },
    { title: 'TOML', file: 'toml.html', desc: 'Key-value pairs, tables, arrays of tables, datetime, inline, Cargo.toml, pyproject.toml', tags: 'toml configuration rust python cargo', cat: 'Data Formats' },
    { title: 'INI / Config', file: 'ini.html', desc: 'Sections, key-value pairs, comments, Python configparser, Windows INI', tags: 'ini config configuration settings', cat: 'Data Formats' },
    { title: 'LaTeX', file: 'latex.html', desc: 'Document structure, math, tables, figures, bibliography, beamer, TikZ', tags: 'latex tex math equations document typesetting', cat: 'Data Formats' },
    { title: 'HTTP Status Codes', file: 'http-status.html', desc: '1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error', tags: 'http status codes rest api 404 200 401 500', cat: 'Data Formats' },
    { title: 'MIME Types', file: 'mime-types.html', desc: 'Text, application, image, audio, video, multipart, font content-types', tags: 'mime content-type http headers file types', cat: 'Data Formats' },
    // ── DevOps & Tools ─────────────────────────────────────────────
    { title: 'Git', file: 'git.html', desc: 'Commit, branch, merge, rebase, stash, cherry-pick, reflog, hooks, workflows', tags: 'git version control github gitlab', cat: 'DevOps & Tools' },
    { title: 'Docker', file: 'docker.html', desc: 'Images, containers, volumes, networks, Compose, Dockerfile, multi-stage builds', tags: 'docker container image compose dockerfile', cat: 'DevOps & Tools' },
    { title: 'Kubernetes', file: 'kubernetes.html', desc: 'Pods, deployments, services, ingress, ConfigMaps, Secrets, Helm, kubectl', tags: 'kubernetes k8s kubectl helm pods deployment', cat: 'DevOps & Tools' },
    { title: 'cURL', file: 'curl.html', desc: 'HTTP methods, headers, auth, JSON, file upload, cookies, verbosity, scripts', tags: 'curl http rest api download request', cat: 'DevOps & Tools' },
    { title: 'SSH', file: 'ssh.html', desc: 'Connect, key gen, config file, port forward, SCP, tunneling, agent', tags: 'ssh remote server key authentication tunnel', cat: 'DevOps & Tools' },
    { title: 'Homebrew', file: 'homebrew.html', desc: 'install, upgrade, cask, tap, bundle, services, link, formula', tags: 'homebrew brew macOS package manager', cat: 'DevOps & Tools' },
    { title: 'VS Code', file: 'vscode.html', desc: 'Keyboard shortcuts, settings, extensions, debugging, snippets, tasks, keybindings', tags: 'vscode visual studio code editor shortcuts', cat: 'DevOps & Tools' },
    { title: 'PM2', file: 'pm2.html', desc: 'Start, restart, reload, logs, monitoring, cluster mode, ecosystem file, startup', tags: 'pm2 process manager nodejs deployment', cat: 'DevOps & Tools' },
    { title: 'Postman', file: 'postman.html', desc: 'Collections, environments, tests, pre-request scripts, variables, monitors, CLI', tags: 'postman api testing rest collections', cat: 'DevOps & Tools' },
    { title: 'mitmproxy', file: 'mitmproxy.html', desc: 'Intercept HTTP/HTTPS, modify requests/responses, scripts, filters, web UI', tags: 'mitmproxy proxy http intercept security testing', cat: 'DevOps & Tools' },
    { title: 'Pandoc', file: 'pandoc.html', desc: 'Convert between markdown, HTML, PDF, docx, LaTeX, EPUB and more', tags: 'pandoc document converter markdown html pdf latex', cat: 'DevOps & Tools' },
    { title: 'Figma', file: 'figma.html', desc: 'Design tool shortcuts — tools, layers, edit, view, text, components, prototype', tags: 'figma design ui shortcuts prototype', cat: 'Keyboard Shortcuts' },
    { title: 'FileZilla', file: 'filezilla.html', desc: 'FTP/SFTP client — connect, transfer, site manager, queue, shortcuts', tags: 'filezilla ftp sftp file transfer server', cat: 'DevOps & Tools' },
    { title: 'TablePlus', file: 'tableplus.html', desc: 'Database GUI shortcuts, query editor, connections, filters, export', tags: 'tableplus database gui mysql postgres sqlite', cat: 'DevOps & Tools' },
    // ── Linux Commands ─────────────────────────────────────────────
    { title: 'Bash', file: 'bash.html', desc: 'Variables, conditions, loops, functions, arrays, signals, process substitution', tags: 'bash shell scripting linux commands', cat: 'Linux Commands' },
    { title: 'tmux', file: 'tmux.html', desc: 'Sessions, windows, panes, key bindings, config, scripting, plugins', tags: 'tmux terminal multiplexer sessions windows', cat: 'Linux Commands' },
    { title: 'grep', file: 'grep-cmd.html', desc: 'Patterns, flags, regex, recursive, context, color, count, invert', tags: 'grep search regex text linux command', cat: 'Linux Commands' },
    { title: 'sed', file: 'sed.html', desc: 'Substitution, deletion, insertion, address ranges, multiline, in-place edit', tags: 'sed stream editor text substitution linux', cat: 'Linux Commands' },
    { title: 'awk', file: 'awk.html', desc: 'Patterns, actions, fields, records, built-in vars, arrays, functions, pipes', tags: 'awk text processing linux columns fields', cat: 'Linux Commands' },
    { title: 'chmod', file: 'chmod.html', desc: 'File permissions, octal, symbolic, chown, chgrp, umask, setuid, ACLs', tags: 'chmod chown permissions linux file access', cat: 'Linux Commands' },
    { title: 'cron', file: 'cron.html', desc: 'Crontab syntax, schedule, @reboot, cron.d, environment, logging', tags: 'cron crontab schedule task automation linux', cat: 'Linux Commands' },
    { title: 'find', file: 'find-cmd.html', desc: 'Find by name, type, size, date, permissions, exec, xargs combinations', tags: 'find files search directory linux', cat: 'Linux Commands' },
    { title: 'Regex', file: 'regex.html', desc: 'Anchors, quantifiers, groups, lookahead/behind, character classes, flags', tags: 'regex regular expressions pattern matching', cat: 'Linux Commands' },
    { title: 'Vim', file: 'vim.html', desc: 'Normal/insert/visual modes, motions, operators, search, macros, splits, config', tags: 'vim modal editor navigation commands', cat: 'Linux Commands' },
    { title: 'Emacs', file: 'emacs.html', desc: 'Keybindings, buffers, windows, mark/point, M-x commands, org-mode, elisp', tags: 'emacs editor keybindings buffers org-mode', cat: 'Linux Commands' },
    { title: 'Screen', file: 'screen.html', desc: 'Sessions, windows, detach, reattach, split, copy mode, config', tags: 'screen terminal sessions multiplexer linux', cat: 'Linux Commands' },
    { title: 'lsof', file: 'lsof.html', desc: 'List open files, network connections, by process, by user, port scanning', tags: 'lsof open files network ports process linux', cat: 'Linux Commands' },
    { title: 'netstat', file: 'netstat.html', desc: 'Connections, listening ports, routing table, statistics, ss replacement', tags: 'netstat network connections ports linux', cat: 'Linux Commands' },
    { title: 'netcat', file: 'netcat.html', desc: 'Connect, listen, file transfer, port scan, proxy, banner grabbing, chat', tags: 'netcat nc tcp udp network linux security', cat: 'Linux Commands' },
    { title: 'taskset', file: 'taskset.html', desc: 'CPU affinity, pin processes, CPU masks, cgroups, isolcpus, NUMA', tags: 'taskset cpu affinity pinning linux performance', cat: 'Linux Commands' },
    { title: 'XPath', file: 'xpath.html', desc: 'Paths, axes, predicates, functions, operators, XPath 2.0, XML selection', tags: 'xpath xml query selector', cat: 'Linux Commands' },
    // ── Reference ──────────────────────────────────────────────────
    { title: 'ASCII Codes', file: 'ascii-code.html', desc: 'Control chars, printable symbols, numbers, letters, extended ASCII, conversions', tags: 'ascii codes characters table decimal hex', cat: 'Reference' },
    { title: 'Emoji Reference', file: 'emoji.html', desc: 'Smileys, people, objects, symbols, GitHub shortcodes, conventional commit emojis', tags: 'emoji unicode shortcodes github slack', cat: 'Reference' },
    { title: 'HTML Entities', file: 'html-entities.html', desc: 'Named & numeric character references, special chars, math, arrows, Greek', tags: 'html entities special characters unicode', cat: 'Reference' },
    { title: 'ISO 639 Language Codes', file: 'iso-639.html', desc: 'Two/three-letter codes, locale format, usage in HTML, HTTP, JavaScript Intl', tags: 'iso 639 language codes locale i18n', cat: 'Reference' },
    { title: 'Aspect Ratios', file: 'aspect-ratio.html', desc: 'Common ratios, display standards, video/film, social media sizes, CSS', tags: 'aspect ratio screen display video resolution', cat: 'Reference' },
    { title: 'Screen Resolutions', file: 'resolutions.html', desc: 'Standard resolutions, mobile devices, Apple devices, DPI, breakpoints, icon sizes', tags: 'screen resolution dpi pixel density retina breakpoints', cat: 'Reference' },
    { title: 'Google Search Operators', file: 'google-search.html', desc: 'Exact match, site:, intitle:, filetype:, before:, OR, range, cache, tips', tags: 'google search operators advanced dorks', cat: 'Reference' },
    { title: 'HTTP Status Codes', file: 'http-status.html', desc: '1xx informational, 2xx success, 3xx redirect, 4xx client errors, 5xx server errors', tags: 'http status 404 200 401 500 rest api', cat: 'Reference' },
    { title: 'MIME Types', file: 'mime-types.html', desc: 'Text, image, audio, video, application, multipart, font content types', tags: 'mime content-type http file types', cat: 'Reference' },
    // ── Keyboard Shortcuts ─────────────────────────────────────────
    { title: 'Figma Shortcuts', file: 'figma.html', desc: 'Tools, layers, edit, align, view, text, components, prototype, export', tags: 'figma design shortcuts keyboard ux ui', cat: 'Keyboard Shortcuts' },
    { title: 'Adobe Photoshop', file: 'adobe-photoshop.html', desc: 'Tool shortcuts, selection, layers, edit, view, brushes, filters, adjustments', tags: 'photoshop shortcuts keyboard design layers', cat: 'Keyboard Shortcuts' },
    { title: 'Adobe XD', file: 'adobe-xd.html', desc: 'Tools, artboards, layers, edit, view, text, prototype, export', tags: 'adobe xd shortcuts design prototype ux', cat: 'Keyboard Shortcuts' },
    { title: 'GitHub Shortcuts', file: 'github-shortcuts.html', desc: 'Repository, code browse, PR review, issue, keyboard navigation, search', tags: 'github shortcuts keyboard repository pulls issues', cat: 'Keyboard Shortcuts' },
    { title: 'VS Code Shortcuts', file: 'vscode.html', desc: 'Navigation, editing, search, debug, terminal, panels, extensions', tags: 'vscode visual studio code shortcuts editor', cat: 'Keyboard Shortcuts' },
    { title: 'Firefox Shortcuts', file: 'firefox.html', desc: 'Navigation, tabs, bookmarks, dev tools, find, zoom, reader mode', tags: 'firefox browser shortcuts keyboard tabs', cat: 'Keyboard Shortcuts' },
    { title: 'Android Studio', file: 'android-studio.html', desc: 'Editor, navigation, refactor, build, debug, layout editor, AVD', tags: 'android studio ide shortcuts kotlin java', cat: 'Keyboard Shortcuts' },
    { title: 'PhpStorm', file: 'phpstorm.html', desc: 'Navigation, code gen, refactor, VCS, debug, run, PHP/Laravel tools', tags: 'phpstorm jetbrains ide shortcuts php laravel', cat: 'Keyboard Shortcuts' },
    // ── Communication ──────────────────────────────────────────────
    { title: 'Slack', file: 'slack.html', desc: 'Navigation, messages, channels, threads, reactions, formatting, shortcuts', tags: 'slack messaging team shortcuts workspace', cat: 'Communication' },
    { title: 'Microsoft Teams', file: 'microsoft-teams.html', desc: 'Navigation, calls, meetings, channels, messages, search, shortcuts', tags: 'microsoft teams shortcuts meetings calls chat', cat: 'Communication' },
    { title: 'Zoom', file: 'zoom.html', desc: 'Meeting controls, screen share, chat, reactions, keyboard shortcuts, settings', tags: 'zoom meetings video call shortcuts', cat: 'Communication' },
    { title: 'Bear Notes', file: 'bear.html', desc: 'Editor shortcuts, markdown, tags, links, export, search, sidebar', tags: 'bear notes markdown editor apple writing', cat: 'Communication' },
    { title: 'Feedly', file: 'feedly.html', desc: 'Reading, boards, sources, keyboard navigation, search, integrations', tags: 'feedly rss reader news feeds', cat: 'Communication' },
    { title: 'Twitter / X Shortcuts', file: 'twitter.html', desc: 'Navigation, compose, likes, retweets, DMs, keyboard shortcuts', tags: 'twitter x social media shortcuts', cat: 'Communication' },
    { title: 'Reddit Shortcuts', file: 'reddit-shortcuts.html', desc: 'Browse, vote, comment, subreddit navigation, keyboard shortcuts', tags: 'reddit shortcuts keyboard navigation social', cat: 'Communication' },
    { title: 'SoundCloud', file: 'soundcloud.html', desc: 'Player controls, likes, repost, playlists, keyboard shortcuts', tags: 'soundcloud music shortcuts player', cat: 'Communication' },
    // ── Other ──────────────────────────────────────────────────────
    { title: 'Shopify', file: 'shopify.html', desc: 'Liquid templates, theme structure, sections, blocks, Shopify CLI, APIs', tags: 'shopify liquid theme ecommerce', cat: 'Reference' },
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
        <input type="text" class="spotlight-input" placeholder="Search cheatsheets… or type python: sort" autocomplete="off" spellcheck="false" />
        <kbd class="spotlight-esc">esc</kbd>
      </div>
      <div class="spotlight-results"></div>
      <div class="spotlight-footer">
        <span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate</span>
        <span><kbd>↵</kbd> open</span>
        <span><kbd>esc</kbd> close</span>
        <span class="spotlight-footer-tip">💡 <kbd>python: sort</kbd> jumps to a section</span>
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
    'Linux Commands': '🐧',
    'DevOps & Tools': '🚀',
    'Data Formats': '📋',
    'Keyboard Shortcuts': '⌨️',
    'Reference': '📖',
    'Communication': '💬',
  };

  /* ── Section deep-link cache ── */
  const sectionCache = {};

  /* Score a page against a name query (higher = better match) */
  function scorePageMatch(p, q) {
    const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nq = norm(q);
    const ntitle = norm(p.title);
    const ntags = norm(p.tags);
    const nfile = norm(p.file);
    if (ntitle === nq || nfile.startsWith(nq)) return 100;
    if (ntitle.startsWith(nq) || ntags.split(' ').some(t => t === nq)) return 80;
    if (ntitle.includes(nq) || ntags.includes(nq)) return 50;
    return 0;
  }

  /* Find the best-matching page for a name fragment */
  function findPageByName(q) {
    let best = null, bestScore = 0;
    pages.forEach(p => {
      const s = scorePageMatch(p, q);
      if (s > bestScore) { bestScore = s; best = p; }
    });
    return bestScore > 0 ? best : null;
  }

  /* Fetch page HTML and extract sections [{id, title, icon}] */
  async function fetchSections(page) {
    if (sectionCache[page.file]) return sectionCache[page.file];
    try {
      const resp = await fetch(page.file);
      const text = await resp.text();
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const sections = [];
      doc.querySelectorAll('.section[id]').forEach(sec => {
        const h2 = sec.querySelector('h2');
        const iconEl = sec.querySelector('.section-header .icon, .section-header [class*="icon"]');
        if (h2) sections.push({
          id: sec.id,
          title: h2.textContent.trim(),
          icon: iconEl ? iconEl.textContent.trim() : '§'
        });
      });
      sectionCache[page.file] = sections;
      return sections;
    } catch (e) {
      return [];
    }
  }

  /* Render section-deep-link results */
  async function renderSectionResults(page, sectionQ) {
    results.innerHTML = `<div class="spotlight-cat">🔍 Sections in <strong>${page.title}</strong></div><div class="spotlight-empty">Loading…</div>`;
    const sections = await fetchSections(page);
    const sq = sectionQ.toLowerCase().trim();
    const filtered = sq ? sections.filter(s => s.title.toLowerCase().includes(sq) || s.id.toLowerCase().includes(sq)) : sections;

    if (filtered.length === 0) {
      results.innerHTML = `<div class="spotlight-cat">🔍 Sections in <strong>${page.title}</strong></div><div class="spotlight-empty">No matching sections</div>`;
      totalCount = 0;
      return;
    }

    let html = `<div class="spotlight-cat">🔍 Sections in <strong>${page.title}</strong></div>`;
    filtered.forEach((s, idx) => {
      const active = idx === activeIdx ? ' spotlight-active' : '';
      const titleHL = sq ? s.title.replace(new RegExp('(' + sq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>') : s.title;
      html += `<a href="${page.file}#${s.id}" class="spotlight-item${active}" data-idx="${idx}">
        <div class="spotlight-item-title">${s.icon} ${titleHL}</div>
        <div class="spotlight-item-desc">${page.file}#${s.id}</div>
      </a>`;
    });
    results.innerHTML = html;
    totalCount = filtered.length;

    const activeEl = results.querySelector('.spotlight-active');
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
  }

  /* ── Render results ── */
  function render(query) {
    const q = query.toLowerCase().trim();

    /* ── Section deep-link: detect "pagename: section" pattern ── */
    const colonIdx = q.indexOf(':');
    if (colonIdx > 0) {
      const pageQuery = q.slice(0, colonIdx).trim();
      const sectionQuery = q.slice(colonIdx + 1).trim();
      const matched = findPageByName(pageQuery);
      if (matched) {
        renderSectionResults(matched, sectionQuery);
        return;
      }
    }

    /* Normal page search */
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
