import { Router } from 'express';
import { TombServiceFactory } from '../../service/factory/tomb.service.factory.js';
import { TombEntity } from '../../entity/tomb.js';

const routes = Router();

routes.get('/', async (_, res) => {
  const service = TombServiceFactory.getInstance();
  const tombs = await service.findAll();
  return res.status(200).json(tombs);
});

routes.get('/:id', async (req, res) => {
  const service = TombServiceFactory.getInstance();
  const { id } = req.params;
  const tomb = await service.findById(id);

  if (tomb['error']) {
    return res.status(404).json(tomb);
  }
  return res.status(200).json(tomb);
});
routes.post('/', async (req, res) => {
  try {
    const { floors, haunted, location, size, client } = req.body;
    const tomb = new TombEntity({
      floors,
      haunted,
      location,
      size,
      client,
    });
    const service = TombServiceFactory.getInstance();
    const createdTomb = await service.create(tomb);
    if (createdTomb['error']) {
      return res.status(500).json({ message: createdTomb['error'] });
    }
    return res.status(201).json(createdTomb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
routes.put('/:id', async (req, res) => {
  try {
    const { floors, haunted, location, size, client_id } = req.body;
    const { id } = req.params;
    const tomb = new TombEntity({
      floors,
      haunted,
      location,
      size,
      client: { id: client_id },
    });
    const service = TombServiceFactory.getInstance();
    const upTomb = await service.update(id, tomb);
    if (upTomb['error']) {
      return res.status(500).json({ message: upTomb['errorMessage'] });
    }
    return res.status(200).json(upTomb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = TombServiceFactory.getInstance();
    const findTomb = await service.findById(id);
    if (findTomb['error']) {
      return res.status(404).json({ message: findTomb['errorMessage'] });
    }
    const deleteTomb = await service.delete(id);
    if (deleteTomb['error']) {
      return res.status(500).json({ message: deleteTomb['errorMessage'] });
    }
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default routes;
