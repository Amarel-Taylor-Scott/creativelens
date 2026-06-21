<script>
	import { page } from '$app/stores';

	$: slug = $page.params.slug;
	$: categoryTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

	// This would come from the API in production
	const categoryData = {
		'alt-fashion': { niches: 34, sub_niches: 9, color: '#8b5cf6', description: 'AI-generated alternative fashion imagery spanning gothic, cyberpunk, streetwear, and avant-garde styles for creative directors and fashion marketers.' },
		'ai-streaming': { niches: 9, sub_niches: 3, color: '#ef4444', description: 'AI-generated streaming personalities and virtual broadcaster assets for the next generation of digital entertainment content.' },
		'stream-visual-assets': { niches: 8, sub_niches: 2, color: '#f59e0b', description: 'Production-ready visual assets for streamers and content creators, from overlays to thumbnail templates.' },
		'alt-beauty': { niches: 7, sub_niches: 2, color: '#ec4899', description: 'Alternative beauty concepts pushing the boundaries of makeup artistry, body modification, and aesthetic expression through AI visualization.' },
		'concept-designers': { niches: 7, sub_niches: 2, color: '#6366f1', description: 'Professional concept art and design visualization for games, films, products, and architectural projects powered by AI.' },
		'marketers': { niches: 6, sub_niches: 2, color: '#10b981', description: 'AI-generated marketing visuals and campaign assets purpose-built for advertising, social media, and brand storytelling.' },
		'ai-influencers': { niches: 5, sub_niches: 2, color: '#f97316', description: 'Virtual influencer character design and content creation for brands building AI-powered social media personalities.' },
		'alt-accessories': { niches: 5, sub_niches: 2, color: '#a855f7', description: 'Alternative and avant-garde accessory designs from jewelry to headwear, visualized through AI for designers and retailers.' },
		'virtual-companion': { niches: 5, sub_niches: 2, color: '#06b6d4', description: 'AI companion character design and visual development for interactive entertainment, wellness apps, and virtual relationship platforms.' },
	};

	$: data = categoryData[slug] || { niches: 0, sub_niches: 0, color: '#666', description: '' };

	let niches = [];
</script>

<svelte:head>
	<title>{categoryTitle} - CreativeLens</title>
	<meta name="description" content="{data.description}" />
</svelte:head>

<div class="category-page">
	<div class="container">
		<div class="category-header">
			<nav class="breadcrumb">
				<a href="/categories">Categories</a>
				<span>/</span>
				<span>{categoryTitle}</span>
			</nav>
			<div class="header-content">
				<div class="header-info">
					<div class="category-badge" style="background: {data.color}20; color: {data.color}; border-color: {data.color}40;">
						{categoryTitle}
					</div>
					<h1>{categoryTitle}</h1>
					<p>{data.description}</p>
					<div class="category-stats">
						<div class="stat-pill">
							<span class="stat-number">{data.niches}</span>
							<span>niches</span>
						</div>
						<div class="stat-pill">
							<span class="stat-number">{data.sub_niches}</span>
							<span>sub-niches</span>
						</div>
						<div class="stat-pill">
							<span class="stat-number">0</span>
							<span>images</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="section">
			<h2>Niches in {categoryTitle}</h2>
			{#if niches.length > 0}
				<div class="niches-grid">
					{#each niches as niche}
						<a href="/niches/{niche.slug}" class="niche-card card">
							<h4>{niche.name}</h4>
							<span class="niche-sub">{niche.sub_niche}</span>
						</a>
					{/each}
				</div>
			{:else}
				<div class="empty-state card">
					<p>Niches for this category will be populated once the API is connected. This category has {data.niches} niches across {data.sub_niches} sub-niches.</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.category-page {
		padding: 2rem 0;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		margin-bottom: 1.5rem;
	}

	.breadcrumb a {
		color: var(--color-text-muted);
	}

	.breadcrumb a:hover {
		color: var(--color-accent);
	}

	.category-badge {
		display: inline-block;
		padding: 0.3rem 0.875rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 600;
		border: 1px solid;
		margin-bottom: 0.75rem;
	}

	.category-header {
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	.header-info h1 {
		margin-bottom: 0.5rem;
	}

	.header-info p {
		max-width: 640px;
		margin-bottom: 1.25rem;
	}

	.category-stats {
		display: flex;
		gap: 1rem;
	}

	.stat-pill {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.4rem 0.875rem;
		background: var(--color-bg-tertiary);
		border-radius: 9999px;
		font-size: 0.8rem;
		color: var(--color-text-secondary);
	}

	.stat-number {
		font-weight: 700;
		color: var(--color-text);
	}

	.section h2 {
		margin-bottom: 1.25rem;
	}

	.niches-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1rem;
	}

	.niche-card {
		text-decoration: none;
		color: var(--color-text);
		padding: 1.125rem;
	}

	.niche-card:hover {
		border-color: var(--color-accent);
	}

	.niche-card h4 {
		font-size: 0.95rem;
		margin-bottom: 0.25rem;
	}

	.niche-sub {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.empty-state {
		text-align: center;
		padding: 3rem 2rem;
	}
</style>
