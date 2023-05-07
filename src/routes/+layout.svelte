<script>
  import "./styles.css"
</script>

<div class="flex flex-col min-h-screen">
  <header class="text-center py-4">
    <h1 class="text-4xl">Friends Trivia</h1>
  </header>
  <main class="grow max-w-2xl mx-auto px-4">
    <slot />
  </main>

  <footer>
    <p>Built with SvelteKit.</p>
  </footer>
</div>
