<script lang="ts">
  import { enhance } from "$app/forms"
  import { goto } from "$app/navigation"
  import type { PageData, ActionData } from "./$types"

  export let data: PageData

  $: gameStatus = "playing"
  $: correct = 0
  $: incorrect = 0
  $: remaining = data.game.length - (correct + incorrect)
  $: game = data.game
  $: currentIndex = 0
  $: currentQuestion = game[currentIndex]?.question
  $: currentChoices = game[currentIndex]?.choices
  console.log(gameStatus)
</script>

<svelte:head>
  <title>Friends Trivia</title>
  <meta
    name="description"
    content="Friends Trivia with AI-generated Questions" />
</svelte:head>

<section class="flex items-center gap-4 justify-center mx-auto mb-10">
  <div>Correct: {correct}</div>
  <div>Incorrect: {incorrect}</div>
  <div>Remaining: {remaining}</div>
</section>

<section>
  {#if gameStatus === "playing" && currentChoices}
    <h2 class="text-3xl text-center font-bold mb-4">Q: {currentQuestion}</h2>

    <ul class="grid grid-cols-2 w-full gap-4">
      {#each currentChoices as choice}
        <li>
          <form
            method="POST"
            action="?/guess"
            use:enhance={({ form, data, action, cancel, submitter }) => {
              // `form` is the `<form>` element
              // `data` is its `FormData` object
              // `action` is the URL to which the form is posted
              // `cancel()` will prevent the submission
              // `submitter` is the `HTMLElement` that caused the form to be submitted

              return async ({ result, update }) => {
                // @ts-ignore
                const { isCorrect } = result.data
                if (isCorrect) {
                  correct = correct + 1
                } else {
                  incorrect = incorrect + 1
                }
                if (game.length <= correct + incorrect) {
                  gameStatus = "completed"
                } else {
                  currentIndex = currentIndex + 1
                }
                // `result` is an `ActionResult` object
                // `update` is a function which triggers the logic that would be triggered if this callback wasn't set
              }
            }}>
            <input
              type="hidden"
              class="hidden"
              id="currentIndex"
              name="currentIndex"
              value={currentIndex} />
            <input
              type="hidden"
              class="hidden"
              id="choice"
              name="choice"
              value={choice} />
            <button
              class="w-full h-full
				text-lg uppercase font-bold
				hover:text-slate-600
				bg-white dark:bg-slate-500 hover:bg-yellow-300 data-[answer-state=right]:bg-green-300 data-[answer-state=wrong]:bg-red-300
				border-4 border-cyan-300 hover:border-yellow-500 data-[answer-state=right]:border-green-500 data-[answer-state=wrong]:border-red-500
				p-16 rounded
				">{choice}</button>
          </form>
        </li>
      {/each}
    </ul>
  {/if}
  {#if gameStatus === "completed"}
    <h2 class="text-3xl text-center font-bold mb-4">Game Over! You got {correct}/{game.length} right!</h2>
    <button
      class="underline mx-auto"
      on:click={() => location.reload()}>Restart</button>
  {/if}
</section>
