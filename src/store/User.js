import { observable, action, flow } from "mobx";
import { PATH } from "../api";

export default class User {
    @observable
    name = ''

    id = -1

    @observable
    balance = 0

    @action.bound
    loadData = flow(function* () {
        let response = yield fetch(PATH + '/user')
        if (response.status === 200) {
            let data = yield response.json()
            console.log(data)
            /*if (Array.isArray(data)) {
                this.name = data[0].name
            }*/
        }
    })
}