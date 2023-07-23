const personOneNameInput = document.querySelector('.person1-name')
const personOneIncome = document.querySelector('.person1-earnings')
const personTwoNameInput = document.querySelector('.person2-name')
const personTwoIncome = document.querySelector('.person2-earnings')
const expensesInput = document.querySelector('.expenses')
const btn = document.querySelector('.btn')
const error = document.querySelector('.main__error-msg')
const personOneName = document.querySelector('.result-person-one')
const personOneResult = document.querySelector('.result-one')
const personTwoName = document.querySelector('.result-person-two')
const personTwoResult = document.querySelector('.result-two')
const result = document.querySelector('.result-percentage')
let personOneArray = []
let personTwoArray = []

const getNames = () => {
	if (personOneNameInput.value && personTwoNameInput.value !== '') {
		personOneName.textContent = personOneNameInput.value
		personTwoName.textContent = personTwoNameInput.value
		error.textContent = ''
	} else {
		error.textContent = 'Please enter correct names!'
	}
}

const getPercentage = (income, personArray) => {
	if (income != 0) {
		for (let i = 0; i <= 100; i++) {
			personArray[i] = Math.round((income * i) / 100)
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const getFairShare = () => {
	if (
		expensesInput.valueAsNumber != 0 &&
		expensesInput.valueAsNumber <= personOneIncome.valueAsNumber + personTwoIncome.valueAsNumber
	) {
		for (let i = 0; i < personOneArray.length; i++) {
			if (
				personOneArray[i] + personTwoArray[i] >= expensesInput.value &&
				(personOneArray[i] * 100) / personOneIncome.value === (personTwoArray[i] * 100) / personTwoIncome.value
			) {
				personOneResult.textContent = personOneArray[i]
				personTwoResult.textContent = personTwoArray[i]
				return (result.textContent = `${(personOneArray[i] * 100) / personOneIncome.value}%`)
			}
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const allFunctions = () => {
	getNames()
	getPercentage(personOneIncome.value, personOneArray)
	getPercentage(personTwoIncome.value, personTwoArray)
	getFairShare()
}

const allListeners = () => {
	btn.addEventListener('click', allFunctions)
	document.addEventListener('keyup', e => {
		if (e.key === 'Enter') {
			allFunctions()
		}
	})
}
allListeners()
