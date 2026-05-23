<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let loading = true;
	let saving = false;
	let error = '';
	let success = '';

	let username = '';
	let bio = '';
	let avatarUrl = '';
	let bannerUrl = '';
	let twitterHandle = '';
	let websiteUrl = '';
	let isPublic = true;

	let myImages = [];
	let bannerPins = [null, null, null];

	onMount(async () => {
		try {
			const res = await api.get('/auth/me');
			if (res.data) {
				const profile = res.data;
				username = profile.username || '';
				bio = profile.bio || '';
				avatarUrl = profile.avatar_url || '';
				bannerUrl = profile.banner_url || '';
				twitterHandle = profile.twitter_handle || '';
				websiteUrl = profile.website_url || '';
				isPublic = profile.is_public !== false;
			}
		} catch (err) {
			error = 'Failed to load profile. Please log in.';
		}

		try {
			const imgRes = await api.get('/images?limit=50&sort=recent');
			if (imgRes.data) myImages = imgRes.data.images || [];
		} catch (e) {}

		loading = false;
	});

	async function saveProfile() {
		saving = true;
		error = '';
		success = '';
		try {
			await api.put('/profiles', {
				username,
				bio,
				avatar_url: avatarUrl || undefined,
				banner_url: bannerUrl || undefined,
				twitter_handle: twitterHandle || undefined,
				website_url: websiteUrl || undefined,
				is_public: isPublic,
			});
			success = 'Profile saved successfully.';
		} catch (err) {
			error = err.error || 'Failed to save profile.';
		}
		saving = false;
	}

	async function saveBannerPins() {
		saving = true;
		error = '';
		success = '';
		try {
			const pins = bannerPins
				.map((img, i) => img ? { image_id: img.id, position: i } : null)
				.filter(Boolean);
			await api.post('/profiles/banner-pins', { pins });
			success = 'Banner pins updated.';
		} catch (err) {
			error = err.error || 'Failed to update banner pins.';
		}
		saving = false;
	}

	function selectPin(position, image) {
		bannerPins[position] = image;
		bannerPins = [...bannerPins];
	}

	function removePin(position) {
		bannerPins[position] = null;
		bannerPins = [...bannerPins];
	}
</script>

<svelte:head>
	<title>Edit Profile - CreativeLens</title>
</svelte:head>

