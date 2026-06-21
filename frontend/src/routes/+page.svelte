<svelte:head>
	<title>CreativeLens - Creative Intelligence for AI Content</title>
</svelte:head>

<section class="hero">
	<div class="container">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge">Creative Intelligence Platform</span>
			</div>
			<h1>Discover, Generate &amp; Analyze <span class="text-gradient">AI-Powered Visuals</span></h1>
			<p class="hero-subtitle">
				The creative intelligence platform built for marketing teams. Browse curated galleries across 86 niches,
				reverse-engineer prompts from any image, and track what resonates with your audience.
			</p>
			<div class="hero-actions">
				<a href="/gallery" class="btn btn-primary btn-lg">Explore Gallery</a>
				<a href="/studio" class="btn btn-secondary btn-lg">Try the Studio</a>
			</div>
			<div class="hero-stats">
				<div class="stat">
					<span class="stat-value">86</span>
					<span class="stat-label">Creative Niches</span>
				</div>
				<div class="stat">
					<span class="stat-value">9</span>
					<span class="stat-label">Categories</span>
				</div>
				<div class="stat">
					<span class="stat-value">AI</span>
					<span class="stat-label">Prompt Analysis</span>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="section-header" style="text-align: center;">
			<h2>How CreativeLens Works</h2>
			<p>From discovery to production, every step of your creative workflow.</p>
		</div>
		<div class="features-grid">
			<div class="feature-card card">
				<div class="feature-icon">G</div>
				<h3>Curated Gallery</h3>
				<p>Browse thousands of AI-generated images organized across 9 categories and 86 specialized niches, from Alt Fashion to Virtual Companions.</p>
			</div>
			<div class="feature-card card">
				<div class="feature-icon">P</div>
				<h3>Prompt Intelligence</h3>
				<p>Upload any image to our Studio and let AI reverse-engineer the prompt, model settings, and style tags that likely created it.</p>
			</div>
			<div class="feature-card card">
				<div class="feature-icon">N</div>
				<h3>Niche Explorer</h3>
				<p>Navigate 86 interconnected creative niches with our interactive force-directed graph. Discover trends, follow niches, and find inspiration.</p>
			</div>
			<div class="feature-card card">
				<div class="feature-icon">S</div>
				<h3>Creator Submissions</h3>
				<p>Submit your AI-generated work with up to 23 niche tags per image. Get featured in our curated gallery and build your creative profile.</p>
			</div>
			<div class="feature-card card">
				<div class="feature-icon">A</div>
				<h3>API Access</h3>
				<p>Integrate CreativeLens into your workflow with our REST API. Search images, analyze prompts, and browse niches programmatically.</p>
			</div>
			<div class="feature-card card">
				<div class="feature-icon">E</div>
				<h3>AI Education</h3>
				<p>Learn prompt engineering techniques, understand AI model differences, and stay ahead of creative AI trends through our content hub.</p>
			</div>
		</div>
	</div>
</section>

<section class="section categories-preview">
	<div class="container">
		<div class="section-header" style="text-align: center;">
			<h2>9 Creative Categories</h2>
			<p>Explore specialized creative territories, each with curated sub-niches.</p>
		</div>
		<div class="category-grid">
			{#each [
				{ name: 'Alt Fashion', count: 34, color: '#8b5cf6', slug: 'alt-fashion' },
				{ name: 'AI Streaming', count: 9, color: '#ef4444', slug: 'ai-streaming' },
				{ name: 'Stream Visual Assets', count: 8, color: '#f59e0b', slug: 'stream-visual-assets' },
				{ name: 'Alt Beauty', count: 7, color: '#ec4899', slug: 'alt-beauty' },
				{ name: 'Concept Designers', count: 7, color: '#6366f1', slug: 'concept-designers' },
				{ name: 'Marketers', count: 6, color: '#10b981', slug: 'marketers' },
				{ name: 'AI Influencers', count: 5, color: '#f97316', slug: 'ai-influencers' },
				{ name: 'Alt Accessories', count: 5, color: '#a855f7', slug: 'alt-accessories' },
				{ name: 'Virtual Companion', count: 5, color: '#06b6d4', slug: 'virtual-companion' },
			] as cat}
				<a href="/categories/{cat.slug}" class="category-card card">
					<div class="category-indicator" style="background: {cat.color};"></div>
					<h4>{cat.name}</h4>
					<span class="category-count">{cat.count} niches</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="section cta-section">
	<div class="container">
		<div class="cta-card">
			<h2>Ready to Supercharge Your Creative Workflow?</h2>
			<p>Join marketing teams using CreativeLens to discover inspiration, generate prompts, and produce AI content at scale.</p>
			<div class="cta-actions">
				<a href="/signup" class="btn btn-primary btn-lg">Start Free</a>
				<a href="/pricing" class="btn btn-secondary btn-lg">View Pricing</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding: 6rem 0 4rem;
		text-align: center;
		background: radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 60%);
	}

	.hero-content {
		max-width: 720px;
		margin: 0 auto;
	}

	.hero-badge {
		margin-bottom: 1.5rem;
	}

	.hero h1 {
		font-size: 3.25rem;
		margin-bottom: 1.25rem;
		line-height: 1.1;
	}

	.hero-subtitle {
		font-size: 1.125rem;
		max-width: 580px;
		margin: 0 auto 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 3rem;
	}

	.btn-lg {
		padding: 0.8rem 1.75rem;
		font-size: 1rem;
	}

	.hero-stats {
		display: flex;
		justify-content: center;
		gap: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--color-accent);
	}

	.stat-label {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.feature-card {
		text-align: center;
		padding: 2rem 1.5rem;
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		background: var(--color-accent-dim);
		color: var(--color-accent);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: 800;
		margin-bottom: 1rem;
	}

	.feature-card h3 {
		margin-bottom: 0.5rem;
		font-size: 1.125rem;
	}

	.feature-card p {
		font-size: 0.875rem;
	}

	.category-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.category-card {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 1.125rem 1.25rem;
		text-decoration: none;
		color: var(--color-text);
	}

	.category-card:hover {
		border-color: var(--color-accent);
	}

	.category-indicator {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.category-card h4 {
		flex: 1;
		font-size: 0.95rem;
	}

	.category-count {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.cta-section {
		padding-bottom: 0;
	}

	.cta-card {
		text-align: center;
		padding: 4rem 2rem;
		background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1));
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.cta-card h2 {
		margin-bottom: 0.75rem;
	}

	.cta-card p {
		max-width: 520px;
		margin: 0 auto 1.5rem;
	}

	.cta-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.features-grid,
		.category-grid {
			grid-template-columns: 1fr;
		}

		.hero-stats {
			gap: 1.5rem;
		}

		.cta-actions {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
