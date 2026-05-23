<script>
	let installed = false;
</script>

<svelte:head>
	<title>Chrome Extension - CreativeLens</title>
	<meta name="description" content="Analyze any AI-generated image on the web with the CreativeLens Chrome extension. Reverse-engineer prompts, detect styles, and save to your library." />
</svelte:head>

<div class="extension-page">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<span class="badge">Chrome Extension</span>
				<h1>Analyze AI Images <span class="text-gradient">Anywhere on the Web</span></h1>
				<p class="hero-subtitle">
					Right-click any image to instantly reverse-engineer its prompt, detect the AI model, extract style tags,
					and save it to your CreativeLens library. Works on every website.
				</p>
				<div class="hero-actions">
					<a href="#install" class="btn btn-primary btn-lg">Install Extension</a>
					<a href="#demo" class="btn btn-secondary btn-lg">Watch Demo</a>
				</div>
			</div>
			<div class="hero-demo">
				<div class="demo-browser card">
					<div class="browser-bar">
						<div class="browser-dots">
							<span class="dot"></span><span class="dot"></span><span class="dot"></span>
						</div>
						<div class="browser-url">artstation.com/some-ai-artwork</div>
					</div>
					<div class="browser-content">
						<div class="demo-image"></div>
						<div class="demo-popup card">
							<div class="popup-header">
								<span class="popup-logo">CL</span>
								<span>CreativeLens Analysis</span>
							</div>
							<div class="popup-result">
								<div class="popup-line">
									<span class="popup-label">Prompt</span>
									<span class="popup-value">cyberpunk warrior in neon city...</span>
								</div>
								<div class="popup-line">
									<span class="popup-label">Model</span>
									<span class="popup-value">Stable Diffusion XL</span>
								</div>
								<div class="popup-line">
									<span class="popup-label">Style</span>
									<div class="popup-tags">
										<span class="mini-badge">Cyberpunk</span>
										<span class="mini-badge">Neon</span>
										<span class="mini-badge">Cinematic</span>
									</div>
								</div>
								<div class="popup-line">
									<span class="popup-label">Score</span>
									<div class="popup-score-bar">
										<div class="popup-score-fill" style="width: 87%"></div>
									</div>
									<span class="popup-score-num">87</span>
								</div>
							</div>
							<div class="popup-actions">
								<button class="popup-btn">Copy Prompt</button>
								<button class="popup-btn primary">Save to Library</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section features">
		<div class="container">
			<div class="section-header" style="text-align: center;">
				<h2>What the Extension Does</h2>
				<p>Your creative intelligence toolkit, always one click away.</p>
			</div>
			<div class="features-grid">
				<div class="feature-card card">
					<div class="feature-icon">P</div>
					<h3>Instant Prompt Analysis</h3>
					<p>Right-click any AI image to reverse-engineer the likely prompt, model, and generation settings used to create it.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">S</div>
					<h3>Style Detection</h3>
					<p>Automatically detects art style, mood, composition, and tags. See exactly what makes an image tick.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">L</div>
					<h3>Save to Library</h3>
					<p>One click to save any analyzed image to your CreativeLens boards for future reference and organization.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">N</div>
					<h3>Niche Matching</h3>
					<p>See which of our 86 creative niches an image belongs to. Discover new creative territories instantly.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section install-section" id="install">
		<div class="container">
			<div class="install-card card">
				<h2>Install in 30 Seconds</h2>
				<div class="install-steps">
					<div class="step">
						<span class="step-num">1</span>
						<h4>Install from Chrome Web Store</h4>
						<p>Click the button below to add CreativeLens to Chrome.</p>
					</div>
					<div class="step">
						<span class="step-num">2</span>
						<h4>Log In</h4>
						<p>Sign in with your CreativeLens account. Free accounts supported.</p>
					</div>
					<div class="step">
						<span class="step-num">3</span>
						<h4>Right-Click to Analyze</h4>
						<p>Browse any website and right-click AI images to analyze them.</p>
					</div>
				</div>
				<a href="#" class="btn btn-primary btn-lg" style="margin-top: 2rem;">Add to Chrome - Free</a>
			</div>
		</div>
	</section>
</div>

<style>
	.extension-page { padding-bottom: 0; }

	.hero { padding: 4rem 0 2rem; background: radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 60%); }
	.hero .container { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
	.hero-content { max-width: 520px; }
	.hero h1 { font-size: 2.75rem; margin: 0.75rem 0 1rem; line-height: 1.1; }
	.hero-subtitle { font-size: 1.05rem; margin-bottom: 2rem; }
	.hero-actions { display: flex; gap: 1rem; }
	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }

	.demo-browser { padding: 0; overflow: hidden; }
	.browser-bar { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border); }
	.browser-dots { display: flex; gap: 6px; }
	.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--color-bg-tertiary); }
	.browser-url { font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg-tertiary); padding: 0.25rem 0.75rem; border-radius: 4px; flex: 1; }
	.browser-content { position: relative; height: 320px; background: var(--color-bg-tertiary); }
	.demo-image { width: 100%; height: 100%; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(99,102,241,0.15)); }

	.demo-popup { position: absolute; top: 20px; right: 20px; width: 260px; padding: 1rem; font-size: 0.75rem; box-shadow: var(--shadow-lg); }
	.popup-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; font-weight: 600; }
	.popup-logo { width: 22px; height: 22px; background: linear-gradient(135deg, var(--color-accent), #a855f7); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 800; color: white; }
	.popup-result { display: flex; flex-direction: column; gap: 0.5rem; }
	.popup-line { display: flex; align-items: center; gap: 0.5rem; }
	.popup-label { font-size: 0.65rem; color: var(--color-text-muted); min-width: 40px; }
	.popup-value { font-size: 0.7rem; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.popup-tags { display: flex; gap: 0.25rem; }
	.mini-badge { padding: 0.1rem 0.4rem; border-radius: 9999px; font-size: 0.6rem; background: var(--color-accent-dim); color: var(--color-accent); }
	.popup-score-bar { flex: 1; height: 4px; background: var(--color-bg-tertiary); border-radius: 2px; overflow: hidden; }
	.popup-score-fill { height: 100%; background: var(--color-success); border-radius: 2px; }
	.popup-score-num { font-weight: 700; color: var(--color-success); }
	.popup-actions { display: flex; gap: 0.4rem; margin-top: 0.75rem; }
	.popup-btn { flex: 1; padding: 0.35rem; border-radius: 4px; font-size: 0.65rem; font-weight: 600; background: var(--color-bg-tertiary); color: var(--color-text-secondary); border: 1px solid var(--color-border); }
	.popup-btn.primary { background: var(--color-accent); color: white; border-color: var(--color-accent); }

	.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
	.feature-card { text-align: center; padding: 2rem 1.25rem; }
	.feature-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-accent-dim); color: var(--color-accent); display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
	.feature-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
	.feature-card p { font-size: 0.85rem; }

	.install-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(168, 85, 247, 0.08)); }
	.install-card h2 { margin-bottom: 2rem; }
	.install-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center; }
	.step-num { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: var(--color-accent); color: white; font-weight: 800; font-size: 0.9rem; margin-bottom: 0.75rem; }
	.step h4 { font-size: 0.95rem; margin-bottom: 0.25rem; }
	.step p { font-size: 0.85rem; color: var(--color-text-secondary); }

	@media (max-width: 1024px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) {
		.hero .container { grid-template-columns: 1fr; }
		.features-grid, .install-steps { grid-template-columns: 1fr; }
		.hero-actions { flex-direction: column; }
	}
</style>
