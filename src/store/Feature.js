import { types } from "mobx-state-tree";

/*export default class Feature {
    constructor(company, id, cost, my_investment, name, number) {
        this.company = company
        this.id = id
        this.cost = cost
        this.my_investment = my_investment
        this.name = name
        this.number = number
    }
}*/

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