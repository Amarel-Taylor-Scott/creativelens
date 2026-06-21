<script>
	let email = '';
	let password = '';
	let displayName = '';
	let error = '';
	let loading = false;

	async function handleSignup() {
		if (!email || !password) return;

		if (password.length < 8) {
			error = 'Password must be at least 8 characters.';
			return;
		}

		error = '';
		loading = true;

		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, display_name: displayName || undefined }),
			});

			const data = await res.json();

			if (data.success) {
				localStorage.setItem('cl_token', data.data.token);
				window.location.href = '/gallery';
			} else {
				error = data.error || 'Registration failed. Please try again.';
			}
		} catch (err) {
			error = 'Unable to connect to server. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign Up - CreativeLens</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-card card">
		<div class="auth-header">
			<span class="logo-icon">CL</span>
			<h1>Create your account</h1>
			<p>Join CreativeLens to discover AI-generated content, analyze prompts, and submit your own creative work.</p>
		</div>

		{#if error}
			<div class="error-banner">{error}</div>
		{/if}

		<form on:submit|preventDefault={handleSignup}>
			<div class="form-group">
				<label for="display-name">Display Name</label>
				<input type="text" id="display-name" bind:value={displayName} placeholder="How others will see you" maxlength="100" />
			</div>
			<div class="form-group">
				<label for="email">Email <span class="required">*</span></label>
				<input type="email" id="email" bind:value={email} placeholder="you@company.com" required />
			</div>
			<div class="form-group">
				<label for="password">Password <span class="required">*</span></label>
				<input type="password" id="password" bind:value={password} placeholder="Minimum 8 characters" minlength="8" required />
			</div>
			<button type="submit" class="btn btn-primary" style="width: 100%;" disabled={loading}>
				{loading ? 'Creating account...' : 'Create Free Account'}
			</button>
		</form>

		<div class="auth-terms">
			<p>By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
		</div>

		<div class="auth-footer">
			<p>Already have an account? <a href="/login">Log in</a></p>
		</div>
	</div>
</div>

<style>
	.auth-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 200px);
		padding: 2rem;
	}

	.auth-card {
		width: 100%;
		max-width: 420px;
		padding: 2.5rem;
	}

	.auth-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.auth-header .logo-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, var(--color-accent), #a855f7);
		border-radius: var(--radius-md);
		font-size: 1rem;
		font-weight: 800;
		color: white;
		margin-bottom: 1rem;
	}

	.auth-header h1 {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.auth-header p {
		font-size: 0.875rem;
	}

	.error-banner {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: var(--color-error);
		padding: 0.625rem 1rem;
		border-radius: var(--radius-sm);
		font-size: 0.85rem;
		margin-bottom: 1rem;
	}

	.required {
		color: var(--color-accent);
	}

	.form-group {
		margin-bottom: 1rem;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.4rem;
	}

	.form-group input {
		width: 100%;
	}

	.auth-terms {
		margin-top: 1rem;
		text-align: center;
	}

	.auth-terms p {
		font-size: 0.75rem;
	}

	.auth-footer {
		text-align: center;
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.auth-footer p {
		font-size: 0.85rem;
	}
</style>
