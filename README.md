# HAPHAZARD INSPIRATIONS<!-- markdownlint-disable MD024 -->

Requires seven files

* actions.json - `Action`
* characters.json - `Character`
* events.json - `AnEvent`
* locales.json - `Locale`
* objects.json - `AnObject`
* times.json - `ATime`
* topics.json - `Topic`

Each file is an object with two properties, `default` and `content`.

`Contents` is an Array of idea objects.

`Default` is a single idea object with properties that will be passed down to every idea object in its `content`. This **must** contain a `type` property, or else every object in `contents` **must** have one.

## Idea Objects

### Mandatory properties

* `type`: string, describing the type of idea ("character", "locale", etc)
* `idea`: string, the actual idea itself

### Production-scale properties

* `new`: string, semver, indicates when this idea was added
* `mod`: string, semver, indicates when this idea was modified
* `rename`: string | string[], equal to the `idea` property of the idea to be modified (used only when changing the `idea` property) and may be an Array of strings if the `idea` has been changed more than once.

### Content-filter properties

All are optional and take a boolean value. Unused properties are treated as if they are `false`.

* `fantasy`
* `medievalFantasy`
* `superhero`
* `historicalFiction`
* `western`
* `samurai`
* `horror`
* `scifi`
* `spacefaring`
* `properName`
* `humanDeath`
* `humanDistress`
* `animalDeath`
* `animalDistress`
* `mythsReligionsAndMetaphysics`
* `judaism`
* `christianity`
* `islam`
* `greekRomanMyth`
* `metaphysics`
* `sexual`
* `illicitSubstances`
* `alcohol`
* `tobacco`
* `modern`

### Methods

* `getIdea`: returns a string representing the idea
* `id`: a unique id (by default, equal to `this.idea + " " + this.type`)

## `Character` and `AnObject`

* `Character` is for humans, animals, and other animate beings
* `AnObject` is for physical things

These share a number of properties, so will be lumped together.

### Mandatory properties

* `genderPossessive`: `string | false`
  * `string` is a possessive pronoun used by the idea ("his", "their", etc)
  * `false` indicates it has no possessive pronoun
* `plural`: `string | boolean | [string, string]`
  * `string` will be appended to the `idea` if it is deemed to be plural
  * The array, if present, overrides the above: if deemed plural, the idea will ignore the `idea` property and generate `array[0] + number + array[1]`
  * `boolean` indicates the idea is permanently plural (`true`) or singular (`false`)

### Potentially mandatory properties

If a `plural` string or string array is found, the generator will randomly assign a positive integer number to the idea, and the following properties become mandatory.

* `min`: the lowest `number` acceptable
* `max`: the highest `number` acceptable
* `rateBy`: `number | "incremental"`
  * `number` is used to weight one end of the scale as follows:
    1. an empty array is created
    2. a *counter* is created, equal to `min`
    3. a hidden *value* is created and assigned `1`
    4. `counter` is added to the array `value` times
    5. `counter` is incremented by `1`
    6. `value` is *multiplied* by `rateBy`
    7. if `counter` <= `max`, go to step 4 and repeat
    8. a random number is chosen from the array and assigned to `idea`
  * `"incremental"` follows the above, but the `value` is *incremented* by `1` each time
* `rateFavorsLower`: `boolean` - if `true`, the *counter* starts at `max` and is *decremented* by `1` each loop
* `numerals`: `boolean`
  * `true`: the number is represented by `String(number)` ("4", "27", etc)
  * `false`: the number is translated into English words ("four", "twenty-seven", etc)
* `article`: `string` ("a", "an", "the") which will be used instead if the number turns out to be `1`

### Optional properties for `Character` only

* `realPerson`: `boolean` - if `true`, this is a real person or persons, living or dead
* `fictionalCharacter`: `boolean` - if `true`, this is a specific fictional entity (e.g. `true` for "Dracula", but `false` for "vampire")

## `Locale`

Physical locations.

### Optional properties

Unless noted otherwise, these are all `boolean`

* `preposition`: a `string` such as "on" that will precede the `idea`; defaults to "in"
* `political`: if true, indicates a county, state, city, province, etc
* `geographical`: if true, indicates a continent, an island, a specific location ("Mt. Everest", "The Red Sea", etc), or a generic landmass ("an island", "a mountain", etc); this may include designations that coincide with a `political` identity ("Australia", "Jamaica", "Siberia", etc.)
* `construct`: if true, indicates a physically man-made locale
* `specific`: if true, indicates a specific, non-generic location

### Size properties

One of the following properties should be set to `true`. The others may be set `false` or left unset. For imaginary locations, locations of unknown and unknowable size ("Wonderland", "heaven", etc) or non-specific locales ("anywhere but here"), it is acceptable not to mark size at all.

* `largeSize` - Roughly the size of India or bigger
* `mediumSize` - Country-sized, generally somewhere between Jamaica and India
* `smallSize` - Smaller than Jamaica, generally cities and islands
* `tinySize` - Very small locations, generally no bigger than a city block or two

## `AnEvent`

This is for ideas that represent something physical happening that generally involves more than two people ("an election", "art class", etc), processes that may take several actions to complete ("training for a marathon", "a grand finale", etc), or events that happen *to* people, but not necessarily *by* people ("an earthquake", "a heart attack", etc).

### Optional properties

* `plural`: `boolean` if true, indicates the idea is of several similar or identical events instead of just one
* `punctual`: `boolean` if true, the event is momentary, relatively fast, generally self-contained, and/or generally takes less than an hour to complete ("a hiccup", "a brush with death", "a midnight snack", etc)

### `Topic`

This is for non-physical ideas, emotions, subjects, areas of interest, etc. There are no special properties.

### `ATime`

This is for phrases that mark a point or era in time ("tomorrow", "in the 20th century", "in the not-too-distant future", etc.) or a cyclical event during which something may happen ("at dawn", "during Ramadan", "on Halloween", etc). In the second case, `ATime` differs from `AnEvent` in that the former is pinpointing a specific time, whereas the latter is focused on the specific event itself.

There are no special properties.

### `Action`

This is for phrases that indicate a singular someone is doing an action ("screaming", "taking a pulse", etc), or in a specific state ("being tired", "wearing a fedora", etc). It is almost always in a gerund form.

### Optional property

* `possessive`: `boolean`
  * If present and `true`, this indicates the idea needs a possessive phrase to complete it. This will be marked in the `idea` with the phrase `[THEIR]`.
  * If paired with a `Character`, this will come from that idea's `.genderPossessive` property. Otherwise, it defaults to `"one's"`.
  * `"running [THEIR] mouth off"` could yield "running his mouth off", "running its mouth off", etc, or else "running one's mouth off".
