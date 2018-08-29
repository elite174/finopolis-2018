//import { observable, computed, flow, action } from "mobx";
import User from "./User";
import { PATH } from "../api";
import Startup from "./Startup";
import { types, getSnapshot, applySnapshot, flow } from 'mobx-state-tree'

const Store = types.model('Store', {
    startups: types.array(Startup),
    user: User
}).views(self => {
    return {
        get favorite() {
            return self.startups.filter(s => s.favorite)
        },
        profiles(favorite) {
            if (favorite) {
                return Array.from(new Set(self.favorite.map(s => s.profile))).sort((a, b) => a < b ? -1 : 1)
            } else {
                return Array.from(new Set(self.startups.map(s => s.profile))).sort((a, b) => a < b ? -1 : 1)
            }
        },

        getById(id) {
            return self.startups.find(s => s.id == id)
        },

        getByProfile(profile, favorite) {
            if (profile === '') {
                return favorite ? self.favorite : self.startups
            } else {
                return favorite ? self.favorite.filter(s => s.profile === profile) : self.startups.filter(s => s.profile === profile)
            }
        }

    }
}).actions(self => ({
    invest(companyId, money) {
        let c = self.getById(companyId), diff, rest
        self.user.pay(money)
        for (let f of c.features) {
            diff = f.cost - f.my_investment
            if (diff > 0) {
                if (diff >= money) {
                    f.pay(money)
                    break
                } else {
                    f.pay(diff)
                    money -= diff
                }
            }
        }
    },
    loadStartups: flow(function* () {
        try {
            let response = yield fetch(PATH + '/company')
            if (response.status === 200) {
                let data = yield response.json()
                self.startups = []
                for (let s of data) {
                    self.startups.push(Startup.create({
                        id: s.id,
                        name: s.name,
                        logo: s.logo,
                        short_desc: s.short_desc,
                        full_desc: s.full_desc,
                        profile: s.profile,
                        site: s.site,
                        video_link: s.video_link
                    }))
                }
            }
            console.log(self.startups)
        } catch (err) {
            console.log(err)
        }
    }),
    afterCreate() {
        self.load()
    },
    save() {
        let s = getSnapshot(self)
        localStorage.setItem('date', JSON.stringify(s))
        console.log('saved')
    },
    load() {
        let s = localStorage.getItem('date')
        if (s !== null) {
            let snap = JSON.parse(s)
            applySnapshot(self, snap)
            console.log('data loaded')
        }
    }
}))

/*class Store {
    @observable.shallow
    startups = []

    user = new User(this)

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

    getById(id) {
        return this.startups.find(s => s.id === id)
    }

    getByProfile(profile, favorite) {
        if (profile === '') {
            return favorite ? this.favorite : this.startups
        } else {
            return favorite ? this.favorite.filter(s => s.profile === profile) : this.startups.filter(s => s.profile === profile)
        }
    }


    @action.bound
    loadStartups:flow(function* () {
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
*/
const store = Store.create({
    startups: [],
    user: User.create({})
})
//const store = new Store()

export default store