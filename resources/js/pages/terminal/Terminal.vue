<script setup lang="ts">
import { computed, defineComponent, h, nextTick, onMounted, ref, version, watch } from 'vue'
import type { FileDir, OutputLine } from './commands'
import { commandRegistry, createFileSystem, getNodeAtPath, resolveAbsPath, shellAliases } from './commands'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PromptSnapshot {
    user: string
    host: string
    dir: string
}

type HistoryEntry =
    | ({ isCommand?: false } & OutputLine)
    | { isCommand: true; content: string; prompt: PromptSnapshot }

// ─── Powerline prompt component ───────────────────────────────────────────────

const SEG1_BG = '#536793'
const SEG2_BG = '#2a3f5f'

const PromptBar = defineComponent({
    name: 'PromptBar',
    props: {
        prompt: {
            type: Object as () => PromptSnapshot,
            required: true,
        },
    },
    setup(props) {
        return () => {
            const p = props.prompt

            const seg1 = h(
                'span',
                {
                    class: 'inline-flex items-center px-2.5 text-white text-xs leading-6 rounded-l',
                    style: `background:${SEG1_BG}`,
                },
                [
                    h('span', { class: 'text-[#fdbdb4] mr-0.5 opacity-80' }, ''),
                    ` ${p.user}`,
                    h('span', { class: 'opacity-50 mx-0.5' }, '@'),
                    p.host,
                    ' ',
                ],
            )

            const arr1 = h(
                'span',
                {
                    class: 'inline-flex items-center text-base leading-6',
                    style: `color:${SEG1_BG};background:${SEG2_BG}`,
                },
                '▶',
            )

            const seg2 = h(
                'span',
                {
                    class: 'inline-flex items-center px-2.5 text-xs leading-6',
                    style: `background:${SEG2_BG};color:#fdbdb4`,
                },
                p.dir,
            )

            const arr2 = h(
                'span',
                {
                    class: 'inline-flex items-center text-base leading-6',
                    style: `color:${SEG2_BG}`,
                },
                '▶',
            )

            const prompt = h('span', { class: 'ml-1.5 text-green-400 font-bold' }, '❯')

            return h('div', { class: 'inline-flex items-center shrink-0' }, [seg1, arr1, seg2, arr2, prompt])
        }
    },
})

// ─── State ────────────────────────────────────────────────────────────────────

const USER = 'guest'
const HOST = 'wrenbow.me'

const user = ref(USER)
const host = ref(HOST)
const currentDir = ref(`/home/${USER}`)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const terminalRef = ref<HTMLDivElement | null>(null)

const fs: FileDir = createFileSystem(USER)

// Command history navigation (up/down arrows)
const cmdHistory = ref<string[]>([])
const historyIndex = ref(-1)
const savedInput = ref('')

// Autocomplete suggestions shown below the input
const suggestions = ref<string[]>([])

watch(inputValue, () => {
    suggestions.value = []
})

// Terminal output buffer
const history = ref<HistoryEntry[]>([
    { content: '<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-black">                           __</span>                  ', isHtml: true },
    { content: '<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-black"> _      __________  ____  / /_  ____ _      __</span> ', isHtml: true },
    { content: '<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-black">| | /| / / ___/ _ \\/ __ \\/ __ \\/ __ \\ | /| / /</span>', isHtml: true },
    { content: '<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-black">| |/ |/ / /  /  __/ / / / /_/ / /_/ / |/ |/ /</span>  ', isHtml: true },
    { content: '<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-black">|__/|__/_/   \\___/_/ /_/_.___/\\____/|__/|__/</span> ', isHtml: true },
    { content: ' ' },
    { content: `Wrenbow Interactive Shell (WISH) v1.0.0  ·  Vue ${version}` },
    { content: ' ' },
    { content: ' * GitHub:      https://wrenbow.me/github' },
    { content: ' * <span class="text-bluesky">BlueSky:</span>     https://wrenbow.me/bsky' },
    { content: ' * <span class="text-twitch">Twitch:</span>      https://wrenbow.me/ttv' },
    { content: ' * <span class="text-youtube">YouTube:</span>     https://wrenbow.me/youtube' },
    { content: ' * <span class="text-linktree">LinkTree:</span>    https://wrenbow.me/linktree' },
    { content: ' ' },
    { content: 'Last login: Mon Mar 17 10:00:00 2026 from 127.0.0.1' },
    { content: ' ' },
    { content: 'Type `help` to list all available commands.' },
    { content: 'Type `gui` to open the graphical user interface.' },
    { content: ' ' },
])

