// Variables and page setup
const token = document.getElementById('token').value;
window.tasks = JSON.parse(document.getElementById('token').dataset.tasks);
window.index = 0;
renderTask()
console.log(window.tasks)

// Rendering Tasks Function
function renderTask(i = window.index) {
    const div = document.getElementById('task-container');
    if (!window.tasks[i]) {
        div.innerText = "No tasks in this filter at the moment."
        return
    }
    const currentTask = window.tasks[i].content;
    div.setHTML(mdToHtmlElement(currentTask));
}
// Buttons
const btnNext = document.getElementById('btn-next');
btnNext.addEventListener('click', function () { btnCounter(window.tasks); })

const btnPrev = document.getElementById('btn-prev');
btnPrev.addEventListener('click', function () { btnCounter(window.tasks, false); })

const btnDone = document.getElementById('btn-done');
btnDone.addEventListener('click', function () {
    taskDone(window.tasks[window.index].id, token);
})

// Button Counter
function btnCounter(tasks, increase = true) {
    if (increase) {
        window.index++
    } else {
        window.index--
    }
    renderTask();
    if (window.index <= 0) {
        btnPrev.disabled = true;
    } else {
        btnPrev.disabled = false;
    }
    if (window.index >= tasks.length - 1) {
        btnNext.disabled = true;
    } else {
        btnNext.disabled = false;
    }
}
// Parse Todoist's Markdown
// Since it is fairly basic, the function is implemented rather than attaching a whole library

let testStr = "This is **important** and *italic*";

// var md = require('markdown-it')();
// var result = md.renderInline(testStr);

// var md = require('markdown-it')();
// var result = md.render(testStr);

function mdToHtmlElement(str) {
    var md = window.markdownit({
        typographer: true
    });
    var result = md.render(str);
    return result;
}

// function mdToHtmlElement(str) {
//     let span = document.createElement("span");
//     let taskObj = {};
//     let text = str;
//     const regBI = new RegExp("([\*_]{3}(?:.*?)[\*_]{3})", "g")
//     const regB = new RegExp("([\*_]{2}(?:.*?)[\*_]{2})", "g")
//     const regI = new RegExp("([\*_](?:.*?)[\*_])", "g")
//     const regLink = new RegExp("\[(.*)\]\(.*\)", "g");
//     const regArr = [regBI, regB, regI]
//     const includeArr = [3, 2, 1]
//     const nameArr = ["bold-italic", "bold", "italic"]
//     let i = 0;
//     regArr.forEach(regex => {
//         let textArr = text.split(regex);
//         textArr.forEach(element => {
//             let e = element;
//             let asterisks = "*".repeat(includeArr[i]);
//             let underscores = "_".repeat(includeArr[i]);
//             console.log(asterisks)
//             if (e.includes(asterisks) || e.includes(underscores)) {
//                 e = e.replaceAll(asterisks);
//                 e = e.replaceAll(underscores);
//                 taskObj[e] = nameArr[i];
//             } else if (e != "") {
//                 taskObj[e] = "normal";
//             }
//         });
//         i++
//     });

    // console.log(otherT)

    // // Example for bold
    // let otherT = text.split(regB);
    // otherT.forEach(element => {
    //     let e = element.trim();
    //     if (e[0] == "*") {
    //         taskObj[e.slic(2, -2)] = "bold";
    //     } else if (e != "") {
    //         taskObj[e] = "normal";
    //     }
    // });

//     return taskObj;
// }