import { Router } from 'express';
import { GraveDiggerFactory } from '../../service/factory/grave-digger.service.factory.js';
import { GraveDiggerEntity } from "../../entity/grave-digger.js";

const routes = Router();


routes.get('/', async (_,res) => {
  const service = GraveDiggerFactory.getInstance()
  const gravediggers = await service.findAll()
  return res.status(200).json(gravediggers)
});

routes.get('/:id', async(req,res)=>{
  const service = GraveDiggerFactory.getInstance()
  const { id } = req.params
  const graveDigger = await service.findById(id)

  if (graveDigger['error']){
    return res.status(404).json(graveDigger)
  }

  return res.status(200).json(graveDigger)
});

routes.post('/', async(req,res)=>{
  try {
    const{
      name,
      cpf,
      birthDate,
      nationality,
      gender,
    } = req.body
    const graveDigger = new GraveDiggerEntity({
      name,
      cpf,
      birthDate,
      nationality,
      gender,
    })
    const service = GraveDiggerFactory.getInstance()
    const createdGraveDigger = await service.create(graveDigger)
    if(createdGraveDigger['error']){
      return res.status(500).json({message: createdGraveDigger['error']})
    }
    return res.status(201).json(createdGraveDigger)
  } catch (error) {
    return res.status(500).json({message: error.message})
    
  }
})

routes.put('/:id', async(req,res)=>{
  try {
    const {
      name,
      cpf,
      birthDate,
      nationality,
      gender,
        } = req.body
        const { id } = req.params

      const graveDigger = new GraveDiggerEntity({
        name,
        cpf,
        birthDate,
        nationality,
        gender
      })
    const service = GraveDiggerFactory.getInstance()
    const updatedGraveDigger = await service.update(id, graveDigger)
    if (updatedGraveDigger['error']){
      return res.status(500).json({message: updatedGraveDigger['errorMessage']})
    }
    return res.status(200).json(updatedGraveDigger)

  } catch (error) {
    return res.status(500).json({message: error.message})
    
  }
})
routes.delete('/:id', async(req,res)=>{
  try {
    const { id } = req.params
    const service = GraveDiggerFactory.getInstance()
    const findGraveDigger = await service.findById(id)
    if(findGraveDigger['error']){
      return res.status(404).json({message: findGraveDigger['errorMessage']})
    }
    const deleteGraveDigger = await service.delete(id)
    if(deleteGraveDigger['error']){
      return res.status(500).json({message: deleteGraveDigger['errorMessage']})
    }
    return res.status(200).json()    
  } catch (error) {
    return res.status(500).json({message: error.message})
    
  }
})

export default routes;