import { router } from '@inertiajs/vue3'
import type { Ref } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OutputLine {
    content: string
    isHtml?: boolean
    isError?: boolean
}

export type FileNode = FileDir | FileFile

export interface FileDir {
    type: 'dir'
    children: Record<string, FileNode>
}

export interface FileFile {
    type: 'file'
    content: string
}

export interface CommandContext {
    user: string
    host: string
    currentDir: Ref<string>
    getFs: () => FileDir
}

export interface CommandDefinition {
    name: string
    description: string
    usage: string
    aliases?: string[]
    execute: (args: string[], ctx: CommandContext) => OutputLine[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const out = (content: string): OutputLine => ({ content })
const html = (content: string): OutputLine => ({ content, isHtml: true })
const err = (content: string): OutputLine => ({ content, isError: true })
const blank = (): OutputLine => ({ content: '' })

const link = (text: string, url: string): string =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300 transition-colors">${text}</a>`

// ─── File System ──────────────────────────────────────────────────────────────

export const createFileSystem = (user: string): FileDir => ({
    type: 'dir',
    children: {
        home: {
            type: 'dir',
            children: {
                [user]: {
                    type: 'dir',
                    children: {
                        Documents: {
                            type: 'dir',
                            children: {
                                'README.md': {
                                    type: 'file',
                                    content: [
                                        '# Welcome to the Wrenbow Interactive Shell (WISH)',
                                        '',
                                        'This is a simulated, read-only file system.',
                                        'Use `ls` to explore directories and `cat` to read files.',
                                        '',
                                        'Type `help` to see all available commands.',
                                    ].join('\n'),
                                },
                                'ABOUT.md': {
                                    type: 'file',
                                    content: [
                                        '# About Wrenbow',
                                        '',
                                        'Content creator, streamer, and developer.',
                                        'Find me on Twitch, YouTube, and beyond!',
                                        '',
                                        'Run the `about` command for the full story.',
                                    ].join('\n'),
                                },
                                'CONTACT.md': {
                                    type: 'file',
                                    content: [
                                        '# About Wrenbow',
                                        '',
                                        'Content creator, streamer, and developer.',
                                        'Find me on Twitch, YouTube, and beyond!',
                                        '',
                                        'Run the `about` command for the full story.',
                                    ].join('\n'),
                                },
                                'LEGAL.md': {
                                    type: 'file',
                                    content: [
                                        '# About Wrenbow',
                                        '',
                                        'Content creator, streamer, and developer.',
                                        'Find me on Twitch, YouTube, and beyond!',
                                        '',
                                        'Run the `about` command for the full story.',
                                    ].join('\n'),
                                },
                                'SOCIALS.md': {
                                    type: 'file',
                                    content: [
                                        '# About Wrenbow',
                                        '',
                                        'Content creator, streamer, and developer.',
                                        'Find me on Twitch, YouTube, and beyond!',
                                        '',
                                        'Run the `about` command for the full story.',
                                    ].join('\n'),
                                },
                            },
                        },
                        Downloads: {
                            type: 'dir',
                            children: {},
                        },
                        '.wishrc': {
                            type: 'file',
                            content: [
                                '# Wrenbow Interactive Shell (WISH) configuration',
                                'export SHELL=/bin/wish',
                                'export TERM=xterm-256color',
                                'export WISH_VERSION=1.0.0',
                                'export VUE_VERSION=$VUEVERSION',
                                ' ',
                                '# Aliases',
                                'alias ll="ls -la"',
                                'alias home="cd ~"',
                                'alias about="cat ~/Documents/ABOUT.md"',
                                'alias contact="cat ~/Documents/CONTACT.md"',
                                'alias legal="cat ~/Documents/LEGAL.md"',
                                'alias socials="cat ~/Documents/SOCIALS.md"',
                            ].join('\n'),
                        },
                    },
                },
            },
        },
        etc: {
            type: 'dir',
            children: {
                motd: {
                    type: 'file',
                    content: [
                        '                           __                     ',
                        ' _      __________  ____  / /_  ____ _      __    ',
                        '| | /| / / ___/ _ \\/ __ \\/ __ \\/ __ \\ | /| / /',
                        '| |/ |/ / /  /  __/ / / / /_/ / /_/ / |/ |/ /     ',
                        '|__/|__/_/   \\___/_/ /_/_.___/\\____/|__/|__/    ',
                        ' ',
                        'Wrenbow Interactive Shell (WISH) v${WISH_VERSION}  ·  Vue ${VUE_VERSION}',
                        ' ',
                        ' * GitHub:      https://wrenbow.me/github',
                        ' * BlueSky:     https://wrenbow.me/bsky',
                        ' * Twitch:      https://wrenbow.me/ttv',
                        ' * YouTube:     https://wrenbow.me/youtube',
                        ' * LinkTree:    https://wrenbow.me/linktree',
                        ' ',
                        'Last login: Mon Mar 17 10:00:00 2026 from 127.0.0.1',
                        ' ',
                        'Type `help` to list all available commands.',
                        'Type `gui` to open the graphical user interface.',
                    ].join('\n'),
                },
                hosts: {
                    type: 'file',
                    content: [
                        '127.0.0.1   localhost',
                        '127.0.1.1   wrenbow.me',
                        '::1         localhost ip6-localhost ip6-loopback',
                    ].join('\n'),
                },
            },
        },
        usr: {
            type: 'dir',
            children: {
                share: {
                    type: 'dir',
                    children: {
                        'LICENSE': {
                            type: 'file',
                            content: [
                                'License [PLACEHOLDER]',
                                'Copyright (c) 2026 wrenbow media group ltd.',
                                '',
                                'Aliquip excepteur enim laborum nisi minim. Mollitexcepteur ',
                                'reprehenderit aliqua nostrud Lorem magna mollit eiusmod adipisicing.',
                                'Culpa non ex consectetur velit ea ut ipsum officia.',
                            ].join('\n'),
                        },
                    },
                },
            },
        },
    },
})

// ─── Path utilities ───────────────────────────────────────────────────────────

export const resolveAbsPath = (currentDir: string, path: string, user: string): string => {
    if (!path || path === '~') return `/home/${user}`
    if (path.startsWith('~/')) return `/home/${user}/${path.slice(2)}`
    if (path === '/') return '/'
    if (path.startsWith('/')) return path

    const parts = currentDir.split('/').filter(Boolean)
    for (const segment of path.split('/')) {
        if (segment === '..') {
            parts.pop()
        } else if (segment && segment !== '.') {
            parts.push(segment)
        }
    }
    return '/' + parts.join('/')
}

export const getNodeAtPath = (fs: FileDir, path: string): FileNode | null => {
    if (path === '/') return fs
    const parts = path.split('/').filter(Boolean)
    let node: FileNode = fs
    for (const part of parts) {
        if (node.type !== 'dir' || !node.children[part]) return null
        node = node.children[part]
    }
    return node
}

// ─── Commands ─────────────────────────────────────────────────────────────────

export const commands: CommandDefinition[] = [
    {
        name: 'help',
        description: 'Show information about available commands',
        usage: 'help &lt;command&gt;',
        execute(args) {
            if (args.length > 0) {
                const name = args[0]
                const found = commands.find((c) => c.name === name || c.aliases?.includes(name))
                if (!found) {
                    return [err(`help: no help topics match '${name}'`)]
                }
                return [
                    blank(),
                    out(`  NAME         ${found.name}`),
                    ...(found.aliases?.length ? [out(`  ALIASES      ${found.aliases.join(', ')}`)] : []),
                    out(`  DESCRIPTION  ${found.description}`),
                    out(`  USAGE        ${found.usage}`),
                    blank(),
                ]
            }

            const maxLen = Math.max(...commands.map((c) => c.name.length))
            return [
                blank(),
                out('Available commands:'),
                blank(),
                ...commands.map((c) => {
                    const name = c.name.padEnd(maxLen + 2)
                    const aliases = c.aliases?.length ? `  (${c.aliases.join(', ')})` : ''
                    return out(`  ${name}${c.description}${aliases}`)
                }),
                blank(),
                out("  Tip: Type 'help &lt;command&gt;' for detailed information."),
                blank(),
            ]
        },
    },

    {
        name: 'about',
        description: 'Display information about Wrenbow',
        usage: 'about',
        execute() {
            return [
                blank(),
                html('<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-bold">  ╔══════════════════════════════╗</span>'),
                html('<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-bold">  ║           wrenbow            ║</span>'),
                html('<span class="bg-gradient-to-r from-[#fdbdb4] to-[#536793] bg-clip-text text-transparent font-bold">  ╚══════════════════════════════╝</span>'),
                blank(),
                out("  Hi! I'm Wrenbow — a content creator, streamer, and developer."),
                out('  I create gaming content, stream live, and build fun projects'),
                out('  like this interactive terminal!'),
                blank(),
                out('  What I do:'),
                out('    ▸  Live streaming (games, coding, creative stuff)'),
                out('    ▸  YouTube videos & shorts'),
                out('    ▸  Game development & creative coding'),
                out('    ▸  Community building'),
                blank(),
                html("  Find me everywhere → type <span class=\"text-yellow-400 font-semibold\">socials</span> or <span class=\"text-yellow-400 font-semibold\">contact</span> for links."),
                blank(),
            ]
        },
    },

    {
        name: 'contact',
        description: 'Display contact information',
        usage: 'contact',
        execute() {
            return [
                blank(),
                out('  Contact:'),
                blank(),
                html(`  ✉   Email    ${link('hello@wrenbow.me', 'mailto:hello@wrenbow.me')}`),
                html(`  🌐  Website  ${link('https://wrenbow.me', 'https://wrenbow.me')}`),
                html(`  🔗  Links    ${link('https://wrenbow.me/linktree', 'https://wrenbow.me/linktree')}`),
                blank(),
                out('  For business enquiries, use the email above.'),
                blank(),
            ]
        },
    },

    {
        name: 'legal',
        description: 'Show links to legal pages',
        usage: 'legal',
        execute() {
            return [
                blank(),
                out('  Legal Documents:'),
                blank(),
                html(`  ▸  ${link('Terms of Service', 'https://wrenbow.me/legal/terms')}`),
                html(`  ▸  ${link('Privacy Policy', 'https://wrenbow.me/legal/privacy')}`),
                html(`  ▸  ${link('Cookie Policy', 'https://wrenbow.me/legal/cookies')}`),
                html(`  ▸  ${link('Disclaimer', 'https://wrenbow.me/legal/disclaimer')}`),
                blank(),
            ]
        },
    },

    {
        name: 'socials',
        description: 'Display links to social media profiles',
        usage: 'socials',
        execute() {
            const row = (emoji: string, platform: string, slug: string): OutputLine =>
                html(`  ${emoji}  ${platform.padEnd(12)}${link(`https://wrenbow.me/${slug}`, `https://wrenbow.me/${slug}`)}`)

            return [
                blank(),
                out('  Social Media & Links:'),
                blank(),
                row('🎮', 'Twitch',    'twitch'),
                row('▶', 'YouTube',   'youtube'),
                row('🦋', 'BlueSky',   'bluesky'),
                row('🐘', 'Mastodon',  'mastodon'),
                row('🥊', 'Kick',      'kick'),
                row('🎵', 'TikTok',    'tiktok'),
                row('🌊', 'Odysee',    'odysee'),
                row('📷', 'Instagram', 'instagram'),
                row('🎁', 'Patreon',   'patreon'),
                row('☕', 'Ko-fi',     'kofi'),
                row('💬', 'Discord',   'discord'),
                row('🔗', 'Linktree',  'linktree'),
                blank(),
            ]
        },
    },

    {
        name: 'ls',
        description: 'List directory contents',
        usage: 'ls [-a] [-l] [path]',
        execute(args, ctx) {
            const flags = args.filter((a) => a.startsWith('-')).join('')
            const showHidden = /a|A/.test(flags)
            const longFormat = /l/.test(flags)
            const pathArg = args.find((a) => !a.startsWith('-'))
            const targetPath = pathArg
                ? resolveAbsPath(ctx.currentDir.value, pathArg, ctx.user)
                : ctx.currentDir.value

            const node = getNodeAtPath(ctx.getFs(), targetPath)

            if (!node) {
                return [err(`ls: cannot access '${pathArg}': No such file or directory`)]
            }

            if (node.type !== 'dir') {
                return [html(`<span class="text-gray-200">${targetPath.split('/').pop()}</span>`)]
            }

            const items = Object.entries(node.children)
                .filter(([name]) => showHidden || !name.startsWith('.'))
                .sort(([, a], [, b]) => {
                    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
                    return 0
                })

            if (items.length === 0) {
                return []
            }

            if (!longFormat) {
                const formatted = items.map(([name, child]) =>
                    child.type === 'dir'
                        ? `<span class="text-blue-400 font-semibold">${name}/</span>`
                        : `<span class="text-gray-200">${name}</span>`,
                )

                return [html(formatted.join('    '))]
            }

            // Long format — simulated metadata
            const epoch = new Date('2026-01-01T00:00:00Z')
            const dateStr = epoch.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

            const rows: OutputLine[] = items.map(([name, child]) => {
                const isDir = child.type === 'dir'
                const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--'
                const links = isDir ? '2' : '1'
                const size = isDir ? '4096' : String(child.content.length)
                const nameHtml = isDir
                    ? `<span class="text-blue-400 font-semibold">${name}/</span>`
                    : `<span class="text-gray-200">${name}</span>`

                return html(
                    `<span class="text-gray-500">${perms}</span>  ` +
                    `<span class="text-gray-500">${links.padStart(2)}</span>  ` +
                    `<span class="text-yellow-300">${ctx.user.padEnd(8)}</span>` +
                    `<span class="text-yellow-300">${ctx.user.padEnd(8)}</span>` +
                    `<span class="text-gray-400">${size.padStart(6)}</span>  ` +
                    `<span class="text-gray-500">${dateStr}</span>  ` +
                    nameHtml,
                )
            })

            const totalBlocks = items.reduce((acc, [, child]) => {
                return acc + (child.type === 'dir' ? 8 : Math.ceil((child.type === 'file' ? child.content.length : 0) / 512) || 1)
            }, 0)

            return [out(`total ${totalBlocks}`), ...rows]
        },
    },

    {
        name: 'cd',
        description: 'Change the current working directory',
        usage: 'cd [directory]',
        execute(args, ctx) {
            const target = args[0] ?? '~'
            const resolved = resolveAbsPath(ctx.currentDir.value, target, ctx.user)
            const node = getNodeAtPath(ctx.getFs(), resolved)

            if (!node) return [err(`cd: ${target}: No such file or directory`)]
            if (node.type !== 'dir') return [err(`cd: ${target}: Not a directory`)]

            ctx.currentDir.value = resolved
            return []
        },
    },

    {
        name: 'pwd',
        description: 'Print the current working directory',
        usage: 'pwd',
        execute(_, ctx) {
            return [out(ctx.currentDir.value)]
        },
    },

    {
        name: 'cat',
        description: 'Display the contents of a file',
        usage: 'cat <file>',
        aliases: ['open'],
        execute(args, ctx) {
            if (args.length === 0) return [err('cat: missing file operand')]

            const targetPath = resolveAbsPath(ctx.currentDir.value, args[0], ctx.user)
            const node = getNodeAtPath(ctx.getFs(), targetPath)

            if (!node) return [err(`cat: ${args[0]}: No such file or directory`)]
            if (node.type === 'dir') return [err(`cat: ${args[0]}: Is a directory`)]

            return node.content.split('\n').map((l) => out(l))
        },
    },

    {
        name: 'echo',
        description: 'Display a line of text or environment variable value',
        usage: 'echo [text | $VARIABLE]',
        execute(args, ctx) {
            if (args.length === 0) return [out('')]

            const text = args.join(' ')
            const env: Record<string, string> = {
                $SHELL: '/bin/wish',
                $USER: ctx.user,
                $HOME: `/home/${ctx.user}`,
                $HOSTNAME: ctx.host,
                $PWD: ctx.currentDir.value,
                $TERM: 'xterm-256color',
                $WISH_VERSION: '1.0.0',
            }

            return [out(env[text] ?? text)]
        },
    },

    {
        name: 'whoami',
        description: 'Print the current user name',
        usage: 'whoami',
        execute(_, ctx) {
            return [out(ctx.user)]
        },
    },

    {
        name: 'clear',
        description: 'Clear the terminal screen',
        usage: 'clear',
        aliases: ['cls'],
        execute() {
            return [{ content: '__CLEAR__' }]
        },
    },

    {
        name: 'exit',
        description: 'Exit the terminal and return to the home page',
        usage: 'exit',
        aliases: ['quit', 'logout'],
        execute() {
            router.visit('/')
            return []
        },
    },
]

// ─── Registry ─────────────────────────────────────────────────────────────────

export const commandRegistry = new Map<string, CommandDefinition>(
    commands.flatMap((cmd) => [
        [cmd.name, cmd] as [string, CommandDefinition],
        ...(cmd.aliases ?? []).map((alias) => [alias, cmd] as [string, CommandDefinition]),
    ]),
)

// Shell aliases — expand to a full command string before execution
export const shellAliases = new Map<string, string>([
    ['ll', 'ls -la'],
    ['home', 'cd ~'],
])
