# Timestamped storyboard

Voiceover is the master timeline. Measure its duration with FFprobe, then listen to the actual file and match script phrases to timestamps. Do not estimate word timestamps from character count. For captions, use creator-supplied timing, SRT, manually checked cues, or an explicitly selected local transcription/alignment tool; never invent confidence values.

| Scene ID | Start/end ms | Spoken cue | Learning point | Visual action | Caption | Assets | Review |
| --- | --- | --- | --- | --- | --- | --- | --- |

Author structured timing in episode.json. Scene IDs are unique, scenes are ordered and contiguous from 0 to the voiceover end, and caption intervals are half-open [startMs,endMs). Frame boundaries use ceil(ms×fps/1000) for both ends so adjacent scenes share the same boundary. Confirm timing in playback even after automated validation.

For each scene describe what appears, what changes, and what the viewer should understand from the change. Use one hierarchy: title, mechanism, annotation. Start with an accurate diagram before animating it. Label simplified elements and state where a metaphor stops being literal.

Keep title lines short and caption phrases normally one or two lines. Split long cues at natural spoken pauses without moving their actual onset. If narration is too dense, simplify imagery or ask for a script/recording revision; do not speed up the voice silently.

Schema supports title, concept, process, comparison, neural, and dataflow scenes. For more specialized visuals, add a scene component and extend the schema and validator intentionally; template scenes are not a substitute for episode-specific directing.
