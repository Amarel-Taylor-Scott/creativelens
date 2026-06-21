<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let svgEl;
	let width = 900;
	let height = 600;
	let selectedNode = null;

	const categoryColors = {
		'Alt Fashion': '#8b5cf6',
		'AI Streaming': '#ef4444',
		'Stream Visual Assets': '#f59e0b',
		'Alt Beauty': '#ec4899',
		'Concept Designers': '#6366f1',
		'Marketers': '#10b981',
		'AI Influencers': '#f97316',
		'Alt Accessories': '#a855f7',
		'Virtual Companion': '#06b6d4',
	};

	// Simplified node data for the force-directed graph
	const nodes = [
		// Category nodes (larger)
		{ id: 'alt-fashion', label: 'Alt Fashion', group: 'Alt Fashion', type: 'category', radius: 24 },
		{ id: 'ai-streaming', label: 'AI Streaming', group: 'AI Streaming', type: 'category', radius: 18 },
		{ id: 'stream-visual-assets', label: 'Stream Visual Assets', group: 'Stream Visual Assets', type: 'category', radius: 17 },
		{ id: 'alt-beauty', label: 'Alt Beauty', group: 'Alt Beauty', type: 'category', radius: 16 },
		{ id: 'concept-designers', label: 'Concept Designers', group: 'Concept Designers', type: 'category', radius: 16 },
		{ id: 'marketers', label: 'Marketers', group: 'Marketers', type: 'category', radius: 15 },
		{ id: 'ai-influencers', label: 'AI Influencers', group: 'AI Influencers', type: 'category', radius: 14 },
		{ id: 'alt-accessories', label: 'Alt Accessories', group: 'Alt Accessories', type: 'category', radius: 14 },
		{ id: 'virtual-companion', label: 'Virtual Companion', group: 'Virtual Companion', type: 'category', radius: 14 },

		// Sample niche nodes (smaller)
		{ id: 'neo-gothic-couture', label: 'Neo-Gothic Couture', group: 'Alt Fashion', type: 'niche', radius: 6 },
		{ id: 'neon-streetwear', label: 'Neon Streetwear', group: 'Alt Fashion', type: 'niche', radius: 6 },
		{ id: 'techwear', label: 'Techwear', group: 'Alt Fashion', type: 'niche', radius: 6 },
		{ id: 'wearable-art', label: 'Wearable Art', group: 'Alt Fashion', type: 'niche', radius: 6 },
		{ id: 'vtuber-character-design', label: 'VTuber Design', group: 'AI Streaming', type: 'niche', radius: 6 },
		{ id: 'stream-overlays', label: 'Stream Overlays', group: 'AI Streaming', type: 'niche', radius: 6 },
		{ id: 'gaming-hud-overlays', label: 'Gaming HUD', group: 'Stream Visual Assets', type: 'niche', radius: 6 },
		{ id: 'youtube-thumbnails', label: 'YT Thumbnails', group: 'Stream Visual Assets', type: 'niche', radius: 6 },
		{ id: 'avant-garde-makeup', label: 'Avant-Garde Makeup', group: 'Alt Beauty', type: 'niche', radius: 6 },
		{ id: 'character-concept-sheets', label: 'Character Sheets', group: 'Concept Designers', type: 'niche', radius: 6 },
		{ id: 'social-ad-visuals', label: 'Social Ad Visuals', group: 'Marketers', type: 'niche', radius: 6 },
		{ id: 'virtual-influencer-profiles', label: 'Virtual Influencers', group: 'AI Influencers', type: 'niche', radius: 6 },
		{ id: 'cyberpunk-jewelry', label: 'Cyberpunk Jewelry', group: 'Alt Accessories', type: 'niche', radius: 6 },
		{ id: 'anime-companion-design', label: 'Anime Companion', group: 'Virtual Companion', type: 'niche', radius: 6 },
	];

	const links = [
		{ source: 'alt-fashion', target: 'neo-gothic-couture' },
		{ source: 'alt-fashion', target: 'neon-streetwear' },
		{ source: 'alt-fashion', target: 'techwear' },
		{ source: 'alt-fashion', target: 'wearable-art' },
		{ source: 'ai-streaming', target: 'vtuber-character-design' },
		{ source: 'ai-streaming', target: 'stream-overlays' },
		{ source: 'stream-visual-assets', target: 'gaming-hud-overlays' },
		{ source: 'stream-visual-assets', target: 'youtube-thumbnails' },
		{ source: 'alt-beauty', target: 'avant-garde-makeup' },
		{ source: 'concept-designers', target: 'character-concept-sheets' },
		{ source: 'marketers', target: 'social-ad-visuals' },
		{ source: 'ai-influencers', target: 'virtual-influencer-profiles' },
		{ source: 'alt-accessories', target: 'cyberpunk-jewelry' },
		{ source: 'virtual-companion', target: 'anime-companion-design' },
		// Cross-category connections
		{ source: 'techwear', target: 'cyberpunk-jewelry' },
		{ source: 'vtuber-character-design', target: 'anime-companion-design' },
		{ source: 'stream-overlays', target: 'gaming-hud-overlays' },
		{ source: 'social-ad-visuals', target: 'youtube-thumbnails' },
	];

	let simulatedNodes = [];
	let simulatedLinks = [];

	onMount(async () => {
		if (!browser) return;

		const d3Force = await import('d3-force');

		const sim = d3Force.forceSimulation(nodes)
			.force('link', d3Force.forceLink(links).id(d => d.id).distance(80))
			.force('charge', d3Force.forceManyBody().strength(-200))
			.force('center', d3Force.forceCenter(width / 2, height / 2))
			.force('collision', d3Force.forceCollide().radius(d => d.radius + 8));

		sim.on('tick', () => {
			simulatedNodes = [...nodes];
			simulatedLinks = [...links];
		});
	});

	function handleNodeClick(node) {
		selectedNode = node;
	}
