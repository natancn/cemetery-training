import { Router } from 'express';
import { TumulusServiceFactory } from '../../service/factory/tumulus.service.factory';
import { TumulusEntity } from '../../entity/tumulus';

const routes = Router();

routes.get('/', async (_, res) => {
  const service = TumulusServiceFactory.getInstance();
  const tumuluss = await service.findAll();
  return res.status(200).json(tumuluss);
});

routes.get('/:id', async (req, res) => {
  const service = TumulusServiceFactory.getInstance();
  const { id } = req.params;
  const tumulus = await service.findById(id);

  if (tumulus['error']) {
    return res.status(404).json(tumulus);
  }

  return res.status(200).json(tumulus);
});

routes.post('/', async (req, res) => {
  try {
    const { deepness, location, tombstone, client, gravedigger } = req.body;
    const tumulus = new TumulusEntity({
      deepness,
      location,
      tombstone,
      client,
      gravedigger,
    });
    const service = TumulusServiceFactory.getInstance();
    const createdTumulus = await service.create(tumulus);
    if (createdTumulus['error']) {
      return res.status(500).json({ message: createdTumulus['error'] });
    }
    return res.status(201).json(createdTumulus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.put('/:id', async (req, res) => {
  try {
    const { deepness, location, tombstone, client_id, gravedigger_id } =
      req.body;
    const { id } = req.params;
    const tumulus = new TumulusEntity({
      deepness,
      location,
      tombstone,
      client: { id: client_id },
      gravedigger: { id: gravedigger_id },
    });
    const service = TumulusServiceFactory.getInstance();
    const upTumulus = await service.update(id, tumulus);
    if (upTumulus['error']) {
      return res.status(500).json({ message: upTumulus['errorMessage'] });
    }
    return res.status(200).json(upTumulus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = TumulusServiceFactory.getInstance();
    const findTumulus = await service.findById(id);
    if (findTumulus['error']) {
      return res.status(404).json({ message: findTumulus['errorMessage'] });
    }
    const deleteTumulus = await service.delete(id);
    if (deleteTumulus['error']) {
      return res.status(500).json({ message: deleteTumulus['errorMessage'] });
    }
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default routes;
