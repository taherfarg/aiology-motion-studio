import { Composition, Folder } from "remotion";
import { TechnicalCheck } from "./compositions/TechnicalCheck";
import { EpisodeComposition, type EpisodeProps } from "./compositions/Episode";
import { episodeSchema } from "./utils/episode-schema";
import { framesForDuration } from "./utils/timing";
import "./utils/fonts";
import { SilentPreview } from "./episodes/episode001/SilentPreview";
import { HookScene } from "./episodes/episode001/HookScene";
import { AIScene } from "./episodes/episode001/AIScene";
import { LearningScene } from "./episodes/episode001/LearningScene";
import { ChatScene } from "./episodes/episode001/ChatScene";
import { OutroScene } from "./episodes/episode001/OutroScene";
import { previewFrames } from "./episodes/episode001/timeline";
import { DirectorCut } from "./episodes/episode001/redesign/DirectorCut";
import { Hook as DirectedHook } from "./episodes/episode001/redesign/Hook";
import { Intelligence } from "./episodes/episode001/redesign/Intelligence";
import { Learning as DirectedLearning } from "./episodes/episode001/redesign/Learning";
import { Conversation } from "./episodes/episode001/redesign/Conversation";
import { Closing } from "./episodes/episode001/redesign/Closing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Episode001DirectorCut"
        component={DirectorCut}
        durationInFrames={previewFrames}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="DirectorCutScenes">
        <Composition
          id="DirectedHook"
          component={DirectedHook}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DirectedAI"
          component={Intelligence}
          durationInFrames={330}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DirectedLearning"
          component={DirectedLearning}
          durationInFrames={480}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DirectedConversation"
          component={Conversation}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="DirectedClosing"
          component={Closing}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Composition
        id="Episode001Preview"
        component={SilentPreview}
        durationInFrames={previewFrames}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Episode001Scenes">
        <Composition
          id="Episode001Hook"
          component={HookScene}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Episode001AI"
          component={AIScene}
          durationInFrames={330}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Episode001Learning"
          component={LearningScene}
          durationInFrames={480}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Episode001Chat"
          component={ChatScene}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Episode001Outro"
          component={OutroScene}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Setup">
        <Composition
          id="TechnicalCheck"
          component={TechnicalCheck}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Composition
        id="Episode"
        component={EpisodeComposition}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ episode: null, assetRoot: "" } satisfies EpisodeProps}
        calculateMetadata={({ props }) => {
          if (!props.episode) return {};
          const episode = episodeSchema.parse(props.episode);
          if (episode.status !== "ready" || !episode.voiceover)
            throw new Error(
              "Episode requires recorded voiceover and complete timing",
            );
          return {
            durationInFrames: framesForDuration(
              episode.voiceover.durationMs,
              30,
            ),
          };
        }}
      />
    </>
  );
};
