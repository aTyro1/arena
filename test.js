const { Engine } = require('json-rules-engine')


/**
 * Setup a new engine
 */
let engine = new Engine()

// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
engine.addRule({
  conditions: {
   all:[
    {
        fact: "personalFoulCount",
        fact: "gameDuration",
        operator: "lessThan",
        value: 12,
    }
   ]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'fouledOut',
    params: {
      message: 'Player has fouled out!'
    }
  }
})

/**
 * Define facts the engine will use to evaluate the conditions above.
 * Facts may also be loaded asynchronously at runtime; see the advanced example below
 */
let facts = {
  personalFoulCount: 13,
  gameDuration: 11
}
console.log(facts.gameDuration)
// Run the engine to evaluate
engine
  .run(facts)
  .then(({ events }) => {
    events.map(event => console.log(event.params.message))
  })

/*
 * Output:
 *
 * Player has fouled out!
 */