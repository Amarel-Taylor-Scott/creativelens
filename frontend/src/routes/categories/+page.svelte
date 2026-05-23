<script>
	const categories = [
		{ name: 'Alt Fashion', slug: 'alt-fashion', icon: '\uD83E\uDDE5', color: '#8b5cf6', niches: 34, sub_niches: 9, description: 'AI-generated alternative fashion imagery spanning gothic, cyberpunk, streetwear, and avant-garde styles.' },
		{ name: 'AI Streaming', slug: 'ai-streaming', icon: '\uD83C\uDFA5', color: '#ef4444', niches: 9, sub_niches: 3, description: 'Virtual broadcaster assets and AI streaming personalities for digital entertainment.' },
		{ name: 'Stream Visual Assets', slug: 'stream-visual-assets', icon: '\uD83C\uDFA8', color: '#f59e0b', niches: 8, sub_niches: 2, description: 'Production-ready overlays, thumbnails, and graphics for content creators.' },
		{ name: 'Alt Beauty', slug: 'alt-beauty', icon: '\uD83D\uDC8E', color: '#ec4899', niches: 7, sub_niches: 2, description: 'Alternative beauty concepts pushing makeup artistry and aesthetic expression.' },
		{ name: 'Concept Designers', slug: 'concept-designers', icon: '\u270F\uFE0F', color: '#6366f1', niches: 7, sub_niches: 2, description: 'Professional concept art for games, films, products, and architecture.' },
		{ name: 'Marketers', slug: 'marketers', icon: '\uD83D\uDCC8', color: '#10b981', niches: 6, sub_niches: 2, description: 'Marketing visuals and campaign assets for advertising and brand storytelling.' },
		{ name: 'AI Influencers', slug: 'ai-influencers', icon: '\uD83E\uDD16', color: '#f97316', niches: 5, sub_niches: 2, description: 'Virtual influencer character design and content for AI social personalities.' },
		{ name: 'Alt Accessories', slug: 'alt-accessories', icon: '\uD83D\uDC51', color: '#a855f7', niches: 5, sub_niches: 2, description: 'Avant-garde accessory designs from jewelry to headwear, visualized through AI.' },
		{ name: 'Virtual Companion', slug: 'virtual-companion', icon: '\uD83D\uDCAC', color: '#06b6d4', niches: 5, sub_niches: 2, description: 'AI companion character design for interactive entertainment and wellness apps.' },
	];
</script>

<svelte:head>
	<title>9 Categories - CreativeLens</title>
	<meta name="description" content="Explore 9 creative categories spanning alternative fashion, AI streaming, beauty, concept design, marketing, and more." />
</svelte:head>

<div class="categories-page">
	<div class="container">
		<div class="page-header">
			<h1>9 Creative Categories</h1>
			<p>Each category contains specialized sub-niches and creative territories for AI-generated content.</p>
		</div>

		<div class="categories-grid">
			{#each categories as cat}
				<a href="/categories/{cat.slug}" class="category-card card">
					<div class="category-top">
						<div class="category-icon" style="background: {cat.color}20; color: {cat.color};">
							{cat.icon}
						</div>
						<div class="category-counts">
							<span class="count-main">{cat.niches}</span>
							<span class="count-label">niches</span>
						</div>
					</div>
					<h3>{cat.name}</h3>
					<p>{cat.description}</p>
					<div class="category-footer">
						<span class="sub-count">{cat.sub_niches} sub-niches</span>
						<span class="arrow">View</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.categories-page {
		padding: 2rem 0;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		margin-bottom: 0.25rem;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.category-card {
		text-decoration: none;
		color: var(--color-text);
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
	}

	.category-card:hover {
		border-color: var(--color-accent);
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.category-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.category-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.category-counts {
		text-align: right;
	}

	.count-main {
		display: block;
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--color-text);
	}

	.count-label {
		font-size: 0.7rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.category-card h3 {
		font-size: 1.125rem;
		margin-bottom: 0.5rem;
	}

	.category-card p {
		font-size: 0.85rem;
		flex: 1;
	}

	.category-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border);
	}

	.sub-count {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.arrow {
		font-size: 0.8rem;
		color: var(--color-accent);
		font-weight: 600;
	}

	@media (max-width: 1024px) {
		.categories-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.categories-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
