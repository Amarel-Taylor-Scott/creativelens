<svelte:head>
	<title>Alt Fashion Photography - AI Prompts & Styles - CreativeLens</title>
	<meta name="description" content="AI-generated alternative fashion photography. Gothic, cyberpunk, kawaii, avant-garde, and streetwear prompts for creative directors, photographers, and fashion brands." />
</svelte:head>

<div class="seo-landing">
	<div class="container">
		<section class="landing-hero">
			<h1>Alt Fashion Photography <span class="text-gradient">AI Prompts & Styles</span></h1>
			<p>Explore AI-generated alternative fashion imagery across gothic, cyberpunk, kawaii, avant-garde, and streetwear aesthetics. CreativeLens curates 34 alt fashion niches with prompts, style analysis, and creative inspiration.</p>
			<div class="hero-actions">
				<a href="/categories/alt-fashion" class="btn btn-primary btn-lg">Browse Alt Fashion</a>
				<a href="/studio" class="btn btn-secondary btn-lg">Analyze a Photo</a>
			</div>
		</section>

		<section class="section">
			<h2>Alt Fashion Sub-Genres</h2>
			<div class="genre-grid">
				{#each [
					{ name: 'Gothic & Dark Fashion', count: 4 },
					{ name: 'Cyberpunk Fashion', count: 4 },
					{ name: 'Avant-Garde', count: 3 },
					{ name: 'Kawaii & Harajuku', count: 4 },
					{ name: 'Retro-Futurism', count: 3 },
					{ name: 'Streetwear & Urban', count: 4 },
					{ name: 'Fantasy Fashion', count: 4 },
					{ name: 'Eco & Organic', count: 3 },
					{ name: 'Ceremonial & Ritual', count: 5 },
				] as genre}
					<div class="genre-card card">
						<h4>{genre.name}</h4>
						<span class="genre-count">{genre.count} niches</span>
					</div>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Photography Prompt Techniques</h2>
			<div class="tips-grid">
				<div class="tip card">
					<h4>Mood Setting</h4>
					<p>Alt fashion thrives on atmosphere. Use "moody", "ethereal", "gritty", "dreamlike", or "aggressive" to set the tone.</p>
				</div>
				<div class="tip card">
					<h4>Material Focus</h4>
					<p>Describe fabrics: "patent leather", "sheer mesh", "distressed denim", "holographic PVC", "crushed velvet" for authentic alt fashion textures.</p>
				</div>
				<div class="tip card">
					<h4>Location Pairing</h4>
					<p>Match locations to aesthetic: "abandoned warehouse" for industrial, "neon-lit Tokyo alley" for cyberpunk, "misty forest" for dark romantic.</p>
				</div>
				<div class="tip card">
					<h4>Color Palettes</h4>
					<p>Specify palettes: "all black with silver accents", "neon green and purple", "pastel rainbow on white", "blood red and midnight black".</p>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Top Alt Fashion Niches</h2>
			<div class="niche-links">
				<a href="/niches/neo-gothic-couture" class="badge">Neo-Gothic Couture</a>
				<a href="/niches/neon-streetwear" class="badge">Neon Streetwear</a>
				<a href="/niches/techwear" class="badge">Techwear</a>
				<a href="/niches/deconstructed-fashion" class="badge">Deconstructed Fashion</a>
				<a href="/niches/decora" class="badge">Decora</a>
				<a href="/niches/witchcore" class="badge">Witchcore</a>
				<a href="/niches/solarpunk-wear" class="badge">Solarpunk Wear</a>
				<a href="/niches/festival-couture" class="badge">Festival Couture</a>
			</div>
		</section>

		<section class="section cta-section">
			<div class="cta-card">
				<h2>Explore 34 Alt Fashion Niches</h2>
				<p>CreativeLens is the definitive resource for alternative fashion AI imagery. Join free to access prompts, analysis tools, and curated galleries.</p>
				<a href="/signup" class="btn btn-primary btn-lg">Sign Up Free</a>
			</div>
		</section>
	</div>
</div>

<style>
	.seo-landing { padding: 2rem 0; }
	.landing-hero { text-align: center; padding: 4rem 0; }
	.landing-hero h1 { font-size: 2.75rem; margin-bottom: 0.75rem; line-height: 1.1; }
	.landing-hero p { font-size: 1.05rem; max-width: 640px; margin: 0 auto 2rem; }
	.hero-actions { display: flex; gap: 1rem; justify-content: center; }
	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }
	.genre-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.genre-card { padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; }
	.genre-card h4 { font-size: 0.95rem; }
	.genre-count { font-size: 0.8rem; color: var(--color-text-muted); }
	.tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
	.tip h4 { font-size: 0.95rem; margin-bottom: 0.5rem; }
	.tip p { font-size: 0.85rem; }
	.niche-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.niche-links .badge { text-decoration: none; padding: 0.4rem 1rem; font-size: 0.85rem; }
	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 500px; margin: 0 auto 1.5rem; }
	@media (max-width: 768px) { .genre-grid, .tips-grid { grid-template-columns: 1fr; } .landing-hero h1 { font-size: 2rem; } .hero-actions { flex-direction: column; align-items: center; } }
</style>
