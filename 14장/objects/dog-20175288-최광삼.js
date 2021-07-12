// 변수 선언
var find = false;
var gameover = null;

var start = document.getElementById("start");
var remains = document.getElementById("remains");
var fails = document.getElementById("fails");
var timer = document.getElementById("timer");
var helpMsg = document.getElementById("helpMsg");
var bad = document.getElementById("bad");
var bi = document.getElementById("bi");
var chimes = document.getElementById("chimes");
var clock = document.getElementById("clock");
var ending = document.getElementById("ending");
var tada = document.getElementById("tada");

// 각 열마다 정답을 찾기 위한 배열 선언
var eggs = new Array(3);
eggs[0] = new Array(8);
eggs[1] = new Array(8);
eggs[2] = new Array(8);

// 테이블에 이미지 객체 생성
function createTable() {
    var first = document.getElementById("firstRow"); // 첫째 행
    var second = document.getElementById("secondRow"); // 둘째 행
    var third = document.getElementById("thirdRow"); // 셋째 행

    for(var colunm=0; colunm<8; colunm++) {
        first.innerHTML += "<td><img id='egg" + [0] + [colunm] + "' src='media/img1.gif' onclick='checkEggs(event)' onmouseover='over(event)' onmouseout='out(event)'></td>";
        second.innerHTML += "<td><img id='egg" + [1] + [colunm] + "' src='media/img1.gif' onclick='checkEggs(event)' onmouseover='over(event)' onmouseout='out(event)'></td>";
        third.innerHTML += "<td><img id='egg" + [2] + [colunm] + "' src='media/img1.gif' onclick='checkEggs(event)' onmouseover='over(event)' onmouseout='out(event)'></td>";
    }
}

// 게임 시작 메뉴를 눌렀을 때
function gameStart() {
    bi.play(); // 게임 시작 효과음

    remainsNumber = prompt("찾을 강아지의 갯수(8개 이하)를 입력해주세요."); // 숨어있을 강아지의 갯수를 입력 받음.
    while(remainsNumber > 8 || remainsNumber <= 0 || remainsNumber == "") { // 8개 이하로만 입력 받을 수 있도록 조건문 부여
        alert("잘못된 숫자를 입력하였습니다.\n8 이하의 정수를 입력해주세요.");
        remainsNumber = prompt("찾을 강아지의 갯수(8개 이하)를 입력해주세요.");
    }

    searchTime = prompt("강아지를 찾는 시간(30초 이하)을 설정해주세요."); // 강아지를 찾을 시간을 입력 받음.
    while(searchTime > 30 || searchTime <= 0 || searchTime == "") { // 30초 이하로 입력 받을 수 있도록 조건문 부여
        alert("잘못된 숫자를 입력하였습니다.\n30 이하의 정수를 입력해주세요.");
        searchTime = prompt("강아지를 찾는 시간(30초 이하)을 설정해주세요.");
    }

    start.innerHTML = "게임 재시작";

    // 기타 사항 초기화
    find = false;
    failsNumber = 0;
    numberOfDog = 0;
    remains.innerHTML = "남은 강아지 : " + remainsNumber;
    fails.innerHTML = "실패 횟수 : " + failsNumber;

    // 이미지 초기화
    for(var i=0; i<3; i++) {
        for(var j=0; j<8; j++) {
            eggs[i][j] = null;
            var egg = document.getElementById("egg" + [i] + [j]);
            egg.src = "media/img1.gif";
            egg.style.border = "none";
        }
    }

    if(gameover != null) {
        document.body.removeChild(gameover); // 게임오버 문구 초기화
    }

    $("#start").css("visibility", "hidden"); // 시작 버튼 감춤(jQuery 이용)

    alert("10초 동안 강아지가 있는 위치를 기억하세요.")
    helpMsg.innerHTML = "10초 동안 강아지가 있는 위치를 기억하세요."
    second = 10; // 10초 카운트 다운
    countDown = setInterval("count()", 1000);
    
    showDog();
}

// 숨은 강아지를 생성하는 코드
function showDog() {
    while(numberOfDog != remainsNumber) { // 랜덤한 위치에 강아지 표시
        var row = Math.floor(Math.random()*3);
        var colunm = Math.floor(Math.random()*8);

        if(eggs[row][colunm] == null) {
            eggs[row][colunm] = "dog"; // 정답 확인을 위한 텍스트 삽입
            numberOfDog++; // 숫자를 증가시켜 반복, 최대값으로 사용자가 입력한 숫자만큼 강아지가 나오도록 함.
            var egg = document.getElementById("egg" + [row] + [colunm]);
            egg.src = "media/img2.gif";
        }
    }
}

