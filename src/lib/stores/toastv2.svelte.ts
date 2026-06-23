class ToastManager {
    // Svelte 5 runes can be used in raw .ts files as long as the extension is .svelte.ts
    message = $state('');
    type = $state<'info' | 'success' | 'error'>('info');
    visible = $state(false);
    
    // Keep track of the timer so we can reset it if the user clicks rapidly
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    show(msg: string, type: 'info' | 'success' | 'error' = 'info', duration: number = 2500) {
        this.message = msg;
        this.type = type;
        this.visible = true;

        // Clear any existing timer so the toast doesn't disappear too early
        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            this.visible = false;
        }, duration);
    }
}

// Export a single instance for the whole app to share
export const toast = new ToastManager();