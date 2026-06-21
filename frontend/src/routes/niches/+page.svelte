<script>
	let searchQuery = '';
	let selectedCategory = '';

	const categories = [
		{ name: 'Alt Fashion', slug: 'alt-fashion', color: '#8b5cf6', count: 34 },
		{ name: 'AI Streaming', slug: 'ai-streaming', color: '#ef4444', count: 9 },
		{ name: 'Stream Visual Assets', slug: 'stream-visual-assets', color: '#f59e0b', count: 8 },
		{ name: 'Alt Beauty', slug: 'alt-beauty', color: '#ec4899', count: 7 },
		{ name: 'Concept Designers', slug: 'concept-designers', color: '#6366f1', count: 7 },
		{ name: 'Marketers', slug: 'marketers', color: '#10b981', count: 6 },
		{ name: 'AI Influencers', slug: 'ai-influencers', color: '#f97316', count: 5 },
		{ name: 'Alt Accessories', slug: 'alt-accessories', color: '#a855f7', count: 5 },
		{ name: 'Virtual Companion', slug: 'virtual-companion', color: '#06b6d4', count: 5 },
	];

	const niches = [
		{ name: 'Neo-Gothic Couture', slug: 'neo-gothic-couture', category: 'Alt Fashion', sub_niche: 'Gothic & Dark Fashion' },
		{ name: 'Dark Romantic Fashion', slug: 'dark-romantic-fashion', category: 'Alt Fashion', sub_niche: 'Gothic & Dark Fashion' },
		{ name: 'Neon Streetwear', slug: 'neon-streetwear', category: 'Alt Fashion', sub_niche: 'Cyberpunk Fashion' },
		{ name: 'Techwear', slug: 'techwear', category: 'Alt Fashion', sub_niche: 'Cyberpunk Fashion' },
		{ name: 'Deconstructed Fashion', slug: 'deconstructed-fashion', category: 'Alt Fashion', sub_niche: 'Avant-Garde' },
		{ name: 'Wearable Art', slug: 'wearable-art', category: 'Alt Fashion', sub_niche: 'Avant-Garde' },
		{ name: 'VTuber Character Design', slug: 'vtuber-character-design', category: 'AI Streaming', sub_niche: 'Virtual Streamers' },
		{ name: 'AI Streamer Personas', slug: 'ai-streamer-personas', category: 'AI Streaming', sub_niche: 'Virtual Streamers' },
		{ name: 'Avant-Garde Makeup', slug: 'avant-garde-makeup', category: 'Alt Beauty', sub_niche: 'Makeup & Face Art' },
		{ name: 'Cybernetic Beauty', slug: 'cybernetic-beauty', category: 'Alt Beauty', sub_niche: 'Makeup & Face Art' },
		{ name: 'Character Concept Sheets', slug: 'character-concept-sheets', category: 'Concept Designers', sub_niche: 'Entertainment Concept Art' },
		{ name: 'Social Ad Visuals', slug: 'social-ad-visuals', category: 'Marketers', sub_niche: 'Ad Creative' },
		{ name: 'Virtual Influencer Profiles', slug: 'virtual-influencer-profiles', category: 'AI Influencers', sub_niche: 'Character Creation' },
		{ name: 'Cyberpunk Jewelry', slug: 'cyberpunk-jewelry', category: 'Alt Accessories', sub_niche: 'Jewelry & Adornment' },
		{ name: 'Anime Companion Design', slug: 'anime-companion-design', category: 'Virtual Companion', sub_niche: 'Companion Characters' },
	];

	$: filteredNiches = niches.filter(n => {
		const matchesCategory = !selectedCategory || n.category === selectedCategory;
		const matchesSearch = !searchQuery || n.name.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});
</script>

<svelte:head>
	<title>Browse 86 Niches - CreativeLens</title>
	<meta name="description" content="Explore 86 creative niches across 9 categories. From Alt Fashion to Virtual Companions, find your niche in AI-generated content." />
</svelte:head>

<div class="niches-page">
	<div class="container">
		<div class="page-header">
			<div>
				<h1>86 Creative Niches</h1>
				<p>Explore specialized creative territories across 9 categories of AI-generated content.</p>
			</div>
			<a href="/niches/explore" class="btn btn-primary">Graph Explorer</a>
		</div>

		<div class="filters">
			<input type="text" bind:value={searchQuery} placeholder="Search niches..." class="search-input" />
			<div class="category-filters">
				<button class="filter-chip" class:active={!selectedCategory} on:click={() => (selectedCategory = '')}>All</button>
				{#each categories as cat}
					<button
						class="filter-chip"
						class:active={selectedCategory === cat.name}
						on:click={() => (selectedCategory = cat.name)}
						style="--chip-color: {cat.color}"
					>
						{cat.name}
						<span class="chip-count">{cat.count}</span>
					</button>
				{/each}
			</div>
		</div>

		<div class="niches-grid">
			{#each filteredNiches as niche}
				<a href="/niches/{niche.slug}" class="niche-card card">
					<div class="niche-thumb"></div>
					<div class="niche-info">
						<h4>{niche.name}</h4>
						<span class="niche-meta">{niche.category} &middot; {niche.sub_niche}</span>
					</div>
				</a>
			{/each}
		</div>

		{#if filteredNiches.length === 0}
			<div class="empty-state">
				<p>No niches match your search. Try a different term or clear your filters.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.niches-page {
		padding: 2rem 0;
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 2rem;
		gap: 1rem;
	}

	.page-header h1 {
		margin-bottom: 0.25rem;
	}

	.filters {
		margin-bottom: 2rem;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
	}

	.category-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.4rem 0.875rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 500;
		background: var(--color-bg-tertiary);
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border);
	}

	.filter-chip:hover {
		border-color: var(--color-accent);
		color: var(--color-text);
	}

	.filter-chip.active {
		background: var(--color-accent-dim);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.chip-count {
		font-size: 0.7rem;
		opacity: 0.7;
	}

	.niches-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
	}

	.niche-card {
		display: flex;
		gap: 0.875rem;
		padding: 0.875rem;
		text-decoration: none;
		color: var(--color-text);
	}

	.niche-card:hover {
		border-color: var(--color-accent);
	}

	.niche-thumb {
		width: 56px;
		height: 56px;
		border-radius: var(--radius-sm);
		background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));
		flex-shrink: 0;
	}

	.niche-info {
		min-width: 0;
	}

	.niche-info h4 {
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.niche-meta {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
		}

		.niches-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
