import { FindByIdController } from "./findByIdController";
import { findByIdService } from "../../../../domain/modules/file";

export const findByIdController = new FindByIdController(findByIdService);