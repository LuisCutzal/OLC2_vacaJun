//flags for ARMv8-A
const flag = {
    N: 0, Z: 0, Z: 0, V: 0,
    init() {
        Object.assign(this, { N: 0, Z: 0, C: 0, V: 0 });
    }
}
