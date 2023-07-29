// Generated by 'unplugin-auto-import'
export {};
declare global {
  const EffectScope: typeof import('vue')['EffectScope'];
  const ElNotification: typeof import('element-plus/es')['ElNotification'];
  const acceptHMRUpdate: typeof import('pinia')['acceptHMRUpdate'];
  const asyncComputed: typeof import('@vueuse/core')['asyncComputed'];
  const autoResetRef: typeof import('@vueuse/core')['autoResetRef'];
  const computed: typeof import('vue')['computed'];
  const computedAsync: typeof import('@vueuse/core')['computedAsync'];
  const computedEager: typeof import('@vueuse/core')['computedEager'];
  const computedInject: typeof import('@vueuse/core')['computedInject'];
  const computedWithControl: typeof import('@vueuse/core')['computedWithControl'];
  const controlledComputed: typeof import('@vueuse/core')['controlledComputed'];
  const controlledRef: typeof import('@vueuse/core')['controlledRef'];
  const createApp: typeof import('vue')['createApp'];
  const createEventHook: typeof import('@vueuse/core')['createEventHook'];
  const createGlobalState: typeof import('@vueuse/core')['createGlobalState'];
  const createInjectionState: typeof import('@vueuse/core')['createInjectionState'];
  const createPinia: typeof import('pinia')['createPinia'];
  const createReactiveFn: typeof import('@vueuse/core')['createReactiveFn'];
  const createSharedComposable: typeof import('@vueuse/core')['createSharedComposable'];
  const createUnrefFn: typeof import('@vueuse/core')['createUnrefFn'];
  const customRef: typeof import('vue')['customRef'];
  const debouncedRef: typeof import('@vueuse/core')['debouncedRef'];
  const debouncedWatch: typeof import('@vueuse/core')['debouncedWatch'];
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent'];
  const defineComponent: typeof import('vue')['defineComponent'];
  const defineStore: typeof import('pinia')['defineStore'];
  const eagerComputed: typeof import('@vueuse/core')['eagerComputed'];
  const effectScope: typeof import('vue')['effectScope'];
  const extendRef: typeof import('@vueuse/core')['extendRef'];
  const getActivePinia: typeof import('pinia')['getActivePinia'];
  const getCurrentInstance: typeof import('vue')['getCurrentInstance'];
  const getCurrentScope: typeof import('vue')['getCurrentScope'];
  const h: typeof import('vue')['h'];
  const ignorableWatch: typeof import('@vueuse/core')['ignorableWatch'];
  const inject: typeof import('vue')['inject'];
  const isDefined: typeof import('@vueuse/core')['isDefined'];
  const isProxy: typeof import('vue')['isProxy'];
  const isReactive: typeof import('vue')['isReactive'];
  const isReadonly: typeof import('vue')['isReadonly'];
  const isRef: typeof import('vue')['isRef'];
  const logicAnd: typeof import('@vueuse/core')['logicAnd'];
  const logicNot: typeof import('@vueuse/core')['logicNot'];
  const logicOr: typeof import('@vueuse/core')['logicOr'];
  const makeDestructurable: typeof import('@vueuse/core')['makeDestructurable'];
  const mapActions: typeof import('pinia')['mapActions'];
  const mapGetters: typeof import('pinia')['mapGetters'];
  const mapState: typeof import('pinia')['mapState'];
  const mapStores: typeof import('pinia')['mapStores'];
  const mapWritableState: typeof import('pinia')['mapWritableState'];
  const markRaw: typeof import('vue')['markRaw'];
  const nextTick: typeof import('vue')['nextTick'];
  const onActivated: typeof import('vue')['onActivated'];
  const onBeforeMount: typeof import('vue')['onBeforeMount'];
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount'];
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate'];
  const onClickOutside: typeof import('@vueuse/core')['onClickOutside'];
  const onDeactivated: typeof import('vue')['onDeactivated'];
  const onErrorCaptured: typeof import('vue')['onErrorCaptured'];
  const onKeyStroke: typeof import('@vueuse/core')['onKeyStroke'];
  const onLongPress: typeof import('@vueuse/core')['onLongPress'];
  const onMounted: typeof import('vue')['onMounted'];
  const onRenderTracked: typeof import('vue')['onRenderTracked'];
  const onRenderTriggered: typeof import('vue')['onRenderTriggered'];
  const onScopeDispose: typeof import('vue')['onScopeDispose'];
  const onServerPrefetch: typeof import('vue')['onServerPrefetch'];
  const onStartTyping: typeof import('@vueuse/core')['onStartTyping'];
  const onUnmounted: typeof import('vue')['onUnmounted'];
  const onUpdated: typeof import('vue')['onUpdated'];
  const pausableWatch: typeof import('@vueuse/core')['pausableWatch'];
  const provide: typeof import('vue')['provide'];
  const reactify: typeof import('@vueuse/core')['reactify'];
  const reactifyObject: typeof import('@vueuse/core')['reactifyObject'];
  const reactive: typeof import('vue')['reactive'];
  const reactiveComputed: typeof import('@vueuse/core')['reactiveComputed'];
  const reactiveOmit: typeof import('@vueuse/core')['reactiveOmit'];
  const reactivePick: typeof import('@vueuse/core')['reactivePick'];
  const readonly: typeof import('vue')['readonly'];
  const ref: typeof import('vue')['ref'];
  const refAutoReset: typeof import('@vueuse/core')['refAutoReset'];
  const refDebounced: typeof import('@vueuse/core')['refDebounced'];
  const refDefault: typeof import('@vueuse/core')['refDefault'];
  const refThrottled: typeof import('@vueuse/core')['refThrottled'];
  const refWithControl: typeof import('@vueuse/core')['refWithControl'];
  const resolveComponent: typeof import('vue')['resolveComponent'];
  const resolveRef: typeof import('@vueuse/core')['resolveRef'];
  const resolveUnref: typeof import('@vueuse/core')['resolveUnref'];
  const setActivePinia: typeof import('pinia')['setActivePinia'];
  const setMapStoreSuffix: typeof import('pinia')['setMapStoreSuffix'];
  const shallowReactive: typeof import('vue')['shallowReactive'];
  const shallowReadonly: typeof import('vue')['shallowReadonly'];
  const shallowRef: typeof import('vue')['shallowRef'];
  const storeToRefs: typeof import('pinia')['storeToRefs'];
  const syncRef: typeof import('@vueuse/core')['syncRef'];
  const syncRefs: typeof import('@vueuse/core')['syncRefs'];
  const templateRef: typeof import('@vueuse/core')['templateRef'];
  const throttledRef: typeof import('@vueuse/core')['throttledRef'];
  const throttledWatch: typeof import('@vueuse/core')['throttledWatch'];
  const toRaw: typeof import('vue')['toRaw'];
  const toReactive: typeof import('@vueuse/core')['toReactive'];
  const toRef: typeof import('vue')['toRef'];
  const toRefs: typeof import('vue')['toRefs'];
  const triggerRef: typeof import('vue')['triggerRef'];
  const tryOnBeforeMount: typeof import('@vueuse/core')['tryOnBeforeMount'];
  const tryOnBeforeUnmount: typeof import('@vueuse/core')['tryOnBeforeUnmount'];
  const tryOnMounted: typeof import('@vueuse/core')['tryOnMounted'];
  const tryOnScopeDispose: typeof import('@vueuse/core')['tryOnScopeDispose'];
  const tryOnUnmounted: typeof import('@vueuse/core')['tryOnUnmounted'];
  const unref: typeof import('vue')['unref'];
  const unrefElement: typeof import('@vueuse/core')['unrefElement'];
  const until: typeof import('@vueuse/core')['until'];
  const useActiveElement: typeof import('@vueuse/core')['useActiveElement'];
  const useAsyncQueue: typeof import('@vueuse/core')['useAsyncQueue'];
  const useAsyncState: typeof import('@vueuse/core')['useAsyncState'];
  const useAttrs: typeof import('vue')['useAttrs'];
  const useBase64: typeof import('@vueuse/core')['useBase64'];
  const useBattery: typeof import('@vueuse/core')['useBattery'];
  const useBluetooth: typeof import('@vueuse/core')['useBluetooth'];
  const useBreakpoints: typeof import('@vueuse/core')['useBreakpoints'];
  const useBroadcastChannel: typeof import('@vueuse/core')['useBroadcastChannel'];
  const useBrowserLocation: typeof import('@vueuse/core')['useBrowserLocation'];
  const useCached: typeof import('@vueuse/core')['useCached'];
  const useClamp: typeof import('@vueuse/core')['useClamp'];
  const useClipboard: typeof import('@vueuse/core')['useClipboard'];
  const useColorMode: typeof import('@vueuse/core')['useColorMode'];
  const useConfirmDialog: typeof import('@vueuse/core')['useConfirmDialog'];
  const useCounter: typeof import('@vueuse/core')['useCounter'];
  const useCssModule: typeof import('vue')['useCssModule'];
  const useCssVar: typeof import('@vueuse/core')['useCssVar'];
  const useCssVars: typeof import('vue')['useCssVars'];
  const useCurrentElement: typeof import('@vueuse/core')['useCurrentElement'];
  const useCycleList: typeof import('@vueuse/core')['useCycleList'];
  const useDark: typeof import('@vueuse/core')['useDark'];
  const useDateFormat: typeof import('@vueuse/core')['useDateFormat'];
  const useDebounce: typeof import('@vueuse/core')['useDebounce'];
  const useDebounceFn: typeof import('@vueuse/core')['useDebounceFn'];
  const useDebouncedRefHistory: typeof import('@vueuse/core')['useDebouncedRefHistory'];
  const useDeviceMotion: typeof import('@vueuse/core')['useDeviceMotion'];
  const useDeviceOrientation: typeof import('@vueuse/core')['useDeviceOrientation'];
  const useDevicePixelRatio: typeof import('@vueuse/core')['useDevicePixelRatio'];
  const useDevicesList: typeof import('@vueuse/core')['useDevicesList'];
  const useDisplayMedia: typeof import('@vueuse/core')['useDisplayMedia'];
  const useDocumentVisibility: typeof import('@vueuse/core')['useDocumentVisibility'];
  const useDraggable: typeof import('@vueuse/core')['useDraggable'];
  const useDropZone: typeof import('@vueuse/core')['useDropZone'];
  const useElementBounding: typeof import('@vueuse/core')['useElementBounding'];
  const useElementByPoint: typeof import('@vueuse/core')['useElementByPoint'];
  const useElementHover: typeof import('@vueuse/core')['useElementHover'];
  const useElementSize: typeof import('@vueuse/core')['useElementSize'];
  const useElementVisibility: typeof import('@vueuse/core')['useElementVisibility'];
  const useEventBus: typeof import('@vueuse/core')['useEventBus'];
  const useEventListener: typeof import('@vueuse/core')['useEventListener'];
  const useEventSource: typeof import('@vueuse/core')['useEventSource'];
  const useEyeDropper: typeof import('@vueuse/core')['useEyeDropper'];
  const useFavicon: typeof import('@vueuse/core')['useFavicon'];
  const useFetch: typeof import('@vueuse/core')['useFetch'];
  const useFileDialog: typeof import('@vueuse/core')['useFileDialog'];
  const useFileSystemAccess: typeof import('@vueuse/core')['useFileSystemAccess'];
  const useFocus: typeof import('@vueuse/core')['useFocus'];
  const useFocusWithin: typeof import('@vueuse/core')['useFocusWithin'];
  const useFps: typeof import('@vueuse/core')['useFps'];
  const useFullscreen: typeof import('@vueuse/core')['useFullscreen'];
  const useGamepad: typeof import('@vueuse/core')['useGamepad'];
  const useGeolocation: typeof import('@vueuse/core')['useGeolocation'];
  const useI18n: typeof import('vue-i18n')['useI18n'];
  const useIdle: typeof import('@vueuse/core')['useIdle'];
  const useImage: typeof import('@vueuse/core')['useImage'];
  const useInfiniteScroll: typeof import('@vueuse/core')['useInfiniteScroll'];
  const useIntersectionObserver: typeof import('@vueuse/core')['useIntersectionObserver'];
  const useInterval: typeof import('@vueuse/core')['useInterval'];
  const useIntervalFn: typeof import('@vueuse/core')['useIntervalFn'];
  const useKeyModifier: typeof import('@vueuse/core')['useKeyModifier'];
  const useLastChanged: typeof import('@vueuse/core')['useLastChanged'];
  const useLocalStorage: typeof import('@vueuse/core')['useLocalStorage'];
  const useMagicKeys: typeof import('@vueuse/core')['useMagicKeys'];
  const useManualRefHistory: typeof import('@vueuse/core')['useManualRefHistory'];
  const useMediaControls: typeof import('@vueuse/core')['useMediaControls'];
  const useMediaQuery: typeof import('@vueuse/core')['useMediaQuery'];
  const useMemoize: typeof import('@vueuse/core')['useMemoize'];
  const useMemory: typeof import('@vueuse/core')['useMemory'];
  const useMounted: typeof import('@vueuse/core')['useMounted'];
  const useMouse: typeof import('@vueuse/core')['useMouse'];
  const useMouseInElement: typeof import('@vueuse/core')['useMouseInElement'];
  const useMousePressed: typeof import('@vueuse/core')['useMousePressed'];
  const useMutationObserver: typeof import('@vueuse/core')['useMutationObserver'];
  const useNavigatorLanguage: typeof import('@vueuse/core')['useNavigatorLanguage'];
  const useNetwork: typeof import('@vueuse/core')['useNetwork'];
  const useNow: typeof import('@vueuse/core')['useNow'];
  const useObjectUrl: typeof import('@vueuse/core')['useObjectUrl'];
  const useOffsetPagination: typeof import('@vueuse/core')['useOffsetPagination'];
  const useOnline: typeof import('@vueuse/core')['useOnline'];
  const usePageLeave: typeof import('@vueuse/core')['usePageLeave'];
  const useParallax: typeof import('@vueuse/core')['useParallax'];
  const usePermission: typeof import('@vueuse/core')['usePermission'];
  const usePointer: typeof import('@vueuse/core')['usePointer'];
  const usePointerSwipe: typeof import('@vueuse/core')['usePointerSwipe'];
  const usePreferredColorScheme: typeof import('@vueuse/core')['usePreferredColorScheme'];
  const usePreferredDark: typeof import('@vueuse/core')['usePreferredDark'];
  const usePreferredLanguages: typeof import('@vueuse/core')['usePreferredLanguages'];
  const useRafFn: typeof import('@vueuse/core')['useRafFn'];
  const useRefHistory: typeof import('@vueuse/core')['useRefHistory'];
  const useRequest: typeof import('vue-request')['useRequest'];
  const useResizeObserver: typeof import('@vueuse/core')['useResizeObserver'];
  const useRoute: typeof import('vue-router')['useRoute'];
  const useRouter: typeof import('vue-router')['useRouter'];
  const useScreenOrientation: typeof import('@vueuse/core')['useScreenOrientation'];
  const useScreenSafeArea: typeof import('@vueuse/core')['useScreenSafeArea'];
  const useScriptTag: typeof import('@vueuse/core')['useScriptTag'];
  const useScroll: typeof import('@vueuse/core')['useScroll'];
  const useScrollLock: typeof import('@vueuse/core')['useScrollLock'];
  const useSessionStorage: typeof import('@vueuse/core')['useSessionStorage'];
  const useShare: typeof import('@vueuse/core')['useShare'];
  const useSlots: typeof import('vue')['useSlots'];
  const useSpeechRecognition: typeof import('@vueuse/core')['useSpeechRecognition'];
  const useSpeechSynthesis: typeof import('@vueuse/core')['useSpeechSynthesis'];
  const useStepper: typeof import('@vueuse/core')['useStepper'];
  const useStorage: typeof import('@vueuse/core')['useStorage'];
  const useStorageAsync: typeof import('@vueuse/core')['useStorageAsync'];
  const useStyleTag: typeof import('@vueuse/core')['useStyleTag'];
  const useSwipe: typeof import('@vueuse/core')['useSwipe'];
  const useTemplateRefsList: typeof import('@vueuse/core')['useTemplateRefsList'];
  const useTextSelection: typeof import('@vueuse/core')['useTextSelection'];
  const useTextareaAutosize: typeof import('@vueuse/core')['useTextareaAutosize'];
  const useThrottle: typeof import('@vueuse/core')['useThrottle'];
  const useThrottleFn: typeof import('@vueuse/core')['useThrottleFn'];
  const useThrottledRefHistory: typeof import('@vueuse/core')['useThrottledRefHistory'];
  const useTimeAgo: typeof import('@vueuse/core')['useTimeAgo'];
  const useTimeout: typeof import('@vueuse/core')['useTimeout'];
  const useTimeoutFn: typeof import('@vueuse/core')['useTimeoutFn'];
  const useTimeoutPoll: typeof import('@vueuse/core')['useTimeoutPoll'];
  const useTimestamp: typeof import('@vueuse/core')['useTimestamp'];
  const useTitle: typeof import('@vueuse/core')['useTitle'];
  const useToggle: typeof import('@vueuse/core')['useToggle'];
  const useTransition: typeof import('@vueuse/core')['useTransition'];
  const useUrlSearchParams: typeof import('@vueuse/core')['useUrlSearchParams'];
  const useUserMedia: typeof import('@vueuse/core')['useUserMedia'];
  const useVModel: typeof import('@vueuse/core')['useVModel'];
  const useVModels: typeof import('@vueuse/core')['useVModels'];
  const useVibrate: typeof import('@vueuse/core')['useVibrate'];
  const useVirtualList: typeof import('@vueuse/core')['useVirtualList'];
  const useWakeLock: typeof import('@vueuse/core')['useWakeLock'];
  const useWebNotification: typeof import('@vueuse/core')['useWebNotification'];
  const useWebSocket: typeof import('@vueuse/core')['useWebSocket'];
  const useWebWorker: typeof import('@vueuse/core')['useWebWorker'];
  const useWebWorkerFn: typeof import('@vueuse/core')['useWebWorkerFn'];
  const useWindowFocus: typeof import('@vueuse/core')['useWindowFocus'];
  const useWindowScroll: typeof import('@vueuse/core')['useWindowScroll'];
  const useWindowSize: typeof import('@vueuse/core')['useWindowSize'];
  const watch: typeof import('vue')['watch'];
  const watchArray: typeof import('@vueuse/core')['watchArray'];
  const watchAtMost: typeof import('@vueuse/core')['watchAtMost'];
  const watchDebounced: typeof import('@vueuse/core')['watchDebounced'];
  const watchEffect: typeof import('vue')['watchEffect'];
  const watchIgnorable: typeof import('@vueuse/core')['watchIgnorable'];
  const watchOnce: typeof import('@vueuse/core')['watchOnce'];
  const watchPausable: typeof import('@vueuse/core')['watchPausable'];
  const watchPostEffect: typeof import('vue')['watchPostEffect'];
  const watchSyncEffect: typeof import('vue')['watchSyncEffect'];
  const watchThrottled: typeof import('@vueuse/core')['watchThrottled'];
  const watchTriggerable: typeof import('@vueuse/core')['watchTriggerable'];
  const watchWithFilter: typeof import('@vueuse/core')['watchWithFilter'];
  const whenever: typeof import('@vueuse/core')['whenever'];
}
