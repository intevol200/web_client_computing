function printStar(num) {
    if(num > 0) {
        for(i=0; i<num; i++) {
            for(j=0; j<(i+1); j++) {
                document.write("*");
            }
            document.write("<br>");
        }
    }
    else if(isNaN(parseInt(num)) == true || num <= 0) {
        document.write("입력 오류 입니다.");
    }
}