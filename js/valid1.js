document.addEventListener('DOMContentLoaded', function () {
    function makeLight() {
        document.querySelector("body").classList.remove('dark-body');
        document.querySelector("#background-tr").classList.remove('background-with-dark-shadow');
        document.querySelector("#background-table").classList.remove('dark-background');
        document.querySelector("#numbers-table").classList.remove('dark-background');
        document.querySelector("#result-td").classList.remove('dark-background');
        document.querySelector("#variant-table").classList.remove('dark-variant-table');
        document.querySelector("#name-table").classList.remove('dark-name-table');
        document.querySelector("#body-table").classList.remove('dark-body-table');
        document.getElementById("imagine3").src = "images/pic3.png";
        document.querySelector("#imagine3").classList.remove("dark-imagine3");
        document.querySelectorAll("line").forEach(line => line.classList.remove("dark-svg-line-color"));
        document.querySelector("path").classList.remove("dark-svg-figure-color");
        document.querySelector("#coord").classList.remove("dark-coord");
        document.querySelectorAll("text").forEach(text => text.classList.remove("dark-svg-text"));
        document.querySelectorAll("polygon").forEach(polygon => polygon.classList.remove("dark-svg-figure-color"));
    }

    function makeDark() {
        document.querySelector("body").classList.add('dark-body');
        document.querySelector("tr[class='background-with-shadow']").classList.add('background-with-dark-shadow');
        document.querySelectorAll("table[class='background']").forEach(table => table.classList.add('dark-background'));
        document.querySelector("td[class='background']").classList.add('dark-background');
        document.querySelector("#variant-table").classList.add('dark-variant-table');
        document.querySelector("#name-table").classList.add('dark-name-table');
        document.querySelector("#body-table").classList.add('dark-body-table');
        document.getElementById("imagine3").src = "images/dark-pic3.png";
        document.querySelector("#imagine3").classList.add("dark-imagine3");
        document.querySelector("path").classList.add("dark-svg-figure-color");
        document.querySelector("#coord").classList.add("dark-coord");
        document.querySelectorAll("line").forEach(line => line.classList.add("dark-svg-line-color"));
        document.querySelectorAll("text").forEach(text => text.classList.add("dark-svg-text"));
        document.querySelectorAll("polygon").forEach(polygon => polygon.classList.add("dark-svg-figure-color"));
    }

    const request = getXmlHttp();
    const url = "php/checkColor.php";
    request.open("GET", url, true);
    request.addEventListener("readystatechange", () => {
        try {
            if (request.readyState === 4 && request.status === 200) {
                if (request.response === "dark") makeDark();
                else makeLight();
            }
        } catch (e) {
            alert("Возникла ошибка: " + e);
        }
    });
    request.send();
    restore();

    function getXmlHttp() {
        let xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    document.querySelector("input[type=text]").addEventListener('focus', function (e) {
        e.preventDefault();
        document.querySelector('#inputY').classList.remove('errorY');
    });
    document.querySelector("#reset").addEventListener('click', function (e) {
        e.preventDefault();
        clear();
        const request = getXmlHttp();
        const url = "php/reset.php";
        request.open("GET", url, true);
        request.send();
    });

    function clear() {
        document.getElementById('result-table').getElementsByTagName("tbody")[0].innerHTML = document.getElementById("result-table").rows[0].innerHTML;
        document.getElementById("inputY").value = "";
        document.querySelector("#inputY").classList.remove('errorY');
        document.getElementById('defaultRadio').checked = true;
        document.getElementById('selectR').selectedIndex = 0;
    }

    function restore() {
        const request = getXmlHttp();
        const url = "php/restore.php";
        request.open("POST", url, true);
        request.addEventListener("readystatechange", () => {
            try {
                if (request.readyState === 4 && request.status === 200) {
                    let result = request.response;
                    let data;
                    if (typeof result == "string") {
                        data = JSON.parse(result);
                    }
                    for (person of data) {
                        let newRow = document.getElementById('result-table').getElementsByTagName('tbody')[0].insertRow();
                        let cell_0 = newRow.insertCell(0);
                        let cell_1 = newRow.insertCell(1);
                        let cell_2 = newRow.insertCell(2);
                        let cell_3 = newRow.insertCell(3);
                        let cell_4 = newRow.insertCell(4);
                        let cell_5 = newRow.insertCell(5);
                        cell_0.appendChild(document.createTextNode(person.time));
                        cell_1.appendChild(document.createTextNode(person.scriptTime));
                        cell_2.appendChild(document.createTextNode(person.x));
                        cell_3.appendChild(document.createTextNode(person.y));
                        cell_4.appendChild(document.createTextNode(person.r));
                        cell_5.appendChild(document.createTextNode(person.answer));
                    }
                }
            } catch (e) {
                alert("Возникла ошибка: " + e);
            }
        });
        request.send();
    }

    function changeColor(color) {
        const request = getXmlHttp();
        const url = "php/changeColor.php?color=" + color;
        request.open("GET", url, true);
        request.send();
    }

    document.querySelector('#changeColor').addEventListener('click', function (e) {
        e.preventDefault();
        if (document.querySelector("body").classList.contains('dark-body')) {
            makeLight();
            changeColor("light");
        } else {
            makeDark();
            changeColor("dark");
        }
    });

    document.querySelector("#submit").addEventListener('click', function (e) {
        e.preventDefault();
        let param_x;
        let param_y;
        let param_r;
        let timeZone = new Date();

        function drawCoord() {
            let coordX = 80 / param_r * param_x + 100;
            let coordY = -80 / param_r * param_y + 100;
            document.getElementById("coord").setAttribute("cx", coordX);
            document.getElementById("coord").setAttribute("cy", coordY);
        }

        function checkY() {
            let line = document.querySelector("#inputY").value;
            line = line.replace(",", ".");
            let regex = /^[-]?[0-9]{1,17}([.][0-9]{1,17}|[0-9]{0,17})$/;
            let OK = regex.exec(line);
            let y = parseFloat(line);
            const MAX = 3;
            const MIN = -5;
            if (!isNaN(y) && y > MIN && y < MAX && OK) {
                param_y = y;
                document.querySelector('#inputY').classList.remove('errorY');
                return true;
            } else {
                return false;
            }
        }

        function checkX() {
            let radio = document.querySelectorAll('input[name="xRadio"]');
            for (let elem in radio) {
                if (radio[elem].checked)
                    param_x = radio[elem].value;
            }
            return true;
        }

        function checkR() {
            let select = document.getElementById('selectR');
            param_r = select.options[select.selectedIndex].value;
            return true;
        }

        if (checkY() && checkX() && checkR()) {
            drawCoord();
            const request = getXmlHttp();
            const url = "php/script.php?x=" + param_x + "&y=" + param_y + "&r=" + param_r + "&time=" + timeZone.getTimezoneOffset();
            request.open("GET", url, true);
            request.addEventListener("readystatechange", () => {
                try {
                    if (request.readyState === 4 && request.status === 200) {
                        let person = JSON.parse(request.response);
                        if (person.isValid === 'да') {
                            let newRow = document.getElementById('result-table').getElementsByTagName('tbody')[0].insertRow();
                            let cell_0 = newRow.insertCell(0);
                            let cell_1 = newRow.insertCell(1);
                            let cell_2 = newRow.insertCell(2);
                            let cell_3 = newRow.insertCell(3);
                            let cell_4 = newRow.insertCell(4);
                            let cell_5 = newRow.insertCell(5);
                            cell_0.appendChild(document.createTextNode(person.time));
                            cell_1.appendChild(document.createTextNode(person.scriptTime));
                            cell_2.appendChild(document.createTextNode(person.x));
                            cell_3.appendChild(document.createTextNode(person.y));
                            cell_4.appendChild(document.createTextNode(person.r));
                            cell_5.appendChild(document.createTextNode(person.answer));
                        }
                    }
                } catch (e) {
                    alert("Возникла ошибка: " + e);
                }
            });
            request.send();
        } else {
            document.querySelector('#inputY').classList.add('errorY');
        }
    });

    /*window.onunload = function () {
        const request = getXmlHttp();
        const url = "php/reset.php";
        request.open("POST", url, true);
        request.send();
        clear();
        changeColor("light");
    };*/
});