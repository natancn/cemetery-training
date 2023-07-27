import { TombEntity } from "../../src/entity/tomb";
import { validTomb } from "./tomb.mock";
import { TumulusEntity } from "../../src/entity/tumulus";
import { validTumulus } from "./tumulus.mock";

export const validCoffin ={
    id: 1,
    material: 'Carvalho',
    size: 'M',
    location: 2.3,
    tomb: new TombEntity(validTomb),
    tumulus: new TumulusEntity(validTumulus)
};