<svelte:head>
	<title>Cosplay Photography AI Prompts & Inspiration - CreativeLens</title>
	<meta name="description" content="AI-generated cosplay photography prompts, styles, and inspiration. Browse professional cosplay photo concepts, lighting setups, and character poses for AI image generation." />
</svelte:head>

<div class="seo-landing">
	<div class="container">
		<section class="landing-hero">
			<h1>Cosplay Photography <span class="text-gradient">AI Prompts & Styles</span></h1>
			<p>Discover the best AI prompts for generating stunning cosplay photography. From dramatic lighting setups to character-accurate poses, find inspiration and techniques for every cosplay genre.</p>
			<div class="hero-actions">
				<a href="/gallery?search=cosplay" class="btn btn-primary btn-lg">Browse Cosplay Gallery</a>
				<a href="/studio" class="btn btn-secondary btn-lg">Analyze a Photo</a>
			</div>
		</section>

		<section class="section">
			<h2>Popular Cosplay Photography Styles</h2>
			<div class="style-grid">
				{#each ['Studio Portrait', 'Environmental/Location', 'Action & Dynamic Poses', 'Group Compositions', 'Detail & Prop Shots', 'Dramatic Lighting'] as style}
					<div class="style-card card">
						<div class="style-thumb"></div>
						<h4>{style}</h4>
					</div>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Prompt Techniques for Cosplay</h2>
			<div class="tips-grid">
				<div class="tip-card card">
					<h4>Character Accuracy</h4>
					<p>Include specific character details: costume colors, weapon types, hair style, and iconic poses. Reference the source material explicitly.</p>
				</div>
				<div class="tip-card card">
					<h4>Lighting Keywords</h4>
					<p>Use "dramatic rim lighting", "soft studio light", "volumetric fog", or "golden hour backlight" to control the mood of cosplay shots.</p>
				</div>
				<div class="tip-card card">
					<h4>Background Context</h4>
					<p>Match the background to the character's world: "abandoned cathedral" for dark fantasy, "neon-lit alley" for cyberpunk, "cherry blossom garden" for anime.</p>
				</div>
				<div class="tip-card card">
					<h4>Quality Boosters</h4>
					<p>Add "professional photography", "8k resolution", "bokeh", "sharp focus", "detailed costume textures" to elevate output quality.</p>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>Related Niches on CreativeLens</h2>
			<div class="niche-links">
				<a href="/niches/neo-gothic-couture" class="niche-link badge">Neo-Gothic Couture</a>
				<a href="/niches/armor-fashion" class="niche-link badge">Armor Fashion</a>
				<a href="/niches/elven-couture" class="niche-link badge">Elven Couture</a>
				<a href="/niches/visual-kei" class="niche-link badge">Visual Kei</a>
				<a href="/niches/lolita-fashion" class="niche-link badge">Lolita Fashion</a>
				<a href="/niches/festival-couture" class="niche-link badge">Festival Couture</a>
				<a href="/niches/masquerade" class="niche-link badge">Masquerade</a>
			</div>
		</section>

		<section class="section cta-section">
			<div class="cta-card">
				<h2>Start Creating Cosplay AI Art</h2>
				<p>Join CreativeLens to access curated cosplay prompts, analyze reference photos, and generate stunning character imagery.</p>
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
	.tip-card h4 { font-size: 0.95rem; margin-bottom: 0.5rem; }
	.tip-card p { font-size: 0.85rem; }

	.niche-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.niche-link { text-decoration: none; font-size: 0.85rem; padding: 0.4rem 1rem; }

	.cta-card { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.1)); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
	.cta-card h2 { margin-bottom: 0.75rem; }
	.cta-card p { max-width: 480px; margin: 0 auto 1.5rem; }

	@media (max-width: 768px) { .style-grid, .tips-grid { grid-template-columns: 1fr; } .landing-hero h1 { font-size: 2rem; } .hero-actions { flex-direction: column; align-items: center; } }
</style>
