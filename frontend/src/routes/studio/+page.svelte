<script>
	let dragOver = false;
	let uploadedFile = null;
	let analyzing = false;
	let analysisResult = null;

	function handleDrop(e) {
		e.preventDefault();
		dragOver = false;
		const file = e.dataTransfer?.files[0];
		if (file && file.type.startsWith('image/')) {
			uploadedFile = file;
		}
	}

	function handleFileInput(e) {
		const file = e.target?.files[0];
		if (file) {
			uploadedFile = file;
		}
	}

	async function analyzeImage() {
		if (!uploadedFile) return;
		analyzing = true;

		// Simulated analysis delay
		await new Promise(resolve => setTimeout(resolve, 2000));

		analysisResult = {
			detected_prompt: 'A cyberpunk fashion model wearing neon-lit techwear jacket, standing in a rain-soaked Tokyo alley, cinematic lighting, high detail, 8k resolution',
			detected_style: ['Cyberpunk', 'Techwear', 'Cinematic', 'Urban'],
			detected_model: 'Stable Diffusion XL',
			suggested_settings: {
				steps: 30,
				cfg_scale: 7.5,
				sampler: 'DPM++ 2M Karras',
				seed: null,
			},
			confidence: 0.82,
			suggested_niches: ['Neon Streetwear', 'Techwear', 'Dystopian Chic'],
		};
		analyzing = false;
	}

	function clearUpload() {
		uploadedFile = null;
		analysisResult = null;
	}
</script>

<svelte:head>
	<title>Studio - CreativeLens</title>
	<meta name="description" content="Upload any AI-generated image and let CreativeLens reverse-engineer the prompt, model settings, and style tags." />
</svelte:head>

<div class="studio-page">
	<div class="container">
		<div class="section-header" style="text-align: center;">
			<h1>Creative Studio</h1>
			<p>Upload an image and let AI reverse-engineer the prompt, model, and style behind it.</p>
		</div>

		<div class="studio-layout">
			<div class="upload-panel card">
				{#if !uploadedFile}
					<div
						class="drop-zone"
						class:drag-over={dragOver}
						on:dragover|preventDefault={() => (dragOver = true)}
						on:dragleave={() => (dragOver = false)}
						on:drop={handleDrop}
						role="button"
						tabindex="0"
					>
						<div class="drop-icon">U</div>
						<h3>Drop an image here</h3>
						<p>or click to browse. Supports PNG, JPG, WebP up to 15MB.</p>
						<label class="btn btn-primary upload-btn">
							Choose File
							<input type="file" accept="image/*" on:change={handleFileInput} hidden />
						</label>
					</div>
				{:else}
					<div class="uploaded-preview">
						<div class="preview-placeholder">
							<span>{uploadedFile.name}</span>
							<span class="file-size">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
						</div>
						<div class="preview-actions">
							{#if !analyzing}
								<button class="btn btn-primary" on:click={analyzeImage}>Analyze Image</button>
								<button class="btn btn-secondary" on:click={clearUpload}>Remove</button>
							{:else}
								<div class="analyzing-state">
									<div class="spinner"></div>
									<span>Analyzing image...</span>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<div class="results-panel">
				{#if analysisResult}
					<div class="result-section card">
						<h3>Detected Prompt</h3>
						<div class="prompt-box">
							<p class="prompt-text">{analysisResult.detected_prompt}</p>
							<button class="btn btn-ghost btn-sm">Copy</button>
						</div>
						<div class="confidence">
							<span>Confidence: {Math.round(analysisResult.confidence * 100)}%</span>
							<div class="confidence-bar">
								<div class="confidence-fill" style="width: {analysisResult.confidence * 100}%"></div>
							</div>
						</div>
					</div>

					<div class="result-section card">
						<h3>Style Tags</h3>
						<div class="tags">
							{#each analysisResult.detected_style as tag}
								<span class="badge">{tag}</span>
							{/each}
						</div>
					</div>

					<div class="result-section card">
						<h3>Model &amp; Settings</h3>
						<div class="settings-grid">
							<div class="setting">
								<span class="setting-label">Model</span>
								<span class="setting-value">{analysisResult.detected_model}</span>
							</div>
							<div class="setting">
								<span class="setting-label">Steps</span>
								<span class="setting-value">{analysisResult.suggested_settings.steps}</span>
							</div>
							<div class="setting">
								<span class="setting-label">CFG Scale</span>
								<span class="setting-value">{analysisResult.suggested_settings.cfg_scale}</span>
							</div>
							<div class="setting">
								<span class="setting-label">Sampler</span>
								<span class="setting-value">{analysisResult.suggested_settings.sampler}</span>
							</div>
						</div>
					</div>

					<div class="result-section card">
						<h3>Suggested Niches</h3>
						<div class="tags">
							{#each analysisResult.suggested_niches as niche}
								<a href="/niches/{niche.toLowerCase().replace(/ /g, '-')}" class="badge">{niche}</a>
							{/each}
						</div>
					</div>
				{:else if !uploadedFile}
					<div class="results-placeholder card">
						<p>Upload an image to see prompt analysis, detected styles, model predictions, and niche suggestions.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.studio-page {
		padding: 2rem 0;
	}

	.studio-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.drop-zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-md);
		text-align: center;
		cursor: pointer;
		transition: all var(--transition);
	}

	.drop-zone.drag-over {
		border-color: var(--color-accent);
		background: var(--color-accent-dim);
	}

	.drop-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--radius-md);
		background: var(--color-accent-dim);
		color: var(--color-accent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 800;
		margin-bottom: 1rem;
	}

	.drop-zone h3 {
		margin-bottom: 0.25rem;
	}

	.drop-zone p {
		font-size: 0.875rem;
		margin-bottom: 1.5rem;
	}

	.uploaded-preview {
		padding: 2rem;
		text-align: center;
	}

	.preview-placeholder {
		aspect-ratio: 4/3;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		color: var(--color-text-secondary);
	}

	.file-size {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.preview-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
	}

	.analyzing-state {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-accent);
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid var(--color-border);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.results-panel {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-section h3 {
		font-size: 1rem;
		margin-bottom: 0.75rem;
	}

	.prompt-box {
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		padding: 1rem;
		position: relative;
	}

	.prompt-text {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--color-text);
		line-height: 1.6;
	}

	.prompt-box .btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}

	.confidence {
		margin-top: 0.75rem;
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.confidence-bar {
		height: 4px;
		background: var(--color-bg-tertiary);
		border-radius: 2px;
		margin-top: 0.5rem;
		overflow: hidden;
	}

	.confidence-fill {
		height: 100%;
		background: var(--color-accent);
		border-radius: 2px;
		transition: width 0.5s ease;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.settings-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.setting {
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		padding: 0.75rem;
	}

	.setting-label {
		display: block;
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-bottom: 0.25rem;
	}

	.setting-value {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.results-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		text-align: center;
	}

	.results-placeholder p {
		max-width: 280px;
	}

	@media (max-width: 768px) {
		.studio-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
