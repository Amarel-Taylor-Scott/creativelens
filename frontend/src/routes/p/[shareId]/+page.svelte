<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.ts';

	$: shareId = $page.params.shareId;

	let loading = true;
	let error = '';
	let shareData = null;
	let copied = '';

	onMount(async () => {
		try {
			const res = await api.get(`/shared/${shareId}`);
			if (res.data) {
				shareData = res.data;
			}
		} catch (err) {
			if (err.status === 404) {
				error = 'This shared analysis was not found or has been removed.';
			} else {
				error = 'Failed to load shared analysis.';
			}
		}
		loading = false;
	});

	function copyToClipboard(text, label) {
		navigator.clipboard.writeText(text);
		copied = label;
		setTimeout(() => { copied = ''; }, 2000);
	}
</script>

<svelte:head>
	<title>Shared Analysis - CreativeLens</title>
	<meta name="description" content="View a shared CreativeLens image analysis with detected prompts, styles, and scores." />
</svelte:head>

<div class="share-page">
	<div class="container">
		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Loading analysis...</p>
			</div>
		{:else if error}
			<div class="error-state card">
				<h2>Analysis Not Found</h2>
				<p>{error}</p>
				<a href="/studio" class="btn btn-primary">Try the Studio</a>
			</div>
		{:else if shareData}
			<div class="share-header">
				<div class="share-badge badge">Shared Analysis</div>
				<p class="share-views">{shareData.views || 0} views</p>
			</div>

			<div class="share-layout">
				<div class="share-image card">
					{#if shareData.analysis_data?.image_url}
						<img src={shareData.analysis_data.image_url} alt="Analyzed image" class="analysis-img" />
					{:else}
						<div class="image-placeholder">
							<span>Image</span>
						</div>
					{/if}
				</div>

				<div class="share-results">
					{#if shareData.analysis_data?.detected_prompt}
						<div class="result-card card">
							<div class="result-header">
								<h3>Detected Prompt</h3>
								<button class="btn btn-ghost btn-sm" on:click={() => copyToClipboard(shareData.analysis_data.detected_prompt, 'prompt')}>
									{copied === 'prompt' ? 'Copied!' : 'Copy'}
								</button>
							</div>
							<div class="prompt-box">
								<p class="prompt-text">{shareData.analysis_data.detected_prompt}</p>
							</div>
						</div>
					{/if}

					{#if shareData.analysis_data?.detected_style?.length > 0}
						<div class="result-card card">
							<h3>Style Tags</h3>
							<div class="tags">
								{#each shareData.analysis_data.detected_style as tag}
									<span class="badge">{tag}</span>
								{/each}
							</div>
						</div>
					{/if}

					{#if shareData.analysis_data?.detected_model}
						<div class="result-card card">
							<h3>Detected Model</h3>
							<div class="model-display">
								<span class="model-name">{shareData.analysis_data.detected_model}</span>
								<button class="btn btn-ghost btn-sm" on:click={() => copyToClipboard(shareData.analysis_data.detected_model, 'model')}>
									{copied === 'model' ? 'Copied!' : 'Copy'}
								</button>
							</div>
						</div>
					{/if}

					{#if shareData.analysis_data?.scores}
						<div class="result-card card">
							<h3>Scores</h3>
							<div class="scores-grid">
								{#each Object.entries(shareData.analysis_data.scores) as [dim, score]}
									<div class="score-item">
										<span class="score-label">{dim}</span>
										<div class="score-bar-wrap">
											<div class="score-bar" style="width: {score}%"></div>
										</div>
										<span class="score-value">{score}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					{#if shareData.analysis_data?.suggested_niches?.length > 0}
						<div class="result-card card">
							<h3>Suggested Niches</h3>
							<div class="tags">
								{#each shareData.analysis_data.suggested_niches as niche}
									<a href="/niches/{niche.toLowerCase().replace(/ /g, '-')}" class="badge">{niche}</a>
								{/each}
							</div>
						</div>
					{/if}

					<div class="share-actions">
						<button class="btn btn-primary" on:click={() => copyToClipboard(window.location.href, 'link')}>
							{copied === 'link' ? 'Link Copied!' : 'Copy Share Link'}
						</button>
						<a href="/studio" class="btn btn-secondary">Analyze Your Own Image</a>
					</div>
				</div>
			</div>

			<div class="share-footer">
				<p>Powered by <a href="/">CreativeLens</a> - Creative intelligence for AI-generated content.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.share-page { padding: 2rem 0; }

	.share-header { text-align: center; margin-bottom: 2rem; }
	.share-views { font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.5rem; }

	.share-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

	.share-image { padding: 0; overflow: hidden; }
	.analysis-img { width: 100%; display: block; }
	.image-placeholder { aspect-ratio: 3/4; background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover)); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); font-size: 1.25rem; }

	.share-results { display: flex; flex-direction: column; gap: 1rem; }

	.result-card h3 { font-size: 1rem; margin-bottom: 0.75rem; }
	.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
	.result-header h3 { margin-bottom: 0; }

	.prompt-box { background: var(--color-bg-tertiary); border-radius: var(--radius-sm); padding: 1rem; }
	.prompt-text { font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-text); line-height: 1.6; }

	.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.tags a { text-decoration: none; }

	.model-display { display: flex; align-items: center; justify-content: space-between; background: var(--color-bg-tertiary); padding: 0.75rem 1rem; border-radius: var(--radius-sm); }
	.model-name { font-weight: 700; }

	.scores-grid { display: flex; flex-direction: column; gap: 0.6rem; }
	.score-item { display: flex; align-items: center; gap: 0.75rem; }
	.score-label { font-size: 0.85rem; text-transform: capitalize; min-width: 80px; }
	.score-bar-wrap { flex: 1; height: 8px; background: var(--color-bg-tertiary); border-radius: 4px; overflow: hidden; }
	.score-bar { height: 100%; background: var(--color-accent); border-radius: 4px; }
	.score-value { font-weight: 700; font-size: 0.9rem; min-width: 30px; text-align: right; }

	.share-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }

	.share-footer { text-align: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
	.share-footer p { font-size: 0.85rem; color: var(--color-text-muted); }

	.error-state { text-align: center; padding: 4rem 2rem; }
	.error-state h2 { margin-bottom: 0.5rem; }
	.error-state p { margin-bottom: 1.5rem; }

	.loading-state { text-align: center; padding: 6rem 2rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) {
		.share-layout { grid-template-columns: 1fr; }
		.share-actions { flex-direction: column; }
	}
</style>
