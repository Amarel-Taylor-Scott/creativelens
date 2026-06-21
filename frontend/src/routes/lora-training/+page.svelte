<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let userPlan = 'free';
	let files = [];
	let trainingName = '';
	let baseModel = 'sdxl';
	let steps = 1000;
	let estimatedCost = 0;
	let isTraining = false;
	let trainingStatus = null;

	onMount(async () => {
		try {
			const res = await api.get('/auth/me');
			if (res.data) userPlan = res.data.plan || 'free';
		} catch (e) {}
	});

	function handleFiles(e) {
		const newFiles = Array.from(e.target.files || []);
		files = [...files, ...newFiles].slice(0, 30);
		updateCostEstimate();
	}

	function removeFile(index) {
		files = files.filter((_, i) => i !== index);
		updateCostEstimate();
	}

	function updateCostEstimate() {
		const imageCount = files.length;
		const stepMultiplier = steps / 1000;
		estimatedCost = Math.max(0.50, imageCount * 0.15 * stepMultiplier).toFixed(2);
	}

	async function startTraining() {
		if (userPlan !== 'agency') return;
		if (!trainingName || files.length < 5) return;
		isTraining = true;
		trainingStatus = { stage: 'uploading', progress: 0 };

		// Simulate training progress
		for (let i = 0; i <= 100; i += 10) {
			await new Promise(r => setTimeout(r, 500));
			if (i < 30) trainingStatus = { stage: 'uploading', progress: i };
			else if (i < 70) trainingStatus = { stage: 'training', progress: i };
			else trainingStatus = { stage: 'finalizing', progress: i };
		}

		trainingStatus = { stage: 'complete', progress: 100 };
		isTraining = false;
	}

	$: isBusinessGated = userPlan !== 'agency';
</script>

<svelte:head>
	<title>LoRA Training - CreativeLens</title>
	<meta name="description" content="Train custom LoRA models on your images using Replicate. Business plan feature for consistent AI character and style generation." />
</svelte:head>

