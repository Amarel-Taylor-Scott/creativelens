<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let activeTab = 'dashboard';
	let loading = true;
	let error = '';

	let dashboardStats = { total_users: 0, total_images: 0, total_page_views: 0, today_page_views: 0, subscribers: { free: 0, pro: 0, agency: 0 } };
	let users = [];
	let subscriptions = [];
	let moderationQueue = [];
	let leads = [];
	let apiKeys = [];
	let marketingScores = [];
	let niches = [];

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard' },
		{ id: 'users', label: 'Users' },
		{ id: 'subscriptions', label: 'Subscriptions' },
		{ id: 'moderation', label: 'Moderation' },
		{ id: 'leads', label: 'Leads' },
		{ id: 'api-keys', label: 'API Keys' },
		{ id: 'marketing', label: 'Marketing Scores' },
		{ id: 'niches', label: 'Niche Management' },
	];

	onMount(async () => {
		try {
			const res = await api.get('/analytics/summary');
			if (res.data) dashboardStats = { ...dashboardStats, ...res.data };
		} catch (err) {
			error = 'Admin access required. You may not have permission.';
		}
		loading = false;
	});

	async function loadTabData(tab) {
		activeTab = tab;
	}
</script>

<svelte:head>
	<title>Admin Panel - CreativeLens</title>
</svelte:head>

