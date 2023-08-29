import { Router } from 'express';
import { ClientServiceFactory } from '../../service/factory/client.service.factory.js';
import { ClientEntity } from '../../entity/client.js';

const routes = Router();

// http://localhost:3000/clients -> retorne todos os clientes
// req = request | res = response
// comunicação da nossa api é em json

// criação -> post
// pegar -> !get, head
// atualizar -> put(atualizar varios valores) ou patch(atualiza um valor)
// deletar -> delete
// retornar informações sobre as rotas - options

routes.get('/', async (_, res) => {
  const service = ClientServiceFactory.getInstance();
  const clients = await service.findAll();
  return res.status(200).json(clients);
});

// http://localhost:3000/clients/:id -> http://localhost:3000/clients/1
// :id = pathParam | : = flag p indicar o inicio de um parametro
routes.get('/:id', async (req, res) => {
  const service = ClientServiceFactory.getInstance();
  const { id } = req.params;

  const client = await service.findById(id);

  if (client['error']) {
    return res.status(404).json(client);
  }

  return res.status(200).json(client);
});

// http://localhost:3000/clients -> retornar o client criado
routes.post('/', async (req, res) => {
  try {
    const { name, cpf, birthDate, nationality, gender } = req.body;

    const client = new ClientEntity({
      name,
      cpf,
      birthDate,
      nationality,
      gender,
    });

    const service = ClientServiceFactory.getInstance();
    const createdClient = await service.create(client);

    if (createdClient['error']) {
      return res.status(500).json({ message: createdClient['error'] });
    }

    return res.status(201).json(createdClient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// atualiza
routes.put('/:id', async (req, res) => {
  try {
    const { name, cpf, birthDate, nationality, gender } = req.body;
    const { id } = req.params;

    const client = new ClientEntity({
      name,
      cpf,
      birthDate,
      nationality,
      gender,
    });

    const service = ClientServiceFactory.getInstance();
    const updatedClient = await service.update(id, client);
    if (updatedClient['error']) {
      return res.status(500).json({ message: updatedClient['errorMessage'] });
    }
    return res.status(200).json(updatedClient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// http://localhost:3000/clients/:id -> deletar o client

// TODO
routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = ClientServiceFactory.getInstance();
    const findClient = await service.findById(id);

    if (findClient['error']) {
      return res.status(404).json({ message: findClient['errorMessage'] });
    }

    const deleteClient = await service.delete(id);
    if (deleteClient['error']) {
      return res.status(500).json({ message: deleteClient['errorMessage'] });
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// http://localhost:3000/clients/:id -> deletar o client

export default routes;
