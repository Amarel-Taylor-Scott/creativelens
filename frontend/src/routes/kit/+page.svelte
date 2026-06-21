<svelte:head>
	<title>Influencer Kit - CreativeLens</title>
	<meta name="description" content="CreativeLens brand assets, logos, usage guidelines, and partnership resources for influencers and content creators." />
</svelte:head>

<div class="kit-page">
	<div class="container">
		<div class="kit-header">
			<span class="badge">Brand Resources</span>
			<h1>Influencer Kit</h1>
			<p>Everything you need to represent CreativeLens in your content. Download logos, banners, and review our brand guidelines.</p>
		</div>

		<div class="kit-grid">
			<div class="kit-section card">
				<h3>Logo Package</h3>
				<div class="asset-preview">
					<div class="logo-preview">
						<span class="logo-icon-lg">CL</span>
					</div>
				</div>
				<p>Full logo, icon-only, wordmark, and monochrome variants. Available in SVG, PNG (1x, 2x, 4x), and EPS.</p>
				<button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Download Logo Pack</button>
			</div>

			<div class="kit-section card">
				<h3>Banner Templates</h3>
				<div class="asset-preview">
					<div class="banner-preview" style="background: linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3));"></div>
				</div>
				<p>YouTube, Twitter, Instagram, and Twitch banner templates with customizable text overlays.</p>
				<button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Download Banners</button>
			</div>

			<div class="kit-section card">
				<h3>Color Palette</h3>
				<div class="color-swatches">
					<div class="swatch" style="background: #ec4899;">
						<span>Pink #ec4899</span>
					</div>
					<div class="swatch" style="background: #a855f7;">
						<span>Purple #a855f7</span>
					</div>
					<div class="swatch" style="background: #6366f1;">
						<span>Indigo #6366f1</span>
					</div>
					<div class="swatch" style="background: #0a0a0f; border: 1px solid #2a2a3a;">
						<span>Dark #0a0a0f</span>
					</div>
				</div>
				<p>Our core palette. The gradient flows from pink through purple to indigo on a dark background.</p>
			</div>

			<div class="kit-section card">
				<h3>Typography</h3>
				<div class="type-preview">
					<span class="type-sample-heading">Space Grotesk</span>
					<span class="type-sample-body">Inter for body text and UI elements</span>
					<span class="type-sample-mono">JetBrains Mono for code</span>
				</div>
				<p>Headings use Space Grotesk (700-800). Body text uses Inter (400-600). Code uses JetBrains Mono.</p>
			</div>
		</div>

		<div class="guidelines-section">
			<h2>Usage Guidelines</h2>
			<div class="guidelines-grid">
				<div class="guideline card">
					<h4>Do</h4>
					<ul>
						<li>Use the official logo assets provided above</li>
						<li>Maintain minimum clear space around the logo</li>
						<li>Use the dark background variant on light surfaces</li>
						<li>Link back to creativelens.polsia.app in your content</li>
						<li>Mention CreativeLens by name when referencing our tools</li>
					</ul>
				</div>
				<div class="guideline card">
					<h4>Do Not</h4>
					<ul>
						<li>Modify the logo colors, proportions, or orientation</li>
						<li>Place the logo on busy or low-contrast backgrounds</li>
						<li>Use CreativeLens branding to imply official endorsement</li>
						<li>Create derivative logos or mashups</li>
						<li>Use our brand in any misleading or defamatory context</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="partnership card">
			<h2>Partnership Program</h2>
			<p>Interested in becoming a CreativeLens ambassador? We offer referral commissions, early feature access, and co-marketing opportunities.</p>
			<a href="/contact" class="btn btn-primary">Apply for Partnership</a>
		</div>
	</div>
</div>

<style>
	.kit-page { padding: 2rem 0; }
	.kit-header { margin-bottom: 2rem; }
	.kit-header h1 { margin: 0.5rem 0 0.25rem; }

	.kit-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 3rem; }

	.kit-section h3 { font-size: 1.1rem; margin-bottom: 1rem; }
	.kit-section p { font-size: 0.85rem; }

	.asset-preview { margin-bottom: 1rem; }
	.logo-preview { display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--color-bg-tertiary); border-radius: var(--radius-sm); }
	.logo-icon-lg { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, var(--color-accent), #a855f7); border-radius: var(--radius-md); font-size: 2rem; font-weight: 800; color: white; }
	.banner-preview { height: 120px; border-radius: var(--radius-sm); }

	.color-swatches { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1rem; }
	.swatch { height: 60px; border-radius: var(--radius-sm); display: flex; align-items: flex-end; padding: 0.4rem; }
	.swatch span { font-size: 0.65rem; color: white; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }

	.type-preview { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.5rem; background: var(--color-bg-tertiary); border-radius: var(--radius-sm); margin-bottom: 1rem; }
	.type-sample-heading { font-family: 'Space Grotesk', var(--font-sans); font-size: 1.5rem; font-weight: 700; }
	.type-sample-body { font-family: var(--font-sans); font-size: 1rem; color: var(--color-text-secondary); }
	.type-sample-mono { font-family: var(--font-mono); font-size: 0.9rem; color: var(--color-accent); }

	.guidelines-section { margin-bottom: 3rem; }
	.guidelines-section h2 { margin-bottom: 1.25rem; }
	.guidelines-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
	.guideline h4 { font-size: 1rem; margin-bottom: 0.75rem; color: var(--color-success); }
	.guideline:last-child h4 { color: var(--color-error); }
	.guideline ul { list-style: disc; padding-left: 1.25rem; }
	.guideline li { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.35rem; }

	.partnership { text-align: center; padding: 3rem 2rem; background: linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(168, 85, 247, 0.08)); }
	.partnership h2 { margin-bottom: 0.5rem; }
	.partnership p { max-width: 500px; margin: 0 auto 1.5rem; font-size: 0.95rem; }

	@media (max-width: 768px) {
		.kit-grid, .guidelines-grid { grid-template-columns: 1fr; }
		.color-swatches { grid-template-columns: repeat(2, 1fr); }
	}
</style>
