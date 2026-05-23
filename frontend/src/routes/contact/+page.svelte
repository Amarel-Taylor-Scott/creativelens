<script>
	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let sending = false;
	let sent = false;

	const subjects = [
		'General Inquiry',
		'Agency Plan / Enterprise',
		'API Integration Support',
		'Creator Partnership',
		'Bug Report',
		'Feature Request',
		'Press / Media',
	];

	async function handleSubmit() {
		if (!name || !email || !subject || !message) return;
		sending = true;
		await new Promise(r => setTimeout(r, 1000));
		sent = true;
		sending = false;
	}
</script>

<svelte:head>
	<title>Contact - CreativeLens</title>
	<meta name="description" content="Get in touch with the CreativeLens team. Sales inquiries, API support, partnership opportunities, and more." />
</svelte:head>

<div class="contact-page">
	<div class="container">
		<div class="contact-layout">
			<div class="contact-info">
				<h1>Get in Touch</h1>
				<p>Have questions about CreativeLens? Need help with your Agency plan or API integration? We are here to help.</p>

				<div class="info-cards">
					<div class="info-card card">
						<h4>Sales &amp; Partnerships</h4>
						<p>Interested in the Agency plan or custom enterprise solutions? Let us know your team's needs.</p>
					</div>
					<div class="info-card card">
						<h4>API Support</h4>
						<p>Need help with API integration, rate limits, or custom endpoints? Our developer team can assist.</p>
					</div>
					<div class="info-card card">
						<h4>Creator Programs</h4>
						<p>Want to become a featured creator or partner with CreativeLens? Tell us about your work.</p>
					</div>
				</div>
			</div>

			<div class="contact-form-wrapper">
				{#if sent}
					<div class="sent-state card">
						<h3>Message Sent</h3>
						<p>We have received your message and will respond within 1-2 business days.</p>
						<button class="btn btn-primary" on:click={() => { sent = false; name = ''; email = ''; message = ''; }}>Send Another</button>
					</div>
				{:else}
					<form class="contact-form card" on:submit|preventDefault={handleSubmit}>
						<div class="form-group">
							<label for="name">Name</label>
							<input type="text" id="name" bind:value={name} placeholder="Your name" required />
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="email" id="email" bind:value={email} placeholder="you@company.com" required />
						</div>
						<div class="form-group">
							<label for="subject">Subject</label>
							<select id="subject" bind:value={subject} required>
								<option value="">Select a topic</option>
								{#each subjects as s}
									<option value={s}>{s}</option>
								{/each}
							</select>
						</div>
						<div class="form-group">
							<label for="message">Message</label>
							<textarea id="message" bind:value={message} rows="5" placeholder="How can we help?" required></textarea>
						</div>
						<button type="submit" class="btn btn-primary" style="width: 100%;" disabled={sending}>
							{sending ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.contact-page {
		padding: 2rem 0;
	}

	.contact-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.contact-info h1 {
		margin-bottom: 0.5rem;
	}

	.contact-info > p {
		margin-bottom: 2rem;
	}

	.info-cards {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.info-card {
		padding: 1.125rem;
	}

	.info-card h4 {
		font-size: 0.95rem;
		margin-bottom: 0.25rem;
	}

	.info-card p {
		font-size: 0.85rem;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.4rem;
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		width: 100%;
	}

	.sent-state {
		text-align: center;
		padding: 3rem 2rem;
	}

	.sent-state h3 {
		margin-bottom: 0.5rem;
	}

	.sent-state p {
		margin-bottom: 1.5rem;
	}

	@media (max-width: 768px) {
		.contact-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
