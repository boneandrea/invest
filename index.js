const ctx = document.getElementById('myChart').getContext('2d');

const data=[[],[]]
const labels=[]

const base=10000
const rate=1.05
const year=10
let val=0
let original=0
let myChart
const draw=()=>{
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: '資産',
                    data:data[0],
                    borderWidth: 1,
                    borderColor: "#ff0000",
                },
                {
                    label: '投資',
                    data:data[1],
                    borderWidth: 1,
                    borderColor: "#00ff00",
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

const setValue=()=>{
    for(let i=0;i<year;i++){
        original+=base
        val=val*1.05+base
        data[0].push(val)
        data[1].push(original)
        labels.push(startYear+i)
    }
}


const q=e=>document.querySelector(e)
q("button").addEventListener("click",e=>{
    if (myChart) {
        myChart.destroy();
        setValue()
        draw()
    }
})

const startYear=parseInt((new Date()).getFullYear())
q("[name=base]").value=base
q("[name=rate]").value=rate
q("[name=year]").value=year

setValue()
draw()
