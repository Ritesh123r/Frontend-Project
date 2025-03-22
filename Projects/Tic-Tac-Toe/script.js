window.onload = function () {
    let boxes = document.querySelectorAll(".box");
    let rebtn = document.querySelector(".restart");
    let resbtn = document.querySelector(".button");

    let turnO = true; // true -> O's turn, false -> X's turn
    let count = 0;

    const winPattern = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8], [2,4,6]           // Diagonals
    ];

    // Function to handle box click
    function handleClick(event) {
        let box = event.target;

        if (box.innerText !== "") return; // Prevent overwriting

        box.innerText = turnO ? "O" : "X"; // Set "O" or "X"
        turnO = !turnO; // Switch turn
        count++;

        checkWinner();
    }

    // Function to check for a winner
    function checkWinner() {
        for (let pattern of winPattern) {
            let [a, b, c] = pattern;
            if (
                boxes[a].innerText !== "" &&
                boxes[a].innerText === boxes[b].innerText &&
                boxes[a].innerText === boxes[c].innerText
            ) {
                setTimeout(() => {
                    alert(`🎉 Player ${boxes[a].innerText} Wins!`);
                }, 100);
                disableBoxes();
                return;
            }
        }

        if (count === 9) {
            setTimeout(() => {
                alert("😲 It's a Draw!");
            }, 100);
        }
    }

    // Function to disable all boxes after a win
    function disableBoxes() {
        boxes.forEach(box => box.removeEventListener("click", handleClick));
    }

    // Function to reset the game
    function resetGame() {
        boxes.forEach(box => {
            box.innerText = "";
            box.addEventListener("click", handleClick);
        });
        turnO = true;
        count = 0;
    }

    // Add event listeners to all boxes after page load
    boxes.forEach(box => box.addEventListener("click", handleClick));

    // Restart and Reset buttons
    rebtn.addEventListener("click", resetGame);
    resbtn.addEventListener("click", resetGame);
};
