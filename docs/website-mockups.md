# Website mockups

Keep each website's mockup under its own folder in `src/components/work/`:

```text
src/components/work/
  BitkubBlockchain/
    index.tsx
    WebsiteMockup/
      index.tsx
      WebsiteMockup.module.css
      WebsiteMockup.stories.tsx
  WorkPreview/
    index.tsx
```

`BitkubBlockchain/index.tsx` composes the shared browser frame and the Bitkub website mockup. Its `WebsiteMockup/` folder owns the page, styles, hero, scroll reveals, product selection, achievement counters, and pointer effect.

The shared `BrowserPreviewFrame` remains in `src/components/molecules/BrowserPreviewFrame/`. It owns browser chrome, loading, the scroll viewport, Pause/Resume, Replay, and document visibility handling. It accepts website mockups through `children` and does not import any project mockup.

To add another website:

1. Create a folder under `src/components/work/` for that website, with its own mockup, styles, and stories.
2. Compose its preview with `BrowserPreviewFrame`:

   ```tsx
   <BrowserPreviewFrame title="New website preview" address="Website preview">
     <NewWebsiteMockup />
   </BrowserPreviewFrame>
   ```

3. Register the preview by its existing work slug in `WORK_PREVIEWS` in `src/components/work/WorkPreview/index.tsx`. Work Detail renders the matching preview; unregistered works have no preview. Content authors do not need to set implementation flags.

Animated mockups can call `useBrowserPreviewFrame()` inside the frame to read `active` and `viewportRef`. Use `active` to pause browser work and `viewportRef` as the root for scroll observers. Replay remounts the content and resets the viewport. Mockups remain responsible for reduced motion, their own effects, and cleanup.

The frame provides an inherited `--preview-play-state` CSS variable for CSS animations. Page-specific rules that override playback must honor `active`. Keep content and animations in each website's folder rather than adding page-specific options to the frame.

## Storybook

Keep one content-only story per website under `Work/<Website>`. Render the website mockup directly with a fullscreen layout. Supply `BrowserPreviewFrameContext` with `active: true` and a null viewport ref to use the document as the scroll root; the decorator must not render browser chrome or preview controls.

Do not add a second framed-preview story for each work. The shared frame has its own story under `Molecules/BrowserPreviewFrame`, and Work Detail covers integration with the frame.
