<script>
	const posts = [
		{
			title: 'Understanding AI Model Differences: SDXL vs Midjourney vs DALL-E 3',
			slug: 'ai-model-differences',
			excerpt: 'A practical breakdown of the top AI image generators, their strengths, and which works best for different creative niches.',
			date: '2026-04-05',
			category: 'AI Education',
			readTime: '8 min',
		},
		{
			title: 'The Rise of Alt Fashion in AI-Generated Content',
			slug: 'alt-fashion-ai-content',
			excerpt: 'How alternative fashion niches like Neo-Gothic Couture and Cyberpunk Techwear are driving the most creative AI imagery.',
			date: '2026-03-28',
			category: 'Trends',
			readTime: '6 min',
		},
		{
			title: 'Prompt Engineering for Marketing Teams: A Complete Guide',
			slug: 'prompt-engineering-marketing',
			excerpt: 'Learn how to write effective prompts that produce campaign-ready visuals. Covers composition, lighting, style control, and brand consistency.',
			date: '2026-03-20',
			category: 'Guides',
			readTime: '12 min',
		},
		{
			title: 'Building a Virtual Influencer: From Concept to Content',
			slug: 'building-virtual-influencer',
			excerpt: 'Step-by-step guide to designing, generating, and maintaining a consistent AI influencer character for brand partnerships.',
			date: '2026-03-12',
			category: 'Tutorials',
			readTime: '10 min',
		},
		{
			title: 'Niche Spotlight: Why Stream Visual Assets Are Booming',
			slug: 'stream-visual-assets-boom',
			excerpt: 'The growing market for AI-generated stream overlays, thumbnails, and branding kits. What creators need and what sells.',
			date: '2026-03-04',
			category: 'Market Intel',
			readTime: '5 min',
		},
		{
			title: 'Ethical AI Image Generation: Best Practices for Creators',
			slug: 'ethical-ai-generation',
			excerpt: 'Navigating consent, attribution, and responsible use when creating and distributing AI-generated visual content.',
			date: '2026-02-25',
			category: 'Ethics',
			readTime: '7 min',
		},
	];
</script>

<svelte:head>
	<title>Blog - CreativeLens</title>
	<meta name="description" content="AI education, prompt engineering guides, trend analysis, and creative intelligence insights from the CreativeLens team." />
</svelte:head>

<div class="blog-page">
	<div class="container">
		<div class="page-header">
			<h1>CreativeLens Blog</h1>
			<p>AI education, prompt engineering, trend analysis, and creative intelligence insights.</p>
		</div>

		<div class="posts-grid">
			{#each posts as post}
				<article class="post-card card">
					<div class="post-thumb"></div>
					<div class="post-body">
						<div class="post-meta">
							<span class="post-category badge">{post.category}</span>
							<span class="post-date">{post.date}</span>
						</div>
						<h3>{post.title}</h3>
						<p>{post.excerpt}</p>
						<div class="post-footer">
							<span class="read-time">{post.readTime} read</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>

<style>
	.blog-page {
		padding: 2rem 0;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		margin-bottom: 0.25rem;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.post-card {
		padding: 0;
		overflow: hidden;
	}

	.post-thumb {
		height: 180px;
		background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));
	}

	.post-body {
		padding: 1.25rem;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.post-date {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.post-body h3 {
		font-size: 1.05rem;
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.post-body p {
		font-size: 0.85rem;
		line-height: 1.5;
	}

	.post-footer {
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border);
	}

	.read-time {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