<div class="lora-page">
	<div class="container">
		<div class="page-header">
			<span class="badge">Business Feature</span>
			<h1>LoRA Training Studio</h1>
			<p>Train custom LoRA models to generate consistent characters, styles, and brand aesthetics. Powered by Replicate.</p>
		</div>

		{#if isBusinessGated}
			<div class="gate-card card">
				<div class="gate-icon">L</div>
				<h2>Agency Plan Required</h2>
				<p>LoRA training is available exclusively on the Agency plan. Train custom models to maintain character consistency, brand aesthetics, and unique styles across all your AI-generated content.</p>
				<div class="gate-features">
					<div class="gate-feature">
						<h4>Character Consistency</h4>
						<p>Train on your AI character to generate new poses, outfits, and scenes with the same face and style.</p>
					</div>
					<div class="gate-feature">
						<h4>Brand Style Transfer</h4>
						<p>Upload your brand's visual identity to generate on-brand content automatically.</p>
					</div>
					<div class="gate-feature">
						<h4>Pay-Per-Training</h4>
						<p>No monthly LoRA fee. Pay only when you train, starting from $0.50 per session.</p>
					</div>
				</div>
				<a href="/pricing" class="btn btn-primary btn-lg">Upgrade to Agency - $79/mo</a>
			</div>
		{:else}
			<div class="training-layout">
				<div class="training-form card">
					<h3>New Training Job</h3>

					<div class="form-group">
						<label for="name">Model Name</label>
						<input type="text" id="name" bind:value={trainingName} placeholder="e.g., my-character-v1" maxlength="100" />
					</div>

					<div class="form-group">
						<label for="base">Base Model</label>
						<select id="base" bind:value={baseModel} on:change={updateCostEstimate}>
							<option value="sdxl">Stable Diffusion XL</option>
							<option value="sd15">Stable Diffusion 1.5</option>
							<option value="flux">Flux Dev</option>
						</select>
					</div>

					<div class="form-group">
						<label for="steps">Training Steps</label>
						<input type="range" id="steps" bind:value={steps} min="500" max="5000" step="100" on:input={updateCostEstimate} />
						<span class="range-value">{steps} steps</span>
					</div>

					<div class="form-group">
						<label>Training Images ({files.length}/30)</label>
						<div class="file-upload-zone">
							{#if files.length > 0}
								<div class="file-list">
									{#each files as file, i}
										<div class="file-item">
											<span>{file.name}</span>
											<button type="button" class="btn btn-ghost btn-sm" on:click={() => removeFile(i)}>x</button>
										</div>
									{/each}
								</div>
							{/if}
							<label class="add-files-btn">
								<span>{files.length === 0 ? 'Upload 5-30 training images' : 'Add more images'}</span>
								<input type="file" accept="image/*" multiple on:change={handleFiles} hidden />
							</label>
						</div>
						<span class="form-hint">Minimum 5 images. Consistent subject, varied angles/lighting recommended.</span>
					</div>

					<div class="cost-estimate">
						<span class="cost-label">Estimated Cost</span>
						<span class="cost-value">${estimatedCost}</span>
					</div>

					{#if trainingStatus}
						<div class="training-progress">
							<div class="progress-bar">
								<div class="progress-fill" style="width: {trainingStatus.progress}%"></div>
							</div>
							<span class="progress-text">
								{trainingStatus.stage === 'uploading' ? 'Uploading images...' :
								 trainingStatus.stage === 'training' ? 'Training model...' :
								 trainingStatus.stage === 'finalizing' ? 'Finalizing...' :
								 'Training complete!'}
								{trainingStatus.progress}%
							</span>
						</div>
					{/if}

					<button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" on:click={startTraining} disabled={isTraining || !trainingName || files.length < 5}>
						{isTraining ? 'Training...' : 'Start Training'}
					</button>
				</div>

				<div class="training-info">
					<div class="info-card card">
						<h4>How LoRA Training Works</h4>
						<ol>
							<li>Upload 5-30 images of your subject with consistent quality</li>
							<li>Choose a base model and training parameters</li>
							<li>Our system fine-tunes a LoRA adapter on Replicate's GPU infrastructure</li>
							<li>Download your trained model weights or use directly in the Studio</li>
						</ol>
					</div>
					<div class="info-card card">
						<h4>Best Practices</h4>
						<ul>
							<li>Use high-resolution, well-lit images</li>
							<li>Include variety in angles, expressions, and poses</li>
							<li>Keep the subject consistent across all images</li>
							<li>More steps = better quality but higher cost</li>
							<li>1000 steps is a good starting point</li>
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.lora-page { padding: 2rem 0; }
	.page-header { margin-bottom: 2rem; }
	.page-header h1 { margin: 0.5rem 0 0.25rem; }

	.gate-card { text-align: center; padding: 4rem 2rem; }
	.gate-icon { width: 64px; height: 64px; border-radius: var(--radius-md); background: var(--color-accent-dim); color: var(--color-accent); display: inline-flex; align-items: center; justify-content: center; font-size: 1.75rem; font-weight: 800; margin-bottom: 1.25rem; }
	.gate-card h2 { margin-bottom: 0.5rem; }
	.gate-card > p { max-width: 560px; margin: 0 auto 2rem; font-size: 0.95rem; }
	.gate-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem; text-align: left; }
	.gate-feature { padding: 1rem; background: var(--color-bg-tertiary); border-radius: var(--radius-sm); }
	.gate-feature h4 { font-size: 0.95rem; margin-bottom: 0.25rem; }
	.gate-feature p { font-size: 0.8rem; }

	.training-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
	.training-form h3 { font-size: 1.1rem; margin-bottom: 1.25rem; }

	.form-group { margin-bottom: 1.25rem; }
	.form-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; }
	.form-group input[type="text"], .form-group select { width: 100%; }
	.form-group input[type="range"] { width: 100%; }
	.range-value { font-size: 0.85rem; color: var(--color-accent); font-weight: 600; }
	.form-hint { font-size: 0.75rem; color: var(--color-text-muted); display: block; margin-top: 0.25rem; }

	.file-upload-zone { border: 2px dashed var(--color-border); border-radius: var(--radius-sm); padding: 1rem; }
	.file-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; }
	.file-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.5rem; background: var(--color-bg-tertiary); border-radius: 4px; font-size: 0.75rem; }
	.add-files-btn { display: block; text-align: center; padding: 0.75rem; cursor: pointer; color: var(--color-text-secondary); font-size: 0.85rem; }

	.cost-estimate { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--color-bg-tertiary); border-radius: var(--radius-sm); }
	.cost-label { font-size: 0.9rem; color: var(--color-text-secondary); }
	.cost-value { font-size: 1.5rem; font-weight: 800; color: var(--color-accent); }

	.training-progress { margin-top: 1rem; }
	.progress-bar { height: 8px; background: var(--color-bg-tertiary); border-radius: 4px; overflow: hidden; }
	.progress-fill { height: 100%; background: var(--color-accent); border-radius: 4px; transition: width 0.3s; }
	.progress-text { font-size: 0.8rem; color: var(--color-text-secondary); margin-top: 0.5rem; display: block; }

	.info-card { margin-bottom: 1rem; }
	.info-card h4 { font-size: 0.95rem; margin-bottom: 0.75rem; }
	.info-card ol, .info-card ul { padding-left: 1.25rem; }
	.info-card li { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.35rem; }

	.btn-lg { padding: 0.8rem 1.75rem; font-size: 1rem; }

	@media (max-width: 768px) { .training-layout { grid-template-columns: 1fr; } .gate-features { grid-template-columns: 1fr; } }
</style>
