#!/usr/bin/env bash
# Transcodes assets-source/hero-video.mp4 into web deliverables.
#   public/video/hero-1080.mp4 (H.264, ~6-8 MB)  public/video/hero-1080.webm (VP9)
#   public/video/hero-720.mp4  (mobile)          public/video/hero-loop-1080.mp4 + .webm (seamless 16 s loop)
#   public/images/hero/poster.{avif,webp,jpg}    (strongest still)
# Usage: pnpm video:build [loopStartSeconds] [posterSeconds]
set -euo pipefail
SRC="assets-source/hero-video.mp4"
OUT="public/video"; POSTER="public/images/hero"
LOOP_START="${1:-12}"; LOOP_LEN=16; POSTER_AT="${2:-20}"
[ -f "$SRC" ] || { echo "Missing $SRC. Drop the hero film there first."; exit 1; }
mkdir -p "$OUT" "$POSTER"
command -v ffmpeg >/dev/null || { echo "ffmpeg is required"; exit 1; }

echo "→ full film 1080p MP4"
ffmpeg -y -loglevel error -i "$SRC" -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-1080.mp4"
echo "→ full film 1080p WebM"
ffmpeg -y -loglevel error -i "$SRC" -an -vf "scale=1920:-2" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 "$OUT/hero-1080.webm"
echo "→ full film with sound (lightbox)"
ffmpeg -y -loglevel error -i "$SRC" -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$OUT/hero-film.mp4"
echo "→ mobile 720p"
ffmpeg -y -loglevel error -i "$SRC" -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-720.mp4"
echo "→ seamless loop (${LOOP_LEN}s from ${LOOP_START}s, 1s cross-fade)"
ffmpeg -y -loglevel error -ss "$LOOP_START" -t "$LOOP_LEN" -i "$SRC" -an -filter_complex "[0:v]split[a][b];[a]trim=0:$((LOOP_LEN-1)),setpts=PTS-STARTPTS[head];[b]trim=$((LOOP_LEN-1)):$LOOP_LEN,setpts=PTS-STARTPTS[tail];[tail][head]xfade=transition=fade:duration=1:offset=0[v]" -map "[v]" -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-loop-1080.mp4"
ffmpeg -y -loglevel error -i "$OUT/hero-loop-1080.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 35 -row-mt 1 "$OUT/hero-loop-1080.webm"
ffmpeg -y -loglevel error -i "$OUT/hero-loop-1080.mp4" -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-loop-720.mp4"
echo "→ poster at ${POSTER_AT}s"
ffmpeg -y -loglevel error -ss "$POSTER_AT" -i "$SRC" -frames:v 1 -vf "scale=1920:-2" -q:v 2 "$POSTER/poster.jpg"
ffmpeg -y -loglevel error -i "$POSTER/poster.jpg" -c:v libwebp -q:v 82 "$POSTER/poster.webp"
ffmpeg -y -loglevel error -i "$POSTER/poster.jpg" -c:v libaom-av1 -still-picture 1 -crf 28 "$POSTER/poster.avif" || echo "(avif skipped: libaom not available)"
ls -la "$OUT" "$POSTER"
echo "Done. Set hero.videoLoop/videoLoopWebm/videoMobile in the CMS (or src/content/seed/home.ts) to /video/hero-loop-*.mp4|webm and upload hero-film.mp4 as the Site settings film asset."
