const billNameInput = document.querySelector('.bill-name-input')
const billPriceInput = document.querySelector('.bill-price-input')
const addBill = document.querySelector('.bill-add')
const billsList = document.querySelector('.main__bills-list')
const billName = document.querySelector('.bill-name')
const billPrice = document.querySelector('.bill-price')
/* const sumBillsBtn = document.querySelector('.sum-bills') */
const removeBill = document.querySelector('ul')
let removeBillBtn = document.getElementsByClassName('bill-remove')

let billsListArray = []
let billsListSum

const personOneNameInput = document.querySelector('.person1-name')
const personOneIncome = document.querySelector('.person1-earnings')
const personTwoNameInput = document.querySelector('.person2-name')
const personTwoIncome = document.querySelector('.person2-earnings')
const expensesInput = document.querySelector('.expenses')
const btnCalc = document.querySelector('.btn-calculate')
const error = document.querySelector('.main__error-msg')
const personOneName = document.querySelector('.result-person-one')
const personOneResult = document.querySelector('.result-one')
const personTwoName = document.querySelector('.result-person-two')
const personTwoResult = document.querySelector('.result-two')
const result = document.querySelector('.result-percentage')
let personOneArray = []
let personTwoArray = []

const addNewBill = () => {
	if (billNameInput.value !== '' && billPriceInput.value !== '') {
		const newBill = document.createElement('li')
		newBill.classList.add('list')
		const name = document.createElement('p')
		name.classList.add('bill-name')
		name.textContent = billNameInput.value
		newBill.append(name)
		const price = document.createElement('p')
		price.classList.add('bill-price')
		price.textContent = billPriceInput.value
		newBill.append(price)
		const button = document.createElement('button')
		button.classList.add('btn-list', 'bill-remove')
		button.textContent = 'Remove'
		newBill.append(button)
		billsList.append(newBill)
		billsListArray.push(billPriceInput.valueAsNumber)
		billNameInput.value = ''
		billPriceInput.value = ''
		error.textContent = ''
	} else {
		error.textContent = 'Please enter the correct data for bill entry.'
	}
}

const sumAllBills = () => {
	billsListSum = 0
	for (let i = 0; i < billsListArray.length; i++) {
		billsListSum += billsListArray[i]
	}
	expensesInput.value = billsListSum
}

const deleteBill = e => {
	let billToRemove = e.target.previousElementSibling.textContent
	expensesInput.value = expensesInput.value - billToRemove
	if (e.target.matches('.bill-remove')) {
		e.target.closest('li').remove()
	}
}

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
		error.textContent =
			'Monthly expenses are zero or expenses higher than shared income. Calculation impossible, please correct the data and try again.'
	}
}

const functions = () => {
	getNames()
	getPercentage(personOneIncome.value, personOneArray)
	getPercentage(personTwoIncome.value, personTwoArray)
	getFairShare()
}

const allListeners = () => {
	btnCalc.addEventListener('click', functions)
	addBill.addEventListener('click', addNewBill)
	addBill.addEventListener('click', sumAllBills)
	/* sumBillsBtn.addEventListener('click', sumAllBills) */
	removeBill.addEventListener('click', deleteBill)
	document.addEventListener('keyup', e => {
		if (e.key === 'Enter') {
			functions()
		}
	})
}
allListeners()
