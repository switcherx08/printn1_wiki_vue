import {defineStore} from 'pinia'
import {useModuleStore} from './module'
import IconMenu from "@//assets/api/sidebar_icon_menu.json";
import {useAuthStore} from "@/stores/auth";

export const useSidebarStore = defineStore('sidebar',{
    state: () => ({
        _iconMenu: {},
        _panelMenu: {},
        _panelMenuIsShow: true,
        _panelMenuIsView: true,
        _panelMenuIsEdit: false,
        _panelMenuEditData: {}
    }),
    getters: {
        iconMenu: (state) => state._iconMenu,
        isEmptyIconMenu: (state) => Object.keys(state._iconMenu).length === 0,
        panelMenu: (state) => state._panelMenu,
        panelMenuIsShow: (state) => state._panelMenuIsShow,
        panelMenuIsView: (state) => state._panelMenuIsView,
        panelMenuIsEdit: (state) => state._panelMenuIsEdit,
        panelMenuEditData: (state) => state._panelMenuEditData,
    },
    actions: {
        setPanelMenu(data: object) {
            this._panelMenu = data
        },

        setPanelMenuIsEdit(status: boolean) {
            this._panelMenuIsEdit = status
        },

        setPanelMenuEditData(data: object) {
            this._panelMenuEditData = data
        },

        // Fetch data
        fetchIconMenu() {
            this._iconMenu = IconMenu
        },

        async fetchPanelMenu(projectId: number) {
            const authStore = useAuthStore()

            await fetch(`/api/project/wiki-menu/${projectId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': authStore.getToken()
                }
            })
                .then(async response => {
                    if (response.status === 200) {
                        const data = await response.json()
                        await this.setPanelMenu(data)
                    } else {
                        this.setPanelMenu({})
                    }
                })
                .catch(error => {
                    this.setPanelMenu({})
                })
        },

        // Transform
        transformMenuItemToArray(itemData: object) {
            let result = []
            for(let item in itemData) {
                result.push(itemData[item])
            }

            return result
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
