<svelte:head>
	<title>Terms of Service - CreativeLens</title>
</svelte:head>

<div class="legal-page">
	<div class="container">
		<div class="legal-content">
			<h1>Terms of Service</h1>
			<p class="updated">Last updated: April 9, 2026</p>

			<section>
				<h2>1. Acceptance of Terms</h2>
				<p>By accessing or using CreativeLens ("the Service"), operated by Polsia, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.</p>
			</section>

			<section>
				<h2>2. Description of Service</h2>
				<p>CreativeLens is a creative intelligence platform that provides AI-generated image galleries, prompt analysis tools, niche discovery, and an API for programmatic access. The Service is available at creativelens.polsia.app.</p>
			</section>

			<section>
				<h2>3. Accounts and Plans</h2>
				<p>You must create an account to access certain features. You are responsible for maintaining the confidentiality of your login credentials. CreativeLens offers three plan tiers:</p>
				<ul>
					<li><strong>Free:</strong> Basic gallery access with watermarked images, 5 daily image analyses, and 100 API requests per day.</li>
					<li><strong>Pro ($19/month):</strong> Full unwatermarked access, unlimited analyses, 1,000 API requests per day, and advanced features.</li>
					<li><strong>Agency ($79/month):</strong> Team access with up to 10 seats, 5,000 API requests per day, bulk downloads, and premium support.</li>
				</ul>
			</section>

			<section>
				<h2>4. Content and Submissions</h2>
				<p>When you submit content to CreativeLens, you represent that you have the right to share such content and that it was generated using AI tools in compliance with those tools' terms of service. Submissions are subject to review. Maximum file size is 15MB per submission, with up to 23 niche tags.</p>
				<p>CreativeLens reserves the right to reject, remove, or modify submitted content at its sole discretion.</p>
			</section>

			<section>
				<h2>5. API Usage</h2>
				<p>API keys are issued in the format cl_live_* for production use and cl_test_* for testing. You agree not to exceed your plan's rate limits, share API keys publicly, or use automated access to circumvent rate controls. Violation may result in key revocation.</p>
			</section>

			<section>
				<h2>6. Intellectual Property</h2>
				<p>AI-generated images displayed on CreativeLens may be subject to the intellectual property policies of the AI tools used to generate them. CreativeLens does not claim ownership of user-submitted content. The CreativeLens platform, brand, and interface design are the property of Polsia.</p>
			</section>

			<section>
				<h2>7. Prohibited Use</h2>
				<p>You agree not to use CreativeLens to generate, distribute, or promote content that is illegal, harmful, defamatory, or infringes on third-party rights. You may not reverse-engineer the Service, attempt unauthorized access, or use the Service for competitive intelligence against Polsia.</p>
			</section>

			<section>
				<h2>8. Termination</h2>
				<p>We may suspend or terminate your account at any time for violation of these terms. Upon termination, your right to use the Service ceases immediately. You may cancel your account at any time through your account settings.</p>
			</section>

			<section>
				<h2>9. Limitation of Liability</h2>
				<p>CreativeLens is provided "as is" without warranty of any kind. Polsia shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.</p>
			</section>

			<section>
				<h2>10. Contact</h2>
				<p>For questions about these terms, contact us at <a href="/contact">our contact page</a>.</p>
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
