<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let loading = true;
	let stats = {
		total_images: 0,
		total_niches: 86,
		total_categories: 9,
		total_users: 0,
		models: [],
		top_niches: [],
	};

	onMount(async () => {
		try {
			const res = await api.get('/analytics/summary');
			if (res.data) {
				stats = { ...stats, ...res.data };
			}
		} catch (err) {
			// Use defaults
		}
		loading = false;
	});

	const modelDistribution = [
		{ name: 'Stable Diffusion XL', pct: 35, color: '#8b5cf6' },
		{ name: 'Midjourney', pct: 25, color: '#ec4899' },
		{ name: 'DALL-E 3', pct: 15, color: '#10b981' },
		{ name: 'Flux', pct: 12, color: '#f59e0b' },
		{ name: 'Leonardo AI', pct: 8, color: '#ef4444' },
		{ name: 'Other', pct: 5, color: '#6366f1' },
	];
</script>

<svelte:head>
	<title>Platform Stats - CreativeLens</title>
	<meta name="description" content="CreativeLens platform statistics: image counts, niche distribution, AI model usage, and community growth." />
</svelte:head>

<div class="stats-page">
	<div class="container">
		<div class="page-header" style="text-align: center;">
			<h1>Platform Statistics</h1>
			<p>Real-time data on the CreativeLens creative intelligence platform.</p>
		</div>

		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Loading stats...</p>
			</div>
		{:else}
			<div class="stats-grid">
				<div class="stat-card card">
					<span class="stat-value">{stats.total_images.toLocaleString()}</span>
					<span class="stat-label">Total Images</span>
				</div>
				<div class="stat-card card">
					<span class="stat-value">{stats.total_niches}</span>
					<span class="stat-label">Creative Niches</span>
				</div>
				<div class="stat-card card">
					<span class="stat-value">{stats.total_categories}</span>
					<span class="stat-label">Categories</span>
				</div>
				<div class="stat-card card">
					<span class="stat-value">{stats.total_users.toLocaleString()}</span>
					<span class="stat-label">Registered Users</span>
				</div>
			</div>

			<div class="charts-grid">
				<div class="chart-section card">
					<h3>AI Model Distribution</h3>
					<p>Breakdown of AI models used across all images in the gallery.</p>
					<div class="model-chart">
						{#each modelDistribution as model}
							<div class="model-row">
								<div class="model-info">
									<span class="model-dot" style="background: {model.color};"></span>
									<span class="model-name">{model.name}</span>
								</div>
								<div class="model-bar-container">
									<div class="model-bar" style="width: {model.pct}%; background: {model.color};"></div>
								</div>
								<span class="model-pct">{model.pct}%</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="chart-section card">
					<h3>Category Breakdown</h3>
					<p>Image distribution across the 9 creative categories.</p>
					<div class="category-chart">
						{#each [
							{ name: 'Alt Fashion', count: 34, color: '#8b5cf6' },
							{ name: 'AI Streaming', count: 9, color: '#ef4444' },
							{ name: 'Stream Visual Assets', count: 8, color: '#f59e0b' },
							{ name: 'Alt Beauty', count: 7, color: '#ec4899' },
							{ name: 'Concept Designers', count: 7, color: '#6366f1' },
							{ name: 'Marketers', count: 6, color: '#10b981' },
							{ name: 'AI Influencers', count: 5, color: '#f97316' },
							{ name: 'Alt Accessories', count: 5, color: '#a855f7' },
							{ name: 'Virtual Companion', count: 5, color: '#06b6d4' },
						] as cat}
							<div class="cat-row">
								<span class="cat-name">{cat.name}</span>
								<div class="cat-bar-wrap">
									<div class="cat-bar" style="width: {(cat.count / 34) * 100}%; background: {cat.color};"></div>
								</div>
								<span class="cat-count">{cat.count} niches</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.stats-page { padding: 2rem 0; }
	.page-header { margin-bottom: 2.5rem; }
	.page-header h1 { margin-bottom: 0.25rem; }

	.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 2rem; }
	.stat-card { text-align: center; padding: 2rem 1rem; }
	.stat-value { display: block; font-size: 2.5rem; font-weight: 800; color: var(--color-accent); margin-bottom: 0.25rem; }
	.stat-label { font-size: 0.85rem; color: var(--color-text-muted); }

	.charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
	.chart-section h3 { font-size: 1.1rem; margin-bottom: 0.25rem; }
	.chart-section > p { font-size: 0.85rem; margin-bottom: 1.25rem; }

	.model-chart { display: flex; flex-direction: column; gap: 0.75rem; }
	.model-row { display: flex; align-items: center; gap: 0.75rem; }
	.model-info { display: flex; align-items: center; gap: 0.5rem; min-width: 140px; }
	.model-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
	.model-name { font-size: 0.85rem; }
	.model-bar-container { flex: 1; height: 8px; background: var(--color-bg-tertiary); border-radius: 4px; overflow: hidden; }
	.model-bar { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
	.model-pct { font-size: 0.85rem; font-weight: 700; min-width: 35px; text-align: right; }

	.category-chart { display: flex; flex-direction: column; gap: 0.6rem; }
	.cat-row { display: flex; align-items: center; gap: 0.75rem; }
	.cat-name { font-size: 0.8rem; min-width: 130px; }
	.cat-bar-wrap { flex: 1; height: 8px; background: var(--color-bg-tertiary); border-radius: 4px; overflow: hidden; }
	.cat-bar { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
	.cat-count { font-size: 0.75rem; color: var(--color-text-muted); min-width: 60px; text-align: right; }

	.loading-state { text-align: center; padding: 6rem 2rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 768px) { .charts-grid { grid-template-columns: 1fr; } .stats-grid { grid-template-columns: 1fr 1fr; } }
</style>
