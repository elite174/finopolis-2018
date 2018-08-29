//import { observable, action, flow, computed } from "mobx";
import { PATH } from "../api";
import { types, getParent, flow } from "mobx-state-tree";

const User = types.model({
    firstName: 'Алексей',
    lastName: 'Смирнов',
    companyId: -1,
    balance: 15480,
    withdrawTo: 'card',
    cashback: 89.5,
    photo: "https://pp.userapi.com/c540101/v540101906/17314/306UIYtxDAA.jpg"
}).views(self => ({
    get chosenCompany() {
        return getParent(self).getById(self.companyId)
    }
})).actions(self => ({
    pay(money) {
        self.balance -= money
    },
    chooseCompany(id) {
        self.companyId = id
    },
    setWithdraw(to) {
        self.withdrawTo = to
    },
    loadData: flow(function* () {
        let response = yield fetch(PATH + '/user')
        if (response.status === 200) {
            let data = yield response.json()
            console.log(data)
            /*if (Array.isArray(data)) {
                this.name = data[0].name
            }*/
        }
    })
}))
/*
export default class User {

    constructor(store) {
        this.store = store
    }

    firstName = 'Алексей'

    lastName = 'Смирнов'

    id = -1

    @observable
    companyId = -1

    @observable
    balance = 15480

    @observable
    withdrawTo = 'card'

    @action.bound
    setWithdraw(to) {
        this.withdrawTo = to
    }

    @observable
    cashback = 89.5

    @action.bound
    chooseCompany(id) {
        this.companyId = id
    }

    @computed
    get chosenCompany() {
        this.store.getById(this.companyId)
    }

    photo = "https://pp.userapi.com/c540101/v540101906/17314/306UIYtxDAA.jpg"

    @action.bound
    loadData = flow(function* () {
        let response = yield fetch(PATH + '/user')
        if (response.status === 200) {
            let data = yield response.json()
            console.log(data)
            /*if (Array.isArray(data)) {
                this.name = data[0].name
            }
        }
    })
}*/
export default User