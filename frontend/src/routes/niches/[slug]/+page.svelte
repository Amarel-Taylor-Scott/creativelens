<script>
	import { page } from '$app/stores';

	$: slug = $page.params.slug;
	$: nicheTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

	let isFollowing = false;
	let images = [];

	function toggleFollow() {
		isFollowing = !isFollowing;
	}
</script>

<svelte:head>
	<title>{nicheTitle} - CreativeLens</title>
	<meta name="description" content="Browse AI-generated images in the {nicheTitle} niche. Discover prompts, styles, and creative inspiration." />
</svelte:head>

<div class="niche-page">
	<div class="container">
		<div class="niche-header">
			<div class="niche-info">
				<nav class="breadcrumb">
					<a href="/niches">Niches</a>
					<span>/</span>
					<span>{nicheTitle}</span>
				</nav>
				<h1>{nicheTitle}</h1>
				<p>Explore AI-generated creative content in the {nicheTitle} niche. Browse images, discover prompts, and find inspiration for your next project.</p>
				<div class="niche-stats">
					<span class="stat-item">0 images</span>
					<span class="stat-item">0 followers</span>
				</div>
			</div>
			<div class="niche-actions">
				<button class="btn" class:btn-primary={!isFollowing} class:btn-secondary={isFollowing} on:click={toggleFollow}>
					{isFollowing ? 'Following' : 'Follow Niche'}
				</button>
			</div>
		</div>

		{#if images.length > 0}
			<div class="grid-gallery">
				{#each images as image}
					<div class="image-card card">
						<div class="image-placeholder"></div>
						<div class="image-meta">
							<h4>{image.title}</h4>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty-state card">
				<h3>No images yet</h3>
				<p>This niche is ready for content. Be the first to submit an image tagged with {nicheTitle}.</p>
				<a href="/submit" class="btn btn-primary">Submit an Image</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.niche-page {
		padding: 2rem 0;
	}

	.niche-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-border);
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		margin-bottom: 0.75rem;
	}

	.breadcrumb a {
		color: var(--color-text-muted);
	}

	.breadcrumb a:hover {
		color: var(--color-accent);
	}

	.niche-info h1 {
		margin-bottom: 0.5rem;
	}

	.niche-info p {
		max-width: 600px;
		margin-bottom: 0.75rem;
	}

	.niche-stats {
		display: flex;
		gap: 1.25rem;
	}

	.stat-item {
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}

	.image-placeholder {
		aspect-ratio: 3/4;
		background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));
	}

	.image-card {
		padding: 0;
		overflow: hidden;
	}

	.image-meta {
		padding: 0.75rem;
	}

	.image-meta h4 {
		font-size: 0.85rem;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
	}

	.empty-state h3 {
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		max-width: 400px;
		margin: 0 auto 1.5rem;
	}

	@media (max-width: 768px) {
		.niche-header {
			flex-direction: column;
		}
	}
</style>
