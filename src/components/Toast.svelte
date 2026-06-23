<script lang="ts">
  import { toasts } from '$lib/stores/toastStore';
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <div class="toast {toast.type}" role="alert">
      {toast.message}
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 100px;       /* above floating actions */
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 9999;
    pointer-events: none;
  }
  .toast {
    background: var(--surface, #333);
    color: var(--text, #fff);
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
    pointer-events: auto;
  }
  .toast.info { border-left: 4px solid #4a9eff; }
  .toast.success { border-left: 4px solid #4caf50; }
  .toast.error { border-left: 4px solid #f44336; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
</style>