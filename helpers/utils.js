export const generateRandomString = (length=8) => Math.random().toString(20).slice(2, length)

export const getBaseLetter = (baseCode) => {
    let letter
    if (baseCode === "Natural Satin") letter = 'NS'
    if (baseCode === "Radiant Glow" || baseCode === "Radiant") letter = 'R'
    if (baseCode === "Xtended Wear" || baseCode === "Extended" || baseCode === "Xtended") letter = 'X'
    if (baseCode === "CC Cream") letter = 'CC'
    if (baseCode === "BB Cream") letter = 'BB'

    return letter
}

export const getCoverageLetter = (coverageCode) => {
    let letter
    if (coverageCode === "Sheer") letter = 'S'
    if (coverageCode === "Sheer Med" || coverageCode === "Sheer Medium") letter = 'R'
    if (coverageCode === "Medium") letter = 'M'
    if (coverageCode === "Med Full") letter = 'D'
    if (coverageCode === "Full") letter = 'F'
    // Some bases don't have a coverage code
    if (coverageCode === "") letter = ""

    return letter
}

export const getToningLetter = (toningCode) => {
    let letter
    if (toningCode === "Up") letter = 'U'
    if (toningCode === "Down") letter = 'D'
    if (toningCode === "None" || !toningCode) letter = 'N'

    return letter
}

export const generateUniqueAssigmentCode = (customerUniqueCode, baseCode, coverageCode, toningCode) => {
    const baseLetter = getBaseLetter(baseCode)
    const coverageLetter = getCoverageLetter(coverageCode)
    const toningLetter = getToningLetter(toningCode)
    return `${customerUniqueCode}${baseLetter}${coverageLetter}${toningLetter}`
}

export const getStateCode = (state) => {
    const states = {
      'Alabama': 'AL',
      'Alaska': 'AK',
      'American Samoa': 'AS',
      'Arizona': 'AZ',
      'Arkansas': 'AR',
      'California': 'CA',
      'Colorado': 'CO',
      'Connecticut': 'CT',
      'Delaware': 'DE',
      'District Of Columbia': 'DC',
      'Federated States Of Micronesia': 'FM',
      'Florida': 'FL',
      'Georgia': 'GA',
      'Guam': 'GU',
      'Hawaii': 'HI',
      'Idaho': 'ID',
      'Illinois': 'IL',
      'Indiana': 'IN',
      'Iowa': 'IA',
      'Kansas': 'KS',
      'Kentucky': 'KY',
      'Louisiana': 'LA',
      'Maine': 'ME',
      'Marshall Islands': 'MH',
      'Maryland': 'MD',
      'Massachusetts': 'MA',
      'Michigan': 'MI',
      'Minnesota': 'MN',
      'Mississippi': 'MS',
      'Missouri': 'MO',
      'Montana': 'MT',
      'Nebraska': 'NE',
      'Nevada': 'NV',
      'New Hampshire': 'NH',
      'New Jersey': 'NJ',
      'New Mexico': 'NM',
      'New York': 'NY',
      'North Carolina': 'NC',
      'North Dakota': 'ND',
      'Northern Mariana Islands': 'MP',
      'Ohio': 'OH',
      'Oklahoma': 'OK',
      'Oregon': 'OR',
      'Palau': 'PW',
      'Pennsylvania': 'PA',
      'Puerto Rico': 'PR',
      'Rhode Island': 'RI',
      'South Carolina': 'SC',
      'South Dakota': 'SD',
      'Tennessee': 'TN',
      'Texas': 'TX',
      'Utah': 'UT',
      'Vermont': 'VT',
      'Virgin Islands': 'VI',
      'Virginia': 'VA',
      'Washington': 'WA',
      'West Virginia': 'WV',
      'Wisconsin': 'WI',
      'Wyoming': 'WY'
    }

    const stateCode = Object.keys(states).find((currentState) => {
      return currentState.toLowerCase() === state.toLowerCase()
    })

    if (stateCode) {
      return states[stateCode]
    }

    throw Error(`Could not locate state code for provided state: ${state}`)
}
