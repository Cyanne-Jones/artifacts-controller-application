require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/unequip.js slot=helmet character=Flyanne`

// slot = helmet | weapon | shield | body_armor | leg_armor | boots | ring1 | ring2 | amulet | artifact1 | artifact2 | artifact3 | utility1 | utility2 | bag | rune

const basic = async () => {

  args = process.argv

  const slot = args.find(arg => arg.startsWith("slot="))?.split('=')[1] || "weapon"
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  const body = `{ "slot": "${slot}" }`

  console.log(`✨ Unequipping from: ${slot} slot ✨`)

  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/unequip`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    body
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error(`😱 Oh no! Failed to unequip item from ${slot} slot`)
    }
    const { data } = await response.json();
    console.log('✅ Unequip successful!')
  } catch (error) {
    console.log({ error })
  }
}

basic()