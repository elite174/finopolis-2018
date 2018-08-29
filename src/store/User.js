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
    }
}))
export default User