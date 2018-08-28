import { observable, action, flow } from "mobx";
import { PATH } from "../api";

export default class User {

    firstName = 'Алексей'

    lastName = 'Смирнов'

    id = -1

    @observable
    balance = 15480

    photo = "https://pp.userapi.com/c540101/v540101906/17314/306UIYtxDAA.jpg"

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