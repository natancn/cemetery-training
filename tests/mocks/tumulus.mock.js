import { GraveDiggerEntity } from "../../src/entity/grave-digger";
import { validGraveDigger } from "./grave-digger.mocks";
import { ClientEntity } from "../../src/entity/client";
import { validClient } from "./client.mocks";

export const validTumulus ={
    id:1,
    deepness: -3,
    location: 2,
    tombstone: 'Wood',
    gravedigger: new GraveDiggerEntity(validGraveDigger),
    client: new ClientEntity(validClient)
};