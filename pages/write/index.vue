<template>
  <div class="overflow-hidden w-screen h-screen flex flex-col">
    <div class="flex h-full overflow-hidden">
      <div id="parent" class="flex overflow-y-auto flex-col flex-1 items-start px-2 h-full">
        <bubble-menu
          v-if="editor"
          class="bubble-menu"
          :tippy-options="{ duration: 100 }"
          :editor="editor"
        >
          <button
            :class="{ 'is-active': editor.isActive('hea  ding', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >H1</button>
          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >H2</button>
          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >H3</button>
          <button
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >Bullet List</button>
          <button
            :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
          >Bold</button>
          <button
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
          >Italic</button>
          <button
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
          >Strike</button>
        </bubble-menu>

        <floating-menu
          v-if="editor"
          class="floating-menu"
          :tippy-options="{ duration: 100 }"
          :editor="editor"
        >
          <button
            :class="{ 'is-active': editor.isActive('blockQuote') }"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >Quote</button>
          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >H1</button>
          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >H2</button>
          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >H3</button>
          <button
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >Bullet List</button>

          <button
            :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
          >Bold</button>
          <button
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
          >Italic</button>
          <button
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
          >Strike</button>
        </floating-menu>

        <div class="mx-auto w-full max-w-2xl">
          <editor-content :editor="editor" class="p-4" />
          <div
            v-if="editor"
            class="p-4"
            :class="{
              'character-count': true,
              'character-count--warning': editor.getCharacterCount() === limit,
            }"
          >
            <svg height="20" width="20" viewBox="0 0 20 20" class="character-count__graph">
              <circle r="10" cx="10" cy="10" fill="#e9ecef" />
              <circle
                r="5"
                cx="10"
                cy="10"
                fill="transparent"
                stroke="currentColor"
                stroke-width="10"
                :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
                transform="rotate(-90) translate(-20)"
              />
              <circle r="6" cx="10" cy="10" fill="white" />
            </svg>

            <div class="text-warnGray-700">{{ editor.getCharacterCount() }}/{{ limit }} characters</div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  computed,

  useContext,

  useRouter,
} from '@nuxtjs/composition-api'

import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'


export default defineComponent({
  components: { EditorContent, BubbleMenu, FloatingMenu },
  middleware: 'auth',

  setup(props) {
    const { app } = useContext()
    const router = useRouter()

    const isShowQuickSearch = ref(false)
    const loading = ref(true)
    const editor = ref<Editor>()
    const summary = ref<Editor>()
    const limit = ref(9000)
    const summaryLimit = ref(300)
    const data = ref({})
    const summaryData = ref()

    onMounted(() => {

      editor.value = new Editor({
        extensions: [

          StarterKit,
          Document,
          CharacterCount.configure({
            limit: limit.value,
          }),
          Placeholder.configure({
            placeholder: 'Write book comment',
          }),
        ],
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose dark:prose-light focus:outline-none mx-auto ',
          },
        },
        onUpdate: () => {
          data.value = editor.value?.getJSON()
          // // HTML
          // emit('input', editor.value?.getHTML())

          // JSON
          // this.$emit('input', this.editor.getJSON())
        },
      })
      summary.value = new Editor({
        extensions: [
          StarterKit,
          Document,
          CharacterCount.configure({
            limit: summaryLimit.value,
          }),
          Placeholder.configure({
            placeholder: 'Write Summary',
          }),
        ],
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose focus:outline-none mx-auto ',
          },
        },
        onUpdate: () => {
          data.value = editor.value?.getJSON()
          // summaryData.value = summary.value?.getJSON()
          // // HTML
          // emit('input', editor.value?.getHTML())

          // JSON
          // this.$emit('input', this.editor.getJSON())
        },
      })

      editor.value.commands.focus('end')
    })

    onMounted(() => {
      app.$timeUtils.sleep(3500).then(() => (loading.value = false))
    })

    const percentage = computed(() => {
      return Math.round((100 / limit.value) * editor.value?.getCharacterCount())
    })

    function setContent() {
      // You can pass a JSON document to the editor.
      editor.value
        ?.chain()
        .focus()
        .insertContent({
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'It’s 19871. You can’t turn on a radio, or go to a mall without hearing Olivia Newton-John’s hit song, Physical.',
                },
              ],
            },
          ],
        })
        .run()
      // It’s likely that you’d like to focus the Editor after most commands.
      editor.value?.commands.focus()
    }

    onBeforeUnmount(() => {
      editor.value?.destroy()
    })


    return {
      editor,
      percentage,
      limit,
      summary,
      summaryLimit,
      isShowQuickSearch,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep {
  /* Basic editor styles */
  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }
  }

  /* Placeholder (at the top) */
  .ProseMirror p.is-editor-empty:first-child::before {
    @apply text-warnGray-500;
    content: attr(data-placeholder);
    float: left;
    pointer-events: none;
    height: 0;
  }
}
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}

