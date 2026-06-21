<script>
	let activeSection = 'overview';

	const sections = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'auth', label: 'Authentication' },
		{ id: 'images', label: 'Images' },
		{ id: 'categories', label: 'Categories' },
		{ id: 'niches', label: 'Niches' },
		{ id: 'submissions', label: 'Submissions' },
		{ id: 'rate-limits', label: 'Rate Limits' },
		{ id: 'errors', label: 'Errors' },
	];
</script>

<svelte:head>
	<title>API Documentation - CreativeLens</title>
	<meta name="description" content="CreativeLens REST API documentation. Search images, browse niches, analyze prompts, and integrate creative intelligence into your workflow." />
</svelte:head>

<div class="docs-page">
	<div class="container">
		<div class="docs-layout">
			<nav class="docs-nav">
				<h4>API Reference</h4>
				{#each sections as section}
					<button
						class="nav-item"
						class:active={activeSection === section.id}
						on:click={() => (activeSection = section.id)}
					>
						{section.label}
					</button>
				{/each}
			</nav>

			<div class="docs-content">
				{#if activeSection === 'overview'}
					<div class="doc-section">
						<h1>CreativeLens API</h1>
						<p>The CreativeLens API provides programmatic access to our creative intelligence platform. Search AI-generated images, browse 86 niches across 9 categories, analyze prompts, and manage submissions.</p>

						<div class="info-box">
							<h4>Base URL</h4>
							<code>https://creativelens.polsia.app/api/v1</code>
						</div>

						<h3>Response Format</h3>
						<p>All responses follow a consistent JSON structure:</p>
						<pre><code>{`{
  "success": true,
  "data": {
    // Response payload
  }
}`}</code></pre>
						<p>Error responses include an error message:</p>
						<pre><code>{`{
  "success": false,
  "error": "Description of what went wrong"
}`}</code></pre>
					</div>

				{:else if activeSection === 'auth'}
					<div class="doc-section">
						<h1>Authentication</h1>
						<p>Authenticate using JWT tokens obtained from the login or register endpoints. Include the token in the Authorization header for protected routes.</p>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method post">POST</span>
								<code>/auth/register</code>
							</div>
							<p>Create a new account.</p>
							<h4>Request Body</h4>
							<pre><code>{`{
  "email": "user@example.com",
  "password": "minimum8chars",
  "display_name": "CreativeUser"
}`}</code></pre>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method post">POST</span>
								<code>/auth/login</code>
							</div>
							<p>Log in and receive a JWT token.</p>
							<h4>Request Body</h4>
							<pre><code>{`{
  "email": "user@example.com",
  "password": "yourpassword"
}`}</code></pre>
							<h4>Response</h4>
							<pre><code>{`{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "email": "user@example.com",
      "plan": "free"
    }
  }
}`}</code></pre>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/auth/me</code>
							</div>
							<p>Get the current authenticated user. Requires <code>Authorization: Bearer &lt;token&gt;</code> header.</p>
						</div>
					</div>

				{:else if activeSection === 'images'}
					<div class="doc-section">
						<h1>Images</h1>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/images</code>
							</div>
							<p>List images with filtering and pagination.</p>
							<h4>Query Parameters</h4>
							<table class="param-table">
								<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
								<tbody>
									<tr><td><code>page</code></td><td>number</td><td>Page number (default: 1)</td></tr>
									<tr><td><code>limit</code></td><td>number</td><td>Items per page, max 100 (default: 24)</td></tr>
									<tr><td><code>niche</code></td><td>string</td><td>Filter by niche slug</td></tr>
									<tr><td><code>category</code></td><td>string</td><td>Filter by category slug</td></tr>
									<tr><td><code>ai_model</code></td><td>string</td><td>Filter by AI model name</td></tr>
									<tr><td><code>sort</code></td><td>string</td><td>Sort: recent, popular, trending</td></tr>
									<tr><td><code>search</code></td><td>string</td><td>Search titles and prompts</td></tr>
								</tbody>
							</table>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/images/:id</code>
							</div>
							<p>Get a single image with full details including prompt, model settings, and metadata.</p>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method post">POST</span>
								<code>/images/:id/analyze</code>
							</div>
							<p>Analyze an image to reverse-engineer its prompt, detect style tags, and predict the AI model used. Requires authentication. Free plan: 5/day, Pro and Agency: unlimited.</p>
						</div>
					</div>

				{:else if activeSection === 'categories'}
					<div class="doc-section">
						<h1>Categories</h1>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/categories</code>
							</div>
							<p>List all 9 categories with niche counts.</p>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/categories/:slug</code>
							</div>
							<p>Get a category with its associated niches.</p>
						</div>
					</div>

				{:else if activeSection === 'niches'}
					<div class="doc-section">
						<h1>Niches</h1>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/niches</code>
							</div>
							<p>List all 86 niches with optional filtering.</p>
							<h4>Query Parameters</h4>
							<table class="param-table">
								<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
								<tbody>
									<tr><td><code>category</code></td><td>string</td><td>Filter by category slug</td></tr>
									<tr><td><code>search</code></td><td>string</td><td>Search niche names</td></tr>
									<tr><td><code>trending</code></td><td>boolean</td><td>Only trending niches</td></tr>
								</tbody>
							</table>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/niches/:slug</code>
							</div>
							<p>Get a niche with images and statistics.</p>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method post">POST</span>
								<code>/niches/:slug/subscribe</code>
							</div>
							<p>Toggle following a niche. Requires authentication.</p>
						</div>
					</div>

				{:else if activeSection === 'submissions'}
					<div class="doc-section">
						<h1>Submissions</h1>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method post">POST</span>
								<code>/submissions</code>
							</div>
							<p>Submit an image for review. Requires authentication.</p>
							<h4>Constraints</h4>
							<ul>
								<li>Maximum file size: 15MB</li>
								<li>Maximum niche tags: 23 per submission</li>
								<li>Supported formats: PNG, JPEG, WebP</li>
							</ul>
						</div>

						<div class="endpoint">
							<div class="endpoint-header">
								<span class="method get">GET</span>
								<code>/submissions</code>
							</div>
							<p>List your submissions. Filter by status: pending, approved, rejected.</p>
						</div>
					</div>

				{:else if activeSection === 'rate-limits'}
					<div class="doc-section">
						<h1>Rate Limits</h1>
						<p>API rate limits are applied per API key within 15-minute windows.</p>
						<table class="param-table">
							<thead><tr><th>Plan</th><th>Requests / 15 min</th><th>Daily Limit</th><th>Key Format</th></tr></thead>
							<tbody>
								<tr><td>Free</td><td>100</td><td>~9,600</td><td><code>cl_live_*</code></td></tr>
								<tr><td>Pro ($19/mo)</td><td>1,000</td><td>~96,000</td><td><code>cl_live_*</code></td></tr>
								<tr><td>Agency ($79/mo)</td><td>5,000</td><td>~480,000</td><td><code>cl_live_*</code></td></tr>
							</tbody>
						</table>
						<p>Rate limit headers are included in every response:</p>
						<pre><code>{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1712678400`}</code></pre>
					</div>

				{:else if activeSection === 'errors'}
					<div class="doc-section">
						<h1>Error Codes</h1>
						<table class="param-table">
							<thead><tr><th>Status</th><th>Meaning</th></tr></thead>
							<tbody>
								<tr><td>400</td><td>Bad Request -- Invalid parameters or validation failure.</td></tr>
								<tr><td>401</td><td>Unauthorized -- Missing or invalid authentication token.</td></tr>
								<tr><td>403</td><td>Forbidden -- You do not have permission for this action.</td></tr>
								<tr><td>404</td><td>Not Found -- The requested resource does not exist.</td></tr>
								<tr><td>429</td><td>Too Many Requests -- Rate limit exceeded. Wait and retry.</td></tr>
								<tr><td>500</td><td>Internal Server Error -- Something went wrong on our end.</td></tr>
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.docs-page {
		padding: 2rem 0;
	}

	.docs-layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 2rem;
	}

	.docs-nav {
		position: sticky;
		top: 80px;
		align-self: start;
	}

	.docs-nav h4 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		margin-bottom: 0.75rem;
	}

	.nav-item {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-sm);
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		background: transparent;
	}

	.nav-item:hover {
		color: var(--color-text);
		background: var(--color-bg-hover);
	}

	.nav-item.active {
		color: var(--color-accent);
		background: var(--color-accent-dim);
	}

	.doc-section h1 {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	.doc-section h3 {
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}

	.doc-section p {
		margin-bottom: 0.75rem;
	}

	.info-box {
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 1rem 1.25rem;
		margin: 1rem 0;
	}

	.info-box h4 {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		margin-bottom: 0.25rem;
	}

	.info-box code {
		font-size: 1rem;
		color: var(--color-accent);
	}

	pre {
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 1rem;
		overflow-x: auto;
		margin: 0.75rem 0;
	}

	pre code {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-text-secondary);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		background: var(--color-bg-tertiary);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
	}

	.endpoint {
		margin: 1.5rem 0;
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.endpoint-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.method {
		padding: 0.2rem 0.5rem;
		border-radius: 3px;
		font-size: 0.7rem;
		font-weight: 700;
		font-family: var(--font-mono);
		text-transform: uppercase;
	}

	.method.get {
		background: rgba(16, 185, 129, 0.15);
		color: var(--color-success);
	}

	.method.post {
		background: rgba(99, 102, 241, 0.15);
		color: #818cf8;
	}

	.endpoint h4 {
		font-size: 0.85rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	.param-table {
		width: 100%;
		border-collapse: collapse;
		margin: 0.75rem 0;
	}

	.param-table th,
	.param-table td {
		text-align: left;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.85rem;
	}

	.param-table th {
		color: var(--color-text-muted);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.param-table td {
		color: var(--color-text-secondary);
	}

	.doc-section ul {
		list-style: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.doc-section li {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.25rem;
	}

	@media (max-width: 768px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}

		.docs-nav {
			position: static;
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem;
		}
	}
</style>
