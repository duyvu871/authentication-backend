
export class ContainerService {
    constructor() {
        this.container = new Map();
    }
    register(name, dependency) {
        this.container.set(name, dependency);
    }

    get(name) {
        return this.container.get(name);
    }
}