document.addEventListener('DOMContentLoaded', () => {
    const ball = document.querySelector('.ball')
    let direction = 1
    let position = 0

    setInterval(() => {
        position += direction * 5

        if (position > 250) {
            direction = -1
        } else if (position < 0) {
            direction = 1
        }

        ball.style.left = position + 'px'
    }, 100)
})