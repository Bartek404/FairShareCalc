const person1Input = document.querySelector('.person1-name')
const person1Income = document.querySelector('.person1-earnings')
const person2Input = document.querySelector('.person2-name')
const person2Income = document.querySelector('.person2-earnings')
const expensesInput = document.querySelector('.expenses')
const btn = document.querySelector('.btn')
const error = document.querySelector('.main__error-msg')
const personOneName = document.querySelector('.result-person-one')
const resultOne = document.querySelector('.result-one')
const personTwoName = document.querySelector('.result-person-two')
const resultTwo = document.querySelector('.result-two')
const result = document.querySelector('.result-percentage')

let person1object = {}
let person2object = {}

const getNames = () => {
	if (person1Input.value && person2Input.value !== '') {
		personOneName.textContent = person1Input.value
		personTwoName.textContent = person2Input.value
		error.textContent = ''
	} else {
		error.textContent = 'Please enter correct names!'
	}
}

const getPercentage1 = income => {
	if (person1Income.value != 0) {
		for (let i = 0; i <= 100; i++) {
			person1object[i] = Math.round((income * i) / 100)
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const getPercentage2 = income => {
	if (person2Income.value != 0) {
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
		expensesInput.valueAsNumber <= person1Income.valueAsNumber + person2Income.valueAsNumber
	) {
		for (const [i] of Object.entries(person1object) && Object.entries(person2object)) {
			if (
				person1object[i] + person2object[i] >= expensesInput.value &&
				(person1object[i] * 100) / person1Income.value === (person2object[i] * 100) / person2Income.value
			) {
				console.log((person1object[i] * 100) / person1Income.value, (person2object[i] * 100) / person2Income.value)
				console.log(person1object[i])
				console.log(person2object[i])
				resultOne.textContent = person1object[i]
				resultTwo.textContent = person2object[i]
				return (result.textContent = `${(person1object[i] * 100) / person1Income.value}%`)
			}
		}
	} else {
		error.textContent = 'Please, fill in all fields correctly!'
	}
}

const allFunctions = () => {
	getNames()
	getPercentage1(person1Income.value)
	getPercentage2(person2Income.value)
	getFairShare()
}

btn.addEventListener('click', allFunctions)
document.addEventListener('keyup', e => {
	if (e.key === 'Enter') {
		allFunctions()
	}
})
