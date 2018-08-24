import { observable, computed, flow, action } from "mobx";

class Store {
    @observable.ref
    startups = []

    @computed
    get favorite() {
        return this.startups.filter(s => s.favorite)
    }


    @action.bound
    loadStartups = flow(function* () {
        try {
            let response = yield fetch('')
            if (response.status === 200) {
                let data = yield response.json()
            }
        } catch (err) {
            console.log(err)
        }
    })


}

const store = new Store()

export default store