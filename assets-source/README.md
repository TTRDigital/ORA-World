# assets-source

Drop the original hero film here as `hero-video.mp4` (1920×1046, ~110 s, ~20 MB).
`pnpm video:build` transcodes it into `public/video/` (1080p MP4/WebM, 720p MP4, loop cut, poster frames).
The original is kept out of `public/`; the full film is uploaded to Sanity (file asset) for the "Watch the film" lightbox.

Status: **not yet present** (checked 2026-10-28). Phase 2 video pipeline runs the moment it lands.