<div class="settings-page">
	<div class="container">
		<div class="settings-header">
			<h1>Edit Profile</h1>
			<p>Customize your public CreativeLens profile.</p>
		</div>

		{#if loading}
			<div class="loading-state card">
				<div class="spinner"></div>
				<p>Loading profile...</p>
			</div>
		{:else}
			{#if error}
				<div class="error-banner">{error}</div>
			{/if}
			{#if success}
				<div class="success-banner">{success}</div>
			{/if}

			<form on:submit|preventDefault={saveProfile} class="profile-form">
				<div class="form-grid">
					<div class="form-section card">
						<h3>Basic Information</h3>
						<div class="form-group">
							<label for="username">Username</label>
							<input type="text" id="username" bind:value={username} placeholder="your-username" pattern="[a-zA-Z0-9_-]+" maxlength="50" />
							<span class="form-hint">Letters, numbers, hyphens, and underscores only. This forms your profile URL.</span>
						</div>
						<div class="form-group">
							<label for="bio">Bio</label>
							<textarea id="bio" bind:value={bio} rows="4" placeholder="Tell the world about your creative work..." maxlength="500"></textarea>
							<span class="form-hint">{bio.length}/500</span>
						</div>
						<div class="form-group">
							<label>
								<input type="checkbox" bind:checked={isPublic} />
								Make profile public
							</label>
						</div>
					</div>

					<div class="form-section card">
						<h3>Avatar and Banner</h3>
						<div class="form-group">
							<label for="avatar">Avatar URL</label>
							<input type="url" id="avatar" bind:value={avatarUrl} placeholder="https://..." />
							{#if avatarUrl}
								<div class="preview-thumb">
									<img src={avatarUrl} alt="Avatar preview" />
								</div>
							{/if}
						</div>
						<div class="form-group">
							<label for="banner">Banner URL</label>
							<input type="url" id="banner" bind:value={bannerUrl} placeholder="https://..." />
							{#if bannerUrl}
								<div class="preview-banner">
									<img src={bannerUrl} alt="Banner preview" />
								</div>
							{/if}
						</div>
					</div>

					<div class="form-section card">
						<h3>Social Links</h3>
						<div class="form-group">
							<label for="twitter">Twitter / X Handle</label>
							<input type="text" id="twitter" bind:value={twitterHandle} placeholder="@yourhandle" maxlength="100" />
						</div>
						<div class="form-group">
							<label for="website">Website URL</label>
							<input type="url" id="website" bind:value={websiteUrl} placeholder="https://yourwebsite.com" />
						</div>
					</div>

					<div class="form-section card">
						<h3>Banner Pins (Top 3 Works)</h3>
						<p class="section-desc">Select up to 3 images to showcase on your profile banner.</p>
						<div class="pin-slots">
							{#each bannerPins as pin, i}
								<div class="pin-slot">
									{#if pin}
										<div class="pin-preview">
											<div class="pin-thumb" style="background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));"></div>
											<span class="pin-title">{pin.title || 'Image'}</span>
											<button type="button" class="btn btn-ghost btn-sm" on:click={() => removePin(i)}>Remove</button>
										</div>
									{:else}
										<div class="pin-empty">
											<span>Pin {i + 1}</span>
											<span class="pin-hint">Select an image</span>
										</div>
									{/if}
								</div>
							{/each}
						</div>
						{#if myImages.length > 0}
							<div class="pin-picker">
								<h4>Your Images</h4>
								<div class="pin-grid">
									{#each myImages as img}
										<button type="button" class="pin-option" on:click={() => {
											const emptySlot = bannerPins.findIndex(p => p === null);
											if (emptySlot >= 0) selectPin(emptySlot, img);
										}}>
											<div class="pin-option-thumb"></div>
											<span>{img.title || 'Untitled'}</span>
										</button>
									{/each}
								</div>
							</div>
						{/if}
						<button type="button" class="btn btn-secondary" on:click={saveBannerPins} disabled={saving} style="margin-top: 1rem;">
							{saving ? 'Saving...' : 'Save Banner Pins'}
						</button>
					</div>
				</div>

				<div class="form-actions">
					<button type="submit" class="btn btn-primary btn-lg" disabled={saving}>
						{saving ? 'Saving...' : 'Save Profile'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.settings-page { padding: 2rem 0; }
	.settings-header { margin-bottom: 2rem; }
	.settings-header h1 { margin-bottom: 0.25rem; }

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-section h3 { font-size: 1.1rem; margin-bottom: 1rem; }

	.form-group { margin-bottom: 1rem; }
	.form-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; }
	.form-group input[type="text"],
	.form-group input[type="url"],
	.form-group textarea { width: 100%; }
	.form-hint { font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.25rem; display: block; }

	.preview-thumb { margin-top: 0.5rem; }
	.preview-thumb img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
	.preview-banner { margin-top: 0.5rem; }
	.preview-banner img { width: 100%; height: 120px; border-radius: var(--radius-sm); object-fit: cover; }

	.section-desc { font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1rem; }

	.pin-slots { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
	.pin-slot { flex: 1; min-height: 100px; border: 2px dashed var(--color-border); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; }
	.pin-empty { text-align: center; padding: 1rem; color: var(--color-text-muted); font-size: 0.85rem; }
	.pin-hint { display: block; font-size: 0.75rem; margin-top: 0.25rem; }
	.pin-preview { text-align: center; padding: 0.75rem; }
	.pin-thumb { width: 60px; height: 60px; border-radius: var(--radius-sm); margin: 0 auto 0.5rem; }
	.pin-title { font-size: 0.8rem; display: block; margin-bottom: 0.25rem; }

	.pin-picker { margin-top: 1rem; }
	.pin-picker h4 { font-size: 0.9rem; margin-bottom: 0.5rem; }
	.pin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem; }
	.pin-option { background: var(--color-bg-tertiary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 0.5rem; text-align: center; font-size: 0.7rem; color: var(--color-text-secondary); }
	.pin-option:hover { border-color: var(--color-accent); }
	.pin-option-thumb { width: 100%; aspect-ratio: 1; background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover)); border-radius: 4px; margin-bottom: 0.25rem; }

	.form-actions { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }

	.error-banner { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--color-error); padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1rem; }
	.success-banner { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--color-success); padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1rem; }

	.loading-state { text-align: center; padding: 4rem 2rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) {
		.form-grid { grid-template-columns: 1fr; }
		.pin-slots { flex-direction: column; }
	}
</style>
