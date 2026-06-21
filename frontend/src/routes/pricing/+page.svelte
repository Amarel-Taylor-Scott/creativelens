<script>
	let billingPeriod = 'monthly';

	const plans = [
		{
			name: 'Free',
			price: { monthly: 0, yearly: 0 },
			description: 'Explore the gallery and get started with creative AI.',
			features: [
				'Browse full gallery (watermarked)',
				'View 86 niches and categories',
				'5 image analyses per day',
				'Basic prompt data on images',
				'API access (100 requests/day)',
				'Community submissions',
			],
			cta: 'Get Started Free',
			highlighted: false,
		},
		{
			name: 'Pro',
			price: { monthly: 19, yearly: 190 },
			description: 'Full access for individual creators and marketers.',
			features: [
				'Everything in Free, plus:',
				'Unwatermarked high-res downloads',
				'Unlimited image analyses',
				'Full prompt + settings data',
				'Niche trend analytics',
				'API access (1,000 requests/day)',
				'Priority submission review',
				'Advanced search filters',
				'Export prompt collections',
			],
			cta: 'Start Pro Trial',
			highlighted: true,
		},
		{
			name: 'Agency',
			price: { monthly: 79, yearly: 790 },
			description: 'Scale creative intelligence across your entire team.',
			features: [
				'Everything in Pro, plus:',
				'Up to 10 team seats',
				'API access (5,000 requests/day)',
				'Custom API key management',
				'Bulk download packs',
				'Campaign performance tracking',
				'White-label reports',
				'Priority support',
				'Custom niche curation',
				'Dedicated account manager',
			],
			cta: 'Contact Sales',
			highlighted: false,
		},
	];

	$: currentPrices = plans.map(p => ({
		...p,
		displayPrice: p.price[billingPeriod],
	}));
</script>

<svelte:head>
	<title>Pricing - CreativeLens</title>
	<meta name="description" content="CreativeLens pricing plans. Free, Pro ($19/mo), and Agency ($79/mo) tiers for creative intelligence." />
</svelte:head>

<div class="pricing-page">
	<div class="container">
		<div class="pricing-header">
			<h1>Simple, Transparent Pricing</h1>
			<p>Start free, upgrade when you need more power. All plans include access to our full library of 86 creative niches.</p>

			<div class="billing-toggle">
				<button class:active={billingPeriod === 'monthly'} on:click={() => (billingPeriod = 'monthly')}>Monthly</button>
				<button class:active={billingPeriod === 'yearly'} on:click={() => (billingPeriod = 'yearly')}>
					Yearly <span class="save-badge">Save 17%</span>
				</button>
			</div>
		</div>

		<div class="pricing-grid">
			{#each currentPrices as plan}
				<div class="pricing-card card" class:highlighted={plan.highlighted}>
					{#if plan.highlighted}
						<div class="popular-badge">Most Popular</div>
					{/if}
					<div class="plan-header">
						<h3>{plan.name}</h3>
						<div class="plan-price">
							{#if plan.displayPrice === 0}
								<span class="price-amount">$0</span>
								<span class="price-period">forever</span>
							{:else}
								<span class="price-amount">${plan.displayPrice}</span>
								<span class="price-period">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
							{/if}
						</div>
						<p class="plan-desc">{plan.description}</p>
					</div>

					<ul class="feature-list">
						{#each plan.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>

					<a href={plan.name === 'Agency' ? '/contact' : '/signup'} class="btn" class:btn-primary={plan.highlighted} class:btn-secondary={!plan.highlighted} style="width: 100%;">
						{plan.cta}
					</a>
				</div>
			{/each}
		</div>

		<div class="pricing-faq">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-grid">
				<div class="faq-item card">
					<h4>Can I switch plans anytime?</h4>
					<p>Yes. Upgrade or downgrade at any time. When upgrading, you only pay the prorated difference. Downgrades take effect at the next billing cycle.</p>
				</div>
				<div class="faq-item card">
					<h4>What counts as an "image analysis"?</h4>
					<p>Each time you upload an image to the Studio for prompt reverse-engineering counts as one analysis. Free users get 5 per day, Pro and Agency users get unlimited analyses.</p>
				</div>
				<div class="faq-item card">
					<h4>How does API access work?</h4>
					<p>Every plan includes API keys with the cl_live_* format. Rate limits differ by plan. The API lets you search images, browse niches, and analyze prompts programmatically.</p>
				</div>
				<div class="faq-item card">
					<h4>Do you offer refunds?</h4>
					<p>We offer a 14-day money-back guarantee on all paid plans. If CreativeLens is not the right fit, contact us for a full refund.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.pricing-page {
		padding: 2rem 0;
	}

	.pricing-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.pricing-header h1 {
		margin-bottom: 0.5rem;
	}

	.pricing-header > p {
		max-width: 520px;
		margin: 0 auto 2rem;
	}

	.billing-toggle {
		display: inline-flex;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: 9999px;
		padding: 4px;
	}

	.billing-toggle button {
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		font-size: 0.85rem;
		font-weight: 500;
		background: transparent;
		color: var(--color-text-secondary);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.billing-toggle button.active {
		background: var(--color-bg-card);
		color: var(--color-text);
		box-shadow: var(--shadow-sm);
	}

	.save-badge {
		font-size: 0.7rem;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		background: rgba(16, 185, 129, 0.15);
		color: var(--color-success);
		font-weight: 600;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 4rem;
	}

	.pricing-card {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		position: relative;
	}

	.pricing-card.highlighted {
		border-color: var(--color-accent);
		box-shadow: 0 0 30px rgba(236, 72, 153, 0.15);
	}

	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--color-accent);
		color: white;
		padding: 0.25rem 1rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.plan-header {
		margin-bottom: 1.5rem;
	}

	.plan-header h3 {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}

	.plan-price {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.price-amount {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--color-text);
	}

	.price-period {
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	.plan-desc {
		font-size: 0.875rem;
	}

	.feature-list {
		list-style: none;
		flex: 1;
		margin-bottom: 1.5rem;
	}

	.feature-list li {
		padding: 0.4rem 0;
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		padding-left: 1.25rem;
		position: relative;
	}

	.feature-list li::before {
		content: '\2713';
		position: absolute;
		left: 0;
		color: var(--color-accent);
		font-weight: 700;
	}

	.pricing-faq {
		max-width: 800px;
		margin: 0 auto;
	}

	.pricing-faq h2 {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.faq-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.faq-item h4 {
		font-size: 0.95rem;
		margin-bottom: 0.5rem;
	}

	.faq-item p {
		font-size: 0.85rem;
	}

	@media (max-width: 1024px) {
		.pricing-grid {
			grid-template-columns: 1fr;
			max-width: 440px;
			margin-left: auto;
			margin-right: auto;
		}
	}

	@media (max-width: 640px) {
		.faq-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