</script>

<svelte:head>
	<title>Niche Explorer - CreativeLens</title>
	<meta name="description" content="Interactive force-directed graph visualization of 86 creative niches and their relationships across 9 categories." />
</svelte:head>

<div class="explore-page">
	<div class="container">
		<div class="page-header">
			<div>
				<h1>Niche Explorer</h1>
				<p>Interactive visualization of 86 niches and their connections. Click a node to explore.</p>
			</div>
			<a href="/niches" class="btn btn-secondary">List View</a>
		</div>

		<div class="explorer-layout">
			<div class="graph-container card">
				<svg bind:this={svgEl} viewBox="0 0 {width} {height}" class="graph-svg">
					<!-- Links -->
					{#each simulatedLinks as link}
						<line
							x1={link.source.x} y1={link.source.y}
							x2={link.target.x} y2={link.target.y}
							stroke="rgba(255,255,255,0.08)"
							stroke-width="1"
						/>
					{/each}
					<!-- Nodes -->
					{#each simulatedNodes as node}
						<g
							transform="translate({node.x},{node.y})"
							on:click={() => handleNodeClick(node)}
							on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNodeClick(node); }}
							style="cursor: pointer;"
							role="button"
							tabindex="0"
						>
							<circle
								r={node.radius}
								fill={categoryColors[node.group] || '#666'}
								opacity={node.type === 'category' ? 0.9 : 0.6}
							/>
							{#if node.type === 'category'}
								<text
									text-anchor="middle"
									dy="0.35em"
									fill="white"
									font-size="7"
									font-weight="700"
								>{node.label}</text>
							{/if}
						</g>
					{/each}
				</svg>
			</div>

			<div class="details-panel">
				{#if selectedNode}
					<div class="node-detail card">
						<div class="node-color" style="background: {categoryColors[selectedNode.group]}"></div>
						<h3>{selectedNode.label}</h3>
						<span class="node-type badge">{selectedNode.type === 'category' ? 'Category' : 'Niche'}</span>
						<p class="node-group">{selectedNode.group}</p>
						<a href={selectedNode.type === 'category' ? `/categories/${selectedNode.id}` : `/niches/${selectedNode.id}`} class="btn btn-primary" style="margin-top: 1rem; width: 100%;">
							View {selectedNode.type === 'category' ? 'Category' : 'Niche'}
						</a>
					</div>
				{:else}
					<div class="node-detail card">
						<p class="placeholder-text">Click on a node in the graph to see details.</p>
					</div>
				{/if}

				<div class="legend card">
					<h4>Categories</h4>
					{#each Object.entries(categoryColors) as [name, color]}
						<div class="legend-item">
							<span class="legend-dot" style="background: {color}"></span>
							<span>{name}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.explore-page {
		padding: 2rem 0;
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.page-header h1 {
		margin-bottom: 0.25rem;
	}

	.explorer-layout {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 1.5rem;
	}

	.graph-container {
		padding: 0;
		overflow: hidden;
	}

	.graph-svg {
		width: 100%;
		height: 100%;
		min-height: 500px;
		background: var(--color-bg);
	}

	.details-panel {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.node-detail {
		text-align: center;
	}

	.node-color {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		margin: 0 auto 0.75rem;
	}

	.node-detail h3 {
		margin-bottom: 0.5rem;
	}

	.node-group {
		font-size: 0.85rem;
		margin-top: 0.5rem;
	}

	.placeholder-text {
		font-size: 0.875rem;
		padding: 1rem 0;
	}

	.legend h4 {
		font-size: 0.875rem;
		margin-bottom: 0.75rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
		font-size: 0.8rem;
		color: var(--color-text-secondary);
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.explorer-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