<div class="admin-page">
	<div class="container">
		<div class="admin-header">
			<h1>Admin Panel</h1>
			<p>CreativeLens platform management and analytics.</p>
		</div>

		{#if error}
			<div class="error-banner">{error}</div>
		{/if}

		<div class="admin-layout">
			<nav class="admin-tabs">
				{#each tabs as tab}
					<button class="tab-btn" class:active={activeTab === tab.id} on:click={() => loadTabData(tab.id)}>
						{tab.label}
					</button>
				{/each}
			</nav>

			<div class="admin-content">
				{#if loading}
					<div class="loading-state"><div class="spinner"></div><p>Loading...</p></div>

				{:else if activeTab === 'dashboard'}
					<div class="dashboard-grid">
						<div class="dash-stat card">
							<span class="dash-value">{dashboardStats.total_users.toLocaleString()}</span>
							<span class="dash-label">Total Users</span>
						</div>
						<div class="dash-stat card">
							<span class="dash-value">{dashboardStats.total_images.toLocaleString()}</span>
							<span class="dash-label">Total Images</span>
						</div>
						<div class="dash-stat card">
							<span class="dash-value">{dashboardStats.total_page_views.toLocaleString()}</span>
							<span class="dash-label">Total Page Views</span>
						</div>
						<div class="dash-stat card">
							<span class="dash-value">{dashboardStats.today_page_views.toLocaleString()}</span>
							<span class="dash-label">Today Views</span>
						</div>
					</div>
					<div class="dash-section card">
						<h3>Subscriber Breakdown</h3>
						<div class="sub-breakdown">
							<div class="sub-row"><span>Free</span><span class="sub-count">{dashboardStats.subscribers.free}</span></div>
							<div class="sub-row"><span>Pro ($19/mo)</span><span class="sub-count">{dashboardStats.subscribers.pro}</span></div>
							<div class="sub-row"><span>Agency ($79/mo)</span><span class="sub-count">{dashboardStats.subscribers.agency}</span></div>
						</div>
					</div>

				{:else if activeTab === 'users'}
					<div class="tab-panel card">
						<h3>User Management</h3>
						<div class="search-row">
							<input type="text" placeholder="Search users by email..." />
							<button class="btn btn-primary">Search</button>
						</div>
						{#if users.length > 0}
							<table class="admin-table">
								<thead><tr><th>Email</th><th>Plan</th><th>Created</th><th>Actions</th></tr></thead>
								<tbody>
									{#each users as user}
										<tr><td>{user.email}</td><td><span class="badge">{user.plan}</span></td><td>{user.created_at}</td><td><button class="btn btn-ghost btn-sm">Edit</button></td></tr>
									{/each}
								</tbody>
							</table>
						{:else}
							<p class="empty-text">No users loaded. Connect to database to view users.</p>
						{/if}
					</div>

				{:else if activeTab === 'subscriptions'}
					<div class="tab-panel card">
						<h3>Subscription Management</h3>
						<p class="empty-text">View and manage user subscriptions, upgrade/downgrade accounts, and review Stripe payment status. Connect Stripe to enable.</p>
					</div>

				{:else if activeTab === 'moderation'}
					<div class="tab-panel card">
						<h3>Content Moderation</h3>
						<div class="mod-stats">
							<span class="badge">0 pending</span>
							<span class="badge">0 flagged</span>
						</div>
						<p class="empty-text">Review submitted images. Approve, reject, or flag content for policy violations. No items in the queue.</p>
					</div>

				{:else if activeTab === 'leads'}
					<div class="tab-panel card">
						<h3>Email Leads & Subscribers</h3>
						<p class="empty-text">View email subscribers, export lead lists, and manage newsletter campaigns. Connect email service to enable.</p>
					</div>

				{:else if activeTab === 'api-keys'}
					<div class="tab-panel card">
						<h3>API Key Management</h3>
						<p class="empty-text">View all issued API keys, revoke compromised keys, and monitor usage. Connect to database to enable.</p>
					</div>

				{:else if activeTab === 'marketing'}
					<div class="tab-panel card">
						<h3>Marketing Score Jobs</h3>
						<p class="tab-desc">Run batch marketing relevance scoring across niches. Each image is scored by an LLM for niche fit.</p>
						<div class="score-actions">
							<select>
								<option value="">Select niche to score...</option>
								<option value="neo-gothic-couture">Neo-Gothic Couture</option>
								<option value="neon-streetwear">Neon Streetwear</option>
								<option value="techwear">Techwear</option>
							</select>
							<button class="btn btn-primary">Start Scoring</button>
						</div>
						<p class="empty-text">No scoring jobs running. Select a niche and start a batch scoring job.</p>
					</div>

				{:else if activeTab === 'niches'}
					<div class="tab-panel card">
						<h3>Niche Management</h3>
						<p class="tab-desc">Add, edit, or reorganize niches and categories. Manage niche connections for the graph explorer.</p>
						<div class="niche-summary">
							<span>9 categories</span>
							<span>86 niches</span>
							<span>26 sub-niches</span>
						</div>
						<p class="empty-text">Connect to database for full niche CRUD operations.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.admin-page { padding: 2rem 0; }
	.admin-header { margin-bottom: 2rem; }
	.admin-header h1 { margin-bottom: 0.25rem; }

	.admin-layout { display: grid; grid-template-columns: 200px 1fr; gap: 1.5rem; }

	.admin-tabs { display: flex; flex-direction: column; gap: 0.25rem; position: sticky; top: 80px; align-self: start; }
	.tab-btn { text-align: left; padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 500; background: transparent; color: var(--color-text-secondary); }
	.tab-btn:hover { background: var(--color-bg-hover); color: var(--color-text); }
	.tab-btn.active { background: var(--color-accent-dim); color: var(--color-accent); }

	.dashboard-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
	.dash-stat { text-align: center; padding: 1.5rem 1rem; }
	.dash-value { display: block; font-size: 2rem; font-weight: 800; color: var(--color-accent); }
	.dash-label { font-size: 0.8rem; color: var(--color-text-muted); }

	.dash-section h3 { font-size: 1rem; margin-bottom: 1rem; }
	.sub-breakdown { display: flex; flex-direction: column; gap: 0.5rem; }
	.sub-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid var(--color-border); font-size: 0.9rem; }
	.sub-count { font-weight: 700; }

	.tab-panel h3 { font-size: 1.1rem; margin-bottom: 0.75rem; }
	.tab-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1rem; }

	.search-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
	.search-row input { flex: 1; }

	.admin-table { width: 100%; border-collapse: collapse; }
	.admin-table th, .admin-table td { text-align: left; padding: 0.625rem 0.75rem; border-bottom: 1px solid var(--color-border); font-size: 0.85rem; }
	.admin-table th { color: var(--color-text-muted); font-size: 0.75rem; text-transform: uppercase; }

	.mod-stats { display: flex; gap: 0.5rem; margin-bottom: 1rem; }

	.score-actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
	.score-actions select { flex: 1; }

	.niche-summary { display: flex; gap: 1.5rem; margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-text-secondary); }

	.empty-text { font-size: 0.9rem; color: var(--color-text-muted); text-align: center; padding: 2rem; }

	.error-banner { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--color-error); padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1rem; }
	.loading-state { text-align: center; padding: 4rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) {
		.admin-layout { grid-template-columns: 1fr; }
		.admin-tabs { flex-direction: row; flex-wrap: wrap; position: static; }
		.dashboard-grid { grid-template-columns: repeat(2, 1fr); }
	}
</style>
