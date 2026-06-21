<svelte:head>
	<title>CreativeLens for Etsy Sellers</title>
	<meta name="description" content="AI-generated product photography and listing visuals for Etsy shop owners. Discover prompts, styles, and templates that sell." />
</svelte:head>

<div class="landing-page">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<span class="badge">For Etsy Sellers</span>
				<h1>Make Your Listings <span class="text-gradient">Stand Out with AI</span></h1>
				<p class="hero-subtitle">Professional product photography and lifestyle shots cost hundreds. CreativeLens helps you generate stunning listing images with AI, reverse-engineer winning product shots, and boost your click-through rate.</p>
				<div class="hero-actions">
					<a href="/signup" class="btn btn-primary btn-lg">Start Free</a>
					<a href="/niches" class="btn btn-secondary btn-lg">Browse Niches</a>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container">
			<div class="section-header" style="text-align: center;">
				<h2>Why Etsy Sellers Love CreativeLens</h2>
			</div>
			<div class="benefits-grid">
				<div class="benefit-card card">
					<div class="benefit-icon">P</div>
					<h3>Product Shot Prompts</h3>
					<p>Browse our Product Photography AI niche to find prompts that generate studio-quality product shots with perfect lighting and backgrounds.</p>
				</div>
				<div class="benefit-card card">
					<div class="benefit-icon">S</div>
					<h3>Style Matching</h3>
					<p>See a competitor's stunning listing photo? Upload it to our Studio and reverse-engineer the exact prompt and style used.</p>
				</div>
				<div class="benefit-card card">
					<div class="benefit-icon">L</div>
					<h3>Lifestyle Contexts</h3>
					<p>Generate lifestyle shots of your products in home settings, seasonal scenes, and on-trend backgrounds without a photo shoot.</p>
				</div>
				<div class="benefit-card card">
					<div class="benefit-icon">B</div>
					<h3>Brand Consistency</h3>
					<p>Save your best prompts to boards and reuse them across your entire catalog. Keep your shop looking cohesive and professional.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section cta-section">
		<div class="container">
			<div class="cta-card">
				<h2>Join Thousands of Sellers Using AI</h2>
				<p>Better photos mean more sales. Get started with CreativeLens and transform your Etsy shop's visual identity.</p>
				<a href="/signup" class="btn btn-primary btn-lg">Get Started Free</a>
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

	.benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
	.benefit-card { padding: 2rem; }
	.benefit-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-accent-dim); color: var(--color-accent); display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
	.benefit-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
	.benefit-card p { font-size: 0.85rem; }

	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }

	@media (max-width: 768px) { .benefits-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2rem; } .hero-actions { flex-direction: column; align-items: center; } }
</style>
