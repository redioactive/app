import { ComponentPublicInstance } from "vue"

interface Window {
  screenWidth:number
}

/** 声明周期钩子types */
function onMounted(callback: () => void): void;
function onUpdated(callback: () => void): void;
function onUnmounted(callback: () => void): void;
function onBeforeMount(callback: () => void): void;
function onBeforeUpdate(callback: () => void): void;
function onBeforeUnmount(callback: () => void): void;

function onErrorCaptured(callback: ErrorCapturedHook): void;
type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void

function onRenderTracked(callback: DebuggerHook): void
type DebuggerHook = (e: DebuggerEvent) => void
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
  key: any
}

function onRenderTriggered(callback: DebuggerHook): void
type DebuggerHook = (e: DebuggerEvent) => void
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}

function onActivated(callback: () => void): void;
function onDeactivated(callback: () => void): void;
function onServerPrefetch(callback: () => Promise<any>): void;
