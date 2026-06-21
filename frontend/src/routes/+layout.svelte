<script>
	import '../app.css';
	import { onMount } from 'svelte';

	let mobileMenuOpen = false;
	let moreOpen = false;
	let userMenuOpen = false;
	let user = null;

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/studio', label: 'Studio' },
		{ href: '/niches', label: 'Niches' },
		{ href: '/categories', label: 'Categories' },
		{ href: '/pricing', label: 'Pricing' },
	];

	const moreLinks = [
		{ href: '/blog', label: 'Blog' },
		{ href: '/extensions', label: 'Extensions' },
		{ href: '/kit', label: 'Influencer Kit' },
		{ href: '/for-marketers', label: 'For Marketers' },
		{ href: '/stats', label: 'Stats' },
		{ href: '/api/docs', label: 'API Docs' },
	];

	const userLinks = [
		{ href: '/settings/profile', label: 'Profile Settings' },
		{ href: '/boards', label: 'My Boards' },
		{ href: '/settings/billing', label: 'Billing' },
		{ href: '/team', label: 'Team' },
	];

	onMount(() => {
		const token = localStorage.getItem('cl_token');
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split('.')[1]));
				user = { email: payload.email || 'User', id: payload.sub };
			} catch (e) {}
		}
	});

	function logout() {
		localStorage.removeItem('cl_token');
		user = null;
		window.location.href = '/';
	}

	function closeMenus() {
		mobileMenuOpen = false;
		moreOpen = false;
		userMenuOpen = false;
	}
</script>

<svelte:window on:click={closeMenus} />

