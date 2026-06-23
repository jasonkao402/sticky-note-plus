<script lang="ts">
    import { toast } from '$lib/stores/toastv2.svelte';
    // Svelte provides built-in transition animations!
    import { fly, fade } from 'svelte/transition';
</script>

{#if toast.visible}
    <div 
        class="toast {toast.type}" 
        in:fly={{ y: 50, duration: 300 }} 
        out:fade={{ duration: 200 }}
    >
        {toast.message}
    </div>
{/if}

<style>
    .toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%); /* Centers the element perfectly */
        background-color: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-family: sans-serif;
        font-weight: 500;
        z-index: 9999; /* Ensures it floats above everything else */
        pointer-events: none; /* Prevents it from blocking clicks beneath it */
    }
    .toast.info { border-left: 4px solid #4a9eff; }
    .toast.success { border-left: 4px solid #4caf50; }
    .toast.error { border-left: 4px solid #f44336; }
</style>