<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.ts';

	$: boardId = $page.params.id;

	let loading = true;
	let board = null;
	let items = [];
	let error = '';

	onMount(async () => {
		await loadBoard();
		loading = false;
	});

	async function loadBoard() {
		try {
			const res = await api.get(`/boards/${boardId}`);
			if (res.data) {
				board = res.data;
				items = res.data.items || [];
			}
		} catch (err) {
			error = 'Failed to load board.';
		}
	}

	async function removeItem(imageId) {
		try {
			await api.del(`/boards/${boardId}/items/${imageId}`);
			items = items.filter(i => i.image_id !== imageId);
		} catch (err) {
			error = err.error || 'Failed to remove item.';
		}
	}
</script>

<svelte:head>
	<title>{board?.name || 'Board'} - CreativeLens</title>
</svelte:head>

<div class="board-detail-page">
	<div class="container">
		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Loading board...</p>
			</div>
		{:else if error}
			<div class="error-state card">
				<h2>Could not load board</h2>
				<p>{error}</p>
				<a href="/boards" class="btn btn-primary">Back to Boards</a>
			</div>
		{:else if board}
			<div class="board-header">
				<nav class="breadcrumb">
					<a href="/boards">Boards</a>
					<span>/</span>
					<span>{board.name}</span>
				</nav>
				<h1>{board.name}</h1>
				<p>{items.length} images in this board</p>
			</div>

			{#if items.length > 0}
				<div class="grid-gallery">
					{#each items as item}
						<div class="image-card card">
							<div class="image-thumb" style="background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));"></div>
							<div class="image-info">
								<h4>{item.title || 'Image'}</h4>
								<div class="image-actions">
									<button class="btn btn-ghost btn-sm" on:click={() => removeItem(item.image_id)}>Remove</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="empty-state card">
					<h3>Empty board</h3>
					<p>Browse the gallery and add images to this board using the save button.</p>
					<a href="/gallery" class="btn btn-primary">Browse Gallery</a>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.board-detail-page { padding: 2rem 0; }

	.board-header { margin-bottom: 2rem; }
	.breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 0.75rem; }
	.breadcrumb a { color: var(--color-text-muted); }
	.breadcrumb a:hover { color: var(--color-accent); }
	.board-header h1 { margin-bottom: 0.25rem; }

	.image-card { padding: 0; overflow: hidden; }
	.image-thumb { aspect-ratio: 3/4; }
	.image-info { padding: 0.75rem; display: flex; justify-content: space-between; align-items: center; }
	.image-info h4 { font-size: 0.85rem; }

	.empty-state { text-align: center; padding: 4rem 2rem; }
	.empty-state h3 { margin-bottom: 0.5rem; }
	.empty-state p { max-width: 400px; margin: 0 auto 1.5rem; font-size: 0.9rem; }

	.error-state { text-align: center; padding: 4rem 2rem; }
	.loading-state { text-align: center; padding: 6rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
