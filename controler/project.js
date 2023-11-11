var Project = require('../models/project');
var fs = require('fs')
const controler = {

    home: function (req, res) {
        return res.status(200).send({
            messasge: "soy la home del controlador"
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            messasge: "soy el test del controlador"
        });
    },

    /* funciones */
    /* guardar proyecto */
    saveProject: async function (req, res) {
        try {
            const project = new Project();
            const params = req.body;
            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year; 
            project.langs = params.langs;
            project.img = null;

            const projectStored = await project.save();
            if (!projectStored) return res.status(404).send({ message: 'Error al guardar' });
            return res.status(200).send({ project: projectStored});
        } catch (error) {
            return res.status(500).send({ message: 'Error al guardar: ' + error.message });
        }
    },
    /* obtener un solo proyecto */
    getProject: async function (req, res) {
        try {
            const projectId = req.params.id;
            if (projectId == null) {
                return res.status(404).send({ message: 'ID de proyecto no proporcionado' });
            }
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).send({ message: 'Proyecto no encontrado' });
            }
            return res.status(200).send({ project });
        } catch (error) {
            return res.status(500).send({ message: 'Error en la consulta de la base de datos: ' + error.message });
        }
    },
    /* ver todos los proyectos */
    getProjects: async function (req, res) {
        try {
            const projects = await Project.find(); // Cambia "Project.exec(projects)" a "Project.find()"
            if (!projects) {
                return res.status(404).send({ message: 'Proyectos no encontrados' }); // Cambia "project" a "projects"
            }
            return res.status(200).send({ projects });
            
        } catch (error) {
            return res.status(500).send({ message: 'Error en la consulta de la base de datos: ' + error.message });
        }
    },
    /* actualizar datos */
    update: async function (req, res) {
        try {
            const projectId = req.params.id;
            const update = req.body;
            const updatedProject = await Project.findByIdAndUpdate(projectId, update, { new: true });

            if (!updatedProject) {
                return res.status(404).send({ message: 'No se ha podido actualizar' });
            }
            return res.status(200).send({
                project: updatedProject
            });
        } catch (error) {
            return res.status(500).send({ message: 'Error al actualizar: ' + error.message });
        }
    },
    /* borrar proyecto */
    deleteProject: async function (req, res) {
        try {
            const projectId = req.params.id;
            const removedProject = await Project.findByIdAndDelete(projectId);

            if (!removedProject) {
                return res.status(404).send({ message: 'No se ha podido eliminar el proyecto' });
            }

            return res.status(200).send({
                project: removedProject
            });
        } catch (error) {
            return res.status(500).send({ message: 'Error al eliminar el proyecto: ' + error.message });
        }
    },

    UploadImage: async function (req, res) {
        const projectId = req.params.id;
    
        try {
            if (!req.files || !req.files.imagen) {
                return res.status(400).send({ message: 'Imagen no subida' });
            }
    
            const filePath = req.files.imagen.path;
            const fileSplit = filePath.split('\\');
            const fileName = fileSplit[1];
            const extension =filePath.split('\.');
            const fileExt =  extension[1];

            if (fileExt == 'png' ||fileExt== 'jpg'|| fileExt=='jpeg'|| fileExt =='gif') {
                const projectUpdate = await Project.findByIdAndUpdate(projectId, { img: fileName }, { new: true });
    
                if (!projectUpdate) {
                    return res.status(404).send({ message: 'No se ha podido actualizar' });
                }
        
                return res.status(200).send({
                    project: projectUpdate
                });
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message:"la extension error"});
                });
            }
          
        } catch (error) {
            return res.status(500).send({ message: 'Error al subir y actualizar la imagen: ' + error.message });
        }
    }
};

module.exports = controler;