<div class="app-layout">
	<header class="navbar">
		<div class="container navbar-inner">
			<a href="/" class="logo">
				<span class="logo-icon">CL</span>
				<span class="logo-text">CreativeLens</span>
			</a>

			<nav class="nav-links" class:open={mobileMenuOpen}>
				{#each navLinks as link}
					<a href={link.href} class="nav-link" on:click={closeMenus}>
						{link.label}
					</a>
				{/each}

				<div class="nav-dropdown" on:click|stopPropagation>
					<button class="nav-link dropdown-trigger" on:click={() => { moreOpen = !moreOpen; userMenuOpen = false; }}>
						More
						<span class="dropdown-arrow" class:open={moreOpen}></span>
					</button>
					{#if moreOpen}
						<div class="dropdown-menu">
							{#each moreLinks as link}
								<a href={link.href} class="dropdown-item" on:click={closeMenus}>{link.label}</a>
							{/each}
						</div>
					{/if}
				</div>
			</nav>

			<div class="nav-actions">
				{#if user}
					<div class="nav-dropdown" on:click|stopPropagation>
						<button class="user-btn" on:click={() => { userMenuOpen = !userMenuOpen; moreOpen = false; }}>
							<span class="user-avatar">{user.email.charAt(0).toUpperCase()}</span>
						</button>
						{#if userMenuOpen}
							<div class="dropdown-menu dropdown-right">
								<div class="dropdown-header">
									<span class="dropdown-email">{user.email}</span>
								</div>
								{#each userLinks as link}
									<a href={link.href} class="dropdown-item" on:click={closeMenus}>{link.label}</a>
								{/each}
								<div class="dropdown-divider"></div>
								<button class="dropdown-item dropdown-logout" on:click={logout}>Log Out</button>
							</div>
						{/if}
					</div>
				{:else}
					<a href="/login" class="btn btn-ghost">Log in</a>
					<a href="/signup" class="btn btn-primary">Get Started</a>
				{/if}
			</div>

			<button
				class="mobile-toggle"
				on:click|stopPropagation={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle navigation"
			>
				<span class="hamburger" class:open={mobileMenuOpen}></span>
			</button>
		</div>
	</header>

	<main class="main-content">
		<slot />
	</main>

	<footer class="footer">
		<div class="container footer-inner">
			<div class="footer-grid">
				<div class="footer-brand">
					<span class="logo-icon">CL</span>
					<p>Creative intelligence platform for marketing teams using AI-generated content.</p>
				</div>
				<div class="footer-col">
					<h4>Platform</h4>
					<a href="/gallery">Gallery</a>
					<a href="/studio">Studio</a>
					<a href="/niches">Niches</a>
					<a href="/categories">Categories</a>
					<a href="/pricing">Pricing</a>
				</div>
				<div class="footer-col">
					<h4>Resources</h4>
					<a href="/blog">Blog</a>
					<a href="/api/docs">API Docs</a>
					<a href="/extensions">Extension</a>
					<a href="/kit">Influencer Kit</a>
					<a href="/stats">Stats</a>
					<a href="/contact">Contact</a>
				</div>
				<div class="footer-col">
					<h4>Use Cases</h4>
					<a href="/for-marketers">For Marketers</a>
					<a href="/for-etsy-sellers">For Etsy Sellers</a>
					<a href="/for-agencies">For Agencies</a>
					<a href="/for-cosplay-brands">For Cosplay Brands</a>
				</div>
				<div class="footer-col">
					<h4>Legal</h4>
					<a href="/terms">Terms of Service</a>
					<a href="/privacy">Privacy Policy</a>
				</div>
			</div>
			<div class="footer-bottom">
				<p>&copy; 2026 CreativeLens by Polsia. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.navbar {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(10, 10, 15, 0.85);
		backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--color-border);
	}

	.navbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
		gap: 1.5rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		font-weight: 800;
		font-size: 1.125rem;
		color: var(--color-text);
		text-decoration: none;
		font-family: var(--font-heading);
		flex-shrink: 0;
	}

	.logo:hover {
		color: var(--color-text);
	}

	.logo-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		background: linear-gradient(135deg, var(--color-accent), #a855f7);
		border-radius: var(--radius-sm);
		font-size: 0.8rem;
		font-weight: 800;
		color: white;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.125rem;
		flex: 1;
		justify-content: center;
	}

	.nav-link {
		padding: 0.45rem 0.7rem;
		border-radius: var(--radius-sm);
		font-weight: 500;
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: all var(--transition);
		white-space: nowrap;
		background: transparent;
	}

	.nav-link:hover {
		color: var(--color-text);
		background: var(--color-bg-hover);
	}

	.nav-dropdown {
		position: relative;
	}

	.dropdown-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		cursor: pointer;
	}

	.dropdown-arrow {
		display: inline-block;
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 4px solid currentColor;
		transition: transform var(--transition);
	}

	.dropdown-arrow.open {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		min-width: 200px;
		background: var(--color-bg-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 0.5rem;
		box-shadow: var(--shadow-lg);
		z-index: 200;
	}

	.dropdown-right {
		left: auto;
		right: 0;
	}

	.dropdown-item {
		display: block;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-sm);
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: all var(--transition);
		width: 100%;
		text-align: left;
		background: transparent;
	}

	.dropdown-item:hover {
		background: var(--color-bg-hover);
		color: var(--color-text);
	}

	.dropdown-header {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 0.25rem;
	}

	.dropdown-email {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.dropdown-divider {
		height: 1px;
		background: var(--color-border);
		margin: 0.25rem 0;
	}

	.dropdown-logout {
		color: var(--color-error);
	}

	.dropdown-logout:hover {
		background: rgba(239, 68, 68, 0.1);
		color: var(--color-error);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.user-btn {
		background: transparent;
		padding: 0;
		display: flex;
		align-items: center;
	}

	.user-avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-accent), #a855f7);
		color: white;
		font-weight: 700;
		font-size: 0.85rem;
	}

	.mobile-toggle {
		display: none;
		background: none;
		padding: 0.5rem;
	}

	.hamburger {
		display: block;
		width: 20px;
		height: 2px;
		background: var(--color-text);
		position: relative;
		transition: all var(--transition);
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 20px;
		height: 2px;
		background: var(--color-text);
		transition: all var(--transition);
	}

	.hamburger::before { top: -6px; }
	.hamburger::after { top: 6px; }

	.hamburger.open {
		background: transparent;
	}

	.hamburger.open::before {
		top: 0;
		transform: rotate(45deg);
	}

	.hamburger.open::after {
		top: 0;
		transform: rotate(-45deg);
	}

	.main-content {
		flex: 1;
	}

	.footer {
		border-top: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
		padding: 3rem 0 1.5rem;
		margin-top: 4rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-brand p {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		max-width: 280px;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-col h4 {
		font-size: 0.875rem;
		color: var(--color-text);
		margin-bottom: 0.25rem;
	}

	.footer-col a {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		text-decoration: none;
	}

	.footer-col a:hover {
		color: var(--color-accent);
	}

	.footer-bottom {
		border-top: 1px solid var(--color-border);
		padding-top: 1.5rem;
	}

	.footer-bottom p {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		.nav-links {
			display: none;
			position: absolute;
			top: 64px;
			left: 0;
			right: 0;
			flex-direction: column;
			background: var(--color-bg-secondary);
			border-bottom: 1px solid var(--color-border);
			padding: 1rem;
			align-items: flex-start;
		}

		.nav-links.open {
			display: flex;
		}

		.nav-actions {
			display: none;
		}

		.mobile-toggle {
			display: block;
		}

		.footer-grid {
			grid-template-columns: 1fr 1fr;
		}

		.dropdown-menu {
			position: static;
			box-shadow: none;
			border: none;
			padding-left: 1rem;
		}
	}
</style>
