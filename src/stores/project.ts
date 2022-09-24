import { defineStore } from 'pinia'

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        _project: {
            id: 0,
            name: 'Первый проект'
        }
    }),
    getters: {
        project: (state) => state._project,
        projectId: (state) => state._project.id,
    },
    actions: {
        async fetchProject(projectId: Number) {
            console.log(projectId)
            let projects = [
                {id: 1, name: 'Проект Wiki'},
                {id: 2, name: 'Проект CRM система для проведения вебинаров'},
            ]
            for (let i = 0; i < projects.length; i++) {
                if(projects[i].id === projectId) {
                    this._project = projects[i]
                    break
                }
            }


            // try {
            //     this._project = await fetch(`/api/project/${projectId}`)
            //         .then((response) => response.json())
            // } catch (err) {
            //     console.log(['Error', err])
            // }
        },
    }
})
