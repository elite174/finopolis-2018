import { observable, computed, flow, action } from "mobx";
import User from "./User";
import { PATH } from "../api";
import Startup from "./Startup";

class Store {
    @observable.shallow
    startups = []

    user = new User()

    @computed
    get favorite() {
        return this.startups.filter(s => s.favorite)
    }

    profiles(favorite) {
        if (favorite) {
            return Array.from(new Set(this.favorite.map(s => s.profile))).sort((a, b) => a < b ? -1 : 1)
        } else {
            return Array.from(new Set(this.startups.map(s => s.profile))).sort((a, b) => a < b ? -1 : 1)
        }
    }

    getByProfile(profile, favorite) {
        if (profile === '') {
            return favorite ? this.favorite : this.startups
        } else {
            return favorite ? this.favorite.filter(s => s.profile === profile) : this.startups.filter(s => s.profile === profile)
        }
    }


    @action.bound
    loadStartups = flow(function* () {
        try {
            let response = yield fetch(PATH + '/company')
            if (response.status === 200) {
                let data = yield response.json()
                this.startups = []
                for (let s of data) {
                    this.startups.push(new Startup(
                        s.id,
                        s.name,
                        s.logo,
                        s.short_desc,
                        s.full_desc,
                        s.profile,
                        s.site,
                        s.video_link))
                }
            }
            console.log(this.startups)
        } catch (err) {
            console.log(err)
        }
    })


}

const store = new Store()

export default store