// 카운트다운에 사용되는 코드
function count() {
    second--;

    // 타이머가 5초 미만으로 남았을 때 똑딱똑딱하는 효과음 재생
    if(second < 5 && second >= 0) {
        clock.play();
    }

    // 강아지를 보여주는 시간 카운트
    if(second == -1 && !find) {
        hideDog();
        clearInterval(countDown);
        countDown = null;
        second = searchTime;
        countDown = setInterval("count()", 1000);
        find = true;

        alert("지금부터 숨어있는 강아지를 찾아주세요!\n주어진 기회는 5번입니다.");
        helpMsg.innerHTML = " 지금부터 숨어있는 강아지를 찾아주세요!<br>주어진 기회는 5번입니다.";
    }
    
    // 강아지를 찾는 시간이 끝난 경우
    if(second == -1 && find) {
        second = 0;
        alert("시간이 종료 되었습니다.");
        helpMsg.innerHTML = "시간이 종료 되었습니다."
        clearInterval(countDown);
        countDown = null;
        find = false;
        numberOfDog = 0;

        // 찾지 못한 강아지를 보여줌
        for(var i=0; i<3; i++) {
            for(var j=0; j<8; j++) {
                if(eggs[i][j] == "dog") {
                    var egg = document.getElementById("egg" + [i] + [j]);
                    egg.src = "media/img2.gif";
                    egg.style.border = "1px solid red";
                }
            }
        }
        gameOver();
    }
    timer.innerHTML = "남은 시간 : " + second;
}

// 강아지 숨기기
function hideDog() {
    for(var i=0; i<3; i++) {
        for(var j=0; j<8; j++) {
            var egg = document.getElementById("egg" + [i] + [j]);
            egg.src = "media/img1.gif";
        }
    }
}

// 클릭한 것이 맞는지 틀린지 확인하는 코드
function checkEggs(e) {
    var egg = e.target;
    var i = egg.id.charAt(3); // 선택한 객체의 행에 대한 정보
    var j = egg.id.charAt(4); // 선택한 객체의 열에 대한 정보

    if(find && eggs[i][j] == "dog") {
        chimes.play(); // 맞출 경우 효과음
        var egg = document.getElementById("egg" + [i] + [j]);
            egg.src = "media/img2.gif";
            remainsNumber--;
            remains.innerHTML = "남은 강아지 : " + remainsNumber;
            eggs[i][j] = "found"; // 맞춘 강아지는 found 처리
    }
    else if(find) {
        bad.play(); // 틀릴 경우 효과음
        failsNumber++; // 실패수를 증가시켜 나감
        fails.innerHTML = "실패 횟수 : " + failsNumber;

        // 주어진 5회를 모두 소모했을 경우 게임 오버
        if(failsNumber == 5) {
            alert("게임 오버!\n주어진 틀린 시도회수를 모두 소모하였습니다.");
            helpMsg.innerHTML = "게임 오버! 주어진 틀린 시도회수를 모두 소모하였습니다.";
            clearInterval(countDown);

            for(var i=0; i<3; i++) {
                for(var j=0; j<8; j++) {
                    if(eggs[i][j] == "dog") {
                        var egg = document.getElementById("egg" + [i] + [j]);
                        egg.src = "media/img2.gif";
                        egg.style.border = "1px solid red";
                    }
                }
            }
            gameOver();
        }
    }

    if(remainsNumber == 0) {
        tada.play(); // 게임 승리시 빵빠레 효과음
        alert("축하합니다!\n모든 강아지를 찾았습니다!");
        helpMsg.innerHTML = "축하합니다!<br>모든 강아지를 찾았습니다!";
        clearInterval(countDown);
        countDown = null;
        gameover = null;
        $("#start").css("visibility", "visible"); // 게임 승리시 시작 버튼 표시(jQuery 이용)
    }
}

// 마우스가 이미지에 올려졌을 때와 아닐 때의 효과를 부여하기 위한 코드
function over(e) {
    e.target.style.border = "1px solid red";
}
function out(e) {
    e.target.style.border = "none";
}

// 게임 오버시 효과
function gameOver() {
    gameover = document.createElement("div");
    gameover.innerHTML = "GAME OVER";
    gameover.style.position = "absolute";
    gameover.style.fontSize = "70px";
    gameover.style.color = "darkred";
    gameover.style.fontWeight = "1000";
    gameover.style.top = "300px";
    gameover.style.left = "400px";
    document.body.appendChild(gameover);
    ending.play(); // 게임 종료 효과음
    $("#start").css("visibility", "visible"); // 게임 오버시 다시 시작 버튼 표시(jQuery 이용)
}