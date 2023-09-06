import { Router } from 'express';
import { CoffinServiceFactory } from '../../service/factory/coffin.service.factory.js';
import { CoffinEntity } from '../../entity/coffin.js';

const routes = Router();

routes.get('/', async (_, res) => {
  const service = CoffinServiceFactory.getInstance();
  const coffins = await service.findAll();
  return res.status(200).json(coffins);
});

routes.get('/:id', async (req, res) => {
  const service = CoffinServiceFactory.getInstance();
  const { id } = req.params;
  const coffin = await service.findById(id);

  if (coffin['error']) {
    return res.status(404).json(coffin);
  }
  return res.status(200).json(coffin);
});

routes.post('/', async (req, res) => {
  try {
    const { material, size, location, tomb, tumulus } = req.body;
    const coffin = new CoffinEntity({
      material,
      size,
      location,
      tomb,
      tumulus,
    });
    const service = CoffinServiceFactory.getInstance();
    const createdCoffin = await service.create(coffin);
    if (createdCoffin['error']) {
      return res.status(500).json({ message: createdCoffin['error'] });
    }
    return res.status(201).json(createdCoffin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.put('/:id', async (req, res) => {
  try {
    const { material, size, location, tomb_id, tumulus_id } = req.body;
    const { id } = req.params;
    const coffin = new CoffinEntity({
      material,
      size,
      location,
      tomb: { id: tomb_id },
      tumulus: { id: tumulus_id },
    });
    const service = CoffinServiceFactory.getInstance();
    const upCoffin = await service.update(id, coffin);
    if (upCoffin['error']) {
      return res.status(500).json({ message: upCoffin['errorMessage'] });
    }
    return res.status(200).json(upCoffin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = CoffinServiceFactory.getInstance();
    const findCoffin = await service.findById(id);
    if (findCoffin['error']) {
      return res.send(404).json({ message: findCoffin['errorMessage'] });
    }
    const deleteCoffin = await service.delete(id);
    if (deleteCoffin['error']) {
      return res.status(500).json({ message: deleteCoffin['errorMessage'] });
    }
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default routes;
