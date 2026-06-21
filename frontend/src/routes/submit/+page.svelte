<script>
	let title = '';
	let description = '';
	let prompt = '';
	let negativePrompt = '';
	let aiModel = '';
	let selectedTags = [];
	let file = null;
	let submitting = false;
	let submitted = false;

	const MAX_TAGS = 23;
	const MAX_FILE_SIZE_MB = 15;

	const aiModels = [
		'Stable Diffusion XL', 'Stable Diffusion 1.5', 'Midjourney v6', 'Midjourney v5',
		'DALL-E 3', 'Flux Dev', 'Flux Schnell', 'Leonardo AI', 'Playground v2.5',
		'Adobe Firefly', 'Ideogram', 'Other',
	];

	const availableTags = [
		'Neo-Gothic Couture', 'Neon Streetwear', 'Techwear', 'Deconstructed Fashion',
		'Wearable Art', 'VTuber Character Design', 'Stream Overlays', 'Gaming HUD Overlays',
		'YouTube Thumbnails', 'Avant-Garde Makeup', 'Cybernetic Beauty', 'Character Concept Sheets',
		'Environment Concepts', 'Social Ad Visuals', 'Product Photography AI', 'Virtual Influencer Profiles',
		'Cyberpunk Jewelry', 'Gothic Silverwork', 'Anime Companion Design', 'Fantasy Hair Color',
		'Elven Couture', 'Dystopian Chic', 'Solarpunk Wear',
	];

	function toggleTag(tag) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else if (selectedTags.length < MAX_TAGS) {
			selectedTags = [...selectedTags, tag];
		}
	}

	function handleFile(e) {
		const f = e.target?.files[0];
		if (f) {
			if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				alert(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
				return;
			}
			file = f;
		}
	}

	async function handleSubmit() {
		if (!title || !file || selectedTags.length === 0) return;

		submitting = true;
		// Simulated API call
		await new Promise(r => setTimeout(r, 1500));
		submitted = true;
		submitting = false;
	}
</script>

<svelte:head>
	<title>Submit Your Work - CreativeLens</title>
	<meta name="description" content="Submit your AI-generated creative work to CreativeLens. Tag up to 23 niches and get featured in our curated gallery." />
</svelte:head>

<div class="submit-page">
	<div class="container">
		{#if submitted}
			<div class="success-state">
				<div class="success-icon">S</div>
				<h1>Submission Received</h1>
				<p>Your image has been submitted for review. Our team will evaluate it and you will be notified once it is approved and featured in the gallery.</p>
				<div class="success-actions">
					<button class="btn btn-primary" on:click={() => { submitted = false; title = ''; file = null; selectedTags = []; }}>Submit Another</button>
					<a href="/gallery" class="btn btn-secondary">Browse Gallery</a>
				</div>
			</div>
		{:else}
			<div class="page-header">
				<h1>Submit Your Work</h1>
				<p>Share your AI-generated creative content with the CreativeLens community. Tag up to 23 niches per submission.</p>
			</div>

			<form class="submit-form" on:submit|preventDefault={handleSubmit}>
				<div class="form-grid">
					<div class="form-left">
						<div class="form-group">
							<label for="file">Image File <span class="required">*</span></label>
							<div class="file-upload">
								{#if file}
									<div class="file-info">
										<span>{file.name}</span>
										<span class="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
										<button type="button" class="btn btn-ghost btn-sm" on:click={() => (file = null)}>Remove</button>
									</div>
								{:else}
									<label class="file-label">
										<span>Choose image file (PNG, JPG, WebP)</span>
										<span class="file-limit">Max {MAX_FILE_SIZE_MB}MB</span>
										<input type="file" accept="image/png,image/jpeg,image/webp" on:change={handleFile} hidden />
									</label>
								{/if}
							</div>
						</div>

						<div class="form-group">
							<label for="title">Title <span class="required">*</span></label>
							<input type="text" id="title" bind:value={title} placeholder="Give your image a descriptive title" maxlength="255" required />
						</div>

						<div class="form-group">
							<label for="description">Description</label>
							<textarea id="description" bind:value={description} rows="3" placeholder="Describe your creative process or the concept behind this image" maxlength="2000"></textarea>
						</div>

						<div class="form-group">
							<label for="prompt">Prompt</label>
							<textarea id="prompt" bind:value={prompt} rows="4" placeholder="The prompt used to generate this image"></textarea>
						</div>

						<div class="form-group">
							<label for="negative-prompt">Negative Prompt</label>
							<textarea id="negative-prompt" bind:value={negativePrompt} rows="2" placeholder="Negative prompt (if applicable)"></textarea>
						</div>

						<div class="form-group">
							<label for="model">AI Model</label>
							<select id="model" bind:value={aiModel}>
								<option value="">Select AI model used</option>
								{#each aiModels as model}
									<option value={model}>{model}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="form-right">
						<div class="form-group">
							<label>Niche Tags <span class="required">*</span> <span class="tag-count">({selectedTags.length}/{MAX_TAGS})</span></label>
							<p class="form-hint">Select niches that match your image. At least 1 required, up to {MAX_TAGS} allowed.</p>
							<div class="tag-grid">
								{#each availableTags as tag}
									<button
										type="button"
										class="tag-chip"
										class:selected={selectedTags.includes(tag)}
										on:click={() => toggleTag(tag)}
										disabled={!selectedTags.includes(tag) && selectedTags.length >= MAX_TAGS}
									>
										{tag}
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<div class="form-footer">
					<p class="form-terms">By submitting, you confirm this is your original AI-generated work and agree to our <a href="/terms">Terms of Service</a>.</p>
					<button type="submit" class="btn btn-primary btn-lg" disabled={!title || !file || selectedTags.length === 0 || submitting}>
						{submitting ? 'Submitting...' : 'Submit for Review'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.submit-page {
		padding: 2rem 0;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		margin-bottom: 0.25rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}

	.required {
		color: var(--color-accent);
	}

	.tag-count {
		font-weight: 400;
		color: var(--color-text-muted);
		font-size: 0.8rem;
	}

	.form-hint {
		font-size: 0.8rem;
		margin-bottom: 0.75rem;
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		width: 100%;
	}

	.file-upload {
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: 1.5rem;
	}

	.file-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		cursor: pointer;
		text-align: center;
		color: var(--color-text-secondary);
	}

	.file-limit {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.file-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.file-size {
		color: var(--color-text-muted);
		font-size: 0.85rem;
	}

	.tag-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag-chip {
		padding: 0.35rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		background: var(--color-bg-tertiary);
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border);
	}

	.tag-chip:hover:not(:disabled) {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.tag-chip.selected {
		background: var(--color-accent-dim);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.tag-chip:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.form-footer {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.form-terms {
		font-size: 0.8rem;
		max-width: 400px;
	}

	.success-state {
		text-align: center;
		padding: 6rem 2rem;
	}

	.success-icon {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: rgba(16, 185, 129, 0.15);
		color: var(--color-success);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.75rem;
		font-weight: 800;
		margin-bottom: 1.25rem;
	}

	.success-state p {
		max-width: 480px;
		margin: 0.75rem auto 1.5rem;
	}

	.success-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		.form-footer {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
