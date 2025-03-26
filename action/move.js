require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/move.js x=1 y=2 character=Flyanne`

// assuming locations of interest are the same for all players,
// there's a collection of scripts in package.json to make this easier for default characters
// to go to different workshops and resources
  
const movement = async () => {

  const args = process.argv

  const xCoordinate = args.find(arg => arg.startsWith("x="))?.split('=')[1]
  const yCoordinate = args.find(arg => arg.startsWith("y="))?.split('=')[1]

  if (!xCoordinate && !yCoordinate) {
    console.log('😱 Oh no! No x and/or y coordinate provided')
    return 
  }
  
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  const newLocation = `{ "x": ${xCoordinate}, "y": ${yCoordinate}}`

  console.log(`✨ Moving character to new location: ${newLocation} ✨`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/move`

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    body: newLocation
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error('😱 Oh no! Failed to move character')
    }
    const { data } = await response.json();
    console.log('✅ Movement successful!')
  } catch (error) {
    console.log({ error })
  }
}
  
movement()