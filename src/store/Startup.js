import { observable, flow, action } from "mobx";
import { PATH } from "../api";
import Feature from "./Feature";

export default class Startup {
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
    })


}