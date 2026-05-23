<svelte:head>
	<title>Privacy Policy - CreativeLens</title>
</svelte:head>

<div class="legal-page">
	<div class="container">
		<div class="legal-content">
			<h1>Privacy Policy</h1>
			<p class="updated">Last updated: April 9, 2026</p>

			<section>
				<h2>1. Information We Collect</h2>
				<p>When you use CreativeLens, we collect the following types of information:</p>
				<ul>
					<li><strong>Account Information:</strong> Email address, display name, and encrypted password when you register.</li>
					<li><strong>Usage Data:</strong> Pages visited, features used, images viewed, analyses performed, and API calls made.</li>
					<li><strong>Submission Data:</strong> Images you upload, prompts and metadata you provide, and niche tags you assign.</li>
					<li><strong>Technical Data:</strong> IP address, browser type, device information, and access timestamps.</li>
				</ul>
			</section>

			<section>
				<h2>2. How We Use Your Information</h2>
				<p>We use collected information to:</p>
				<ul>
					<li>Provide, maintain, and improve the CreativeLens platform.</li>
					<li>Process your account registration and manage your subscription plan.</li>
					<li>Moderate submitted content and maintain gallery quality.</li>
					<li>Generate anonymized analytics about niche trends and platform usage.</li>
					<li>Communicate with you about your account, service updates, and new features.</li>
					<li>Enforce our Terms of Service and prevent abuse.</li>
				</ul>
			</section>

			<section>
				<h2>3. Data Storage and Security</h2>
				<p>Your data is stored securely in PostgreSQL databases with encryption at rest. Passwords are hashed using bcrypt with a cost factor of 12. API keys are stored as one-way hashes. We use HTTPS for all data transmission.</p>
			</section>

			<section>
				<h2>4. Data Sharing</h2>
				<p>We do not sell your personal information. We may share data with:</p>
				<ul>
					<li><strong>Service Providers:</strong> Infrastructure providers (hosting, CDN) that help operate the platform.</li>
					<li><strong>Legal Compliance:</strong> When required by law, court order, or to protect our rights.</li>
					<li><strong>Aggregated Data:</strong> Anonymized, aggregated statistics that cannot identify individual users.</li>
				</ul>
			</section>

			<section>
				<h2>5. Your Rights</h2>
				<p>You have the right to:</p>
				<ul>
					<li>Access the personal data we hold about you.</li>
					<li>Request correction of inaccurate data.</li>
					<li>Request deletion of your account and associated data.</li>
					<li>Export your data in a machine-readable format.</li>
					<li>Withdraw consent for optional data processing.</li>
				</ul>
			</section>

			<section>
				<h2>6. Cookies</h2>
				<p>CreativeLens uses essential cookies for authentication and session management. We do not use third-party tracking cookies. Analytics are collected server-side without client-side trackers.</p>
			</section>

			<section>
				<h2>7. Data Retention</h2>
				<p>We retain your account data for as long as your account is active. If you delete your account, we remove your personal data within 30 days. Anonymized analytics data may be retained indefinitely. Submitted content that has been approved into the gallery may persist after account deletion unless you specifically request its removal.</p>
			</section>

			<section>
				<h2>8. Changes to This Policy</h2>
				<p>We may update this Privacy Policy from time to time. We will notify registered users of material changes via email. Continued use of the Service after changes constitutes acceptance.</p>
			</section>

			<section>
				<h2>9. Contact</h2>
				<p>For privacy-related inquiries or to exercise your data rights, contact us through our <a href="/contact">contact page</a>.</p>
			</section>
		</div>
	</div>
</div>

<style>
	.legal-page {
		padding: 2rem 0;
	}

	.legal-content {
		max-width: 720px;
		margin: 0 auto;
	}

	.legal-content h1 {
		margin-bottom: 0.25rem;
	}

	.updated {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}

	section {
		margin-bottom: 2rem;
	}

	section h2 {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}

	section p {
		margin-bottom: 0.75rem;
		font-size: 0.95rem;
		line-height: 1.7;
	}

	section ul {
		list-style: disc;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
	}

	section li {
		font-size: 0.95rem;
		color: var(--color-text-secondary);
		line-height: 1.7;
		margin-bottom: 0.25rem;
	}
</style>
