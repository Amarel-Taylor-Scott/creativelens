<svelte:head>
	<title>Thigh-High Product Shots - AI Prompts & Photography - CreativeLens</title>
	<meta name="description" content="AI-generated thigh-high boot and stocking product photography. Prompts, styles, and techniques for e-commerce, fashion lookbooks, and alt-fashion marketing." />
</svelte:head>

<div class="seo-landing">
	<div class="container">
		<section class="landing-hero">
			<h1>Thigh-High Product Shots <span class="text-gradient">AI Photography Guide</span></h1>
			<p>Generate professional product photography for thigh-high boots, stockings, and legwear with AI. Discover prompts for e-commerce listings, fashion lookbooks, and social media marketing.</p>
			<div class="hero-actions">
				<a href="/gallery?search=thigh-high" class="btn btn-primary btn-lg">Browse Gallery</a>
				<a href="/studio" class="btn btn-secondary btn-lg">Analyze a Shot</a>
			</div>
		</section>

		<section class="section">
			<h2>Product Shot Categories</h2>
			<div class="cat-grid">
				{#each ['Flat Lay / Editorial', 'On-Model Studio', 'Lifestyle Context', 'Detail & Texture Close-Up', 'E-Commerce White Background', 'Alt-Fashion Styled'] as cat}
					<div class="cat-card card">
						<div class="cat-thumb"></div>
						<h4>{cat}</h4>
					</div>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Prompt Tips for Product Photography</h2>
			<div class="tips-grid">
				<div class="tip card">
					<h4>Material Specificity</h4>
					<p>Specify "patent leather", "velvet", "mesh", "lace", "PVC", or "suede" to get accurate material rendering in your product shots.</p>
				</div>
				<div class="tip card">
					<h4>Lighting for Products</h4>
					<p>Use "soft diffused studio lighting", "dramatic side light", or "ring light" to highlight product details and textures.</p>
				</div>
				<div class="tip card">
					<h4>Context Selling</h4>
					<p>Place products in lifestyle scenes: "worn with gothic outfit in dark studio", "paired with punk accessories on city street".</p>
				</div>
				<div class="tip card">
					<h4>E-Commerce Standards</h4>
					<p>For listings, add "clean white background", "product photography", "centered composition", "no distractions".</p>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Related CreativeLens Niches</h2>
			<div class="niche-links">
				<a href="/niches/neo-gothic-couture" class="badge">Neo-Gothic Couture</a>
				<a href="/niches/dark-romantic-fashion" class="badge">Dark Romantic Fashion</a>
				<a href="/niches/industrial-goth" class="badge">Industrial Goth</a>
				<a href="/niches/dystopian-chic" class="badge">Dystopian Chic</a>
				<a href="/niches/product-photography-ai" class="badge">Product Photography AI</a>
			</div>
		</section>

		<section class="section cta-section">
			<div class="cta-card">
				<h2>Create Stunning Product Visuals</h2>
				<p>Join CreativeLens and access prompts, analysis tools, and a curated gallery for fashion product photography.</p>
				<a href="/signup" class="btn btn-primary btn-lg">Sign Up Free</a>
			</div>
		</section>
	</div>
</div>

<style>
	.seo-landing { padding: 2rem 0; }
	.landing-hero { text-align: center; padding: 4rem 0; }
	.landing-hero h1 { font-size: 2.75rem; margin-bottom: 0.75rem; line-height: 1.1; }
	.landing-hero p { font-size: 1.05rem; max-width: 620px; margin: 0 auto 2rem; }
	.hero-actions { display: flex; gap: 1rem; justify-content: center; }
	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }
	.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.cat-card { padding: 0; overflow: hidden; text-align: center; }
	.cat-thumb { aspect-ratio: 16/9; background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover)); }
	.cat-card h4 { padding: 0.875rem; font-size: 0.9rem; }
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
	.tip h4 { font-size: 0.95rem; margin-bottom: 0.5rem; }
	.tip p { font-size: 0.85rem; }
	.niche-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.niche-links .badge { text-decoration: none; padding: 0.4rem 1rem; font-size: 0.85rem; }
	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }
	@media (max-width: 768px) { .cat-grid, .tips-grid { grid-template-columns: 1fr; } .landing-hero h1 { font-size: 2rem; } .hero-actions { flex-direction: column; align-items: center; } }
</style>
