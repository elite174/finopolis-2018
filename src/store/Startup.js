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
/*export default class Startup {
    constructor(id, name, logo, short_desc, full_desc, profile, site, video_link) {
        this.id = id
        this.name = name
        this.logo = logo
        this.short_desc = short_desc
        this.full_desc = full_desc
        this.profile = profile
        this.site = site
        this.video_link = video_link
        setTimeout(() => this.afterCreate(), 10)
    }

    @observable
    favorite = false

    @observable.shallow
    features = []

    @observable
    liked = false

    @action.bound
    setFavorite() {
        this.favorite = !this.favorite
    }

    @action.bound
    setLike() {
        this.liked = !this.liked
    }

    @observable
    like = 0

    @observable
    dislike = 0

    afterCreate() {
        this.loadInfo()
        this.loadVersobeInfo()
    }

    @action.bound
    loadVersobeInfo = flow(function* () {
        try {
            let response = yield fetch(PATH + `/company_card_verbose/${this.id}`)
            if (response.status === 200) {
                let data = yield response.json()
                for (let f of data.features) {
                    this.features.push(new Feature(this,
                        f.id,
                        f.cost,
                        f.my_investment,
                        f.name,
                        f.number))
                }
            }
        } catch (err) {
            console.log(err)
        }
    })

    @action.bound
    loadInfo = flow(function* () {
        try {
            let response = yield fetch(PATH + `/company_card/${this.id}`)
            if (response.status === 200) {
                let data = yield response.json()
                this.cheapest_feature_cost = data.cheapest_feature_cost
                this.donation_percentage = Number(data.donation_percentage)
                this.end_date = data.end_date
                this.logo = data.logo
                this.start_date = data.start_date
                this.success_score = data.success_score
                this.like = data.like
                this.dislike = data.dislike
            }
        } catch (err) {
            console.log(err)
        }
  */