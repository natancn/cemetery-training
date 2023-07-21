import { GraveDiggerEntity } from "../../src/entity/grave-digger";
import { validGraveDigger } from "./grave-digger.mocks";

export const validTumulus ={
    id:1,
    deepness: -3,
    location: 2,
    tombstone: 'Wood',
    gravedigger: new GraveDiggerEntity(validGraveDigger)
};