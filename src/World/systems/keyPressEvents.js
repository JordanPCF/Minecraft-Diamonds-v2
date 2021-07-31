function listenForKeyPress (isKeyDown) {
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 16: isKeyDown['shift'] = true; break;
        }
    });

    document.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 16: isKeyDown['shift'] = false; break;
        }
    });
}

export { listenForKeyPress };