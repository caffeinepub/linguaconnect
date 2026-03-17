# LinguaConnect

## Current State
New project — no existing application.

## Requested Changes (Diff)

### Add
- Social feed page with filter tabs: Tous, Audios, Textes
- Post cards with: author avatar, name, language badge, timestamp, overflow menu
- Media/audio card with waveform visualization, playback controls (prev/play/next), scrubber, time
- Bilingual caption overlay: original sentence with colored word highlights + translation line
- Post actions: like count, comment count, "Voir version originale" button
- "Répondre en audio" CTA button on audio posts
- Audio badge chip on post header ("Audio" label)
- Bottom navigation bar: Home, Globe, Record mic+, Chat, Profile
- Dark navy sticky header with LinguaConnect brand
- Sample posts with mock data (Sophie Durand, Mark Tan, Emily Jones)

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: store posts (author, content, language, translation, type=audio|text, likes, comments)
2. Backend: CRUD posts, like/unlike, get feed with filter
3. Frontend: App shell with sticky header + bottom nav
4. Frontend: Feed page with segmented filter tabs
5. Frontend: PostCard component with media area, caption overlays, waveform, player, actions
6. Frontend: AudioReply button + "Voir version originale" toggle
7. Frontend: Seed sample posts on first load
