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

let person1object = {}
let person2object = {}

const getNames = () => {
	if (personOneNameInput.value && personTwoNameInput.value !== '') {
		personOneName.textContent = personOneNameInput.value
		personTwoName.textContent = personTwoNameInput.value
		error.textContent = ''
	} else {
		error.textContent = 'Please enter correct names!'
	}
}

const getPercentage1 = income => {
	if (personOneIncome.value != 0) {
		for (let i = 0; i <= 100; i++) {
			person1object[i] = Math.round((income * i) / 100)
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const getPercentage2 = income => {
	if (personTwoIncome.value != 0) {
		for (let i = 0; i <= 100; i++) {
			person2object[i] = Math.round((income * i) / 100)
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const getFairShare = () => {
	if (
		expensesInput.value != 0 &&
		expensesInput.valueAsNumber <= personOneIncome.valueAsNumber + personTwoIncome.valueAsNumber
	) {
		for (const [i] of Object.entries(person1object) && Object.entries(person2object)) {
			if (
				person1object[i] + person2object[i] >= expensesInput.value &&
				(person1object[i] * 100) / personOneIncome.value === (person2object[i] * 100) / personTwoIncome.value
			) {
				console.log((person1object[i] * 100) / personOneIncome.value, (person2object[i] * 100) / personTwoIncome.value)
				console.log(person1object[i])
				console.log(person2object[i])
				personOneResult.textContent = person1object[i]
				personTwoResult.textContent = person2object[i]
				return (result.textContent = `${(person1object[i] * 100) / personOneIncome.value}%`)
			}
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const allFunctions = () => {
	getNames()
	getPercentage1(personOneIncome.value)
	getPercentage2(personTwoIncome.value)
	getFairShare()
}

btn.addEventListener('click', allFunctions)
document.addEventListener('keyup', e => {
	if (e.key === 'Enter') {
		allFunctions()
	}
})
