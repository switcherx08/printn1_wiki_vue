import {defineStore} from 'pinia'
import {useModuleStore} from './module'
import IconMenu from "@//assets/api/sidebar_icon_menu.json";
import PanelMenu from "@//assets/api/sidebar_panel_menu.json";

export const useSidebarStore = defineStore('sidebar',{
    state: () => ({
        _iconMenu: {},
        _panelMenu: {},
        _panelMenuIsShow: true, // true
        _panelMenuIsView: true, // true
    }),
    getters: {
        iconMenu: (state) => state._iconMenu,
        isEmptyIconMenu: (state) => Object.keys(state._iconMenu).length === 0,
        panelMenu: (state) => state._panelMenu,
        panelMenuIsShow: (state) => state._panelMenuIsShow,
        panelMenuIsView: (state) => state._panelMenuIsView,
    },
    actions: {
        // Fetch data
        // async
        fetchIconMenu() {
            this._iconMenu = IconMenu

            // try {
                // this._iconMenu = await fetch('/dist/api/sidebar_icon_menu.json')
                //     .then((response) => response.json())
            // } catch (err) {
            //     console.log(['Error', err])
            // }
        },
        // async
        fetchPanelMenu() {
            // await
            this._panelMenu = PanelMenu

            // try {
            //     this._panelMenu = await fetch('/dist/api/sidebar_panel_menu.json')
            //         .then((response) => response.json())
            // } catch (err) {
            //     console.log(['Error', err])
            // }
        },

        // Show panel menu
        showPanelMenuIsShow() {
            this._panelMenuIsShow = true
        },
        hidePanelMenuIsShow() {
            this._panelMenuIsShow = false
        },
        togglePanelMenuIsShow() {
            if(this._panelMenuIsShow) {
                this.hidePanelMenuIsShow()
            } else {
                this.showPanelMenuIsShow()
            }
        },
        showPanelMenuIsView() {
            this._panelMenuIsView = true
        },
        hidePanelMenuIsView() {
            this._panelMenuIsView = false
        },
        changePanelMenuIsShow() {
            if (!this._panelMenuIsShow) {
                this.showPanelMenuIsView()
                return
            }
            if (this._panelMenuIsShow) {
                this.hidePanelMenuIsView()
                setTimeout(() => {
                    this.showPanelMenuIsView()
                }, 300)
            }
        },

        // Get elements info
        getActiveIconMenu() {
            const activeModuleName = useModuleStore().activeModule
            const iconMenu = this._iconMenu

            if(Object.keys(iconMenu).length === 0) { return [] }

            for(let i = 0; i < Object.keys(iconMenu).length; i++) {
                // @ts-ignore
                if(activeModuleName === iconMenu[i].module) {
                    // @ts-ignore
                    return iconMenu[i]
                }
            }
        },
        getActiveIconMenuName() {
            const el = this.getActiveIconMenu()
            if (!el || Object.keys(el).length === 0) { return '' }
            return el.name
        }
    }
})
