const q = (e) => document.querySelector(e)

const ctx = document.getElementById('myChart').getContext('2d')

const init = {
	base: 10000,
	rate: 1.05,
	year: 10,
}

let myChart
const draw = (labels, data) => {
	myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels,
			datasets: [
				{
					label: '資産',
					data: data[0],
					borderWidth: 1,
					borderColor: '#ff0000',
				},
				{
					label: '投資',
					data: data[1],
					borderWidth: 1,
					borderColor: '#00ff00',
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	})

	const total = (data[0][data[0].length - 1] / data[1][data[1].length - 1]) * 100 - 100
	q('#total').textContent = Math.round(total * 100) / 100
	q('#s1').textContent = Number(data[0][data[0].length - 1]).toFixed()
	q('#s2').textContent = data[1][data[1].length - 1]
	q('#s3').textContent = Number(data[0][data[0].length - 1]).toFixed() - data[1][data[1].length - 1]
	q('#total').textContent = Math.round(total * 100) / 100
}

const setValue = () => {
	const labels = []
	const data = [[], []]
	let original = 0
	let val = 0

	const year = parseInt(q('[name=year]').value)
	const base = parseInt(q('[name=base]').value)
	const rate = Number(q('[name=rate]').value)
	const startYear = parseInt(new Date().getFullYear())

	for (let i = 0; i < year; i++) {
		original += base
		val = val * rate + base
		data[0].push(val)
		data[1].push(original)
		labels.push(startYear + i)
	}

	return [labels, data]
}

const redraw = (e) => {
	if (myChart) {
		myChart.destroy()
		const data = setValue()
		draw(...data)
	}
}

q('button').addEventListener('click', (e) => redraw)

q('form').addEventListener('submit', (e) => {
	e.preventDefault()
	redraw(e)
})

q('[name=base]').value = init.base
q('[name=rate]').value = init.rate
q('[name=year]').value = init.year

const data = setValue()
draw(...data)