// ─── Computed ─────────────────────────────────────────────────────────────────

const displayDir = computed(() => {
    const home = `/home/${user.value}`

    if (currentDir.value === home) {
        return '~'
    }

    if (currentDir.value.startsWith(`${home}/`)) {
        return `~${currentDir.value.slice(home.length)}`
    }

    return currentDir.value
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderContent = (text: string): string =>
    text
        .replace(/(https?:\/\/[^\s<>"]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300 transition-colors">$1</a>')
        .replace(/`([^`]+)`/g, '`<code class="text-amber-300 font-bold">$1</code>`')

const scrollToBottom = () => {
    nextTick(() => {
        if (terminalRef.value) {
            terminalRef.value.scrollTop = terminalRef.value.scrollHeight
        }
    })
}

// ─── Command execution ────────────────────────────────────────────────────────

const executeCommand = () => {
    const raw = inputValue.value.trim()

    if (!raw) {
        return
    }

    if (cmdHistory.value[0] !== raw) {
        cmdHistory.value.unshift(raw)
    }

    historyIndex.value = -1
    savedInput.value = ''

    history.value.push({
        isCommand: true,
        content: raw,
        prompt: { user: user.value, host: host.value, dir: displayDir.value },
    })

    // Expand shell alias before parsing (e.g. `ll` → `ls -la`)
    const firstToken = raw.split(' ')[0]
    const expanded = shellAliases.has(firstToken)
        ? shellAliases.get(firstToken)! + raw.slice(firstToken.length)
        : raw

    // Parse input, respecting quoted strings
    const parts = expanded.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? []
    const cmdName = parts[0] ?? ''
    const args = parts.slice(1).map((a) => a.replace(/^["']|["']$/g, ''))

    const cmd = commandRegistry.get(cmdName)

    if (!cmd) {
        history.value.push({ content: `wish: command not found: ${cmdName}`, isError: true })
    } else {
        const output = cmd.execute(args, {
            user: user.value,
            host: host.value,
            currentDir,
            getFs: () => fs,
        })

        if (output.some((l) => l.content === '__CLEAR__')) {
            history.value = []
        } else {
            for (const line of output) {
                history.value.push(line as HistoryEntry)
            }
        }
    }

    inputValue.value = ''
    suggestions.value = []
    scrollToBottom()
}

// ─── Tab completion ───────────────────────────────────────────────────────────

const findCommonPrefix = (strings: string[]): string => {
    if (!strings.length) {
        return ''
    }

    let prefix = strings[0]

    for (const s of strings.slice(1)) {
        while (!s.startsWith(prefix)) {
            prefix = prefix.slice(0, -1)
        }
    }

    return prefix
}

const handleTabComplete = () => {
    const parts = inputValue.value.split(' ')

    if (parts.length <= 1) {
        const partial = parts[0]
        const allNames = [...new Set([...commandRegistry.keys(), ...shellAliases.keys()])].sort()
        const matches = allNames.filter((n) => n.startsWith(partial))

        if (matches.length === 1) {
            inputValue.value = matches[0] + ' '
        } else if (matches.length > 1) {
            const common = findCommonPrefix(matches)

            if (common.length > partial.length) {
                inputValue.value = common
            } else {
                suggestions.value = matches
            }
        }

        return
    }

    const partial = parts[parts.length - 1]
    const slashIdx = partial.lastIndexOf('/')
    const dirPart = slashIdx >= 0 ? partial.slice(0, slashIdx + 1) : ''
    const basePart = slashIdx >= 0 ? partial.slice(slashIdx + 1) : partial
    const searchDir = dirPart ? resolveAbsPath(currentDir.value, dirPart, user.value) : currentDir.value

    const node = getNodeAtPath(fs, searchDir)

    if (node?.type !== 'dir') {
        return
    }

    const matches = Object.keys(node.children).filter((k) => k.startsWith(basePart))

    if (matches.length === 1) {
        const child = node.children[matches[0]]
        const suffix = child.type === 'dir' ? '/' : ' '

        parts[parts.length - 1] = dirPart + matches[0] + suffix
        inputValue.value = parts.join(' ')
    } else if (matches.length > 1) {
        const common = findCommonPrefix(matches)

        if (common.length > basePart.length) {
            parts[parts.length - 1] = dirPart + common
            inputValue.value = parts.join(' ')
        } else {
            suggestions.value = matches
        }
    }
}

// ─── Keyboard handling ────────────────────────────────────────────────────────

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        executeCommand()

        return
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault()

        if (historyIndex.value === -1) {
            savedInput.value = inputValue.value
        }

        if (historyIndex.value < cmdHistory.value.length - 1) {
            historyIndex.value++
            inputValue.value = cmdHistory.value[historyIndex.value]
        }

        return
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault()

        if (historyIndex.value > 0) {
            historyIndex.value--
            inputValue.value = cmdHistory.value[historyIndex.value]
        } else if (historyIndex.value === 0) {
            historyIndex.value = -1
            inputValue.value = savedInput.value
        }

        return
    }

    if (e.key === 'Tab') {
        e.preventDefault()
        handleTabComplete()

        return
    }

    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()

        if (inputValue.value) {
            history.value.push({
                isCommand: true,
                content: inputValue.value + '^C',
                prompt: { user: user.value, host: host.value, dir: displayDir.value },
            })

            inputValue.value = ''
            historyIndex.value = -1
            scrollToBottom()
        }

        return
    }

    if (e.key === 'Escape') {
        suggestions.value = []

        return
    }

    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        history.value = []
    }
}

// ─── Focus ────────────────────────────────────────────────────────────────────

const focusInput = () => inputRef.value?.focus()

onMounted(focusInput)
</script>

<template>
    <div
        ref="terminalRef"
        class="bg-[#0d1117] text-gray-100 font-mono text-sm p-4 h-screen overflow-y-auto cursor-text"
        @click="focusInput"
    >
        <!-- Output history -->
        <div>
            <template v-for="(entry, i) in history" :key="i">
                <!-- Command echo with powerline prompt snapshot -->
                <div
                    v-if="entry.isCommand"
                    class="flex items-center flex-wrap py-0.5"
                >
                    <PromptBar :prompt="(entry as { isCommand: true; prompt: PromptSnapshot }).prompt" />
                    <span class="ml-2 text-gray-100">{{ entry.content }}</span>
                </div>

                <!-- Error output -->
                <div
                    v-else-if="(entry as OutputLine).isError"
                    class="text-red-400 whitespace-pre-wrap leading-5"
                    v-html="renderContent(entry.content)"
                />

                <!-- HTML output (styled text, clickable links) -->
                <div
                    v-else-if="(entry as OutputLine).isHtml"
                    class="whitespace-pre-wrap leading-5"
                    v-html="entry.content"
                />

                <!-- Plain text output (URLs auto-linked, backticks highlighted) -->
                <div
                    v-else
                    class="whitespace-pre-wrap leading-5"
                    v-html="renderContent(entry.content)"
                />
            </template>
        </div>

        <!-- Active input line -->
        <div class="flex items-center py-0.5 mt-0.5">
            <PromptBar :prompt="{ user, host, dir: displayDir }" />
            <input
                ref="inputRef"
                v-model="inputValue"
                type="text"
                class="bg-transparent border-none outline-none text-gray-100 font-mono text-sm flex-1 min-w-0 ml-2 caret-green-400"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="none"
                spellcheck="false"
                @keydown="handleKeydown"
            />
        </div>

        <!-- Autocomplete suggestions -->
        <div
            v-if="suggestions.length"
            class="flex flex-wrap gap-x-6 gap-y-1 mt-1 pl-2 py-1 border-l-2 border-[#536793]/50"
        >
            <span
                v-for="s in suggestions"
                :key="s"
                class="text-yellow-300 text-xs"
            >{{ s }}</span>
        </div>
    </div>
</template>
