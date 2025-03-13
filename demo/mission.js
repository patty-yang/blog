
self.onmessage = (e) => {
    if(e.data.type === 'run') {
        let count = 0
        for (let i = 0; i < 10 ** 9; i++) {
            count += 10
        }
        self.postMessage({type: 'run-success', count})
    }
}


