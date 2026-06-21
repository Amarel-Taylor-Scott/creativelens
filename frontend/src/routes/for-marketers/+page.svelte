<svelte:head>
	<title>CreativeLens for Marketing Teams</title>
	<meta name="description" content="CreativeLens helps marketing teams discover AI-generated visuals, reverse-engineer prompts, and produce campaign-ready content at scale." />
</svelte:head>

<div class="landing-page">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<span class="badge">For Marketing Teams</span>
				<h1>Stop Guessing. Start <span class="text-gradient">Creating with Intelligence.</span></h1>
				<p class="hero-subtitle">Your competitors are using AI imagery. CreativeLens gives your team the prompt intelligence, curated galleries, and production tools to move faster and create better.</p>
				<div class="hero-actions">
					<a href="/signup" class="btn btn-primary btn-lg">Start Free Trial</a>
					<a href="/pricing" class="btn btn-secondary btn-lg">See Pricing</a>
				</div>
			</div>
		</div>
	</section>

	<section class="section pain-points">
		<div class="container">
			<div class="section-header" style="text-align: center;">
				<h2>The Problem with AI Content Today</h2>
			</div>
			<div class="pain-grid">
				<div class="pain-card card">
					<h4>Inconsistent Quality</h4>
					<p>Your team wastes hours tweaking prompts that produce hit-or-miss results. No systematic way to learn what works.</p>
				</div>
				<div class="pain-card card">
					<h4>No Prompt Library</h4>
					<p>Great AI images appear everywhere, but you cannot reverse-engineer them. The prompts that generated viral content stay hidden.</p>
				</div>
				<div class="pain-card card">
					<h4>Scattered Inspiration</h4>
					<p>Your team saves references in random folders. No organized system for discovering niche-specific creative trends.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section solutions">
		<div class="container">
			<div class="section-header" style="text-align: center;">
				<h2>How CreativeLens Solves This</h2>
			</div>
			<div class="solution-grid">
				<div class="solution-card card">
					<div class="solution-icon">R</div>
					<h3>Reverse-Engineer Any Image</h3>
					<p>Upload any AI image to our Studio. Get the likely prompt, model, settings, and style tags in seconds. Learn from the best.</p>
				</div>
				<div class="solution-card card">
					<div class="solution-icon">G</div>
					<h3>Curated Gallery by Niche</h3>
					<p>86 niches across 9 categories. Browse Social Ad Visuals, Product Photography AI, Campaign Mood Boards, and more.</p>
				</div>
				<div class="solution-card card">
					<div class="solution-icon">T</div>
					<h3>Team Collaboration</h3>
					<p>Share boards, save prompts, and build a team-wide visual library. Agency plan includes up to 10 seats.</p>
				</div>
				<div class="solution-card card">
					<div class="solution-icon">A</div>
					<h3>API Integration</h3>
					<p>Integrate prompt analysis and image search into your existing workflow with our REST API. Up to 5,000 requests per day.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section cta-section">
		<div class="container">
			<div class="cta-card">
				<h2>Your Team Deserves Better Creative Tools</h2>
				<p>Join marketing teams already using CreativeLens to produce AI content faster and at higher quality.</p>
				<div class="cta-actions">
					<a href="/signup" class="btn btn-primary btn-lg">Start Free</a>
					<a href="/contact" class="btn btn-secondary btn-lg">Talk to Sales</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.hero { padding: 6rem 0 4rem; text-align: center; background: radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 60%); }
	.hero-content { max-width: 680px; margin: 0 auto; }
	.hero h1 { font-size: 3rem; margin: 0.75rem 0 1rem; line-height: 1.1; }
	.hero-subtitle { font-size: 1.1rem; margin-bottom: 2rem; }
	.hero-actions { display: flex; gap: 1rem; justify-content: center; }
	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }

	.pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
	.pain-card { padding: 1.5rem; }
	.pain-card h4 { font-size: 1rem; margin-bottom: 0.5rem; color: var(--color-error); }
	.pain-card p { font-size: 0.85rem; }

	.solution-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
	.solution-card { padding: 2rem; }
	.solution-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-accent-dim); color: var(--color-accent); display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
	.solution-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
	.solution-card p { font-size: 0.85rem; }

	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 520px; margin: 0 auto 1.5rem; }
	.cta-actions { display: flex; gap: 1rem; justify-content: center; }

	@media (max-width: 768px) {
		.pain-grid, .solution-grid { grid-template-columns: 1fr; }
		.hero h1 { font-size: 2rem; }
		.hero-actions, .cta-actions { flex-direction: column; align-items: center; }
	}
</style>
