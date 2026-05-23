<script>
	let selectedCategory = '';
	let selectedNiche = '';
	let selectedModel = '';
	let sortBy = 'recent';
	let searchQuery = '';

	const aiModels = [
		'Stable Diffusion XL', 'Midjourney', 'DALL-E 3', 'Flux',
		'Leonardo AI', 'Playground v2.5', 'Firefly',
	];

	const categories = [
		'Alt Fashion', 'AI Streaming', 'Stream Visual Assets', 'Alt Beauty',
		'Concept Designers', 'Marketers', 'AI Influencers', 'Alt Accessories', 'Virtual Companion',
	];

	// Placeholder images for layout
	let images = [];
</script>

<svelte:head>
	<title>Gallery - CreativeLens</title>
	<meta name="description" content="Browse AI-generated creative images across 86 niches. Filter by category, niche, AI model, and more." />
</svelte:head>

<div class="gallery-page">
	<div class="container">
		<div class="gallery-header">
			<div>
				<h1>Gallery</h1>
				<p>Discover AI-generated creative content across 86 specialized niches.</p>
			</div>
			<a href="/submit" class="btn btn-primary">Submit Your Work</a>
		</div>

		<div class="filters-bar">
			<div class="search-box">
				<input type="text" bind:value={searchQuery} placeholder="Search images, prompts, creators..." />
			</div>
			<div class="filter-row">
				<select bind:value={selectedCategory}>
					<option value="">All Categories</option>
					{#each categories as cat}
						<option value={cat}>{cat}</option>
					{/each}
				</select>
				<select bind:value={selectedNiche}>
					<option value="">All Niches</option>
				</select>
				<select bind:value={selectedModel}>
					<option value="">All AI Models</option>
					{#each aiModels as model}
						<option value={model}>{model}</option>
					{/each}
				</select>
				<select bind:value={sortBy}>
					<option value="recent">Most Recent</option>
					<option value="popular">Most Popular</option>
					<option value="trending">Trending</option>
				</select>
			</div>
		</div>

		{#if images.length > 0}
			<div class="grid-gallery">
				{#each images as image}
					<div class="image-card card">
						<div class="image-placeholder"></div>
						<div class="image-info">
							<h4>{image.title}</h4>
							<span class="image-model">{image.ai_model}</span>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<div class="empty-icon">G</div>
				<h3>Gallery Coming Soon</h3>
				<p>Our curated collection of AI-generated creative content is being assembled. Check back soon, or submit your own work to be among the first featured.</p>
				<a href="/submit" class="btn btn-primary">Submit an Image</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.gallery-page {
		padding: 2rem 0;
	}

	.gallery-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 2rem;
		gap: 1rem;
	}

	.gallery-header h1 {
		margin-bottom: 0.25rem;
	}

	.filters-bar {
		margin-bottom: 2rem;
	}

	.search-box {
		margin-bottom: 1rem;
	}

	.search-box input {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 1rem;
	}

	.filter-row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.filter-row select {
		min-width: 160px;
		flex: 1;
	}

	.image-card {
		overflow: hidden;
		padding: 0;
	}

	.image-placeholder {
		aspect-ratio: 3/4;
		background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));
	}

	.image-info {
		padding: 0.875rem;
	}

	.image-info h4 {
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}

	.image-model {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.empty-state {
		text-align: center;
		padding: 6rem 2rem;
	}

	.empty-icon {
		width: 64px;
		height: 64px;
		border-radius: var(--radius-md);
		background: var(--color-accent-dim);
		color: var(--color-accent);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.75rem;
		font-weight: 800;
		margin-bottom: 1.25rem;
	}

	.empty-state h3 {
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		max-width: 450px;
		margin: 0 auto 1.5rem;
		font-size: 0.95rem;
	}

	@media (max-width: 768px) {
		.gallery-header {
			flex-direction: column;
		}

		.filter-row {
			flex-direction: column;
		}

		.filter-row select {
			min-width: auto;
		}
	}
</style>
