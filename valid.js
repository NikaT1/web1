$(document).ready(function(){
    $("input[type=text]").focus(function(e) {
        e.preventDefault();
        $('#inputY').removeClass('errorY');
    });
    $("#reset").click(function(e){
        e.preventDefault();
        $("#result-table tr:gt(0)").remove();
        $("#inputY").val("");
        $("#inputY").removeClass('errorY');
        $('input[name="xRadio"][value="-3"]').prop('checked', true);
        $('#selectR [value="1"]').prop('selected', true);
    });
    $("#submit").click(function(e){
        e.preventDefault();
        let param_x;
        let param_y;
        let param_r;
        let timeZone = new Date();

        function drawCoord() {
            let coordX = 80/param_r*param_x + 100;
            let coordY = -80/param_r*param_y + 100;
            $("#coord").attr("cx", coordX);
            $("#coord").attr("cy", coordY);
        }

        function checkY() {
            let line = $("#inputY").val();
            line = line.replace(",",".");
            let regex = /^[-]?[0-9]{1,17}([.][0-9]{1,17}|[0-9]{0,17})$/;
            let OK = regex.exec(line);
            let y = parseFloat(line);
            const MAX = 3;
            const MIN = -5;
            if (!isNaN(y) && y > MIN && y < MAX && OK) {
                param_y = y;
                $('#inputY').removeClass('errorY');
                return true;
            }
            else {
                return false;
            }
        }

        function checkX() {
            if ($('input[name="xRadio"]').is(':checked')){
                param_x = $('input[name="xRadio"]:checked').val();
                return true;
            } else {
                return false;
            }
        }

        function checkR() {
            param_r = $('#selectR').val();
            return true;
        }

        if (checkY() && checkX() && checkR()) {
            drawCoord();
            $.ajax({
                url: "script.php",
                method: "GET",
                data: {x: param_x, y: param_y, r: param_r, time: timeZone.getTimezoneOffset()},
                cache: false,
                success: function (data) {
                    let person = JSON.parse(data);
                    let row = "<tr><td>"+person.time+"</td><td>"+person.scriptTime+"</td><td>"+person.x+
                        "</td><td>"+person.y+"</td><td>"+person.r+"</td><td>"+person.answer+"</td></tr>";
                    $("#result-table").append(row);
                },
                error: function (jqXHR, exception) {
                        if (jqXHR.status === 0) {
                            alert('Нет подключения. Проверьте подключение к сети.');
                        } else if (jqXHR.status == 404) {
                            alert('404 - страница не найдена.');
                        } else if (jqXHR.status == 500) {
                            alert('500 - произошла ошибка сервера.');
                        } else if (exception === 'parsererror') {
                            alert('Ошибка парсинга JSON.');
                        } else if (exception === 'timeout') {
                            alert('Превышение допустимого времени выполнения.');
                        } else if (exception === 'abort') {
                            alert('Запрос Ajax прерван.');
                        } else {
                            alert('Непредвиденная ошибка. ' + jqXHR.responseText);
                        }
                }
            });
        }
        else {
            $('#inputY').addClass('errorY');
        }
    });
});