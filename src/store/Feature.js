import { types } from "mobx-state-tree";

const Feature = types.model('Feature', {
    id: types.number,
    cost: types.number,
    my_investment: types.number,
    name: types.string,
    number: types.number
}).actions(self => ({
    pay(money) {
        self.my_investment += money
    }
}))

export default Feature