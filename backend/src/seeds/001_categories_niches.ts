import { Knex } from 'knex';

interface CategorySeed {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  niches: NicheSeed[];
}

interface NicheSeed {
  name: string;
  slug: string;
  sub_niche: string;
  description: string;
}

const categories: CategorySeed[] = [
  // ──────────────────────────────────────────────
  // 1. Alt Fashion (9 sub-niches, 34 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Alt Fashion',
    slug: 'alt-fashion',
    description: 'AI-generated alternative fashion imagery spanning gothic, cyberpunk, streetwear, and avant-garde styles for creative directors and fashion marketers.',
    icon: '\uD83E\uDDE5',
    color: '#8b5cf6',
    sort_order: 1,
    niches: [
      // Sub-niche: Gothic & Dark Fashion
      { name: 'Neo-Gothic Couture', slug: 'neo-gothic-couture', sub_niche: 'Gothic & Dark Fashion', description: 'Dark haute couture blending Victorian silhouettes with modern materials and AI-generated textures.' },
      { name: 'Dark Romantic Fashion', slug: 'dark-romantic-fashion', sub_niche: 'Gothic & Dark Fashion', description: 'Moody, romantic fashion imagery with lace, velvet, and dramatic lighting.' },
      { name: 'Vampire Aesthetic', slug: 'vampire-aesthetic', sub_niche: 'Gothic & Dark Fashion', description: 'Immortal elegance meets contemporary fashion with deep reds and midnight blacks.' },
      { name: 'Industrial Goth', slug: 'industrial-goth', sub_niche: 'Gothic & Dark Fashion', description: 'Hard-edged fashion combining industrial hardware with dark fabrics and metal accents.' },
      // Sub-niche: Cyberpunk Fashion
      { name: 'Neon Streetwear', slug: 'neon-streetwear', sub_niche: 'Cyberpunk Fashion', description: 'High-contrast urban fashion illuminated by neon lights and holographic materials.' },
      { name: 'Techwear', slug: 'techwear', sub_niche: 'Cyberpunk Fashion', description: 'Functional futuristic garments with modular attachments, weather resistance, and utility design.' },
      { name: 'Chrome & Circuit', slug: 'chrome-and-circuit', sub_niche: 'Cyberpunk Fashion', description: 'Metallic fabrics interwoven with circuit-board patterns and LED-embedded designs.' },
      { name: 'Dystopian Chic', slug: 'dystopian-chic', sub_niche: 'Cyberpunk Fashion', description: 'Post-apocalyptic fashion that merges survival aesthetics with runway-ready design.' },
      // Sub-niche: Avant-Garde
      { name: 'Deconstructed Fashion', slug: 'deconstructed-fashion', sub_niche: 'Avant-Garde', description: 'Garments intentionally unfinished, asymmetric, and structurally experimental.' },
      { name: 'Wearable Art', slug: 'wearable-art', sub_niche: 'Avant-Garde', description: 'Fashion as sculpture, turning the body into a canvas for three-dimensional art.' },
      { name: 'Surrealist Couture', slug: 'surrealist-couture', sub_niche: 'Avant-Garde', description: 'Dream-logic fashion inspired by Dali and Magritte, defying physical reality.' },
      // Sub-niche: Kawaii & Harajuku
      { name: 'Decora', slug: 'decora', sub_niche: 'Kawaii & Harajuku', description: 'Maximalist layering of colorful accessories, clips, stickers, and plush elements.' },
      { name: 'Fairy Kei', slug: 'fairy-kei', sub_niche: 'Kawaii & Harajuku', description: 'Pastel fantasy fashion blending 80s pop culture with fairy-tale softness.' },
      { name: 'Lolita Fashion', slug: 'lolita-fashion', sub_niche: 'Kawaii & Harajuku', description: 'Elaborate Victorian-inspired dresses with petticoats, bows, and meticulous detail.' },
      { name: 'Visual Kei', slug: 'visual-kei', sub_niche: 'Kawaii & Harajuku', description: 'Dramatic androgynous fashion rooted in Japanese rock culture with bold makeup and hair.' },
      // Sub-niche: Retro-Futurism
      { name: 'Space Age Fashion', slug: 'space-age-fashion', sub_niche: 'Retro-Futurism', description: '1960s mod-inspired fashion with metallic fabrics, geometric cuts, and cosmic themes.' },
      { name: 'Synthwave Style', slug: 'synthwave-style', sub_niche: 'Retro-Futurism', description: '80s-inspired neon gradients, chrome, and sunset palette fashion.' },
      { name: 'Atompunk', slug: 'atompunk', sub_niche: 'Retro-Futurism', description: 'Atomic-age optimism meets fashion with streamlined silhouettes and jet-age materials.' },
      // Sub-niche: Streetwear & Urban
      { name: 'Hypebeast Drops', slug: 'hypebeast-drops', sub_niche: 'Streetwear & Urban', description: 'Limited-edition sneaker and streetwear culture rendered in AI-generated lookbooks.' },
      { name: 'Graffiti Couture', slug: 'graffiti-couture', sub_niche: 'Streetwear & Urban', description: 'Street art aesthetics applied to high fashion with spray-paint textures and bold typography.' },
      { name: 'Skate Punk', slug: 'skate-punk', sub_niche: 'Streetwear & Urban', description: 'Raw, rebellious skate culture fashion with DIY patches, torn denim, and board graphics.' },
      { name: 'Urban Techwear', slug: 'urban-techwear', sub_niche: 'Streetwear & Urban', description: 'City-ready utility fashion with waterproof fabrics, hidden pockets, and minimalist design.' },
      // Sub-niche: Fantasy Fashion
      { name: 'Elven Couture', slug: 'elven-couture', sub_niche: 'Fantasy Fashion', description: 'Ethereal fashion inspired by elven aesthetics with flowing fabrics and natural motifs.' },
      { name: 'Armor Fashion', slug: 'armor-fashion', sub_niche: 'Fantasy Fashion', description: 'Medieval armor reimagined as wearable fashion with chainmail, leather, and plate details.' },
      { name: 'Witchcore', slug: 'witchcore', sub_niche: 'Fantasy Fashion', description: 'Mystical fashion with herb-dyed fabrics, crystal jewelry, and moon-phase embroidery.' },
      { name: 'Dragon Scale', slug: 'dragon-scale', sub_niche: 'Fantasy Fashion', description: 'Reptilian-textured fashion with iridescent scales, angular silhouettes, and fire tones.' },
      // Sub-niche: Eco & Organic
      { name: 'Mushroom Fashion', slug: 'mushroom-fashion', sub_niche: 'Eco & Organic', description: 'Fungal textures and mycelium-inspired garments merging nature with haute couture.' },
      { name: 'Solarpunk Wear', slug: 'solarpunk-wear', sub_niche: 'Eco & Organic', description: 'Optimistic green-future fashion with living plants, solar cells, and bio-materials.' },
      { name: 'Coral Reef Couture', slug: 'coral-reef-couture', sub_niche: 'Eco & Organic', description: 'Ocean-inspired fashion with coral textures, bioluminescent accents, and aquatic hues.' },
      // Sub-niche: Ceremonial & Ritual
      { name: 'Ritual Wear', slug: 'ritual-wear', sub_niche: 'Ceremonial & Ritual', description: 'Sacred and ceremonial fashion drawing from global spiritual traditions.' },
      { name: 'Festival Couture', slug: 'festival-couture', sub_niche: 'Ceremonial & Ritual', description: 'Burning-Man-meets-runway festival fashion with body paint, LED, and flowing layers.' },
      { name: 'Masquerade', slug: 'masquerade', sub_niche: 'Ceremonial & Ritual', description: 'Ornate mask-centric fashion with Venetian craft and modern avant-garde elements.' },
      { name: 'Bridal Dark', slug: 'bridal-dark', sub_niche: 'Ceremonial & Ritual', description: 'Alternative wedding fashion in black, crimson, and midnight with dramatic veils.' },
      { name: 'Coronation', slug: 'coronation', sub_niche: 'Ceremonial & Ritual', description: 'Regal ceremonial fashion with crowns, capes, and jewel-encrusted garments.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. AI Streaming (3 sub-niches, 9 niches)
  // ──────────────────────────────────────────────
  {
    name: 'AI Streaming',
    slug: 'ai-streaming',
    description: 'AI-generated streaming personalities and virtual broadcaster assets for the next generation of digital entertainment content.',
    icon: '\uD83C\uDFA5',
    color: '#ef4444',
    sort_order: 2,
    niches: [
      // Sub-niche: Virtual Streamers
      { name: 'VTuber Character Design', slug: 'vtuber-character-design', sub_niche: 'Virtual Streamers', description: 'Full character designs for virtual streamers with rigging-ready expressions and poses.' },
      { name: 'AI Streamer Personas', slug: 'ai-streamer-personas', sub_niche: 'Virtual Streamers', description: 'Complete persona concepts for AI-driven streaming personalities with backstory and branding.' },
      { name: 'Stream Avatar Sets', slug: 'stream-avatar-sets', sub_niche: 'Virtual Streamers', description: 'Matching avatar packages with multiple expressions, reactions, and idle animations.' },
      // Sub-niche: Stream Environments
      { name: 'Virtual Stream Rooms', slug: 'virtual-stream-rooms', sub_niche: 'Stream Environments', description: 'Fully designed 3D-style streaming room backgrounds with customizable elements.' },
      { name: 'Animated Backgrounds', slug: 'animated-backgrounds', sub_niche: 'Stream Environments', description: 'Looping animated scene backgrounds for stream overlays and virtual stages.' },
      { name: 'Scene Transitions', slug: 'scene-transitions', sub_niche: 'Stream Environments', description: 'Stinger transitions and scene-change animations matching specific aesthetic themes.' },
      // Sub-niche: Stream Branding
      { name: 'Channel Identity Kits', slug: 'channel-identity-kits', sub_niche: 'Stream Branding', description: 'Complete channel branding packages with logos, banners, panels, and color palettes.' },
      { name: 'Emote & Badge Design', slug: 'emote-badge-design', sub_niche: 'Stream Branding', description: 'Custom subscriber emotes and loyalty badges in cohesive artistic styles.' },
      { name: 'Stream Overlays', slug: 'stream-overlays', sub_niche: 'Stream Branding', description: 'Camera frames, alert boxes, chat widgets, and event tickers for live streams.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. Stream Visual Assets (2 sub-niches, 8 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Stream Visual Assets',
    slug: 'stream-visual-assets',
    description: 'Production-ready visual assets for streamers and content creators, from overlays to thumbnail templates.',
    icon: '\uD83C\uDFA8',
    color: '#f59e0b',
    sort_order: 3,
    niches: [
      // Sub-niche: Overlay & HUD
      { name: 'Gaming HUD Overlays', slug: 'gaming-hud-overlays', sub_niche: 'Overlay & HUD', description: 'Heads-up display overlays for gaming streams with health bars, minimaps, and stat panels.' },
      { name: 'Just Chatting Frames', slug: 'just-chatting-frames', sub_niche: 'Overlay & HUD', description: 'Elegant camera frames and lower-thirds for conversation and IRL streams.' },
      { name: 'Alert Animations', slug: 'alert-animations', sub_niche: 'Overlay & HUD', description: 'Follower, subscriber, and donation alert designs with animation-ready layered assets.' },
      { name: 'Starting & BRB Screens', slug: 'starting-brb-screens', sub_niche: 'Overlay & HUD', description: 'Countdown timers, "starting soon" screens, and break-time holding pages.' },
      // Sub-niche: Thumbnail & Graphic
      { name: 'YouTube Thumbnails', slug: 'youtube-thumbnails', sub_niche: 'Thumbnail & Graphic', description: 'High-CTR thumbnail templates and styles optimized for YouTube algorithm visibility.' },
      { name: 'Stream Highlights', slug: 'stream-highlights', sub_niche: 'Thumbnail & Graphic', description: 'Clip and highlight reel cover art with dynamic action-shot compositions.' },
      { name: 'Social Media Cards', slug: 'social-media-cards', sub_niche: 'Thumbnail & Graphic', description: 'Platform-optimized graphics for Twitter, Instagram, and TikTok stream promotions.' },
      { name: 'Event Banners', slug: 'event-banners', sub_niche: 'Thumbnail & Graphic', description: 'Tournament, charity, and special event banners for stream schedules and promotions.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. Alt Beauty (2 sub-niches, 7 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Alt Beauty',
    slug: 'alt-beauty',
    description: 'Alternative beauty concepts pushing the boundaries of makeup artistry, body modification, and aesthetic expression through AI visualization.',
    icon: '\uD83D\uDC8E',
    color: '#ec4899',
    sort_order: 4,
    niches: [
      // Sub-niche: Makeup & Face Art
      { name: 'Avant-Garde Makeup', slug: 'avant-garde-makeup', sub_niche: 'Makeup & Face Art', description: 'Experimental makeup looks that transform the face into abstract art and sculptural form.' },
      { name: 'Cybernetic Beauty', slug: 'cybernetic-beauty', sub_niche: 'Makeup & Face Art', description: 'Makeup and prosthetics simulating cybernetic implants, circuits, and machine integration.' },
      { name: 'Elemental Looks', slug: 'elemental-looks', sub_niche: 'Makeup & Face Art', description: 'Nature-element makeup themes: fire, water, earth, air rendered on the human face.' },
      { name: 'Dark Glam', slug: 'dark-glam', sub_niche: 'Makeup & Face Art', description: 'Glamorous dark-palette makeup with smoky eyes, bold lips, and dramatic contouring.' },
      // Sub-niche: Body & Hair Art
      { name: 'Fantasy Hair Color', slug: 'fantasy-hair-color', sub_niche: 'Body & Hair Art', description: 'Vivid, impossible hair color designs with gradients, patterns, and luminous effects.' },
      { name: 'Body Paint Couture', slug: 'body-paint-couture', sub_niche: 'Body & Hair Art', description: 'Full-body paint designs that simulate clothing, armor, or abstract art installations.' },
      { name: 'Nail Art Extreme', slug: 'nail-art-extreme', sub_niche: 'Body & Hair Art', description: 'Sculptural and miniature art nail designs pushing the limits of manicure artistry.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. Concept Designers (2 sub-niches, 7 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Concept Designers',
    slug: 'concept-designers',
    description: 'Professional concept art and design visualization for games, films, products, and architectural projects powered by AI.',
    icon: '\u270F\uFE0F',
    color: '#6366f1',
    sort_order: 5,
    niches: [
      // Sub-niche: Entertainment Concept Art
      { name: 'Character Concept Sheets', slug: 'character-concept-sheets', sub_niche: 'Entertainment Concept Art', description: 'Multi-angle character turnarounds with expression sheets and costume variants for production.' },
      { name: 'Environment Concepts', slug: 'environment-concepts', sub_niche: 'Entertainment Concept Art', description: 'Landscape and interior concept paintings for games, film, and animation pre-production.' },
      { name: 'Creature Design', slug: 'creature-design', sub_niche: 'Entertainment Concept Art', description: 'Fantastical creature concepts with anatomy studies, scale references, and color variations.' },
      { name: 'Vehicle & Mech Design', slug: 'vehicle-mech-design', sub_niche: 'Entertainment Concept Art', description: 'Sci-fi vehicles, mechs, and spacecraft with technical callouts and cutaway views.' },
      // Sub-niche: Product & Architecture
      { name: 'Product Visualization', slug: 'product-visualization', sub_niche: 'Product & Architecture', description: 'Photorealistic product renders and concept sketches for industrial design and marketing.' },
      { name: 'Architectural Concepts', slug: 'architectural-concepts', sub_niche: 'Product & Architecture', description: 'Futuristic building designs and interior concepts blending parametric and organic forms.' },
      { name: 'UI/UX Concept Art', slug: 'ui-ux-concept-art', sub_niche: 'Product & Architecture', description: 'Sci-fi and futuristic user interface designs for games, films, and speculative tech.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. Marketers (2 sub-niches, 6 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Marketers',
    slug: 'marketers',
    description: 'AI-generated marketing visuals and campaign assets purpose-built for advertising, social media, and brand storytelling.',
    icon: '\uD83D\uDCC8',
    color: '#10b981',
    sort_order: 6,
    niches: [
      // Sub-niche: Ad Creative
      { name: 'Social Ad Visuals', slug: 'social-ad-visuals', sub_niche: 'Ad Creative', description: 'Scroll-stopping ad creatives optimized for Instagram, Facebook, and TikTok campaigns.' },
      { name: 'Product Photography AI', slug: 'product-photography-ai', sub_niche: 'Ad Creative', description: 'AI-generated product shots with studio lighting, lifestyle contexts, and seasonal themes.' },
      { name: 'Campaign Mood Boards', slug: 'campaign-mood-boards', sub_niche: 'Ad Creative', description: 'Visual mood boards and style tiles for campaign pitches and creative direction.' },
      // Sub-niche: Brand & Content
      { name: 'Brand Identity Visuals', slug: 'brand-identity-visuals', sub_niche: 'Brand & Content', description: 'Logo concepts, color palette explorations, and brand guideline visual references.' },
      { name: 'Blog & Editorial Art', slug: 'blog-editorial-art', sub_niche: 'Brand & Content', description: 'Article header images, editorial illustrations, and content marketing visuals.' },
      { name: 'Email Campaign Graphics', slug: 'email-campaign-graphics', sub_niche: 'Brand & Content', description: 'Newsletter headers, promotional banners, and email template visual elements.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. AI Influencers (2 sub-niches, 5 niches)
  // ──────────────────────────────────────────────
  {
    name: 'AI Influencers',
    slug: 'ai-influencers',
    description: 'Virtual influencer character design and content creation for brands building AI-powered social media personalities.',
    icon: '\uD83E\uDD16',
    color: '#f97316',
    sort_order: 7,
    niches: [
      // Sub-niche: Character Creation
      { name: 'Virtual Influencer Profiles', slug: 'virtual-influencer-profiles', sub_niche: 'Character Creation', description: 'Complete AI influencer persona packages with consistent face, style, and personality.' },
      { name: 'AI Model Portfolios', slug: 'ai-model-portfolios', sub_niche: 'Character Creation', description: 'Fashion and commercial model portfolios generated with consistent AI characters.' },
      { name: 'Digital Twin Concepts', slug: 'digital-twin-concepts', sub_niche: 'Character Creation', description: 'Digital twin character concepts for real people entering the virtual influencer space.' },
      // Sub-niche: Content & Lifestyle
      { name: 'Lifestyle Content Packs', slug: 'lifestyle-content-packs', sub_niche: 'Content & Lifestyle', description: 'Day-in-the-life content sets: cafes, travel, fitness, and fashion for virtual influencers.' },
      { name: 'Brand Collaboration Shots', slug: 'brand-collaboration-shots', sub_niche: 'Content & Lifestyle', description: 'Product placement and brand partnership visuals featuring AI influencer characters.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. Alt Accessories (2 sub-niches, 5 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Alt Accessories',
    slug: 'alt-accessories',
    description: 'Alternative and avant-garde accessory designs from jewelry to headwear, visualized through AI for designers and retailers.',
    icon: '\uD83D\uDC51',
    color: '#a855f7',
    sort_order: 8,
    niches: [
      // Sub-niche: Jewelry & Adornment
      { name: 'Cyberpunk Jewelry', slug: 'cyberpunk-jewelry', sub_niche: 'Jewelry & Adornment', description: 'Circuit-board rings, holographic pendants, and LED-embedded wearable tech jewelry.' },
      { name: 'Gothic Silverwork', slug: 'gothic-silverwork', sub_niche: 'Jewelry & Adornment', description: 'Dark silver and pewter jewelry with skull, serpent, and occult motifs.' },
      { name: 'Crystal & Mineral', slug: 'crystal-and-mineral', sub_niche: 'Jewelry & Adornment', description: 'Raw crystal, geode, and mineral-incorporated jewelry with organic settings.' },
      // Sub-niche: Headwear & Eyewear
      { name: 'Fantasy Headpieces', slug: 'fantasy-headpieces', sub_niche: 'Headwear & Eyewear', description: 'Elaborate crowns, antler headpieces, and floral halos for editorial and cosplay.' },
      { name: 'Futuristic Eyewear', slug: 'futuristic-eyewear', sub_niche: 'Headwear & Eyewear', description: 'Next-generation sunglasses and visors with HUD overlays and smart-glass aesthetics.' },
    ],
  },

  // ──────────────────────────────────────────────
  // 9. Virtual Companion (2 sub-niches, 5 niches)
  // ──────────────────────────────────────────────
  {
    name: 'Virtual Companion',
    slug: 'virtual-companion',
    description: 'AI companion character design and visual development for interactive entertainment, wellness apps, and virtual relationship platforms.',
    icon: '\uD83D\uDCAC',
    color: '#06b6d4',
    sort_order: 9,
    niches: [
      // Sub-niche: Companion Characters
      { name: 'Anime Companion Design', slug: 'anime-companion-design', sub_niche: 'Companion Characters', description: 'Anime-style companion characters with emotion sets, outfit variants, and scene contexts.' },
      { name: 'Realistic AI Partners', slug: 'realistic-ai-partners', sub_niche: 'Companion Characters', description: 'Photorealistic virtual companion characters with natural expressions and diverse styles.' },
      { name: 'Fantasy Companions', slug: 'fantasy-companions', sub_niche: 'Companion Characters', description: 'Mythical and fantasy-themed companion characters: elves, fairies, and magical beings.' },
      // Sub-niche: Interactive Visuals
      { name: 'Chat Avatar Expressions', slug: 'chat-avatar-expressions', sub_niche: 'Interactive Visuals', description: 'Expression and emotion sprite sheets for chat-based companion applications.' },
      { name: 'Scene & Background Packs', slug: 'scene-background-packs', sub_niche: 'Interactive Visuals', description: 'Location backgrounds for companion interactions: homes, cafes, parks, and fantasy settings.' },
    ],
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data (in reverse order due to foreign keys)
  await knex('niche_subscriptions').del().catch(() => {});
  await knex('submissions').del().catch(() => {});
  await knex('images').del().catch(() => {});
  await knex('niches').del();
  await knex('categories').del();

  for (const cat of categories) {
    const [inserted] = await knex('categories')
      .insert({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        sort_order: cat.sort_order,
      })
      .returning('id');

    const categoryId = inserted.id || inserted;

    const nicheRows = cat.niches.map((niche, idx) => ({
      category_id: categoryId,
      name: niche.name,
      slug: niche.slug,
      sub_niche: niche.sub_niche,
      description: niche.description,
      sort_order: idx + 1,
    }));

    await knex('niches').insert(nicheRows);
  }

  // Log summary
  const catCount = await knex('categories').count('* as count').first();
  const nicheCount = await knex('niches').count('* as count').first();
  console.log(`Seeded ${catCount?.count} categories and ${nicheCount?.count} niches`);
}
