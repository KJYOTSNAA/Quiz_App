

let https = new XMLHttpRequest();

https.open('get', 'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz', true);

https.send();

https.onload = function () {

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        console.log(data)


        let output = "";

        for (let i of data) {

            output +=
                `<div class="infoQues">
                <p class="P_Ques">${i.id} . ${i.question}</p>
                <input type="radio" id="${i.options[0]}" name="opp+ ${i.id}" value="${i.options[0]}" >${i.options[0]}</br> 
                <input type="radio" id="${i.options[1]}" name="opp+ ${i.id}" value="${i.options[1]}" >${i.options[1]}</br>
                <input type="radio" id="${i.options[2]}" name="opp+ ${i.id}" value="${i.options[2]}" >${i.options[2]}</br>
                <input type="radio" id="${i.options[3]}" name="opp+ ${i.id}" value="${i.options[3]}" >${i.options[3]}</br>

                </div>
                <hr>`;

        }
        document.querySelector("#ques").innerHTML = output;

        const btn = document.querySelector('#btn');
       
        let correctAns = [];
        let marks = 0
        document.querySelector(".scores").innerHTML = `${marks}/5`
        btn.addEventListener("click", () => {
            let selectedAns = [];
            for (let i of data) {

                const radioButtons = document.querySelectorAll(`input[name="opp+ ${i.id}"]`);
                for (const radioButton of radioButtons) {

                    if (radioButton.checked) {
                        let values = radioButton.value
                        selectedAns.push(parseInt(i.options.indexOf(values)));
                        // correctAns.push(`${i.answer}`.value); 
                        break;
                    }
                }


            }
            if (selectedAns.length == 5)//check length of selctedAns == 5 or not
            {
                
                for (let m = 0; m < correctAns.length; m++) {
                    if (selectedAns[m] == correctAns[m] - 1) {
                        marks+= 1
                        
                       
                    }

                }

                document.querySelector(".scores").innerHTML = `${marks}/5`

            }
            else {
                //alert
                alert("Please Answer All The Questions");
            }
            console.log(selectedAns)
            console.log(marks)

        });
        for (let i of data) {
            correctAns.push(parseInt(`${i.answer}`));

        }
        console.log(correctAns)
       



    }
}

