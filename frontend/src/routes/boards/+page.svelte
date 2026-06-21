<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let loading = true;
	let boards = [];
	let newBoardName = '';
	let creating = false;
	let error = '';

	onMount(async () => {
		await loadBoards();
		loading = false;
	});

	async function loadBoards() {
		try {
			const res = await api.get('/boards');
			boards = res.data?.boards || [];
		} catch (err) {
			error = 'Failed to load boards. Please log in.';
		}
	}

	async function createBoard() {
		if (!newBoardName.trim()) return;
		creating = true;
		error = '';
		try {
			await api.post('/boards', { name: newBoardName.trim() });
			newBoardName = '';
			await loadBoards();
		} catch (err) {
			error = err.error || 'Failed to create board.';
		}
		creating = false;
	}

	async function deleteBoard(id) {
		if (!confirm('Delete this board? This cannot be undone.')) return;
		try {
			await api.del(`/boards/${id}`);
			boards = boards.filter(b => b.id !== id);
		} catch (err) {
			error = err.error || 'Failed to delete board.';
		}
	}
</script>

<svelte:head>
	<title>My Boards - CreativeLens</title>
</svelte:head>

<div class="boards-page">
	<div class="container">
		<div class="page-header">
			<div>
				<h1>My Boards</h1>
				<p>Organize your favorite images into themed collections.</p>
			</div>
		</div>

		{#if error}
			<div class="error-banner">{error}</div>
		{/if}

		<div class="create-board card">
			<form on:submit|preventDefault={createBoard} class="create-form">
				<input type="text" bind:value={newBoardName} placeholder="New board name..." maxlength="200" />
				<button type="submit" class="btn btn-primary" disabled={creating || !newBoardName.trim()}>
					{creating ? 'Creating...' : 'Create Board'}
				</button>
			</form>
		</div>

		{#if loading}
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Loading boards...</p>
			</div>
		{:else if boards.length > 0}
			<div class="boards-grid">
				{#each boards as board}
					<a href="/boards/{board.id}" class="board-card card">
						<div class="board-thumb">
							<div class="board-thumb-grid">
								<div class="thumb-cell"></div>
								<div class="thumb-cell"></div>
								<div class="thumb-cell"></div>
								<div class="thumb-cell"></div>
							</div>
						</div>
						<div class="board-info">
							<h3>{board.name}</h3>
							<span class="board-count">{board.item_count || 0} images</span>
						</div>
						<button class="board-delete btn btn-ghost btn-sm" on:click|preventDefault|stopPropagation={() => deleteBoard(board.id)}>Delete</button>
					</a>
				{/each}
			</div>
		{:else}
			<div class="empty-state card">
				<h3>No boards yet</h3>
				<p>Create your first board to start collecting and organizing images.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.boards-page { padding: 2rem 0; }
	.page-header { margin-bottom: 2rem; }
	.page-header h1 { margin-bottom: 0.25rem; }

	.create-board { margin-bottom: 2rem; }
	.create-form { display: flex; gap: 0.75rem; }
	.create-form input { flex: 1; }

	.boards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }

	.board-card { padding: 0; overflow: hidden; text-decoration: none; color: var(--color-text); position: relative; }
	.board-card:hover { border-color: var(--color-accent); }

	.board-thumb { aspect-ratio: 16/9; overflow: hidden; }
	.board-thumb-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; height: 100%; gap: 2px; }
	.thumb-cell { background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover)); }

	.board-info { padding: 1rem; }
	.board-info h3 { font-size: 1rem; margin-bottom: 0.25rem; }
	.board-count { font-size: 0.8rem; color: var(--color-text-muted); }

	.board-delete { position: absolute; top: 0.5rem; right: 0.5rem; opacity: 0; transition: opacity var(--transition); background: rgba(0,0,0,0.7); color: var(--color-error); font-size: 0.75rem; }
	.board-card:hover .board-delete { opacity: 1; }

	.empty-state { text-align: center; padding: 4rem 2rem; }
	.empty-state h3 { margin-bottom: 0.5rem; }
	.empty-state p { max-width: 400px; margin: 0 auto; font-size: 0.9rem; }

	.error-banner { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--color-error); padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1rem; }
	.loading-state { text-align: center; padding: 4rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) { .boards-grid { grid-template-columns: 1fr; } .create-form { flex-direction: column; } }
</style>
