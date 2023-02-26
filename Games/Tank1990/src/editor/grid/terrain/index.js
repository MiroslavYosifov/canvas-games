import { DefaultTerrain } from "./defaultTerrain.js";
import { BrickTerrain } from "./brickTerrain.js";
import { IceTerrain } from "./iceTerrain.js";
import { JungleTerrain } from "./jungleTerrain.js";
import { WaterTerrain } from "./waterTerrain.js";

export default {
    default: DefaultTerrain,
    brick: BrickTerrain,
    ice: IceTerrain,
    jungle: JungleTerrain,
    water: WaterTerrain
}