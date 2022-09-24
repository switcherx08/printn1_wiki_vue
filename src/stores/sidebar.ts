import {defineStore} from 'pinia'
import {useModuleStore} from './module'
import IconMenu from "@//assets/api/sidebar_icon_menu.json";
// import PanelMenu from "@//assets/api/sidebar_panel_menu.json";

export const useSidebarStore = defineStore('sidebar',{
    state: () => ({
        _iconMenu: {},
        _panelMenu: [
            {
                id: 1,
                name: 'Введение',
                alias: 'page-1',
                children: {
                    0: {
                        id: 11,
                        name: 'Интерполяции',
                        alias: 'page-2',
                        children: {
                            0: {
                                id: 41,
                                name: 'Аргументы 1',
                                alias: 'page-3',
                                children: {
                                    0: {
                                        id: 41,
                                        name: 'Аргументы 2',
                                        alias: 'page-4',
                                    },
                                    1: {id: 42, name: 'Динамические аргументы', alias: 'page-5',},
                                    2: {id: 43, name: 'Модификаторы', alias: 'page-6',}
                                }
                            },
                            1: {id: 42, name: 'Динамические аргументы', alias: 'page-7',},
                            2: {id: 43, name: 'Модификаторы', alias: 'page-8',}
                        }
                    },
                    1: {id: 12, name: 'Текст', alias: 'page-9',},
                    2: {id: 13, name: 'Сырой HTML', alias: 'page-10',},
                    3: {id: 14, name: 'Атрибуты', alias: 'page-11',},
                    4: {
                        id: 15,
                        name: 'Директивы',
                        alias: 'page-12',
                        children: {
                            0: {id: 41, name: 'Аргументы', alias: 'page-13',},
                            1: {id: 42, name: 'Динамические аргументы', alias: 'page-14',},
                            2: {id: 43, name: 'Модификаторы', alias: 'page-15',}
                        }
                    }
                }
            },
            {id: 2, name: 'Экземпляр Vue', alias: 'page-16',},
            {id: 3, name: 'Синтаксис шаблонов', alias: 'page-17',},
        ],
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
            console.log('Update panel menu...')
            // await
            // this._panelMenu = PanelMenu

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
