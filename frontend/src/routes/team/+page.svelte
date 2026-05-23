<script>
	import { onMount } from 'svelte';
	import { api } from '$lib/api.ts';

	let loading = true;
	let team = null;
	let members = [];
	let pendingInvites = [];
	let error = '';
	let inviteEmail = '';
	let inviteRole = 'member';
	let inviting = false;
	let createName = '';
	let creating = false;

	onMount(async () => {
		await loadTeam();
		loading = false;
	});

	async function loadTeam() {
		try {
			const res = await api.get('/auth/me');
			if (res.data && res.data.team_id) {
				const teamRes = await api.get(`/teams/${res.data.team_id}`);
				if (teamRes.data) {
					team = teamRes.data;
					members = teamRes.data.members || [];
					pendingInvites = teamRes.data.pending_invites || [];
				}
			}
		} catch (err) {
			// User may not have a team - that's okay
		}
	}

	async function createTeam() {
		if (!createName.trim()) return;
		creating = true;
		error = '';
		try {
			const res = await api.post('/teams', { name: createName.trim() });
			createName = '';
			await loadTeam();
		} catch (err) {
			error = err.error || 'Failed to create team.';
		}
		creating = false;
	}

	async function sendInvite() {
		if (!inviteEmail) return;
		inviting = true;
		error = '';
		try {
			await api.post(`/teams/${team.id}/invite`, { email: inviteEmail, role: inviteRole });
			inviteEmail = '';
			await loadTeam();
		} catch (err) {
			error = err.error || 'Failed to send invite.';
		}
		inviting = false;
	}

	async function removeMember(userId) {
		if (!confirm('Remove this member from the team?')) return;
		try {
			await api.del(`/teams/${team.id}/members/${userId}`);
			members = members.filter(m => m.user_id !== userId);
		} catch (err) {
			error = err.error || 'Failed to remove member.';
		}
	}
</script>

<svelte:head>
	<title>Team Management - CreativeLens</title>
</svelte:head>

<div class="team-page">
	<div class="container">
		<div class="page-header">
			<h1>Team Management</h1>
			<p>Manage your team, invite members, and configure organization billing.</p>
		</div>

		{#if error}
			<div class="error-banner">{error}</div>
		{/if}

		{#if loading}
			<div class="loading-state card">
				<div class="spinner"></div>
				<p>Loading team...</p>
			</div>
		{:else if !team}
			<div class="no-team card">
				<h3>No Team Yet</h3>
				<p>Create a team to collaborate with others on your Agency plan. Teams support up to 10 seats.</p>
				<form on:submit|preventDefault={createTeam} class="create-team-form">
					<input type="text" bind:value={createName} placeholder="Team name" maxlength="200" />
					<button type="submit" class="btn btn-primary" disabled={creating || !createName.trim()}>
						{creating ? 'Creating...' : 'Create Team'}
					</button>
				</form>
			</div>
		{:else}
			<div class="team-grid">
				<div class="team-info card">
					<h3>{team.name}</h3>
					<div class="team-meta">
						<span class="badge">{team.plan_tier}</span>
						<span class="seat-count">{members.length} / {team.max_seats} seats used</span>
					</div>
					<div class="seat-bar">
						<div class="seat-fill" style="width: {(members.length / team.max_seats) * 100}%"></div>
					</div>
				</div>

				<div class="invite-section card">
					<h3>Invite Members</h3>
					<form on:submit|preventDefault={sendInvite} class="invite-form">
						<input type="email" bind:value={inviteEmail} placeholder="colleague@company.com" required />
						<select bind:value={inviteRole}>
							<option value="member">Member</option>
							<option value="admin">Admin</option>
							<option value="viewer">Viewer</option>
						</select>
						<button type="submit" class="btn btn-primary" disabled={inviting}>
							{inviting ? 'Sending...' : 'Send Invite'}
						</button>
					</form>
				</div>
			</div>

			<div class="members-section card">
				<h3>Members ({members.length})</h3>
				{#if members.length > 0}
					<table class="members-table">
						<thead>
							<tr><th>User</th><th>Role</th><th>Joined</th><th></th></tr>
						</thead>
						<tbody>
							{#each members as member}
								<tr>
									<td>{member.display_name || member.email}</td>
									<td><span class="badge">{member.role}</span></td>
									<td>{member.joined_at ? new Date(member.joined_at).toLocaleDateString() : '-'}</td>
									<td>
										{#if member.role !== 'owner'}
											<button class="btn btn-ghost btn-sm" on:click={() => removeMember(member.user_id)}>Remove</button>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p class="empty-text">No members yet. Send invites to build your team.</p>
				{/if}
			</div>

			{#if pendingInvites.length > 0}
				<div class="invites-section card">
					<h3>Pending Invites ({pendingInvites.length})</h3>
					{#each pendingInvites as invite}
						<div class="invite-row">
							<span>{invite.email}</span>
							<span class="badge">Pending</span>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.team-page { padding: 2rem 0; }
	.page-header { margin-bottom: 2rem; }
	.page-header h1 { margin-bottom: 0.25rem; }

	.team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }

	.team-info h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
	.team-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
	.seat-count { font-size: 0.85rem; color: var(--color-text-muted); }
	.seat-bar { height: 6px; background: var(--color-bg-tertiary); border-radius: 3px; overflow: hidden; }
	.seat-fill { height: 100%; background: var(--color-accent); border-radius: 3px; transition: width 0.3s; }

	.invite-section h3 { font-size: 1rem; margin-bottom: 0.75rem; }
	.invite-form { display: flex; gap: 0.5rem; }
	.invite-form input { flex: 1; }
	.invite-form select { min-width: 100px; }

	.members-section { margin-bottom: 1.5rem; }
	.members-section h3 { font-size: 1rem; margin-bottom: 1rem; }
	.members-table { width: 100%; border-collapse: collapse; }
	.members-table th, .members-table td { text-align: left; padding: 0.625rem 0.75rem; border-bottom: 1px solid var(--color-border); font-size: 0.85rem; }
	.members-table th { color: var(--color-text-muted); font-size: 0.75rem; text-transform: uppercase; }

	.invites-section h3 { font-size: 1rem; margin-bottom: 0.75rem; }
	.invite-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border); font-size: 0.85rem; }

	.no-team { text-align: center; padding: 4rem 2rem; }
	.no-team h3 { margin-bottom: 0.5rem; }
	.no-team p { max-width: 450px; margin: 0 auto 1.5rem; font-size: 0.9rem; }
	.create-team-form { display: flex; gap: 0.75rem; justify-content: center; max-width: 400px; margin: 0 auto; }
	.create-team-form input { flex: 1; }

	.empty-text { font-size: 0.9rem; color: var(--color-text-muted); }
	.error-banner { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--color-error); padding: 0.625rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 1rem; }
	.loading-state { text-align: center; padding: 4rem; }
	.spinner { width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 768px) { .team-grid { grid-template-columns: 1fr; } .invite-form { flex-direction: column; } }
</style>
