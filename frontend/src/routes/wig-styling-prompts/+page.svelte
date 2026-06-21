<svelte:head>
	<title>Wig Styling AI Prompts & Inspiration - CreativeLens</title>
	<meta name="description" content="AI prompts for generating wig styling concepts, fantasy hair designs, and hair color inspirations. Perfect for wig brands, cosplayers, and hair stylists." />
</svelte:head>

<div class="seo-landing">
	<div class="container">
		<section class="landing-hero">
			<h1>Wig Styling <span class="text-gradient">AI Prompts & Inspiration</span></h1>
			<p>Generate stunning wig styling concepts with AI. From fantasy hair colors to cosplay-accurate styles, find prompts that produce professional-quality wig imagery for products, lookbooks, and social media.</p>
			<div class="hero-actions">
				<a href="/gallery?search=wig+hair" class="btn btn-primary btn-lg">Browse Hair Gallery</a>
				<a href="/studio" class="btn btn-secondary btn-lg">Analyze a Style</a>
			</div>
		</section>

		<section class="section">
			<h2>Wig Style Categories</h2>
			<div class="style-grid">
				{#each ['Pastel Fantasy', 'Gothic & Dark', 'Anime Character Wigs', 'Natural Gradient', 'Avant-Garde Sculptural', 'Retro & Vintage'] as style}
					<div class="style-card card"><div class="style-thumb"></div><h4>{style}</h4></div>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Prompt Techniques for Wig Imagery</h2>
			<div class="tips-grid">
				<div class="tip card">
					<h4>Color Precision</h4>
					<p>Use exact color descriptions: "lavender ombre to silver tips", "bubblegum pink roots fading to cotton candy blue", "deep wine red with burgundy undertones".</p>
				</div>
				<div class="tip card">
					<h4>Texture Keywords</h4>
					<p>Specify "silky straight", "loose waves", "tight ringlets", "braided updo", "choppy layers" for accurate hair texture generation.</p>
				</div>
				<div class="tip card">
					<h4>Styling Details</h4>
					<p>Include accessories: "decorated with small flowers", "with crystal hair pins", "incorporating ribbons", "adorned with chains".</p>
				</div>
				<div class="tip card">
					<h4>Product Photography</h4>
					<p>For wig product shots: "wig on mannequin head", "clean background", "studio lighting", "showing cap construction detail".</p>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Related Niches</h2>
			<div class="niche-links">
				<a href="/niches/fantasy-hair-color" class="badge">Fantasy Hair Color</a>
				<a href="/niches/fairy-kei" class="badge">Fairy Kei</a>
				<a href="/niches/visual-kei" class="badge">Visual Kei</a>
				<a href="/niches/lolita-fashion" class="badge">Lolita Fashion</a>
				<a href="/niches/decora" class="badge">Decora</a>
			</div>
		</section>

		<section class="section cta-section">
			<div class="cta-card">
				<h2>Generate Wig Styling Concepts</h2>
				<p>Join CreativeLens for curated hair and wig styling prompts, AI analysis tools, and inspiration across 86 creative niches.</p>
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
	.style-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.style-card { padding: 0; overflow: hidden; text-align: center; }
	.style-thumb { aspect-ratio: 16/9; background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover)); }
	.style-card h4 { padding: 0.875rem; font-size: 0.9rem; }
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
	.tip h4 { font-size: 0.95rem; margin-bottom: 0.5rem; }
	.tip p { font-size: 0.85rem; }
	.niche-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.niche-links .badge { text-decoration: none; padding: 0.4rem 1rem; font-size: 0.85rem; }
	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }
	@media (max-width: 768px) { .style-grid, .tips-grid { grid-template-columns: 1fr; } .landing-hero h1 { font-size: 2rem; } .hero-actions { flex-direction: column; align-items: center; } }
</style>
