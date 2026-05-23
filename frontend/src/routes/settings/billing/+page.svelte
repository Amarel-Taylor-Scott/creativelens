<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let loading = true;
	let error = '';

	let currentPlan = 'free';
	let credits = { premium: 0, gift: 0, signup: 5, referral: 0 };
	let billingHistory = [];
	let subscription = null;

	onMount(async () => {
		try {
			const res = await api.get('/subscription');
			if (res.data) {
				currentPlan = res.data.tier || 'free';
				credits = res.data.credits || credits;
				subscription = res.data;
			}
		} catch (err) {
			error = 'Failed to load billing info.';
		}

		try {
			const histRes = await api.get('/subscription/billing/history');
			if (histRes.data) billingHistory = histRes.data.invoices || [];
		} catch (e) {}

		loading = false;
	});

	async function handleUpgrade(tier) {
		try {
			const res = await api.post('/subscription/checkout', { tier, billing_period: 'monthly' });
			if (res.data && res.data.checkout_url) {
				window.location.href = res.data.checkout_url;
			}
		} catch (err) {
			error = err.error || 'Failed to start checkout.';
		}
	}

	function openPortal() {
		// TODO: Redirect to Stripe customer portal
		alert('Stripe customer portal not yet connected.');
	}

	$: totalCredits = credits.premium + credits.gift + credits.signup + credits.referral;
</script>

<svelte:head>
	<title>Billing & Credits - CreativeLens</title>
</svelte:head>

<div class="billing-page">
	<div class="container">
		<div class="page-header">
			<h1>Billing & Credits</h1>
			<p>Manage your subscription, view credits, and download invoices.</p>
		</div>

		{#if loading}
			<div class="loading-state card">
				<div class="spinner"></div>
				<p>Loading billing info...</p>
			</div>
		{:else}
			{#if error}
				<div class="error-banner">{error}</div>
			{/if}

			<div class="billing-grid">
				<div class="plan-card card">
					<h3>Current Plan</h3>
					<div class="plan-display">
						<span class="plan-name">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span>
						<span class="plan-badge badge">{currentPlan === 'free' ? 'Free' : 'Active'}</span>
					</div>
					{#if subscription && subscription.current_period_end}
						<p class="plan-period">Renews on {new Date(subscription.current_period_end).toLocaleDateString()}</p>
					{/if}
					<div class="plan-actions">
						{#if currentPlan === 'free'}
							<button class="btn btn-primary" on:click={() => handleUpgrade('pro')}>Upgrade to Pro - $19/mo</button>
							<button class="btn btn-secondary" on:click={() => handleUpgrade('agency')}>Upgrade to Agency - $79/mo</button>
						{:else if currentPlan === 'pro'}
							<button class="btn btn-primary" on:click={() => handleUpgrade('agency')}>Upgrade to Agency</button>
							<button class="btn btn-ghost" on:click={openPortal}>Manage in Stripe</button>
						{:else}
							<button class="btn btn-ghost" on:click={openPortal}>Manage in Stripe</button>
						{/if}
					</div>
				</div>

				<div class="credits-card card">
					<h3>Credit Dashboard</h3>
					<div class="credits-total">
						<span class="credits-number">{totalCredits}</span>
						<span class="credits-label">Total Credits</span>
					</div>
					<div class="credits-breakdown">
						<div class="credit-row">
							<span class="credit-type">Premium Credits</span>
							<span class="credit-value">{credits.premium}</span>
						</div>
						<div class="credit-row">
							<span class="credit-type">Gift Credits</span>
							<span class="credit-value">{credits.gift}</span>
						</div>
						<div class="credit-row">
							<span class="credit-type">Signup Bonus</span>
							<span class="credit-value">{credits.signup}</span>
						</div>
						<div class="credit-row">
							<span class="credit-type">Referral Credits</span>
							<span class="credit-value">{credits.referral}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="history-section card">
				<h3>Billing History</h3>
				{#if billingHistory.length > 0}
					<table class="history-table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Description</th>
								<th>Amount</th>
								<th>Status</th>
								<th>Invoice</th>
							</tr>
						</thead>
						<tbody>
							{#each billingHistory as inv}
								<tr>
									<td>{new Date(inv.date).toLocaleDateString()}</td>
									<td>{inv.description}</td>
									<td>${(inv.amount / 100).toFixed(2)}</td>
									<td><span class="badge">{inv.status}</span></td>
									<td><a href={inv.invoice_url} target="_blank" class="btn btn-ghost btn-sm">Download</a></td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p class="empty-text">No billing history yet. Invoices will appear here after your first payment.</p>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.billing-page { padding: 2rem 0; }
	.page-header { margin-bottom: 2rem; }
	.page-header h1 { margin-bottom: 0.25rem; }

	.billing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }

	.plan-card h3, .credits-card h3 { font-size: 1rem; margin-bottom: 1rem; }

	.plan-display { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
	.plan-name { font-size: 1.75rem; font-weight: 800; }
	.plan-period { font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem; }
	.plan-actions { display: flex; flex-direction: column; gap: 0.5rem; }

	.credits-total { text-align: center; padding: 1.5rem 0; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); }
	.credits-number { display: block; font-size: 2.5rem; font-weight: 800; color: var(--color-accent); }
	.credits-label { font-size: 0.85rem; color: var(--color-text-muted); }

	.credits-breakdown { display: flex; flex-direction: column; gap: 0.5rem; }
	.credit-row { display: flex; justify-content: space-between; padding: 0.4rem 0; }
	.credit-type { font-size: 0.85rem; color: var(--color-text-secondary); }
	.credit-value { font-weight: 700; font-size: 0.9rem; }

	.history-section { margin-top: 1.5rem; }
	.history-section h3 { font-size: 1rem; margin-bottom: 1rem; }

	.history-table { width: 100%; border-collapse: collapse; }
	.history-table th, .history-table td { text-align: left; padding: 0.625rem 0.75rem; border-bottom: 1px solid var(--color-border); font-size: 0.85rem; }
	.history-table th { color: var(--color-text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; }

	.empty-text { font-size: 0.9rem; color: var(--color-text-muted); text-align: center; padding: 2rem; }

	.error-banner { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--color-error); padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1rem; }
	.loading-state { text-align: center; padding: 4rem 2rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) { .billing-grid { grid-template-columns: 1fr; } }
</style>
