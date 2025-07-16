class Component {
  _data = {
    name: ''
  }

  pending = false

  constructor() {
    this.data = new Proxy(this._data, {
      set: (target, key, value) => {
        const res = Reflect.set(target, key, value)

        if (!this.pending) {
          this.pending = true
          Promise.resolve().then(() => {
            this.render();
            this.pending = false
          })
        }

        return res
      }
    });
  }

  render() {
    console.log(this.data.name);
  }
}

const comp = new Component();

comp.data.name = '1';
comp.data.name = '2';
comp.data.name = '3';
comp.data.name = '4';


setTimeout(() => {
  comp.data.name = '5';
  setTimeout(() => {
    comp.data.name = '6';
  })
})
