//import { observable, flow, action } from "mobx";
import { PATH } from "../api";
import Feature from "./Feature";
import { types, flow, getRoot } from "mobx-state-tree";


const Startup = types.model({
    id: types.number,
    name: types.string,
    logo: types.string,
    short_desc: types.string,
    full_desc: types.string,
    profile: types.string,
    site: types.string,
    video_link: types.string,
    favorite: false,
    features: types.optional(types.array(Feature), []),
    liked: false,
    like: 0,
    dislike: 0,
    cheapest_feature_cost: types.optional(types.number, 0),
    donation_percentage: types.optional(types.number, 0),
    start_date: types.optional(types.string, ''),
    end_date: types.optional(types.string, ''),
}).actions(self => ({
    afterCreate() {
        self.loadInfo().then(
            () => self.loadVersobeInfo().then(() => {
            //    getRoot(self).save()
            })
        )
    },
    setFavorite() {
        self.favorite = !self.favorite
    },
    setLike() {
        self.liked = !self.liked
    },
    loadVersobeInfo: flow(function* () {
        try {
            let response = yield fetch(PATH + `/company_card_verbose/${self.id}`)
            if (response.status === 200) {
                let data = yield response.json()
                self.features = []
                for (let f of data.features) {
                    self.features.push(Feature.create({
                        id: f.id,
                        cost: f.cost,
                        my_investment: f.my_investment,
                        name: f.name,
                        number: f.number
                    }))
                }
            }
        } catch (err) {
            console.log(err)
        }
    }),
    loadInfo: flow(function* () {
        try {
            let response = yield fetch(PATH + `/company_card/${self.id}`)
            if (response.status === 200) {
                let data = yield response.json()
                self.cheapest_feature_cost = data.cheapest_feature_cost ? data.cheapest_feature_cost : 0
                self.donation_percentage = Number(data.donation_percentage)
                self.end_date = data.end_date
                self.logo = data.logo
                self.start_date = data.start_date
                self.success_score = data.success_score
                self.like = data.like
                self.dislike = data.dislike
            }
        } catch (err) {
            console.log(err)
        }
    })

}))

export default Startup