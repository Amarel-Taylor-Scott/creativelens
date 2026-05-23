<svelte:head>
	<title>CreativeLens for Creative Agencies</title>
	<meta name="description" content="Enterprise creative intelligence for agencies. Team collaboration, API integration, bulk operations, and white-label reports." />
</svelte:head>

<div class="landing-page">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<span class="badge">For Creative Agencies</span>
				<h1>Scale Your Agency's <span class="text-gradient">Creative Intelligence</span></h1>
				<p class="hero-subtitle">Your clients expect cutting-edge AI visuals. CreativeLens gives your entire team prompt intelligence, curated inspiration, and production tools to deliver faster without sacrificing quality.</p>
				<div class="hero-actions">
					<a href="/contact" class="btn btn-primary btn-lg">Talk to Sales</a>
					<a href="/pricing" class="btn btn-secondary btn-lg">See Agency Plan</a>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container">
			<div class="section-header" style="text-align: center;">
				<h2>Built for Agency Workflows</h2>
			</div>
			<div class="features-grid">
				<div class="feature-card card">
					<div class="feature-icon">T</div>
					<h3>10-Seat Teams</h3>
					<p>Everyone from art directors to junior designers on one platform. Shared boards, shared prompts, shared intelligence.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">A</div>
					<h3>5,000 API Requests/Day</h3>
					<p>Integrate CreativeLens into your production pipeline. Automate prompt analysis, image search, and niche discovery.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">B</div>
					<h3>Bulk Operations</h3>
					<p>Download packs, batch-analyze images, and export prompt collections. Work at the scale your clients demand.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">W</div>
					<h3>White-Label Reports</h3>
					<p>Generate branded creative intelligence reports for your clients. Show trend data, niche analysis, and campaign recommendations.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">L</div>
					<h3>LoRA Training</h3>
					<p>Train custom models to maintain character consistency, brand aesthetics, and signature styles across client campaigns.</p>
				</div>
				<div class="feature-card card">
					<div class="feature-icon">S</div>
					<h3>Priority Support</h3>
					<p>Dedicated account manager, priority email support, and custom niche curation for your agency's focus areas.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section cta-section">
		<div class="container">
			<div class="cta-card">
				<h2>Ready to Upgrade Your Agency?</h2>
				<p>Join agencies using CreativeLens to produce better AI content for their clients, faster.</p>
				<div class="cta-actions">
					<a href="/contact" class="btn btn-primary btn-lg">Contact Sales</a>
					<a href="/signup" class="btn btn-secondary btn-lg">Start Free Trial</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.hero { padding: 6rem 0 4rem; text-align: center; background: radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 60%); }
	.hero-content { max-width: 680px; margin: 0 auto; }
	.hero h1 { font-size: 3rem; margin: 0.75rem 0 1rem; line-height: 1.1; }
	.hero-subtitle { font-size: 1.05rem; margin-bottom: 2rem; }
	.hero-actions { display: flex; gap: 1rem; justify-content: center; }
	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }

	.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
	.feature-card { text-align: center; padding: 2rem 1.5rem; }
	.feature-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-accent-dim); color: var(--color-accent); display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
	.feature-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
	.feature-card p { font-size: 0.85rem; }

	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }
	.cta-actions { display: flex; gap: 1rem; justify-content: center; }

	@media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2rem; } .hero-actions, .cta-actions { flex-direction: column; align-items: center; } }
</style>
