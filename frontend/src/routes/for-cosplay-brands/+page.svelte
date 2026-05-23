<svelte:head>
	<title>CreativeLens for Cosplay Brands</title>
	<meta name="description" content="AI-powered visual content for cosplay gear brands. Generate product imagery, discover trends, and create marketing visuals that connect with the cosplay community." />
</svelte:head>

<div class="landing-page">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<span class="badge">For Cosplay Brands</span>
				<h1>Visualize Your Products in <span class="text-gradient">Every Fantasy World</span></h1>
				<p class="hero-subtitle">Cosplay customers want to see your wigs, contacts, and accessories on characters they love. CreativeLens helps you generate AI product shots in any character style, discover trending aesthetics, and create scroll-stopping marketing content.</p>
				<div class="hero-actions">
					<a href="/signup" class="btn btn-primary btn-lg">Start Free</a>
					<a href="/categories/alt-fashion" class="btn btn-secondary btn-lg">Browse Alt Fashion</a>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="container">
			<div class="section-header" style="text-align: center;">
				<h2>Why Cosplay Brands Choose CreativeLens</h2>
			</div>
			<div class="benefits-grid">
				<div class="benefit-card card">
					<div class="benefit-icon">V</div>
					<h3>Virtual Try-On Imagery</h3>
					<p>Generate images of your products on diverse AI characters. Wigs in different styles, contacts with different eye colors, accessories on different character types.</p>
				</div>
				<div class="benefit-card card">
					<div class="benefit-icon">T</div>
					<h3>Trend Discovery</h3>
					<p>Our Alt Fashion category tracks 34 niches from Neo-Gothic Couture to Fairy Kei. See what cosplay styles are trending before your competitors.</p>
				</div>
				<div class="benefit-card card">
					<div class="benefit-icon">M</div>
					<h3>Marketing Content at Scale</h3>
					<p>Generate social media content, product listing images, and campaign visuals without expensive photo shoots. One prompt, unlimited variations.</p>
				</div>
				<div class="benefit-card card">
					<div class="benefit-icon">N</div>
					<h3>Niche Intelligence</h3>
					<p>From Lolita Fashion to Visual Kei, understand what each cosplay sub-community wants. Tailor your marketing to specific niches.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section cta-section">
		<div class="container">
			<div class="cta-card">
				<h2>Your Products, Infinite Worlds</h2>
				<p>Join cosplay brands using AI to visualize their products in ways photo shoots never could.</p>
				<a href="/signup" class="btn btn-primary btn-lg">Get Started Free</a>
			</div>
		</div>
	</section>
</div>

<style>
	.hero { padding: 6rem 0 4rem; text-align: center; background: radial-gradient(ellipse at 50% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 60%); }
	.hero-content { max-width: 680px; margin: 0 auto; }
	.hero h1 { font-size: 3rem; margin: 0.75rem 0 1rem; line-height: 1.1; }
	.hero-subtitle { font-size: 1.05rem; margin-bottom: 2rem; }
	.hero-actions { display: flex; gap: 1rem; justify-content: center; }
	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }

	.benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
	.benefit-card { padding: 2rem; }
	.benefit-icon { width: 48px; height: 48px; border-radius: var(--radius-md); background: rgba(168,85,247,0.15); color: #a855f7; display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem; }
	.benefit-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
	.benefit-card p { font-size: 0.85rem; }

	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }

	@media (max-width: 768px) { .benefits-grid { grid-template-columns: 1fr; } .hero h1 { font-size: 2rem; } .hero-actions { flex-direction: column; align-items: center; } }
</style>
