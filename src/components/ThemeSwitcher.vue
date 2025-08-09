<template>
    <ul class="flex list-none m-4 p-0 gap-2 items-center">
        <li>
            <button type="button"
                class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
                @click="onThemeToggler">
                <i :class="`dark:text-white pi ${iconClass}`" />
            </button>
        </li>
        <li class="relative">
            <button v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true,
            }" type="button"
                class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded">
                <i class="pi pi-palette dark:text-white"></i>
            </button>
            <div
                class="absolute top-[2.5rem] right-0 hidden w-[16rem] p-3 bg-white dark:bg-surface-800 rounded-md shadow border border-surface-200 dark:border-surface-700 flex-col justify-start items-start gap-3.5 inline-flex origin-top z-10">
                <div class="flex-col justify-start items-start gap-2 inline-flex pr-4">
                    <span class="text-sm font-medium">{{ $t('theme.primary_colors') || 'Primary Colors' }}</span>
                    <div class="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
                        <button v-for="primaryColor of primaryColors" :key="primaryColor.name" type="button"
                            :title="primaryColor.name" @click="updateColors('primary', primaryColor)"
                            class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5"
                            :style="{
                                backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}`,
                                outlineColor: `${selectedPrimaryColor === primaryColor.name ? 'var(--p-primary-color)' : ''}`,
                            }"></button>
                    </div>
                </div>
                <div class="flex-col justify-start items-start gap-2 inline-flex pr-2">
                    <span class="text-sm font-medium">{{ $t('theme.surface_colors') || 'Surface Colors' }}</span>
                    <div class="self-stretch justify-start items-start gap-2 inline-flex">
                        <button v-for="surface of surfaces" :key="surface.name" type="button" :title="surface.name"
                            @click="updateColors('surface', surface)"
                            class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5"
                            :style="{
                                backgroundColor: `${surface.palette['500']}`,
                                outlineColor: `${selectedSurfaceColor === surface.name ? 'var(--p-primary-color)' : ''}`,
                            }"></button>
                    </div>
                </div>
                <div class="flex-col justify-start items-start gap-2 inline-flex w-full">
                    <span class="text-sm font-medium">{{ $t('theme.preset') || 'Preset' }}</span>
                    <div
                        class="inline-flex p-[0.28rem] items-start gap-[0.28rem] rounded-[0.71rem] border border-[#00000003] w-full">
                        <SelectButton v-model="$appState.theme" @update:modelValue="onPresetChange" :options="presets"
                            :unselectable="false" />
                    </div>
                </div>
                <div class="inline-flex flex-col justify-start items-start gap-2 w-full pt-4 pb-2">
                    <span class="text-sm font-medium m-0">{{ $t('theme.ripple_effect') || 'Ripple Effect' }}</span>
                    <ToggleSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange" />
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { useI18n } from 'vue-i18n';

const presets = {
    Aura,
    Lara,
    Nora,
};
export default {
    data() {
        return {
            iconClass: 'pi-moon',
            presets: Object.keys(presets),
            selectedPrimaryColor: 'noir',
            selectedSurfaceColor: null,
            primaryColors: [
                { name: 'noir', palette: {} },
                {
                    name: 'emerald',
                    palette: {
                        50: '#ecfdf5',
                        100: '#d1fae5',
                        200: '#a7f3d0',
                        300: '#6ee7b7',
                        400: '#34d399',
                        500: '#10b981',
                        600: '#059669',
                        700: '#047857',
                        800: '#065f46',
                        900: '#064e3b',
                        950: '#022c22',
                    },
                },
                {
                    name: 'green',
                    palette: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        200: '#bbf7d0',
                        300: '#86efac',
                        400: '#4ade80',
                        500: '#22c55e',
                        600: '#16a34a',
                        700: '#15803d',
                        800: '#166534',
                        900: '#14532d',
                        950: '#052e16',
                    },
                },
                {
                    name: 'lime',
                    palette: {
                        50: '#f7fee7',
                        100: '#ecfccb',
                        200: '#d9f99d',
                        300: '#bef264',
                        400: '#a3e635',
                        500: '#84cc16',
                        600: '#65a30d',
                        700: '#4d7c0f',
                        800: '#3f6212',
                        900: '#365314',
                        950: '#1a2e05',
                    },
                },
                {
                    name: 'orange',
                    palette: {
                        50: '#fff7ed',
                        100: '#ffedd5',
                        200: '#fed7aa',
                        300: '#fdba74',
                        400: '#fb923c',
                        500: '#f97316',
                        600: '#ea580c',
                        700: '#c2410c',
                        800: '#9a3412',
                        900: '#7c2d12',
                        950: '#431407',
                    },
                },
                {
                    name: 'amber',
                    palette: {
                        50: '#fffbeb',
                        100: '#fef3c7',
                        200: '#fde68a',
                        300: '#fcd34d',
                        400: '#fbbf24',
                        500: '#f59e0b',
                        600: '#d97706',
                        700: '#b45309',
                        800: '#92400e',
                        900: '#78350f',
                        950: '#451a03',
                    },
                },
                {
                    name: 'yellow',
                    palette: {
                        50: '#fefce8',
                        100: '#fef9c3',
                        200: '#fef08a',
                        300: '#fde047',
                        400: '#facc15',
                        500: '#eab308',
                        600: '#ca8a04',
                        700: '#a16207',
                        800: '#854d0e',
                        900: '#713f12',
                        950: '#422006',
                    },
                },
                {
                    name: 'teal',
                    palette: {
                        50: '#f0fdfa',
                        100: '#ccfbf1',
                        200: '#99f6e4',
                        300: '#5eead4',
                        400: '#2dd4bf',
                        500: '#14b8a6',
                        600: '#0d9488',
                        700: '#0f766e',
                        800: '#115e59',
                        900: '#134e4a',
                        950: '#042f2e',
                    },
                },
                {
                    name: 'cyan',
                    palette: {
                        50: '#ecfeff',
                        100: '#cffafe',
                        200: '#a5f3fc',
                        300: '#67e8f9',
                        400: '#22d3ee',
                        500: '#06b6d4',
                        600: '#0891b2',
                        700: '#0e7490',
                        800: '#155e75',
                        900: '#164e63',
                        950: '#083344',
                    },
                },
                {
                    name: 'sky',
                    palette: {
                        50: '#f0f9ff',
                        100: '#e0f2fe',
                        200: '#bae6fd',
                        300: '#7dd3fc',
                        400: '#38bdf8',
                        500: '#0ea5e9',
                        600: '#0284c7',
                        700: '#0369a1',
                        800: '#075985',
                        900: '#0c4a6e',
                        950: '#082f49',
                    },
                },
                {
                    name: 'blue',
                    palette: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        200: '#bfdbfe',
                        300: '#93c5fd',
                        400: '#60a5fa',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a',
                        950: '#172554',
                    },
                },
                {
                    name: 'indigo',
                    palette: {
                        50: '#eef2ff',
                        100: '#e0e7ff',
                        200: '#c7d2fe',
                        300: '#a5b4fc',
                        400: '#818cf8',
                        500: '#6366f1',
                        600: '#4f46e5',
                        700: '#4338ca',
                        800: '#3730a3',
                        900: '#312e81',
                        950: '#1e1b4b',
                    },
                },
                {
                    name: 'violet',
                    palette: {
                        50: '#f5f3ff',
                        100: '#ede9fe',
                        200: '#ddd6fe',
                        300: '#c4b5fd',
                        400: '#a78bfa',
                        500: '#8b5cf6',
                        600: '#7c3aed',
                        700: '#6d28d9',
                        800: '#5b21b6',
                        900: '#4c1d95',
                        950: '#2e1065',
                    },
                },
                {
                    name: 'purple',
                    palette: {
                        50: '#faf5ff',
                        100: '#f3e8ff',
                        200: '#e9d5ff',
                        300: '#d8b4fe',
                        400: '#c084fc',
                        500: '#a855f7',
                        600: '#9333ea',
                        700: '#7e22ce',
                        800: '#6b21a8',
                        900: '#581c87',
                        950: '#3b0764',
                    },
                },
                {
                    name: 'fuchsia',
                    palette: {
                        50: '#fdf4ff',
                        100: '#fae8ff',
                        200: '#f5d0fe',
                        300: '#f0abfc',
                        400: '#e879f9',
                        500: '#d946ef',
                        600: '#c026d3',
                        700: '#a21caf',
                        800: '#86198f',
                        900: '#701a75',
                        950: '#4a044e',
                    },
                },
                {
                    name: 'pink',
                    palette: {
                        50: '#fdf2f8',
                        100: '#fce7f3',
                        200: '#fbcfe8',
                        300: '#f9a8d4',
                        400: '#fb7185',
                        500: '#f43f5e',
                        600: '#db2777',
                        700: '#be185d',
                        800: '#9d174d',
                        900: '#831843',
                        950: '#500724',
                    },
                },
                {
                    name: 'rose',
                    palette: {
                        50: '#fff1f2',
                        100: '#ffe4e6',
                        200: '#fecdd3',
                        300: '#fda4af',
                        400: '#fb7185',
                        500: '#f43f5e',
                        600: '#e11d48',
                        700: '#be123c',
                        800: '#9f1239',
                        900: '#881337',
                        950: '#4c0519',
                    },
                },
            ],
            surfaces: [
                {
                    name: 'slate',
                    palette: {
                        0: '#ffffff',
                        50: '#f8fafc',
                        100: '#f1f5f9',
                        200: '#e2e8f0',
                        300: '#cbd5e1',
                        400: '#94a3b8',
                        500: '#64748b',
                        600: '#475569',
                        700: '#334155',
                        800: '#1e293b',
                        900: '#0f172a',
                        950: '#020617',
                    },
                },
                {
                    name: 'gray',
                    palette: {
                        0: '#ffffff',
                        50: '#f9fafb',
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3ae',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827',
                        950: '#030712',
                    },
                },
                {
                    name: 'zinc',
                    palette: {
                        0: '#ffffff',
                        50: '#fafafa',
                        100: '#f4f4f5',
                        200: '#e4e4e7',
                        300: '#d4d4d8',
                        400: '#a1a1aa',
                        500: '#71717a',
                        600: '#52525b',
                        700: '#3f3f46',
                        800: '#27272a',
                        900: '#18181b',
                        950: '#09090b',
                    },
                },
                {
                    name: 'neutral',
                    palette: {
                        0: '#ffffff',
                        50: '#fafafa',
                        100: '#f5f5f5',
                        200: '#e5e5e5',
                        300: '#d4d4d4',
                        400: '#a3a3a3',
                        500: '#737373',
                        600: '#525252',
                        700: '#404040',
                        800: '#262626',
                        900: '#171717',
                        950: '#0a0a0a',
                    },
                },
                {
                    name: 'stone',
                    palette: {
                        0: '#ffffff',
                        50: '#fafaf9',
                        100: '#f5f5f4',
                        200: '#e7e5e4',
                        300: '#d6d3d1',
                        400: '#a8a29e',
                        500: '#78716c',
                        600: '#57534e',
                        700: '#44403c',
                        800: '#292524',
                        900: '#1c1917',
                        950: '#0c0a09',
                    },
                },
                {
                    name: 'dark',
                    palette: {
                        0: '#ffffff',
                        50: '#fafafa',
                        100: '#f5f5f5',
                        200: '#e5e5e5',
                        300: '#d4d4d4',
                        400: '#a3a3a3',
                        500: '#737373',
                        600: '#525252',
                        700: '#404040',
                        800: '#262626',
                        900: '#171717',
                        950: '#0a0a0a',
                    },
                },
            ],
        }
    },
    methods: {
        onThemeToggler() {
            this.$appState.darkTheme = !this.$appState.darkTheme;
            this.iconClass = this.$appState.darkTheme ? 'pi-sun' : 'pi-moon';

            const theme = this.$appState.darkTheme ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            document.documentElement.setAttribute('class', theme);
        },
        getPresetExt() {
            const isDark = this.$appState.darkTheme;
            return {
                semantic: {
                    colorScheme: {
                        light: {
                            primary: {
                                50: '{emerald.50}',
                                100: '{emerald.100}',
                                200: '{emerald.200}',
                                300: '{emerald.300}',
                                400: '{emerald.400}',
                                500: '{emerald.500}',
                                600: '{emerald.600}',
                                700: '{emerald.700}',
                                800: '{emerald.800}',
                                900: '{emerald.900}',
                                950: '{emerald.950}',
                            },
                        },
                        dark: {
                            primary: {
                                50: '{emerald.50}',
                                100: '{emerald.100}',
                                200: '{emerald.200}',
                                300: '{emerald.300}',
                                400: '{emerald.400}',
                                500: '{emerald.500}',
                                600: '{emerald.600}',
                                700: '{emerald.700}',
                                800: '{emerald.800}',
                                900: '{emerald.900}',
                                950: '{emerald.950}',
                            },
                        },
                    },
                    primary: {
                        50: '{emerald.50}',
                        100: '{emerald.100}',
                        200: '{emerald.200}',
                        300: '{emerald.300}',
                        400: '{emerald.400}',
                        500: '{emerald.500}',
                        600: '{emerald.600}',
                        700: '{emerald.700}',
                        800: '{emerald.800}',
                        900: '{emerald.900}',
                        950: '{emerald.950}',
                    },
                    color: {
                        primary: {
                            50: '{emerald.50}',
                            100: '{emerald.100}',
                            200: '{emerald.200}',
                            300: '{emerald.300}',
                            400: '{emerald.400}',
                            500: '{emerald.500}',
                            600: '{emerald.600}',
                            700: '{emerald.700}',
                            800: '{emerald.800}',
                            900: '{emerald.900}',
                            950: '{emerald.950}',
                        },
                        green: {
                            50: '{green.50}',
                            100: '{green.100}',
                            200: '{green.200}',
                            300: '{green.300}',
                            400: '{green.400}',
                            500: '{green.500}',
                            600: '{green.600}',
                            700: '{green.700}',
                            800: '{green.800}',
                            900: '{green.900}',
                            950: '{green.950}',
                        },
                    },
                    focusRing: {
                        width: '0px',
                        style: 'solid',
                        color: 'transparent',
                    },
                    disabledOpacity: '{opacity.60}',
                    mask: {
                        background: 'rgba(0, 0, 0, 0.4)',
                    },
                    formField: {
                        transitionDuration: '{transition.duration}',
                    },
                    button: {
                        focusRing: {
                            width: '0px',
                            style: 'solid',
                            color: 'transparent',
                        },
                    },
                    list: {
                        option: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    table: {
                        hoverBackgroundColor: isDark
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.03)',
                    },
                    dataView: {
                        hoverBackgroundColor: isDark
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.03)',
                    },
                    paginator: {
                        backgroundColor: 'transparent',
                    },
                    navigation: {
                        focusRing: {
                            width: '0px',
                            style: 'solid',
                            color: 'transparent',
                        },
                    },
                    accordion: {
                        hoverBackgroundColor: isDark
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.03)',
                    },
                    tab: {
                        hoverBackgroundColor: isDark
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.03)',
                    },
                    dialog: {
                        shadow:
                            '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
                    },
                    navigation: {
                        list: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                        item: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    tree: {
                        item: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    datepicker: {
                        cell: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    menu: {
                        item: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    menubar: {
                        item: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    select: {
                        option: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    multiselect: {
                        option: {
                            focusRing: {
                                width: '0px',
                                style: 'solid',
                                color: 'transparent',
                            },
                        },
                    },
                    highlight: {
                        borderRadius: '6px',
                        background: '{primary.color}',
                        color: '{primary.contrast.color}',
                        focusBackground: '{primary.color}',
                        focusColor: '{primary.contrast.color}',
                    },
                    inset: {
                        borderRadius: '6px',
                    },
                    focus: {
                        borderWidth: '{focus.ring.width}',
                        borderStyle: '{focus.ring.style}',
                        borderColor: '{focus.ring.color}',
                        shadow: '{focus.ring.shadow}',
                        shadowColor: 'transparent',
                    },
                    error: {
                        shadow: '{red.200}',
                        shadowColor: 'transparent',
                    },
                    transition: {
                        duration: '0.2s',
                        easing: 'ease-in-out',
                        opacity: '{opacity.80}',
                        scale: '1.05',
                    },
                },
                css: ({ dt }) => {
                    return {
                        '.p-button.p-button-outlined:enabled:hover': {
                            color: dt('button.outlined.hover.color') || dt('primary.400'),
                            borderColor: dt('button.outlined.hover.color') || dt('primary.400'),
                        },
                        '.p-button.p-button-outlined:enabled:active': {
                            color: dt('button.outlined.active.color') || dt('primary.400'),
                            borderColor: dt('button.outlined.active.color') || dt('primary.400'),
                        },
                        '.p-button.p-button-outlined .p-button-icon': {
                            color: dt('button.outlined.icon.color') || dt('primary.color'),
                        },
                        '.p-button.p-button-outlined:enabled:hover .p-button-icon': {
                            color: dt('button.outlined.icon.hover.color') || dt('primary.color'),
                        },
                        '.p-button.p-button-outlined:enabled:active .p-button-icon': {
                            color: dt('button.outlined.icon.active.color') || dt('primary.color'),
                        },
                        '.p-datepicker-buttonbar .p-button': {
                            padding: '0.25rem 0.5rem',
                            fontWeight: '400',
                            border: '0 none',
                            borderRadius: '4px',
                        },
                        '.p-datepicker-buttonbar .p-button .p-button-label': {
                            fontWeight: '400',
                        },
                        '.p-datepicker-buttonbar .p-button:enabled:hover': {
                            background: dt('button.hover.background'),
                            color: dt('button.hover.color'),
                            borderColor: dt('button.hover.border.color'),
                        },
                        '.p-datepicker-buttonbar .p-button:enabled:active': {
                            background: dt('button.active.background'),
                            color: dt('button.active.color'),
                            borderColor: dt('button.active.border.color'),
                        },
                        '.p-password-panel .p-password-meter .p-password-strength.weak': {
                            background: dt('red.500'),
                        },
                        '.p-password-panel .p-password-meter .p-password-strength.medium': {
                            background: dt('orange.500'),
                        },
                        '.p-password-panel .p-password-meter .p-password-strength.strong': {
                            background: dt('green.500'),
                        },
                        '.p-ripple-disabled .p-ink': {
                            backgroundColor: 'transparent',
                        },
                        '.p-menuitem-link': {
                            borderRadius: '4px',
                        },
                        '.p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-menubar .p-menuitem-link': {
                            borderRadius: '4px',
                        },
                        '.p-menubar .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-menubar .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-menubar .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-menubar .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-menubar .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-tabmenu .p-tabmenu-ink-bar': {
                            display: 'none',
                        },
                        '.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link': {
                            border: 'solid',
                            borderWidth: '1px',
                            borderBlockEndWidth: '2px',
                            borderRadius: '6px',
                            margin: '0 0 -1px 0',
                        },
                        '.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('tabmenu.item.hover.background'),
                            borderBlockEndColor: dt('tabmenu.item.hover.border.color'),
                            color: dt('tabmenu.item.hover.color'),
                        },
                        '.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:not(.p-highlight):hover': {
                            background: dt('tabmenu.item.hover.background'),
                            borderBlockEndColor: dt('tabmenu.item.hover.border.color'),
                            color: dt('tabmenu.item.hover.color'),
                        },
                        '.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link': {
                            background: dt('tabmenu.item.active.background'),
                            borderBlockEndColor: dt('tabmenu.item.active.border.color'),
                            color: dt('tabmenu.item.active.color'),
                        },
                        '.p-tabmenu .p-tabmenu-nav-button.p-link': {
                            borderRadius: '6px',
                            color: dt('text.muted.color'),
                            background: dt('tabmenu.nav.button.background'),
                            boxShadow: dt('card.shadow'),
                            transition: dt('form.field.transition'),
                            margin: '0.143rem',
                        },
                        '.p-tabmenu .p-tabmenu-nav-button.p-link:hover': {
                            color: dt('text.color'),
                            background: dt('tabmenu.nav.button.hover.background'),
                        },
                        '.p-tabmenu.p-tabmenu-scrollable .p-tabmenu-nav': {
                            'scroll-padding-inline': '2.5rem',
                        },
                        '.p-tabmenu.p-tabmenu-scrollable .p-tabmenu-nav .p-tabmenuitem': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link': {
                            borderRadius: '6px',
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menubar.item.hover.background'),
                            color: dt('menubar.item.hover.color'),
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-submenu-icon': {
                            color: dt('menubar.item.icon.color'),
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menubar.item.icon.hover.color'),
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem.p-menuitem-active > .p-menuitem-link': {
                            background: dt('menubar.item.active.background'),
                            color: dt('menubar.item.active.color'),
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem.p-menuitem-active > .p-menuitem-link .p-submenu-icon': {
                            color: dt('menubar.item.active.icon.color'),
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem.p-menuitem-active > .p-menuitem-link:hover': {
                            background: dt('menubar.item.active.hover.background'),
                            color: dt('menubar.item.active.hover.color'),
                        },
                        '.p-menubar .p-menubar-root-list > .p-menuitem.p-menuitem-active > .p-menuitem-link:hover .p-submenu-icon': {
                            color: dt('menubar.item.active.hover.icon.color'),
                        },
                        '.p-tieredmenu .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '4px',
                        },
                        '.p-tieredmenu .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-tieredmenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-tieredmenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-tieredmenu .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-tieredmenu .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-tieredmenu.p-tieredmenu-overlay': {
                            'scroll-padding-top': '2.5rem',
                        },
                        '.p-tieredmenu.p-tieredmenu-overlay .p-menuitem': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-contextmenu .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '4px',
                        },
                        '.p-contextmenu .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-contextmenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-contextmenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-contextmenu .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-contextmenu .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-contextmenu.p-contextmenu-overlay': {
                            'scroll-padding-top': '2.5rem',
                        },
                        '.p-contextmenu.p-contextmenu-overlay .p-menuitem': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-megamenu .p-megamenu-panel': {
                            'scroll-padding-top': '2.5rem',
                        },
                        '.p-megamenu .p-megamenu-panel .p-menuitem': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-megamenu .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '4px',
                        },
                        '.p-megamenu .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-megamenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-megamenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-megamenu .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-megamenu .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-megamenu .p-megamenu-root-list > .p-menuitem > .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '6px',
                        },
                        '.p-megamenu .p-megamenu-root-list > .p-menuitem > .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menubar.item.hover.background'),
                            color: dt('menubar.item.hover.color'),
                        },
                        '.p-megamenu .p-megamenu-root-list > .p-menuitem > .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-megamenu .p-megamenu-root-list > .p-menuitem.p-menuitem-active > .p-menuitem-link': {
                            background: dt('menubar.item.active.background'),
                            color: dt('menubar.item.active.color'),
                        },
                        '.p-megamenu .p-megamenu-root-list > .p-menuitem.p-menuitem-active > .p-menuitem-link:hover': {
                            background: dt('menubar.item.active.hover.background'),
                            color: dt('menubar.item.active.hover.color'),
                        },
                        '.p-overlaypanel': {
                            'scroll-padding-top': '2.5rem',
                        },
                        '.p-overlaypanel .p-overlaypanel-content': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-orderlist .p-orderlist-list .p-orderlist-item': {
                            border: '0 none',
                            borderRadius: '6px',
                        },
                        '.p-orderlist .p-orderlist-list .p-orderlist-item:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-organizationchart .p-organizationchart-node-content': {
                            padding: '0.75rem 1rem',
                            border: '0 none',
                            borderRadius: '6px',
                        },
                        '.p-organizationchart .p-organizationchart-node-content:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-paginator .p-paginator-pages .p-paginator-page': {
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            transition: dt('form.field.transition'),
                            minWidth: '2.5rem',
                        },
                        '.p-paginator .p-paginator-pages .p-paginator-page.p-highlight': {
                            background: dt('highlight.background'),
                            color: dt('highlight.color'),
                            borderBlockEndColor: 'transparent',
                        },
                        '.p-paginator .p-paginator-pages .p-paginator-page:not(.p-highlight):hover': {
                            background: dt('paginator.page.hover.background'),
                            color: dt('paginator.page.hover.color'),
                        },
                        '.p-paginator .p-paginator-current': {
                            border: '1px solid transparent',
                            borderRadius: '6px',
                        },
                        '.p-picklist .p-picklist-list .p-picklist-item': {
                            border: '0 none',
                            borderRadius: '6px',
                        },
                        '.p-picklist .p-picklist-list .p-picklist-item:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content': {
                            border: '0 none',
                            borderRadius: '6px',
                        },
                        '.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action': {
                            padding: '1rem 1.125rem',
                            borderRadius: '6px',
                            transition: dt('form.field.transition'),
                        },
                        '.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '6px',
                            transition: dt('form.field.transition'),
                        },
                        '.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-slidemenu .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '4px',
                        },
                        '.p-slidemenu .p-menuitem-link:not(.p-disabled):hover': {
                            background: dt('menu.item.hover.background'),
                        },
                        '.p-slidemenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-slidemenu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-slidemenu .p-menuitem-link:not(.p-disabled):hover .p-submenu-icon': {
                            color: dt('menu.item.hover.color') || dt('text.color'),
                        },
                        '.p-slidemenu .p-menuitem-link:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-slidemenu.p-slidemenu-overlay': {
                            'scroll-padding-top': '2.5rem',
                        },
                        '.p-slidemenu.p-slidemenu-overlay .p-menuitem': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-steps .p-steps-item .p-menuitem-link': {
                            border: '0 none',
                            borderRadius: '6px',
                            transition: dt('form.field.transition'),
                        },
                        '.p-steps .p-steps-item .p-menuitem-link .p-steps-number': {
                            border: '1px solid transparent',
                            borderRadius: '50%',
                            width: '2rem',
                            height: '2rem',
                        },
                        '.p-steps .p-steps-item .p-menuitem-link:not(.p-disabled):focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-steps .p-steps-item.p-highlight .p-steps-number': {
                            background: dt('highlight.background'),
                            color: dt('highlight.color'),
                        },
                        '.p-steps .p-steps-item.p-highlight .p-steps-title': {
                            fontWeight: '600',
                            color: dt('text.color'),
                        },
                        '.p-tabview .p-tabview-nav li .p-tabview-nav-link': {
                            border: 'solid',
                            borderWidth: '1px',
                            borderBlockEndWidth: '2px',
                            borderRadius: '6px',
                            margin: '0 0 -1px 0',
                            padding: '0.75rem 1rem',
                        },
                        '.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-tabview .p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link': {
                            background: dt('tabview.nav.link.hover.background'),
                            borderBlockEndColor: dt('tabview.nav.link.hover.border.color'),
                            color: dt('tabview.nav.link.hover.color'),
                        },
                        '.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link': {
                            background: dt('tabview.nav.link.active.background'),
                            borderBlockEndColor: dt('tabview.nav.link.active.border.color'),
                            color: dt('tabview.nav.link.active.color'),
                        },
                        '.p-terminal .p-terminal-command': {
                            border: '0 none',
                            borderRadius: '6px',
                        },
                        '.p-terminal .p-terminal-command:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-terminal .p-terminal-prompt': {
                            margin: '0 0.25rem 0 0',
                        },
                        '.p-treeselect-panel .p-tree': {
                            padding: '0.25rem 0',
                        },
                        '.p-treeselect-panel .p-treeselect-items-wrapper .p-tree': {
                            padding: '0',
                        },
                        '.p-treeselect-panel .p-treeselect-items-wrapper .p-treeselect-empty-message': {
                            padding: '0.5rem 1rem',
                        },
                        '.p-timeline .p-timeline-event-marker': {
                            border: '2px solid transparent',
                            borderRadius: '50%',
                            width: '1.125rem',
                            height: '1.125rem',
                            background: dt('timeline.event.marker.background') || dt('primary.color'),
                            boxShadow: `0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)`,
                        },
                        '.p-togglebutton.p-button': {
                            padding: '0.5rem 1rem',
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            transition: dt('form.field.transition'),
                        },
                        '.p-togglebutton.p-button .p-button-label': {
                            font: dt('togglebutton.label.font'),
                        },
                        '.p-togglebutton.p-button .p-button-icon': {
                            color: dt('togglebutton.icon.color'),
                        },
                        '.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover': {
                            background: dt('togglebutton.hover.background'),
                            borderColor: dt('togglebutton.hover.border.color'),
                            color: dt('togglebutton.hover.color'),
                        },
                        '.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover .p-button-icon': {
                            color: dt('togglebutton.icon.hover.color'),
                        },
                        '.p-togglebutton.p-button.p-highlight': {
                            background: dt('togglebutton.active.background'),
                            borderColor: dt('togglebutton.active.border.color'),
                            color: dt('togglebutton.active.color'),
                        },
                        '.p-togglebutton.p-button.p-highlight .p-button-icon': {
                            color: dt('togglebutton.icon.active.color'),
                        },
                        '.p-togglebutton.p-button.p-highlight:hover': {
                            background: dt('togglebutton.active.hover.background'),
                            borderColor: dt('togglebutton.active.hover.border.color'),
                            color: dt('togglebutton.active.hover.color'),
                        },
                        '.p-togglebutton.p-button.p-highlight:hover .p-button-icon': {
                            color: dt('togglebutton.icon.active.hover.color'),
                        },
                        '.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td': {
                            boxShadow: `inset 0 2px 0 0 ${dt('primary.color')}`,
                        },
                        '.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td': {
                            boxShadow: `inset 0 -2px 0 0 ${dt('primary.color')}`,
                        },
                        '.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td .p-row-toggler': {
                            color: dt('primary.color'),
                        },
                        '.p-datatable .p-datatable-tbody > tr.p-datatable-dragpoint-top > td .p-row-toggler:hover': {
                            color: dt('primary.color'),
                        },
                        '.p-dataview .p-dataview-content': {
                            border: '0 none',
                            borderRadius: '0 0 6px 6px',
                        },
                        '.p-column-filter-overlay-menu': {
                            'scroll-padding-top': '2.5rem',
                        },
                        '.p-column-filter-overlay-menu .p-column-filter-operator': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-column-filter-overlay-menu .p-column-filter-constraints .p-column-filter-constraint': {
                            'scroll-snap-align': 'start',
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selectable:not(.p-treenode-selected):hover': {
                            background: dt('tree.item.hover.background'),
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selectable:not(.p-treenode-selected):hover .p-tree-toggler': {
                            color: dt('tree.item.hover.color') || dt('text.color'),
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selectable:not(.p-treenode-selected):hover .p-treenode-icon': {
                            color: dt('tree.item.hover.color') || dt('text.color'),
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content:focus': {
                            outline: '0 none',
                            outlineOffset: '0',
                            boxShadow: 'none',
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selected': {
                            background: dt('highlight.background'),
                            color: dt('highlight.color'),
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selected .p-tree-toggler': {
                            color: dt('highlight.color'),
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selected .p-tree-toggler:hover': {
                            color: dt('highlight.color'),
                        },
                        '.p-tree .p-tree-container .p-treenode .p-treenode-content.p-treenode-selected .p-treenode-icon': {
                            color: dt('highlight.color'),
                        },
                        '.p-treetable .p-treetable-tbody > tr.p-treetable-dragpoint-top > td': {
                            boxShadow: `inset 0 2px 0 0 ${dt('primary.color')}`,
                        },
                        '.p-treetable .p-treetable-tbody > tr.p-treetable-dragpoint-bottom > td': {
                            boxShadow: `inset 0 -2px 0 0 ${dt('primary.color')}`,
                        },
                        '.p-treetable .p-treetable-tbody > tr.p-treetable-dragpoint-top > td .p-row-toggler': {
                            color: dt('primary.color'),
                        },
                        '.p-treetable .p-treetable-tbody > tr.p-treetable-dragpoint-top > td .p-row-toggler:hover': {
                            color: dt('primary.color'),
                        },
                    };
                },
            };
        },
        updateColors(type, color) {
            if (type === 'primary') this.selectedPrimaryColor = color.name;
            else if (type === 'surface') this.selectedSurfaceColor = color.name;

            this.applyTheme(type, color);
        },
        applyTheme(type, color) {
            if (type === 'primary') {
                updatePreset(this.getPresetExt());
            } else if (type === 'surface') {
                updateSurfacePalette(color.palette);
            }
        },
        onRippleChange(value) {
            this.$primevue.config.ripple = value;
        },
        onPresetChange(value) {
            this.$appState.theme = value;
            const preset = presets[value];
            const surfacePalette = this.surfaces.find(
                (s) => s.name === this.selectedSurfaceColor
            )?.palette;

            $t()
                .preset(preset)
                .preset(this.getPresetExt())
                .surfacePalette(surfacePalette)
                .use({ useDefaultOptions: true });
        }
    },
    computed: {
        rippleActive() {
            return this.$primevue.config.ripple;
        }
    },
    created() {
        this.updateColors('primary', this.primaryColors[10]);
    },
    mounted() {
        console.log('mounted');
        this.updateColors('primary', this.primaryColors[10]);
    }
};
</script>