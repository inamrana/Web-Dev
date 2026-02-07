function startMoving() {

    const box = document.getElementById("box");
    let position=0;
    const interval = setInterval(moveBox, 10);
}
    function moveBox() {

        if (position >= 350) {
            clearInterval(interval);

        }           
        else {
            position++;
            box.style.left = position + 'px';
        }
        
    }




