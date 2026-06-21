<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/api.ts';

	$: username = $page.params.username;

	let loading = true;
	let error = '';
	let profile = null;
	let images = [];
	let bannerPins = [];

	$: if (username) loadProfile();

	async function loadProfile() {
		loading = true;
		error = '';
		try {
			const res = await api.get(`/profiles/${username}`);
			if (res.data) {
				profile = res.data;
				images = res.data.images || [];
				bannerPins = res.data.banner_pins || [];
			}
		} catch (err) {
			if (err.status === 404) {
				error = 'Profile not found.';
			} else {
				error = 'Failed to load profile.';
			}
		}
		loading = false;
	}

	function tierBadge(plan) {
		if (plan === 'agency') return 'Agency';
		if (plan === 'pro') return 'Pro';
		return '';
	}
</script>

<svelte:head>
	<title>{username ? `@${username}` : 'Profile'} - CreativeLens</title>
</svelte:head>

<div class="profile-page">
	{#if loading}
		<div class="container">
			<div class="loading-state">
				<div class="spinner"></div>
				<p>Loading profile...</p>
			</div>
		</div>
	{:else if error}
		<div class="container">
			<div class="error-state card">
				<h2>Profile Not Found</h2>
				<p>{error}</p>
				<a href="/gallery" class="btn btn-primary">Browse Gallery</a>
			</div>
		</div>
	{:else if profile}
		<div class="profile-banner" style={profile.banner_url ? `background-image: url(${profile.banner_url})` : ''}>
			<div class="banner-overlay"></div>
			{#if bannerPins.length > 0}
				<div class="banner-pins">
					{#each bannerPins as pin}
						<div class="banner-pin">
							<div class="pin-img" style="background: linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3));"></div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="container">
			<div class="profile-header">
				<div class="avatar-section">
					{#if profile.avatar_url}
						<img src={profile.avatar_url} alt={username} class="avatar" />
					{:else}
						<div class="avatar avatar-placeholder">
							{username.charAt(0).toUpperCase()}
						</div>
					{/if}
				</div>
				<div class="profile-info">
					<div class="name-row">
						<h1>@{username}</h1>
						{#if tierBadge(profile.plan)}
							<span class="tier-badge">{tierBadge(profile.plan)}</span>
						{/if}
					</div>
					{#if profile.bio}
						<p class="bio">{profile.bio}</p>
					{/if}
					<div class="profile-links">
						{#if profile.twitter_handle}
							<a href="https://twitter.com/{profile.twitter_handle.replace('@', '')}" target="_blank" class="social-link">Twitter</a>
						{/if}
						{#if profile.website_url}
							<a href={profile.website_url} target="_blank" class="social-link">Website</a>
						{/if}
					</div>
					<div class="profile-stats">
						<div class="stat">
							<span class="stat-value">{profile.stats?.image_count || 0}</span>
							<span class="stat-label">Images</span>
						</div>
						<div class="stat">
							<span class="stat-value">{profile.stats?.like_count || 0}</span>
							<span class="stat-label">Likes</span>
						</div>
						<div class="stat">
							<span class="stat-value">{profile.stats?.view_count || 0}</span>
							<span class="stat-label">Views</span>
						</div>
					</div>
				</div>
			</div>

			<div class="portfolio-section">
				<h2>Portfolio</h2>
				{#if images.length > 0}
					<div class="masonry-grid">
						{#each images as image}
							<div class="portfolio-item card">
								<div class="item-thumb" style="background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-hover));"></div>
								<div class="item-info">
									<h4>{image.title || 'Untitled'}</h4>
									{#if image.ai_model}
										<span class="item-model">{image.ai_model}</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="empty-portfolio card">
						<p>No public images yet.</p>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.profile-page { padding-bottom: 2rem; }

	.profile-banner {
		height: 240px;
		background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.15));
		background-size: cover;
		background-position: center;
		position: relative;
	}
	.banner-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%); }

	.banner-pins { position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.75rem; z-index: 2; }
	.banner-pin { width: 100px; height: 100px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid rgba(255,255,255,0.2); }
	.pin-img { width: 100%; height: 100%; }

	.profile-header { display: flex; gap: 2rem; margin-top: -3rem; position: relative; z-index: 3; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border); margin-bottom: 2rem; }

	.avatar { width: 96px; height: 96px; border-radius: 50%; border: 3px solid var(--color-bg); object-fit: cover; }
	.avatar-placeholder { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--color-accent), #a855f7); color: white; font-size: 2rem; font-weight: 800; }

	.name-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
	.name-row h1 { font-size: 1.75rem; }
	.tier-badge { padding: 0.2rem 0.625rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; background: linear-gradient(135deg, var(--color-accent), #a855f7); color: white; }

	.bio { font-size: 0.95rem; color: var(--color-text-secondary); max-width: 500px; margin-bottom: 0.75rem; }

	.profile-links { display: flex; gap: 1rem; margin-bottom: 1rem; }
	.social-link { font-size: 0.85rem; color: var(--color-accent); font-weight: 500; }

	.profile-stats { display: flex; gap: 2rem; }
	.stat { display: flex; flex-direction: column; }
	.stat-value { font-size: 1.25rem; font-weight: 800; }
	.stat-label { font-size: 0.75rem; color: var(--color-text-muted); }

	.portfolio-section h2 { margin-bottom: 1.25rem; }

	.masonry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
	.portfolio-item { padding: 0; overflow: hidden; }
	.item-thumb { aspect-ratio: 3/4; }
	.item-info { padding: 0.75rem; }
	.item-info h4 { font-size: 0.85rem; margin-bottom: 0.2rem; }
	.item-model { font-size: 0.75rem; color: var(--color-text-muted); }

	.empty-portfolio { text-align: center; padding: 3rem 2rem; }
	.error-state { text-align: center; padding: 4rem 2rem; }
	.error-state h2 { margin-bottom: 0.5rem; }
	.error-state p { margin-bottom: 1.5rem; }

	.loading-state { text-align: center; padding: 6rem 2rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) {
		.profile-header { flex-direction: column; align-items: center; text-align: center; margin-top: -2rem; }
		.profile-stats { justify-content: center; }
		.profile-links { justify-content: center; }
		.masonry-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
	}
</style>
