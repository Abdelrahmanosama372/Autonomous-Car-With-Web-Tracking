startButton.addEventListener('click',()=> {
    fetch(`/controlexec?command='1'`)
    .catch(error => console.error('Error:', error));
});

stopButton.addEventListener('click',()=> {
    fetch(`/controlexec?command='0'`)
    .catch(error => console.error('Error:', error));
});

