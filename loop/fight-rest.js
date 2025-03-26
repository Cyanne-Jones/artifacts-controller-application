

require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env
// run this with `node loop/fight-rest.js count=5 character=Flyanne`

// there's some npm scripts I added to package.json for this also to make fight loops easier for default characters!

const fightAndRestRequest = async ({character}) => { 
  const url = `${API_BASE_URL}/my/${character}/action/fight`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error('😱 Oh no! Failed to perform fight')
    }
    const { data } = await response.json()
    console.log(`💥 Fight successful, waiting for ${data?.cooldown?.total_seconds}s cooldown before resting`)

    await new Promise(resolve => setTimeout(resolve, data?.cooldown?.total_seconds * 1000))

    const restResponse = await fetch(`${API_BASE_URL}/my/${character}/action/rest`, options)
    if (!restResponse.ok) {
      console.log({ restResponse })
      throw new Error('😱 Oh no! Failed to rest')
    }
    const { data: restData } = await restResponse.json()
    console.log(`😴 Rest successful!`)
    return restData
  } catch (error) {
    console.log({ error })
  }
}

const fightAndRestLoop = async () => {
  const start = new Date()
  args = process.argv
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 
  const actionCount = args.find(arg => arg.startsWith("count="))?.split('=')[1] || 1

  console.log(`✨ Performing fight loop ${actionCount} times ✨`)

  try {
    for (let i = 0; i < actionCount; i++) { 
      console.log(`✨ ${i + 1} of ${actionCount} ✨`)

      const { cooldown } = await fightAndRestRequest({character: parsedCharacter})

      if (i + 1 < actionCount )  {
        console.log(`🥵 ${cooldown.total_seconds}s cooldown, ${actionCount - (i + 1)} total fight loops remaining `)
        await new Promise(resolve => setTimeout(resolve, cooldown.total_seconds * 1000))
      }
    }
    const totalSecondsElapsed = (new Date() - start) / 1000
    const formattedTime = `${Math.floor(totalSecondsElapsed / 60)}m ${Math.floor(totalSecondsElapsed % 60)}s`
    console.log(`✅ All fight loops in queue completed, ${formattedTime} total`)
  } catch (error) {
    console.log({ error })
  }
}

fightAndRestLoop()