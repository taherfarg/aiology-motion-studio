# Audio-first workflow

Use the creator's recorded voiceover. Accept WAV, MP3, and other formats that FFprobe detects and FFmpeg decodes. No Fish Audio, TTS, voice cloning, paid voice APIs, or automatically generated narration.

1. Keep the original recording unchanged under the episode's assets/audio directory.
2. Probe actual duration and streams; validate decoding. Put measured durationMs into episode.json.
3. Read the script while listening, mark scene cues, and create checked captions in Caption[] format. Arabic wording should match what is spoken, including English terms.
4. Place narration, scene timing, and captions on the same untrimmed master timeline. If trimming or retiming is requested, update all three together and preserve the original.
5. Test meaningful visual events against the spoken cue; allow a small intentional lead for visual comprehension, recorded in the storyboard.
6. Preview with headphones and phone speakers. Check the beginning, every scene boundary, and the final spoken word.

Voice volume defaults to 1.0; optional music begins at 0.06, SFX at 0.15. These gains do not guarantee a proper mix: source loudness varies. Use supplied licensed media and lower or duck competing sound manually around speech. No music is added by default.

Final mix: inspect integrated loudness and true peak with FFmpeg ebur128 or loudnorm analysis. A starting target is about -16 LUFS integrated stereo and true peak <= -1 dBTP. Choose actual gains from measurements and listening; normalization is not an excuse to compress speech aggressively. Re-measure after encoding. Check AAC audio, 48 kHz preferred, no clipping or abrupt cuts. Do not normalize or change the creator's original without preserving it.

Useful commands: ffprobe -v error -show_format -show_streams -of json recording.wav; ffmpeg -i final.mp4 -af ebur128=peak=true -f null -
