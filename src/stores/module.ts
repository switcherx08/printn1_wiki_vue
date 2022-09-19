import { defineStore } from 'pinia'
import modules from "@//assets/api/modules.json";

interface ChangeActiveModuleParams {
    module: string;
}

export const useModuleStore = defineStore('module',{
    state: () => ({
        _modules: modules,
        _activeModule: '',
        _activeModuleIndex: ''
    }),
    getters: {
        modules: (state) => state._modules,
        activeModule: (state) => state._activeModule,
    },
    actions: {
        changeActiveModule({module}: ChangeActiveModuleParams) {
            this._activeModule = module
        }
    }
})
