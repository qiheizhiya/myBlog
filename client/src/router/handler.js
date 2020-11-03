import router from './index'
import store from "../store"
import Vue from 'vue'
import { Loading } from 'element-ui';
let load = ''

router.beforeEach((to, from, next) => {
    store.commit('setShowPageLoadScrollBar', true)
    if (to.name === 'Exhibit') {
        load = Loading.service({
            lock: true,
            background: 'rgba(255,255,255,.8)'
        });
    }
    if (_hmt) {
        if (to.path) {
            _hmt.push(['_trackPageview', to.fullPath]);
        }
    }
    const { meta } = to
    for (let name in meta) {
        document[name] = meta[name]
    }
    next()
})
router.afterEach((to, from) => {
    setTimeout(() => {
        if (to.name === 'Exhibit') {
            load.close()
        }
        store.commit('setShowPageLoadScrollBar', false)
    }, 1200)
})

export default router