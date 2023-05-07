import { shuffleArray } from "$lib/utils"
import type { PageServerLoad, Actions } from "./$types"
import { game } from "./friends"

export const load = (({ cookies }) => {
  const data = game.map((item) => ({
    question: item.question,
    choices: shuffleArray([item.answer, ...item.wrongAnswers]),
  }))
  return {
    game: data,
  }
}) satisfies PageServerLoad

export const actions = {
  guess: async ({ request, cookies }) => {
    const data = await request.formData()
    const choice: string = data.get("choice") as any
    const currentIndex: number = data.get("currentIndex") as any

    if (game[currentIndex].answer === choice) {
      return { isCorrect: true }
    } else {
      return { isCorrect: false }
    }
    // return { q: "hi" }
    // const game = new Game(cookies.get('sverdle'));

    // const data = await request.formData();
    // const guess = data.getAll('guess') as string[];

    // if (!game.enter(guess)) {
    // 	return fail(400, { badGuess: true });
    // }

    // cookies.set('sverdle', game.toString());
  },

  restart: async ({ cookies }) => {
    cookies.delete("sverdle")
  },
}