.bubble-menu {
  @apply dark:bg-warnGray-700;
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  @apply bg-gray-200 dark:bg-warnGray-700 flex;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.character-count {
  @apply mt-1 flex items-center text-green-700;

  &--warning {
    @apply text-rose-600;
  }

  &__graph {
    @apply mr-0.5;
  }

  &__text {
    @apply text-warnGray-900;
  }
}

// loading

@mixin keyboard($position: 0, $value: 0) {
  $keys: map-merge(
    (
      0: "0",
      1: "0",
      2: "0",
      3: "0",
      4: "0",
      5: "0",
      6: "10px",
      7: "10px",
      8: "10px",
      9: "10px"
    ),
    (
      $position: $value
    )
  );
  box-shadow: 15px #{map-get($keys, 0)} 0 var(--key),
    30px #{map-get($keys, 1)} 0 var(--key),
    45px #{map-get($keys, 2)} 0 var(--key),
    60px #{map-get($keys, 3)} 0 var(--key),
    75px #{map-get($keys, 4)} 0 var(--key),
    90px #{map-get($keys, 5)} 0 var(--key),
    22px #{map-get($keys, 6)} 0 var(--key),
    37px #{map-get($keys, 7)} 0 var(--key),
    52px #{map-get($keys, 8)} 0 var(--key),
    60px #{map-get($keys, 8)} 0 var(--key),
    68px #{map-get($keys, 8)} 0 var(--key),
    83px #{map-get($keys, 9)} 0 var(--key);
}

.typewriter {
  --blue: #059669;
  --blue-dark: #047857;
  --key: #fff;
  --paper: #eef0fd;
  --text: #d3d4ec;
  --tool: #fbc56c;
  --duration: 3s;
  position: relative;
  animation: bounce var(--duration) linear infinite;
  .slide {
    width: 92px;
    height: 20px;
    border-radius: 3px;
    margin-left: 14px;
    transform: translateX(14px);
    background: linear-gradient(var(--blue), var(--blue-dark));
    animation: slide var(--duration) ease infinite;
    &:before,
    &:after,
    i:before {
      content: "";
      position: absolute;
      background: var(--tool);
    }
    &:before {
      width: 2px;
      height: 8px;
      top: 6px;
      left: 100%;
    }
    &:after {
      left: 94px;
      top: 3px;
      height: 14px;
      width: 6px;
      border-radius: 3px;
    }
    i {
      display: block;
      position: absolute;
      right: 100%;
      width: 6px;
      height: 4px;
      top: 4px;
      background: var(--tool);
      &:before {
        right: 100%;
        top: -2px;
        width: 4px;
        border-radius: 2px;
        height: 14px;
      }
    }
  }
  .paper {
    position: absolute;
    left: 24px;
    top: -26px;
    width: 40px;
    height: 46px;
    border-radius: 5px;
    background: var(--paper);
    transform: translateY(46px);
    animation: paper var(--duration) linear infinite;
    &:before {
      content: "";
      position: absolute;
      left: 6px;
      right: 6px;
      top: 7px;
      border-radius: 2px;
      height: 4px;
      transform: scaleY(0.8);
      background: var(--text);
      box-shadow: 0 12px 0 var(--text), 0 24px 0 var(--text),
        0 36px 0 var(--text);
    }
  }
  .keyboard {
    width: 120px;
    height: 56px;
    margin-top: -10px;
    z-index: 1;
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
    }
    &:before {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 7px;
      background: linear-gradient(135deg, var(--blue), var(--blue-dark));
      transform: perspective(10px) rotateX(2deg);
      transform-origin: 50% 100%;
    }
    &:after {
      left: 2px;
      top: 25px;
      width: 11px;
      height: 4px;
      border-radius: 2px;
      @include keyboard;
      animation: keyboard var(--duration) linear infinite;
    }
  }
}

@keyframes bounce {
  85%,
  92%,
  100% {
    transform: translateY(0);
  }
  89% {
    transform: translateY(-4px);
  }
  95% {
    transform: translateY(2px);
  }
}

@keyframes slide {
  5% {
    transform: translateX(14px);
  }
  15%,
  30% {
    transform: translateX(6px);
  }
  40%,
  55% {
    transform: translateX(0);
  }
  65%,
  70% {
    transform: translateX(-4px);
  }
  80%,
  89% {
    transform: translateX(-12px);
  }
  100% {
    transform: translateX(14px);
  }
}

@keyframes paper {
  5% {
    transform: translateY(46px);
  }
  20%,
  30% {
    transform: translateY(34px);
  }
  40%,
  55% {
    transform: translateY(22px);
  }
  65%,
  70% {
    transform: translateY(10px);
  }
  80%,
  85% {
    transform: translateY(0);
  }
  92%,
  100% {
    transform: translateY(46px);
  }
}

@keyframes keyboard {
  5%,
  12%,
  21%,
  30%,
  39%,
  48%,
  57%,
  66%,
  75%,
  84% {
    @include keyboard;
  }
  9% {
    @include keyboard(0, 2px);
  }
  18% {
    @include keyboard(3, 2px);
  }
  27% {
    @include keyboard(6, 12px);
  }
  36% {
    @include keyboard(8, 12px);
  }
  45% {
    @include keyboard(5, 2px);
  }
  54% {
    @include keyboard(1, 2px);
  }
  63% {
    @include keyboard(9, 12px);
  }
  72% {
    @include keyboard(2, 2px);
  }
  81% {
    @include keyboard(7, 12px);
  }
}

// Center & dribbble

.dribbble {
  position: fixed;
  display: block;
  right: 20px;
  bottom: 20px;
  img {
    display: block;
    height: 28px;
  }
}
</style>
